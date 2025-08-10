import React, { useEffect, useRef } from 'react';

const Spores= () => {
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
    let sporeParticles = [];
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

    class SporeParticle {
      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        // Random starting position across the entire screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Gentle, natural drifting movement like spores in air
        this.vx = (Math.random() - 0.5) * 0.8; // Slow horizontal drift
        this.vy = (Math.random() - 0.5) * 0.6; // Slow vertical drift
        
        // Spore-like properties
        this.size = 0.8 + Math.random() * 2.2; // Small, varied sizes like spores
        this.opacity = 0.15 + Math.random() * 0.25; // Subtle visibility
        this.life = 1.0;
        this.maxLife = 1.0 + Math.random() * 0.5;
        
        // Natural movement variations
        this.driftSpeed = 0.3 + Math.random() * 0.7;
        this.driftAmplitude = 0.5 + Math.random() * 1.5;
        this.driftFrequency = 0.002 + Math.random() * 0.004;
        this.driftOffset = Math.random() * Math.PI * 2;
        
        // Subtle rotation for organic feel
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        
        // Direction change timing
        this.changeDirectionTimer = 0;
        this.changeDirectionInterval = 200 + Math.random() * 300; // Change direction every 200-500 frames
      }

      update() {
        time += 0.01;
        
        // Base movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Add subtle natural drifting like spores floating in air
        this.x += Math.sin(time * this.driftFrequency + this.driftOffset) * this.driftAmplitude * 0.08;
        this.y += Math.cos(time * this.driftFrequency * 0.7 + this.driftOffset) * this.driftAmplitude * 0.06;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Life cycle
        this.life -= 0.0008; // Very slow decay for long-lasting spores
        
        // Randomly change direction for natural movement
        this.changeDirectionTimer++;
        if (this.changeDirectionTimer > this.changeDirectionInterval) {
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.changeDirectionTimer = 0;
          this.changeDirectionInterval = 200 + Math.random() * 300;
        }
        
        // Wrap around screen edges
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        // Reset when life is over
        if (this.life <= 0.05) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        
        // Apply life-based opacity
        const finalOpacity = this.opacity * this.life;
        ctx.globalAlpha = finalOpacity;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw spore-like particles - small, simple, and clean
        ctx.fillStyle = `rgba(220, 220, 220, ${finalOpacity})`; // Light gray-white like spores
        
        // Main spore body
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
        ctx.fill();
        
        // Add subtle inner detail for spore appearance
        if (this.size > 1.5) {
          ctx.globalAlpha = finalOpacity * 0.6;
          ctx.fillStyle = `rgba(240, 240, 240, ${finalOpacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2, false);
          ctx.fill();
        }
        
        // Very subtle glow for depth
        if (this.size > 2) {
          ctx.globalAlpha = finalOpacity * 0.05;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.shadowBlur = this.size * 0.3;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 1.1, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();
      }
    }

    const generateSporeParticles = () => {
      sporeParticles = [];
      // Optimized particle count for smooth performance
      const area = Math.max(1, width * height);
      const density = 0.00015; // Higher density for spore-like effect
      const particleMax = Math.min(400, Math.max(80, Math.floor(area * density)));
      
      for (let i = 0; i < particleMax; i++) {
        sporeParticles.push(new SporeParticle());
      }
    };

    const update = () => {
      // Clear completely each frame
      ctx.clearRect(0, 0, width, height);

      // Update and draw all spore particles
      for (let i = 0; i < sporeParticles.length; i++) {
        const particle = sporeParticles[i];
        particle.update();
        particle.draw(ctx);
      }

      animationId = requestAnimationFrame(update);
    };

    const onResize = () => {
      setupCanvas();
      generateSporeParticles();
    };

    // Initialize
    setupCanvas();
    generateSporeParticles();
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
          background: 'linear-gradient(to bottom, #000000, #0a0a0a, #000000)'
        }}
      />
    </div>
  );
};

export default Spores;
