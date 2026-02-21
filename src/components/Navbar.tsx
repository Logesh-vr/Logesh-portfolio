import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference"
    >
      <div className="flex flex-col">
        <span className="text-xl font-serif italic leading-none">Logesh</span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/50">Developer & Designer</span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        {['Works', 'About', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm uppercase tracking-widest font-mono hover:text-accent transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <a href="https://github.com/Logesh-vr" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/logesh-rajaraman-665798323/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <Linkedin size={20} />
        </a>
      </div>
    </motion.nav>
  );
}
