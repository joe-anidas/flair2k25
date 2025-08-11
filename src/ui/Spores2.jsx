import React, { useEffect, useRef } from 'react';

const Spores = () => {
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
        
        // Random movement in all directions (not just downward)
        this.vx = (Math.random() - 0.5) * 0.6; // Horizontal drift
        this.vy = (Math.random() - 0.5) * 0.6; // Vertical drift
        
        // Spore properties
        this.size = 1.0 + Math.random() * 4.0; // Varied sizes
        this.brightness = 0.3 + Math.random() * 0.7; // Varying brightness
        this.opacity = 0.15 + Math.random() * 0.35; // Semi-transparent
        this.life = 1.0;
        this.maxLife = 1.0 + Math.random() * 0.5;
        
        // Movement variations
        this.driftAmplitude = 0.8 + Math.random() * 2.0;
        this.driftFrequency = 0.001 + Math.random() * 0.003;
        this.driftOffset = Math.random() * Math.PI * 2;
        
        // Rotation and twinkling
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.015;
        this.twinkleSpeed = 0.02 + Math.random() * 0.03;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        
        // Direction change timing
        this.changeDirectionTimer = 0;
        this.changeDirectionInterval = 300 + Math.random() * 400; // Change direction every 300-700 frames
      }

      update() {
        time += 0.01;
        
        // Base movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Add subtle drifting for organic movement
        this.x += Math.sin(time * this.driftFrequency + this.driftOffset) * this.driftAmplitude * 0.05;
        this.y += Math.cos(time * this.driftFrequency * 0.8 + this.driftOffset) * this.driftAmplitude * 0.04;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Life cycle
        this.life -= 0.0005; // Very slow decay for long-lasting spores
        
        // Randomly change direction for varied movement
        this.changeDirectionTimer++;
        if (this.changeDirectionTimer > this.changeDirectionInterval) {
          this.vx = (Math.random() - 0.5) * 0.6;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.changeDirectionTimer = 0;
          this.changeDirectionInterval = 300 + Math.random() * 400;
        }
        
        // Wrap around screen edges
        if (this.x < -30) this.x = width + 30;
        if (this.x > width + 30) this.x = -30;
        if (this.y < -30) this.y = height + 30;
        if (this.y > height + 30) this.y = -30;

        // Reset when life is over
        if (this.life <= 0.05) {
          this.reset(false);
        }
      }

      draw(ctx) {
        ctx.save();
        
        // Apply life-based opacity and twinkling
        const twinkle = Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.1 + 0.9;
        const finalOpacity = this.opacity * this.life * twinkle;
        ctx.globalAlpha = finalOpacity;
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Create spore with eerie glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        
        // Vary colors slightly for different spore types
        const colorVariation = Math.sin(this.driftOffset) * 0.1;
        const baseColor = 200 + colorVariation * 50;
        
        gradient.addColorStop(0, `rgba(${baseColor}, ${baseColor}, ${baseColor + 20}, 0.9)`); // Bright center
        gradient.addColorStop(0.3, `rgba(${baseColor - 20}, ${baseColor - 20}, ${baseColor}, 0.7)`);
        gradient.addColorStop(0.6, `rgba(${baseColor - 40}, ${baseColor - 40}, ${baseColor - 20}, 0.4)`);
        gradient.addColorStop(0.8, `rgba(${baseColor - 60}, ${baseColor - 60}, ${baseColor - 40}, 0.2)`);
        gradient.addColorStop(1, `rgba(${baseColor - 80}, ${baseColor - 80}, ${baseColor - 60}, 0.05)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2, false);
        ctx.fill();
        
        // Add inner detail for spore appearance
        if (this.size > 2) {
          ctx.globalAlpha = finalOpacity * 0.8;
          ctx.fillStyle = `rgba(${baseColor + 20}, ${baseColor + 20}, ${baseColor + 40}, ${finalOpacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2, false);
          ctx.fill();
        }
        
        // Add eerie glow effect
        if (this.size > 1.5) {
          ctx.globalAlpha = finalOpacity * 0.15;
          ctx.shadowColor = `rgba(${baseColor}, ${baseColor}, ${baseColor + 30}, 0.6)`;
          ctx.shadowBlur = this.size * 0.8;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 1.3, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        ctx.restore();
      }
    }

    const drawEerieBackground = () => {
      // Pure black base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Subtle eerie glow in corners
      const cornerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height) * 0.8);
      cornerGradient.addColorStop(0, 'rgba(20, 10, 30, 0.3)');
      cornerGradient.addColorStop(0.5, 'rgba(10, 5, 15, 0.1)');
      cornerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = cornerGradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle nebula-like texture
      for (let i = 0; i < 3; i++) {
        const nebulaGradient = ctx.createRadialGradient(
          Math.random() * width, 
          Math.random() * height, 
          0, 
          Math.random() * width, 
          Math.random() * height, 
          Math.random() * 200 + 100
        );
        nebulaGradient.addColorStop(0, 'rgba(30, 20, 40, 0.08)');
        nebulaGradient.addColorStop(0.7, 'rgba(15, 10, 20, 0.04)');
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const generateSporeParticles = () => {
      sporeParticles = [];
      // High density for hundreds of spores
      const area = Math.max(1, width * height);
      const density = 0.00025; // Higher density for hundreds of spores
      const particleMax = Math.min(600, Math.max(150, Math.floor(area * density)));
      
      for (let i = 0; i < particleMax; i++) {
        sporeParticles.push(new SporeParticle());
      }
    };

    const update = () => {
      // Draw eerie background
      drawEerieBackground();

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
          height: '100%'
        }}
      />
    </div>
  );
};

export default Spores;
