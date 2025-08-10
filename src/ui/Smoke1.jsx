import React, { useEffect, useRef } from 'react';

const Smoke = () => {
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
    let smokeParticles = [];
    let animationId;
    let time = 0;

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
    };

    class SmokeParticle {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        this.x = Math.random() * width;
        // If initial, spread vertically; otherwise respawn above the view
        this.y = isInitial ? Math.random() * height : Math.random() * -height * 0.3;
        this.vy = 0.2 + Math.random() * 0.6; // Slow descent like snow but slower
        this.vx = (Math.random() - 0.5) * 1.0; // Horizontal drift
        this.r = 1.5 + Math.random() * 3.5; // Varied sizes
        this.o = 0.06 + Math.random() * 0.2; // Subtle opacity
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.life = 1.0;
        this.maxLife = 0.8 + Math.random() * 0.4;
        this.growth = 0.2 + Math.random() * 0.6;
        this.driftOffset = Math.random() * Math.PI * 2;
        this.driftAmplitude = 0.8 + Math.random() * 1.2;
        this.driftFrequency = 0.002 + Math.random() * 0.003;
        this.fadeInOut = Math.random() > 0.7;
        this.fadeSpeed = 0.003 + Math.random() * 0.005;
      }

      update() {
        time += 0.01;
        
        // Update position with wavey drifting motion
        this.y += this.vy;
        this.x += this.vx;
        
        // Add atmospheric drifting with sine wave motion
        this.x += Math.sin(time * this.driftFrequency + this.driftOffset) * this.driftAmplitude * 0.1;
        
        // Add subtle vertical wave motion
        this.y += Math.sin(time * 0.005 + this.driftOffset) * 0.15;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Gradual growth
        this.r += this.growth * 0.006;
        
        // Life cycle management
        if (this.fadeInOut) {
          // Fade in and out randomly
          this.life = Math.sin(time * this.fadeSpeed + this.driftOffset) * 0.5 + 0.5;
        } else {
          // Gradual fade out
          this.life -= 0.002;
        }
        
        // Wrap around horizontally with smooth transition
        if (this.x < -25) this.x = width + 25;
        if (this.x > width + 25) this.x = -25;

        // Reset when life is over or out of bounds
        if (this.life <= 0.1 || this.y > height + 25) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        
        // Apply life-based opacity
        const finalOpacity = this.o * this.life;
        ctx.globalAlpha = finalOpacity;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Create main smoke particle with soft edges
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
        gradient.addColorStop(0, 'rgba(180, 180, 180, 0.9)'); // Soft white center
        gradient.addColorStop(0.2, 'rgba(160, 160, 160, 0.7)');
        gradient.addColorStop(0.5, 'rgba(140, 140, 140, 0.4)');
        gradient.addColorStop(0.8, 'rgba(120, 120, 120, 0.2)');
        gradient.addColorStop(1, 'rgba(100, 100, 100, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        
        // Add smoke wisps for more realistic effect
        if (this.r > 2.5) {
          const wispCount = Math.floor(this.r / 1.5);
          for (let i = 0; i < wispCount; i++) {
            const angle = (i / wispCount) * Math.PI * 2;
            const wispX = Math.cos(angle) * this.r * 0.6;
            const wispY = Math.sin(angle) * this.r * 0.6;
            const wispSize = this.r * (0.15 + Math.random() * 0.25);
            
            ctx.globalAlpha = finalOpacity * 0.4;
            ctx.beginPath();
            ctx.arc(wispX, wispY, wispSize, 0, Math.PI * 2, false);
            ctx.fill();
          }
        }
        
        // Add subtle glow effect
        if (this.r > 3) {
          ctx.globalAlpha = finalOpacity * 0.1;
          ctx.shadowColor = 'rgba(200, 200, 200, 0.3)';
          ctx.shadowBlur = this.r * 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, this.r * 1.2, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();
      }
    }

    const generateSmokeParticles = () => {
      smokeParticles = [];
      // Optimized particle count for smooth performance
      const area = Math.max(1, width * height);
      const density = 0.00012; // Balanced density for good effect
      const particleMax = Math.min(280, Math.max(50, Math.floor(area * density)));
      for (let i = 0; i < particleMax; i++) {
        smokeParticles.push(new SmokeParticle());
      }
    };

    const update = () => {
      // Clear with subtle fade for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw all particles
      for (let i = 0; i < smokeParticles.length; i++) {
        const particle = smokeParticles[i];
        particle.update();
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(update);
    };

    const onResize = () => {
      setupCanvas();
      generateSmokeParticles();
    };

    // Initialize
    setupCanvas();
    generateSmokeParticles();
    animationId = requestAnimationFrame(update);

    // Listen to resize
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animationId) cancelAnimationFrame(update);
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
          height: '100%',
          background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)'
        }}
      />
    </div>
  );
};

export default Smoke;
