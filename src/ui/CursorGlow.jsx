import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      gx += (x - gx) * 0.2;
      gy += (y - gy) * 0.2;
      el.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(-100px, -100px, 0)',
        filter: 'blur(8px)',
        boxShadow: '0 0 18px 6px rgba(255,0,0,0.65), 0 0 36px 10px rgba(255,0,0,0.35)'
      }}
    />
  );
};

export default CursorGlow; 