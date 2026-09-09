import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BingoLetter, DrawnBall } from '../types';
import { playSound } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface ThreeBingoRouletteProps {
  isSpinning: boolean;
  currentBall?: DrawnBall | null;
  remainingCount: number;
  soundEnabled?: boolean;
}

interface Ball3D {
  mesh: THREE.Mesh;
  origPos: THREE.Vector3;
  velocity: THREE.Vector3;
  rndSpeed: number;
  rndOffset: number;
  letter: BingoLetter;
  number: number;
}

// Default camera view matching the provided photo
const DEFAULT_ROT_Y = -0.65; // ~ -37 degrees (brings right pillar forward, chute to left-bottom)
const DEFAULT_ROT_X = 0.22;  // ~ 12.5 degrees tilt down

export const ThreeBingoRoulette: React.FC<ThreeBingoRouletteProps> = ({
  isSpinning,
  soundEnabled = true,
}) => {
  const { lang } = useLanguage();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cageGroupRef = useRef<THREE.Group | null>(null);
  const ballsInsideRef = useRef<Ball3D[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0, rotY: DEFAULT_ROT_Y, rotX: DEFAULT_ROT_X });
  const hasDraggedRef = useRef<boolean>(false);
  const [hasCustomRotation, setHasCustomRotation] = useState<boolean>(false);

  // Spin velocity state for 3D cage (continuous rotation)
  const spinVelocityRef = useRef(0.012);

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 270;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.rotation.y = DEFAULT_ROT_Y;
    scene.rotation.x = DEFAULT_ROT_X;
    sceneRef.current = scene;

    // 2. Camera - Fixed distance (NO zoom in or zoom out)
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 1.1, 8.4);
    camera.lookAt(0, 0.4, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfff8ed, 1.4);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xfbbf24, 1.2, 18);
    pointLight.position.set(0, 3, 4);
    scene.add(pointLight);

    // 5. Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.25,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
    });

    // 6. Base & Support Stand (Pedestal)
    const standGroup = new THREE.Group();

    // Floor platform disc
    const baseGeo = new THREE.CylinderGeometry(2.8, 3.1, 0.35, 36);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -2.3;
    baseMesh.receiveShadow = true;
    standGroup.add(baseMesh);

    // Decorative golden ring on base
    const ringGeo = new THREE.TorusGeometry(2.7, 0.08, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, goldMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -2.1;
    standGroup.add(ringMesh);

    // Left and Right support A-frames
    [-2.2, 2.2].forEach((x) => {
      const poleGeo = new THREE.CylinderGeometry(0.14, 0.18, 3.2, 16);
      const pole = new THREE.Mesh(poleGeo, brassMaterial);
      pole.position.set(x, -0.7, 0);
      pole.castShadow = true;
      standGroup.add(pole);

      // Support cap with golden sphere
      const capGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const cap = new THREE.Mesh(capGeo, goldMaterial);
      cap.position.set(x, 0.9, 0);
      standGroup.add(cap);
    });

    // Chute (ramp where balls exit at the front-left)
    const chuteGeo = new THREE.CylinderGeometry(0.45, 0.6, 1.2, 18, 1, true, 0, Math.PI);
    const chuteMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.8,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const chute = new THREE.Mesh(chuteGeo, chuteMat);
    chute.rotation.x = -Math.PI / 3;
    chute.position.set(0, -1.5, 1.4);
    standGroup.add(chute);

    scene.add(standGroup);

    // 7. Rotating Cage
    const cageGroup = new THREE.Group();
    cageGroup.position.set(0, 0.9, 0);
    cageGroupRef.current = cageGroup;

    // Central axle
    const axleGeo = new THREE.CylinderGeometry(0.09, 0.09, 4.8, 16);
    const axle = new THREE.Mesh(axleGeo, brassMaterial);
    axle.rotation.z = Math.PI / 2;
    cageGroup.add(axle);

    // Spherical wire cage (latitudinal and longitudinal rings)
    const cageRadius = 1.9;

    // Main wireframe sphere
    const wireGeo = new THREE.SphereGeometry(cageRadius, 20, 14);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      metalness: 0.9,
      roughness: 0.15,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    cageGroup.add(wireMesh);

    // Thick equator rings
    const eqGeo = new THREE.TorusGeometry(cageRadius, 0.05, 16, 48);
    const eq1 = new THREE.Mesh(eqGeo, goldMaterial);
    eq1.rotation.x = Math.PI / 2;
    cageGroup.add(eq1);

    const eq2 = new THREE.Mesh(eqGeo, goldMaterial);
    eq2.rotation.y = Math.PI / 2;
    cageGroup.add(eq2);

    // 8. 35 Colorful 3D Balls inside the cage
    const ballColors = [
      0xef4444, // Red (B)
      0xf97316, // Orange (I)
      0x10b981, // Green (N)
      0x3b82f6, // Blue (G)
      0x8b5cf6, // Purple (O)
      0xf59e0b, // Amber
      0xec4899, // Pink
    ];

    const ballRadius = 0.23;
    const ballGeo = new THREE.SphereGeometry(ballRadius, 16, 16);
    const ballsInside: Ball3D[] = [];

    for (let i = 0; i < 35; i++) {
      const color = ballColors[i % ballColors.length];
      const ballMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.25,
      });
      const bMesh = new THREE.Mesh(ballGeo, ballMat);

      // Position inside cage
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 0.3 + Math.random() * (cageRadius - ballRadius - 0.25);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(theta) * Math.sin(phi);

      bMesh.position.set(x, y, z);
      bMesh.castShadow = true;
      cageGroup.add(bMesh);

      ballsInside.push({
        mesh: bMesh,
        origPos: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.04),
        rndSpeed: 1.5 + Math.random() * 3,
        rndOffset: Math.random() * 10,
        letter: 'B',
        number: (i * 2 + 1) % 75 + 1,
      });
    }
    ballsInsideRef.current = ballsInside;

    scene.add(cageGroup);

    // 9. Animation Loop - Continuous rotation, spins faster when accelerated
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Rotate cage continually
      if (cageGroupRef.current) {
        cageGroupRef.current.rotation.x += spinVelocityRef.current;

        // Smooth damping back to steady continuous spin speed
        if (spinVelocityRef.current > 0.015) {
          spinVelocityRef.current *= 0.982;
        } else {
          spinVelocityRef.current = 0.012;
        }
      }

      // Animate inner balls (tumbling effect inside cage)
      const t = time * 0.0025;
      ballsInsideRef.current.forEach((b) => {
        if (spinVelocityRef.current > 0.05) {
          // Centrifugal whirl when spinning fast
          b.mesh.rotation.x += 0.08;
          b.mesh.rotation.y += 0.05;
          b.mesh.position.y = b.origPos.y + Math.sin(t * b.rndSpeed + b.rndOffset) * 0.55;
          b.mesh.position.x = b.origPos.x + Math.cos(t * b.rndSpeed) * 0.35;
        } else {
          // Gentle tumbling floating
          b.mesh.rotation.x += 0.01;
          b.mesh.position.y = b.origPos.y + Math.sin(t * 1.5 + b.rndOffset) * 0.15;
        }
      });

      renderer.render(scene, camera);
    };

    animate(0);

    // Prevent wheel zoom explicitly (no zoom in or zoom out, only rotation allowed)
    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    container.addEventListener('wheel', preventWheel, { passive: false });

    // Responsive resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      cameraRef.current.aspect = newWidth / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('wheel', preventWheel);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  // When parent triggers drawing a ball (via Spacebar or button), accelerate cage spin
  useEffect(() => {
    if (isSpinning) {
      spinVelocityRef.current = 0.32; // Fast spin
    }
  }, [isSpinning]);

  // Touch/Mouse drag to explore the 3D object from angles (Rotation ONLY, NO zoom)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPointerDown(true);
    hasDraggedRef.current = false;
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: sceneRef.current?.rotation.y ?? DEFAULT_ROT_Y,
      rotX: sceneRef.current?.rotation.x ?? DEFAULT_ROT_X,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown || !sceneRef.current) return;
    const deltaX = (e.clientX - pointerStartRef.current.x) * 0.007;
    const deltaY = (e.clientY - pointerStartRef.current.y) * 0.007;

    if (Math.hypot(e.clientX - pointerStartRef.current.x, e.clientY - pointerStartRef.current.y) > 4) {
      hasDraggedRef.current = true;
      setHasCustomRotation(true);
    }

    // Only rotation: horizontal 360 rotation and bounded vertical tilt
    sceneRef.current.rotation.y = pointerStartRef.current.rotY + deltaX;
    sceneRef.current.rotation.x = Math.max(-0.45, Math.min(0.55, pointerStartRef.current.rotX + deltaY));
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);

    // If pointer didn't drag, it was a pure click on the 3D cage!
    // Spinning faster without drawing a ball (no ejection, no ball draw trigger)
    if (!hasDraggedRef.current) {
      spinVelocityRef.current = Math.min(0.42, spinVelocityRef.current + 0.18);
      playSound('spin', soundEnabled);
    }
  };

  // Reset view to default angle from reference photo
  const handleResetAngle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sceneRef.current) return;
    sceneRef.current.rotation.y = DEFAULT_ROT_Y;
    sceneRef.current.rotation.x = DEFAULT_ROT_X;
    setHasCustomRotation(false);
    playSound('click', soundEnabled);
  };

  const dragTitle =
    lang === 'es'
      ? 'Arrastra para rotar la vista 3D • Clic para girar más rápido'
      : lang === 'it'
      ? 'Trascina per ruotare la vista 3D • Clicca per girare più veloce'
      : 'Drag to rotate 3D view • Click to spin faster';

  const hintPill =
    lang === 'es'
      ? 'Arrastra para rotar • Clic para acelerar'
      : lang === 'it'
      ? 'Trascina per ruotare • Clicca per accelerare'
      : 'Drag to rotate • Click to spin faster';

  const resetAngleLabel =
    lang === 'es' ? 'Ángulo inicial' : lang === 'it' ? 'Angolo iniziale' : 'Default angle';

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* 3D Canvas container with cursor indicators */}
      <div
        ref={mountRef}
        className="w-full h-[270px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        title={dragTitle}
      />

      {/* Helper pill: Shows interaction hints (drag to rotate, click to spin faster) */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[11px] font-extrabold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-amber-300">
        <span>🔄</span>
        <span>{hintPill}</span>
      </div>

      {/* Button to restore default angle if rotated */}
      {hasCustomRotation && (
        <button
          onClick={handleResetAngle}
          className="absolute top-2 right-3 text-[10px] font-extrabold text-slate-700 bg-white/90 hover:bg-white px-2 py-1 rounded-lg shadow-xs border border-slate-300 flex items-center gap-1 transition-all cursor-pointer"
          title={resetAngleLabel}
        >
          <span>↺</span>
          <span>{resetAngleLabel}</span>
        </button>
      )}
    </div>
  );
};
