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
    let particles = [];
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

    class UpsideDownParticle {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        // Random starting position across the entire screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Chaotic movement in all directions, not just downward
        this.vx = (Math.random() - 0.5) * 2.5; // Horizontal velocity
        this.vy = (Math.random() - 0.5) * 2.5; // Vertical velocity
        
        // Varied particle properties for unsettling effect
        this.size = 1 + Math.random() * 4; // Size variation
        this.opacity = 0.1 + Math.random() * 0.3; // Opacity variation
        this.life = 1.0;
        this.maxLife = 0.5 + Math.random() * 1.0;
        
        // Chaotic movement patterns
        this.driftSpeed = 0.5 + Math.random() * 1.5;
        this.driftAmplitude = 1 + Math.random() * 3;
        this.driftFrequency = 0.001 + Math.random() * 0.005;
        this.driftOffset = Math.random() * Math.PI * 2;
        
        // Rotation and growth for organic movement
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.growth = 0.1 + Math.random() * 0.3;
        
        // Flickering effect for unsettling atmosphere
        this.flickerIntensity = 0.1 + Math.random() * 0.3;
        this.flickerSpeed = 0.02 + Math.random() * 0.05;
        
        // Particle type for variety
        this.type = Math.random() > 0.7 ? 'dust' : 'smoke';
      }

      update() {
        time += 0.01;
        
        // Update position with chaotic movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Add complex drifting patterns
        this.x += Math.sin(time * this.driftFrequency + this.driftOffset) * this.driftAmplitude * 0.2;
        this.y += Math.cos(time * this.driftFrequency * 0.7 + this.driftOffset) * this.driftAmplitude * 0.15;
        
        // Add subtle wave motion
        this.x += Math.sin(time * 0.003 + this.driftOffset) * 0.8;
        this.y += Math.cos(time * 0.004 + this.driftOffset) * 0.6;
        
        // Update rotation and growth
        this.rotation += this.rotationSpeed;
        this.size += this.growth * 0.01;
        
        // Life cycle with random flickering
        this.life -= 0.002;
        if (this.flickerIntensity > 0) {
          this.life += Math.sin(time * this.flickerSpeed + this.driftOffset) * this.flickerIntensity * 0.1;
        }
        
        // Wrap around screen edges with smooth transition
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;

        // Reset when life is over
        if (this.life <= 0.05) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        
        // Apply life-based opacity with flickering
        const finalOpacity = this.opacity * this.life;
        ctx.globalAlpha = finalOpacity;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        if (this.type === 'dust') {
          // Draw dust particles as small, sharp dots
          ctx.fillStyle = `rgba(200, 200, 200, ${finalOpacity})`;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2, false);
          ctx.fill();
          
          // Add subtle glow
          ctx.shadowColor = 'rgba(150, 150, 150, 0.5)';
          ctx.shadowBlur = this.size * 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          // Draw smoke particles with organic shapes
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          gradient.addColorStop(0, `rgba(180, 180, 180, ${finalOpacity * 0.9})`);
          gradient.addColorStop(0.3, `rgba(160, 160, 160, ${finalOpacity * 0.7})`);
          gradient.addColorStop(0.6, `rgba(140, 140, 140, ${finalOpacity * 0.4})`);
          gradient.addColorStop(1, `rgba(120, 120, 120, ${finalOpacity * 0.1})`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
          ctx.fill();
          
          // Add smoke wisps for organic appearance
          if (this.size > 2) {
            const wispCount = Math.floor(this.size / 1.5);
            for (let i = 0; i < wispCount; i++) {
              const angle = (i / wispCount) * Math.PI * 2;
              const wispX = Math.cos(angle) * this.size * 0.7;
              const wispY = Math.sin(angle) * this.size * 0.7;
              const wispSize = this.size * (0.2 + Math.random() * 0.3);
              
              ctx.globalAlpha = finalOpacity * 0.3;
              ctx.beginPath();
              ctx.arc(wispX, wispY, wispSize, 0, Math.PI * 2, false);
              ctx.fill();
            }
          }
          
          // Add eerie glow effect
          if (this.size > 2.5) {
            ctx.globalAlpha = finalOpacity * 0.08;
            ctx.shadowColor = 'rgba(100, 100, 150, 0.4)';
            ctx.shadowBlur = this.size * 0.8;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.4, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        
        ctx.restore();
      }
    }

    const generateParticles = () => {
      particles = [];
      // Optimized particle count for smooth performance
      const area = Math.max(1, width * height);
      const density = 0.00008; // Balanced density for chaotic effect
      const particleMax = Math.min(350, Math.max(80, Math.floor(area * density)));
      
      for (let i = 0; i < particleMax; i++) {
        particles.push(new UpsideDownParticle());
      }
    };

    const drawEerieBackground = () => {
      // Create subtle eerie glow effect
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 2);
      gradient.addColorStop(0, 'rgba(20, 20, 30, 0.1)');
      gradient.addColorStop(0.5, 'rgba(10, 10, 20, 0.05)');
      gradient.addColorStop(1, 'rgba(5, 5, 10, 0.02)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle atmospheric lines for depth
      for (let i = 0; i < 3; i++) {
        const y = (height / 4) * (i + 1);
        const alpha = 0.02 - (i * 0.005);
        
        ctx.strokeStyle = `rgba(50, 50, 80, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const update = () => {
      // Clear with very subtle fade for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw eerie background
      drawEerieBackground();
      
      // Update and draw all particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update();
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(update);
    };

    const onResize = () => {
      setupCanvas();
      generateParticles();
    };

    // Initialize
    setupCanvas();
    generateParticles();
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
        style={{ 
          position: 'absolute', 
          left: 0, 
          top: 0, 
          width: '100%', 
          height: '100%',
          background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%, #000000 100%)'
        }}
      />
    </div>
  );
};

export default Smoke;
