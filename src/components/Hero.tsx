import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Scene3D from './Scene3D';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      
      <motion.div style={{ y, scale, opacity }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.5em] font-mono text-white/40">
            Available Worldwide
          </span>
        </motion.div>

        <h1 className="text-[15vw] md:text-[12vw] font-serif italic leading-[0.8] tracking-tighter uppercase">
          Logesh
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent" />
          <span className="text-[10px] uppercase tracking-widest font-mono text-white/40 animate-pulse">
            Scroll to Explore
          </span>
        </motion.div>
      </motion.div>

      {/* Background Text Parallax */}
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
        className="absolute bottom-10 left-0 whitespace-nowrap opacity-5 select-none pointer-events-none"
      >
        <span className="text-[20vh] font-serif italic uppercase">
          Creative Developer • UI Designer • Open Source • 
        </span>
      </motion.div>
    </section>
  );
}
