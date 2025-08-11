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
        // Generate random shape points for irregular snowflake
        this.points = [];
        const numPoints = 5 + Math.floor(Math.random() * 3); // 5-7 points
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2;
          const radius = 0.5 + Math.random() * 0.8; // irregular radius
          this.points.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        this.y = Math.random() * height; // spawn anywhere in the viewport
        this.vy = (Math.random() - 0.5) * 1.2; // random vertical movement (up or down)
        this.vx = (Math.random() - 0.5) * 1.4; // random horizontal movement
        this.r = 0.8 + Math.random() * 1.8;
        this.o = 0.35 + Math.random() * 0.45;
        // Add floating properties
        this.baseVy = this.vy;
        this.baseVx = this.vx;
        this.time = Math.random() * Math.PI * 2; // for sine wave motion
      }
    }

    const generateSnowFlakes = () => {
      snowflakes = [];
      // Reduced density for less snow
      const area = Math.max(1, width * height);
      const density = 0.00015; // reduced from 0.00025
      const particleMax = Math.min(250, Math.max(40, Math.floor(area * density))); // reduced max from 400 to 250
      for (let i = 0; i < particleMax; i++) {
        snowflakes.push(new Snowflake());
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < snowflakes.length; i++) {
        const snowflake = snowflakes[i];
        
        // Add floating motion with sine waves
        snowflake.time += 0.02;
        snowflake.y += snowflake.baseVy + Math.sin(snowflake.time) * 0.3;
        snowflake.x += snowflake.baseVx + Math.cos(snowflake.time * 0.8) * 0.2;

        // Wrap around all edges for continuous floating
        if (snowflake.x < -10) snowflake.x = width + 10;
        if (snowflake.x > width + 10) snowflake.x = -10;
        if (snowflake.y < -10) snowflake.y = height + 10;
        if (snowflake.y > height + 10) snowflake.y = -10;

        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        
        // Draw irregular snowflake shape
        if (snowflake.points.length > 0) {
          ctx.moveTo(
            snowflake.x + snowflake.points[0].x * snowflake.r,
            snowflake.y + snowflake.points[0].y * snowflake.r
          );
          
          for (let j = 1; j < snowflake.points.length; j++) {
            ctx.lineTo(
              snowflake.x + snowflake.points[j].x * snowflake.r,
              snowflake.y + snowflake.points[j].y * snowflake.r
            );
          }
        }
        
        ctx.closePath();
        ctx.fill();
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
