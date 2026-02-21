import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(242, 125, 38, 0.3)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250 }}
    />
  );
}
