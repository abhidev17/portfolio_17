import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorDot.current) {
        cursorDot.current.style.transform =
          `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      const ring = cursorRing.current;
      if (ring) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ring.style.transform =
          `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp   = () => setIsClicking(false);

    const addHover = (e) => {
      const el = e.target.closest('a, button, [data-cursor="pointer"], input, textarea, select, label, [role="button"]');
      if (el) setIsHovering(true);
    };
    const removeHover = () => setIsHovering(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', addHover);
    document.addEventListener('mouseout', removeHover);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', addHover);
      document.removeEventListener('mouseout', removeHover);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div
        ref={cursorDot}
        className={`${styles.dot} ${isHovering ? styles.hovering : ''} ${isClicking ? styles.clicking : ''}`}
      />
      <div
        ref={cursorRing}
        className={`${styles.ring} ${isHovering ? styles.ringHovering : ''} ${isClicking ? styles.ringClicking : ''}`}
      />
    </>
  );
}