import { BingoLetter } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSound(type: 'click' | 'pop' | 'spin' | 'ball' | 'fanfare' | 'bingo' | 'error' | 'fireworks', soundEnabled = true) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (type) {
    case 'click': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }

    case 'pop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
      break;
    }

    case 'spin': {
      // Whirling ratchet / wheel ticks
      const count = 7;
      for (let i = 0; i < count; i++) {
        const t = now + i * 0.04;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200 + i * 40, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.005, t + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.03);
      }
      break;
    }

    case 'ball': {
      // Pleasant double chime
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
      break;
    }

    case 'fireworks': {
      // Whistle up followed by crackle bursts
      const whistle = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(400, now);
      whistle.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
      whistleGain.gain.setValueAtTime(0.2, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      whistle.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      whistle.start(now);
      whistle.stop(now + 0.35);

      // Bursts
      [0.35, 0.45, 0.58].forEach((burstTime, idx) => {
        const b = ctx.createOscillator();
        const bg = ctx.createGain();
        b.type = 'triangle';
        b.frequency.setValueAtTime(160 - idx * 25, now + burstTime);
        b.frequency.linearRampToValueAtTime(60, now + burstTime + 0.2);
        bg.gain.setValueAtTime(0.25, now + burstTime);
        bg.gain.exponentialRampToValueAtTime(0.005, now + burstTime + 0.25);
        b.connect(bg);
        bg.connect(ctx.destination);
        b.start(now + burstTime);
        b.stop(now + burstTime + 0.25);
      });
      break;
    }

    case 'fanfare':
    case 'bingo': {
      // Joyful celebratory melody (C, E, G, High C, sustained fanfare chord)
      const fanfare = [
        { f: 392.0, d: 0.12, t: 0 },
        { f: 523.25, d: 0.12, t: 0.14 },
        { f: 659.25, d: 0.14, t: 0.28 },
        { f: 783.99, d: 0.35, t: 0.44 },
        { f: 1046.5, d: 0.5, t: 0.75 },
      ];
      fanfare.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.25, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d);
      });
      break;
    }

    case 'error': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.005, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    }
  }
}
