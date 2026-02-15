import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ServicesCinematicBackdrop = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 900;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x090d1b, 9, 22);

    const camera = new THREE.PerspectiveCamera(56, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.25, 9.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x8495ff, 0.28);
    scene.add(ambient);

    const warmLight = new THREE.PointLight(0xd4af37, 1.45, 24);
    warmLight.position.set(2.8, 2.2, 4.4);
    scene.add(warmLight);

    const coolLight = new THREE.PointLight(0x4f7dff, 1.25, 22);
    coolLight.position.set(-3.8, -1.4, 5.2);
    scene.add(coolLight);

    const starsCount = isMobile ? 540 : 1050;
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i += 1) {
      const radius = THREE.MathUtils.randFloat(4.6, 10.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[(i * 3) + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      starPositions[(i * 3) + 2] = radius * Math.cos(phi);
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xa8beff,
      size: isMobile ? 0.022 : 0.03,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const ringMain = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.05, 20, 180),
      new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        emissive: 0xb9932f,
        emissiveIntensity: 0.38,
        metalness: 0.65,
        roughness: 0.24,
        transparent: true,
        opacity: 0.34
      })
    );
    ringMain.rotation.x = 1.1;
    ringMain.rotation.y = -0.35;
    scene.add(ringMain);

    const ringSecondary = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.03, 16, 140),
      new THREE.MeshStandardMaterial({
        color: 0x88a6ff,
        emissive: 0x5b80ff,
        emissiveIntensity: 0.28,
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.3
      })
    );
    ringSecondary.position.set(-1.5, -0.4, -0.3);
    ringSecondary.rotation.x = 0.82;
    ringSecondary.rotation.z = -0.36;
    scene.add(ringSecondary);

    const pointer = { x: 0, y: 0 };
    const onPointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!mount) {
        return;
      }
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 2));
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const renderFrame = () => {
      const t = clock.getElapsedTime();

      if (!reducedMotion) {
        stars.rotation.y = t * 0.03;
        stars.rotation.x = Math.sin(t * 0.17) * 0.08;

        ringMain.rotation.z += 0.0012;
        ringMain.rotation.y = -0.35 + Math.sin(t * 0.32) * 0.08;

        ringSecondary.rotation.y += 0.0018;
        ringSecondary.position.y = -0.4 + Math.sin(t * 0.58) * 0.17;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.25 + pointer.y * 0.18, 0.04);
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);

      starsGeometry.dispose();
      starsMaterial.dispose();
      ringMain.geometry.dispose();
      ringMain.material.dispose();
      ringSecondary.geometry.dispose();
      ringSecondary.material.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="services-three-canvas" ref={mountRef} aria-hidden="true" />;
};

export default ServicesCinematicBackdrop;
