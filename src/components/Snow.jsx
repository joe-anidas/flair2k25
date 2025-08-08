import React, { useEffect, useRef } from 'react';

const Snow = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = container.clientWidth;
    let height = container.clientHeight;
    let active = false;
    let snowflakes = [];
    let animationId;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    // Snowflake class
    class Snowflake {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
        this.r = 0;
        this.o = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = 1 + Math.random() * 3;
        this.vx = 0.5 - Math.random();
        this.r = 1 + Math.random() * 2;
        this.o = 0.5 + Math.random() * 0.5;
      }
    }

    // Generate snowflakes
    const generateSnowFlakes = () => {
      snowflakes = [];
      const particleMax = 1000;
      for (let i = 0; i < particleMax; i++) {
        const snowflake = new Snowflake();
        snowflake.reset();
        snowflakes.push(snowflake);
      }
    };

    generateSnowFlakes();

    // Animation function
    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (!active) {
        return;
      }

      const particleCount = 300;
      for (let i = 0; i < particleCount; i++) {
        const snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;

        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();

        if (snowflake.y > height) {
          snowflake.reset();
        }
      }

      animationId = requestAnimationFrame(update);
    };

    // Handle resize
    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = '#FFF';

      const wasActive = active;
      active = width > 600;

      if (!wasActive && active) {
        animationId = requestAnimationFrame(update);
      }
    };

    // Initialize
    onResize();

    // Add resize listener
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default Snow;
