import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BingoLetter, DrawnBall } from '../types';
import { LETTER_RANGES } from '../utils/bingoData';

interface ThreeBingoRouletteProps {
  isSpinning: boolean;
  currentBall: DrawnBall | null;
  onCageClick: () => void;
  remainingCount: number;
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

export const ThreeBingoRoulette: React.FC<ThreeBingoRouletteProps> = ({
  isSpinning,
  currentBall,
  onCageClick,
  remainingCount,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cageGroupRef = useRef<THREE.Group | null>(null);
  const poppingBallRef = useRef<THREE.Mesh | null>(null);
  const poppingBallCanvasRef = useRef<{ canvas: HTMLCanvasElement; texture: THREE.CanvasTexture } | null>(null);
  const ballsInsideRef = useRef<Ball3D[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const pointerStartRef = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });

  // Spin velocity state for 3D cage
  const spinVelocityRef = useRef(0.012);

  // Popping animation state
  const poppingAnimRef = useRef({
    active: false,
    progress: 0,
  });

  // Setup Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 280;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 8.8);
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
    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
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

      // Support cap
      const capGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const cap = new THREE.Mesh(capGeo, goldMaterial);
      cap.position.set(x, 0.9, 0);
      standGroup.add(cap);
    });

    // Chute (ramp where balls exit at the front)
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

      // Random position inside cage
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

    // 9. Popping Ball that flies out towards the user when a number is drawn
    const popCanvas = document.createElement('canvas');
    popCanvas.width = 256;
    popCanvas.height = 256;
    const popTexture = new THREE.CanvasTexture(popCanvas);
    poppingBallCanvasRef.current = { canvas: popCanvas, texture: popTexture };

    const popMat = new THREE.MeshStandardMaterial({
      map: popTexture,
      roughness: 0.2,
      metalness: 0.2,
    });
    const popGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const popMesh = new THREE.Mesh(popGeo, popMat);
    popMesh.position.set(0, 0.4, 2.5);
    popMesh.visible = false;
    scene.add(popMesh);
    poppingBallRef.current = popMesh;

    // 10. Animation Loop
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Rotate cage
      if (cageGroupRef.current) {
        cageGroupRef.current.rotation.x += spinVelocityRef.current;

        // Damping if fast spin
        if (spinVelocityRef.current > 0.015) {
          spinVelocityRef.current *= 0.982;
        } else {
          spinVelocityRef.current = 0.012;
        }
      }

      // Animate inner balls (tumbling effect)
      const t = time * 0.0025;
      ballsInsideRef.current.forEach((b) => {
        if (spinVelocityRef.current > 0.05) {
          // Centrifugal whirl
          b.mesh.rotation.x += 0.08;
          b.mesh.rotation.y += 0.05;
          b.mesh.position.y = b.origPos.y + Math.sin(t * b.rndSpeed + b.rndOffset) * 0.55;
          b.mesh.position.x = b.origPos.x + Math.cos(t * b.rndSpeed) * 0.35;
        } else {
          // Gentle floating
          b.mesh.rotation.x += 0.01;
          b.mesh.position.y = b.origPos.y + Math.sin(t * 1.5 + b.rndOffset) * 0.15;
        }
      });

      // Popping ball animation towards camera
      if (poppingAnimRef.current.active && poppingBallRef.current) {
        poppingAnimRef.current.progress += 0.035;
        const p = poppingAnimRef.current.progress;

        // Parabolic arc forward towards user
        poppingBallRef.current.position.z = 2.0 + Math.sin(p * Math.PI * 0.5) * 4.2;
        poppingBallRef.current.position.y = 0.9 - Math.sin(p * Math.PI) * 0.8;
        poppingBallRef.current.rotation.y += 0.06;
        poppingBallRef.current.rotation.x += 0.03;

        const sc = Math.min(1.0, 0.2 + p * 0.8);
        poppingBallRef.current.scale.set(sc, sc, sc);

        if (p >= 1) {
          poppingAnimRef.current.active = false;
          // Settle down
          setTimeout(() => {
            if (poppingBallRef.current) {
              poppingBallRef.current.visible = false;
            }
          }, 800);
        }
      }

      renderer.render(scene, camera);
    };

    animate(0);

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
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  // Update popping ball texture and trigger 3D jump when ball is drawn
  useEffect(() => {
    if (isSpinning) {
      spinVelocityRef.current = 0.32; // Fast spin!
    }
  }, [isSpinning]);

  useEffect(() => {
    if (!currentBall || !poppingBallRef.current || !poppingBallCanvasRef.current) return;

    const { canvas, texture } = poppingBallCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const range = LETTER_RANGES[currentBall.letter];

    // Draw high-res textured ball for 3D sphere
    ctx.clearRect(0, 0, 256, 256);

    const grad = ctx.createRadialGradient(90, 80, 20, 128, 128, 120);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, range.color);
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // White circle for number
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(128, 128, 70, 0, Math.PI * 2);
    ctx.fill();

    // Letter and Number
    ctx.fillStyle = range.color;
    ctx.font = 'bold 36px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentBall.letter, 128, 95);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 54px Fredoka, sans-serif';
    ctx.fillText(String(currentBall.number), 128, 145);

    texture.needsUpdate = true;

    // Trigger pop animation
    poppingBallRef.current.visible = true;
    poppingBallRef.current.position.set(0, 0.4, 2.0);
    poppingBallRef.current.scale.set(0.2, 0.2, 0.2);
    poppingAnimRef.current = { active: true, progress: 0 };
  }, [currentBall]);

  // Touch/Mouse drag to view cage from angles
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPointerDown(true);
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotY: sceneRef.current?.rotation.y || 0,
      rotX: sceneRef.current?.rotation.x || 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown || !sceneRef.current) return;
    const deltaX = (e.clientX - pointerStartRef.current.x) * 0.005;
    const deltaY = (e.clientY - pointerStartRef.current.y) * 0.005;
    sceneRef.current.rotation.y = pointerStartRef.current.rotY + deltaX;
    sceneRef.current.rotation.x = Math.max(-0.3, Math.min(0.3, pointerStartRef.current.rotX + deltaY));
  };

  const handlePointerUp = () => {
    setIsPointerDown(false);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* 3D Canvas container */}
      <div
        ref={mountRef}
        className="w-full h-[270px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={onCageClick}
        title="Toca o arrastra para ver en 3D"
      />

      {/* 3D badge hint */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full backdrop-blur-xs border border-amber-300">
        <span>✨</span> Bombo 3D interactivo con Three.js
      </div>
    </div>
  );
};
