import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CinematicBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 900;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x05070f, 8, 24);

    const camera = new THREE.PerspectiveCamera(58, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.3, 9.5);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.PointLight(0xf8d78d, 1.2, 20);
    keyLight.position.set(2.8, 2.8, 3.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x65b0ff, 1.1, 26);
    fillLight.position.set(-3.5, -1.8, 5.8);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    const starsCount = isMobile ? 900 : 1800;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i += 1) {
      const radius = THREE.MathUtils.randFloat(4.5, 11);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[(i * 3) + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[(i * 3) + 2] = radius * Math.cos(phi);
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xcad7ff,
      size: isMobile ? 0.03 : 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const mouseTarget = { x: 0, y: 0 };
    const pointerHandler = (event) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.x = nx;
      mouseTarget.y = ny;
    };

    window.addEventListener('pointermove', pointerHandler, { passive: true });

    const resizeHandler = () => {
      if (!mount) {
        return;
      }
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    };

    window.addEventListener('resize', resizeHandler);

    let rafId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        stars.rotation.y = elapsed * 0.025;
        stars.rotation.x = Math.sin(elapsed * 0.2) * 0.06;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseTarget.x * 0.65, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, (mouseTarget.y * 0.45) + 0.2, 0.04);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('pointermove', pointerHandler);

      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-three-canvas" ref={mountRef} aria-hidden="true" />;
};

export default CinematicBackground;
