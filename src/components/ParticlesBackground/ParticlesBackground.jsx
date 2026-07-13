import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticlesBackground({ theme }) {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesLoaded = useCallback(() => {}, []);

  const options = {
    fpsLimit: 60,
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.4 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: theme === 'dark' ? '#6366f1' : '#8b5cf6' },
      links: {
        color: theme === 'dark' ? '#6366f1' : '#8b5cf6',
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: { enable: true, area: 900 },
        value: 60,
      },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 1, minimumValue: 0.1 },
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, minimumValue: 0.5 },
      },
    },
    detectRetina: true,
  };

  if (!engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}