import React, { useEffect, useRef } from 'react';

const Snow = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let snowflakes = [];
    let animationId;

    const setupCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#FFF';
    };

    class Snowflake {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        // If initial, spread vertically; otherwise respawn above the view
        this.y = isInitial ? Math.random() * height : Math.random() * -height * 0.2;
        this.vy = 0.6 + Math.random() * 1.6; // slightly slower for perf
        this.vx = (Math.random() - 0.5) * 0.8; // gentle horizontal drift
        this.r = 0.8 + Math.random() * 1.8;
        this.o = 0.35 + Math.random() * 0.45;
      }
    }

    const generateSnowFlakes = () => {
      snowflakes = [];
      // Density-based particle count; cap for performance
      const area = Math.max(1, width * height);
      const density = 0.00025; // tweakable
      const particleMax = Math.min(400, Math.max(80, Math.floor(area * density)));
      for (let i = 0; i < particleMax; i++) {
        snowflakes.push(new Snowflake());
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;

        // wrap around horizontally a bit for continuity
        if (snowflake.x < -10) snowflake.x = width + 10;
        if (snowflake.x > width + 10) snowflake.x = -10;

        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        if (snowflake.y > height + 10) {
          snowflake.reset(false);
        }
      }

      animationId = requestAnimationFrame(update);
    };

    const onResize = () => {
      setupCanvas();
      generateSnowFlakes();
    };

    // Initialize
    setupCanvas();
    generateSnowFlakes();
    animationId = requestAnimationFrame(update);

    // Listen to resize
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Snow;
