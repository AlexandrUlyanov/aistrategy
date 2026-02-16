import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CONFIG = {
  layout: {
    zIndex: -1
  },
  colors: {
    clear: 0x000000,
    waveA: new THREE.Color('#0a1020'),
    waveB: new THREE.Color('#101a33'),
    neonBlue: new THREE.Color('#5ea0ff'),
    neonViolet: new THREE.Color('#7d6cff')
  },
  quality: {
    waveSegmentsHigh: 180,
    waveSegmentsMedium: 120,
    waveSegmentsLow: 80,
    particlesHigh: 900,
    particlesMedium: 520,
    particlesLow: 280,
    arcsHigh: 170,
    arcsMedium: 95,
    arcsLow: 48
  },
  motion: {
    cameraParallaxX: 0.22,
    cameraParallaxY: 0.14,
    waveSpeed: 0.24,
    pointerRadius: 1.25,
    pointerForce: 0.34
  }
};

const PremiumBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return () => {};
    }

    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = reducedMotionMedia.matches;

    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    const lowPower = isMobile || cores <= 4 || memory <= 4;
    const veryLowPower = cores <= 2 || memory <= 2;

    const quality = veryLowPower ? 'low' : lowPower ? 'medium' : 'high';
    const waveSegments = quality === 'high'
      ? CONFIG.quality.waveSegmentsHigh
      : quality === 'medium'
        ? CONFIG.quality.waveSegmentsMedium
        : CONFIG.quality.waveSegmentsLow;
    const particleCount = quality === 'high'
      ? CONFIG.quality.particlesHigh
      : quality === 'medium'
        ? CONFIG.quality.particlesMedium
        : CONFIG.quality.particlesLow;
    const arcCount = quality === 'high'
      ? CONFIG.quality.arcsHigh
      : quality === 'medium'
        ? CONFIG.quality.arcsMedium
        : CONFIG.quality.arcsLow;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.15, 6.9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: quality !== 'low',
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(CONFIG.colors.clear, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x8ea2ff, 0.18));
    const keyLight = new THREE.PointLight(0x5ea0ff, 0.42, 20);
    keyLight.position.set(2.2, 1.2, 3.8);
    scene.add(keyLight);

    const waveGeometry = new THREE.PlaneGeometry(12, 8, waveSegments, waveSegments);
    const waveUniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerStrength: { value: 0 },
      uMotionScale: { value: reducedMotion ? 0.15 : 1.0 },
      uColorA: { value: CONFIG.colors.waveA },
      uColorB: { value: CONFIG.colors.waveB },
      uNeonBlue: { value: CONFIG.colors.neonBlue },
      uNeonViolet: { value: CONFIG.colors.neonViolet }
    };

    const waveMaterial = new THREE.ShaderMaterial({
      uniforms: waveUniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uPointerStrength;
        uniform float uMotionScale;

        varying vec2 vUv;
        varying float vWave;
        varying float vPointerField;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
            u.y
          );
        }

        void main() {
          vUv = uv;
          vec3 p = position;

          float t = uTime * 0.24 * uMotionScale;
          float n1 = noise(uv * 3.2 + vec2(t, -t * 0.7));
          float n2 = noise(uv * 6.1 + vec2(-t * 0.3, t * 0.5));
          float w = (n1 * 0.7 + n2 * 0.3);

          vec2 planeUv = uv * 2.0 - 1.0;
          float d = distance(planeUv, uPointer);
          float pointerField = smoothstep(1.1, 0.0, d) * uPointerStrength;
          vPointerField = pointerField;

          p.z += (w - 0.5) * 0.52 * uMotionScale;
          p.z += pointerField * 0.36;

          vWave = p.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uNeonBlue;
        uniform vec3 uNeonViolet;

        varying vec2 vUv;
        varying float vWave;
        varying float vPointerField;

        void main() {
          vec3 base = mix(uColorA, uColorB, vUv.y);
          float glowBlue = smoothstep(0.02, 0.42, vWave + 0.24);
          float glowViolet = smoothstep(0.14, 0.48, abs(vWave));
          vec3 neon = uNeonBlue * glowBlue * 0.14 + uNeonViolet * glowViolet * 0.10;
          neon += uNeonBlue * vPointerField * 0.20;

          vec3 color = base + neon;
          float alpha = 0.58 + clamp(vWave * 0.18, -0.08, 0.08);
          gl_FragColor = vec4(color, clamp(alpha, 0.36, 0.74));
        }
      `
    });

    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.position.set(0, -0.18, -1.0);
    waveMesh.rotation.x = -0.56;
    scene.add(waveMesh);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesBase = new Float32Array(particleCount * 3);
    const particlesNow = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const r = 2.2 + (Math.random() * 3.8);
      const a = Math.random() * Math.PI * 2;
      const h = (Math.random() * 2 - 1) * 1.7;
      particlesBase[i3] = Math.cos(a) * r;
      particlesBase[i3 + 1] = h;
      particlesBase[i3 + 2] = -1.8 + (Math.random() * 4.2);

      particlesNow[i3] = particlesBase[i3];
      particlesNow[i3 + 1] = particlesBase[i3 + 1];
      particlesNow[i3 + 2] = particlesBase[i3 + 2];
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesNow, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xc0d5ff,
      size: quality === 'low' ? 0.017 : 0.021,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlePoints = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlePoints);

    const arcPairs = new Uint16Array(arcCount * 2);
    for (let i = 0; i < arcCount; i += 1) {
      let a = Math.floor(Math.random() * particleCount);
      let b = Math.floor(Math.random() * particleCount);
      if (a === b) {
        b = (b + 1) % particleCount;
      }
      arcPairs[i * 2] = a;
      arcPairs[(i * 2) + 1] = b;
    }

    const arcPositions = new Float32Array(arcCount * 2 * 3);
    const arcColors = new Float32Array(arcCount * 2 * 3);
    const arcGeometry = new THREE.BufferGeometry();
    arcGeometry.setAttribute('position', new THREE.BufferAttribute(arcPositions, 3));
    arcGeometry.setAttribute('color', new THREE.BufferAttribute(arcColors, 3));

    const arcMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.46,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const arcs = new THREE.LineSegments(arcGeometry, arcMaterial);
    scene.add(arcs);

    const pointerNDC = new THREE.Vector2(0, 0);
    const pointerWorld = new THREE.Vector3(0, 0, 0);
    let pointerActive = false;

    const updatePointerWorld = () => {
      const v = new THREE.Vector3(pointerNDC.x, pointerNDC.y, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      pointerWorld.copy(camera.position).add(dir.multiplyScalar(dist));
    };

    const onPointerMove = (e) => {
      pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerActive = true;
    };

    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (!t) {
        return;
      }
      pointerNDC.x = (t.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.y = -((t.clientY / window.innerHeight) * 2 - 1);
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const onReducedMotionChange = (ev) => {
      reducedMotion = ev.matches;
      waveUniforms.uMotionScale.value = reducedMotion ? 0.15 : 1.0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', onResize);
    reducedMotionMedia.addEventListener('change', onReducedMotionChange);

    let rafId = 0;
    let prevTime = 0;
    const minDelta = quality === 'low' ? (1000 / 30) : 0;
    const clock = new THREE.Clock();

    const render = (now) => {
      rafId = window.requestAnimationFrame(render);
      if (minDelta > 0 && now - prevTime < minDelta) {
        return;
      }
      prevTime = now;

      const t = clock.getElapsedTime();
      const motionScale = reducedMotion ? 0.2 : 1.0;

      if (!pointerActive) {
        pointerNDC.x = Math.sin(t * 0.12) * 0.18;
        pointerNDC.y = Math.cos(t * 0.09) * 0.12;
      }

      updatePointerWorld();

      const targetCamX = pointerNDC.x * CONFIG.motion.cameraParallaxX * motionScale;
      const targetCamY = pointerNDC.y * CONFIG.motion.cameraParallaxY * motionScale + 0.12;
      camera.position.x += (targetCamX - camera.position.x) * 0.032;
      camera.position.y += (targetCamY - camera.position.y) * 0.032;
      camera.lookAt(0, 0, -0.6);

      waveUniforms.uTime.value = t * CONFIG.motion.waveSpeed;
      waveUniforms.uPointer.value.set(pointerNDC.x * 0.75, pointerNDC.y * 0.55);
      const targetPointerStrength = pointerActive ? 1.0 : 0.35;
      waveUniforms.uPointerStrength.value += (targetPointerStrength - waveUniforms.uPointerStrength.value) * 0.06;

      const pPos = particlesGeometry.attributes.position.array;
      const pointerRadius = CONFIG.motion.pointerRadius;
      const pointerForce = CONFIG.motion.pointerForce * (reducedMotion ? 0.25 : 1.0);

      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        const bx = particlesBase[i3];
        const by = particlesBase[i3 + 1];
        const bz = particlesBase[i3 + 2];

        let tx = bx + (Math.sin(t * 0.24 + i * 0.013) * 0.035);
        let ty = by + (Math.cos(t * 0.21 + i * 0.011) * 0.025);
        let tz = bz;

        const dx = tx - pointerWorld.x;
        const dy = ty - pointerWorld.y;
        const d = Math.sqrt((dx * dx) + (dy * dy));

        if (d < pointerRadius) {
          const f = 1.0 - (d / pointerRadius);
          const dirX = dx / (d + 0.0001);
          const dirY = dy / (d + 0.0001);
          tx += dirX * f * pointerForce;
          ty += dirY * f * pointerForce;
          tz += f * 0.06;
        }

        pPos[i3] += (tx - pPos[i3]) * 0.08;
        pPos[i3 + 1] += (ty - pPos[i3 + 1]) * 0.08;
        pPos[i3 + 2] += (tz - pPos[i3 + 2]) * 0.08;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      const aPos = arcGeometry.attributes.position.array;
      const aCol = arcGeometry.attributes.color.array;
      const maxLinkDistance = 1.85;

      for (let i = 0; i < arcCount; i += 1) {
        const a = arcPairs[i * 2] * 3;
        const b = arcPairs[(i * 2) + 1] * 3;

        const ax = pPos[a];
        const ay = pPos[a + 1];
        const az = pPos[a + 2];

        const bx = pPos[b];
        const by = pPos[b + 1];
        const bz = pPos[b + 2];

        const dx = ax - bx;
        const dy = ay - by;
        const dz = az - bz;
        const dist = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));

        const pi = i * 6;
        aPos[pi] = ax;
        aPos[pi + 1] = ay;
        aPos[pi + 2] = az;
        aPos[pi + 3] = bx;
        aPos[pi + 4] = by;
        aPos[pi + 5] = bz;

        const visible = dist < maxLinkDistance ? 1.0 - (dist / maxLinkDistance) : 0.0;
        const flicker = 0.5 + (0.5 * Math.sin(t * 2.1 + i * 0.77));
        const intensity = visible * (0.35 + (flicker * 0.65));

        const mix = (i % 2 === 0) ? 0.62 : 0.38;
        const c = CONFIG.colors.neonBlue.clone()
          .lerp(CONFIG.colors.neonViolet, mix)
          .multiplyScalar(intensity * 0.9);

        aCol[pi] = c.r;
        aCol[pi + 1] = c.g;
        aCol[pi + 2] = c.b;
        aCol[pi + 3] = c.r;
        aCol[pi + 4] = c.g;
        aCol[pi + 5] = c.b;
      }

      arcGeometry.attributes.position.needsUpdate = true;
      arcGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    render(0);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      reducedMotionMedia.removeEventListener('change', onReducedMotionChange);

      waveGeometry.dispose();
      waveMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      arcGeometry.dispose();
      arcMaterial.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: CONFIG.layout.zIndex,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
};

export default PremiumBackground;
