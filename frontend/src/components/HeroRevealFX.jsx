import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroRevealFX = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return () => {};
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const particleCount = reducedMotion ? 70 : (isMobile ? 110 : 180);
    const positions = new Float32Array(particleCount * 3);
    const baseX = new Float32Array(particleCount);
    const speed = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const x = (Math.random() * 2 - 1) * 1.25;
      const y = -0.75 + (Math.random() * 0.6);
      const z = -0.2 + (Math.random() * 0.4);
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      baseX[i] = x;
      speed[i] = 0.15 + (Math.random() * 0.45);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf0cf74,
      size: reducedMotion ? 0.018 : 0.024,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.position.set(0, -0.1, 0.3);
    scene.add(particles);

    const ringGeometry = new THREE.RingGeometry(0.34, 0.37, 96);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6f9bff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, 0.05, 0);
    scene.add(ring);

    const flashGeometry = new THREE.PlaneGeometry(2.8, 1.4);
    const flashMaterial = new THREE.MeshBasicMaterial({
      color: 0xd9b56f,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const flash = new THREE.Mesh(flashGeometry, flashMaterial);
    flash.position.set(0, 0.02, -0.15);
    scene.add(flash);

    const resize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const duration = reducedMotion ? 1500 : 2200;
    const startTime = performance.now();
    let rafId = 0;
    let previous = startTime;

    const animate = (now) => {
      rafId = window.requestAnimationFrame(animate);
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;

      const fadeIn = Math.min(t * 3, 1);
      const fadeOut = 1 - Math.max((t - 0.72) / 0.28, 0);
      const blend = fadeIn * fadeOut;

      particlesMaterial.opacity = blend * 0.72;
      ringMaterial.opacity = blend * 0.42;
      flashMaterial.opacity = blend * 0.18;

      ring.scale.setScalar(0.6 + (t * 2.4));
      ring.rotation.z += dt * 0.2;

      const pos = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        pos[i3 + 1] += speed[i] * dt * (reducedMotion ? 0.55 : 1.0);
        pos[i3] = baseX[i] + Math.sin((elapsed * 0.0016) + i) * 0.015;

        if (pos[i3 + 1] > 1.15) {
          pos[i3 + 1] = -0.85;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (t >= 1) {
        window.cancelAnimationFrame(rafId);
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      flashGeometry.dispose();
      flashMaterial.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-reveal-fx" ref={mountRef} aria-hidden="true" />;
};

export default HeroRevealFX;
