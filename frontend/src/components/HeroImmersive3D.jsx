import { useEffect, useRef } from 'react';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const HeroImmersive3D = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return () => {};

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return () => {};

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;

    const pointer = { x: 0.5, y: 0.5 };
    const pointerTarget = { x: 0.5, y: 0.5 };
    let scrollMix = 0;

    const onResize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerTarget.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointerTarget.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    };

    const onPointerLeave = () => {
      pointerTarget.x = 0.5;
      pointerTarget.y = 0.5;
    };

    const onScroll = () => {
      const h = window.innerHeight || 1;
      scrollMix = clamp(window.scrollY / (h * 1.2), 0, 1);
    };

    onResize();
    onScroll();

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    canvas.addEventListener('pointermove', onPointer, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const draw = (timeMs) => {
      raf = requestAnimationFrame(draw);

      const t = timeMs * 0.001;
      const ease = reduced ? 0.06 : 0.12;
      pointer.x += (pointerTarget.x - pointer.x) * ease;
      pointer.y += (pointerTarget.y - pointer.y) * ease;

      const px = (pointer.x - 0.5) * 2;
      const py = (pointer.y - 0.5) * 2;

      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#070d1d');
      grad.addColorStop(0.45, scrollMix > 0.55 ? '#101a33' : '#0b142a');
      grad.addColorStop(1, '#050913');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const glowA = ctx.createRadialGradient(
        width * (0.3 + px * 0.035),
        height * (0.28 + py * 0.03),
        0,
        width * (0.3 + px * 0.035),
        height * (0.28 + py * 0.03),
        Math.max(width, height) * 0.68
      );
      glowA.addColorStop(0, 'rgba(139, 172, 255, 0.24)');
      glowA.addColorStop(1, 'rgba(139, 172, 255, 0)');
      ctx.fillStyle = glowA;
      ctx.fillRect(0, 0, width, height);

      const glowB = ctx.createRadialGradient(
        width * (0.78 + px * 0.045),
        height * (0.7 + py * 0.05),
        0,
        width * (0.78 + px * 0.045),
        height * (0.7 + py * 0.05),
        Math.max(width, height) * 0.58
      );
      glowB.addColorStop(0, 'rgba(226, 194, 126, 0.17)');
      glowB.addColorStop(1, 'rgba(226, 194, 126, 0)');
      ctx.fillStyle = glowB;
      ctx.fillRect(0, 0, width, height);

      const baseAmp = reduced ? 12 : 24;
      const waveBoost = reduced ? 4 : 14;
      const amp = baseAmp + waveBoost * (Math.abs(px) + Math.abs(py)) * 0.5;

      const layers = [
        { y: 0.56, speed: 0.52, freq: 0.0095, color: 'rgba(138, 168, 246, 0.19)', width: 1.4 },
        { y: 0.65, speed: 0.74, freq: 0.0082, color: 'rgba(255, 227, 168, 0.14)', width: 1.15 },
        { y: 0.74, speed: 0.96, freq: 0.0074, color: 'rgba(120, 158, 255, 0.16)', width: 1.1 }
      ];

      layers.forEach((layer, idx) => {
        ctx.beginPath();
        const baseY = height * layer.y + py * (10 + idx * 2);
        for (let x = -30; x <= width + 30; x += 4) {
          const y =
            baseY +
            Math.sin(x * layer.freq + t * layer.speed + idx * 0.9) * amp +
            Math.cos(x * (layer.freq * 0.42) - t * layer.speed * 0.8) * (amp * 0.36);
          if (x === -30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width + 30, height + 40);
        ctx.lineTo(-30, height + 40);
        ctx.closePath();

        const fill = ctx.createLinearGradient(0, baseY - 120, 0, height + 40);
        fill.addColorStop(0, layer.color);
        fill.addColorStop(1, 'rgba(8, 13, 25, 0)');
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.beginPath();
        for (let x = -30; x <= width + 30; x += 6) {
          const y =
            baseY +
            Math.sin(x * layer.freq + t * layer.speed + idx * 0.9) * amp +
            Math.cos(x * (layer.freq * 0.42) - t * layer.speed * 0.8) * (amp * 0.36);
          if (x === -30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = layer.color.replace('0.', '0.');
        ctx.lineWidth = layer.width;
        ctx.stroke();
      });

      const grain = 0.02;
      ctx.fillStyle = `rgba(255,255,255,${grain})`;
      for (let i = 0; i < 26; i += 1) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillRect(x, y, 1, 1);
      }
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      canvas.removeEventListener('pointermove', onPointer);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-wave-visual" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="hero-wave-canvas" />
    </div>
  );
};

export default HeroImmersive3D;
