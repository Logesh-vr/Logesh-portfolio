/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HorizontalGallery from './components/HorizontalGallery';
import CustomCursor from './components/CustomCursor';
import { useGitHub } from './hooks/useGitHub';
import { ArrowRight, Mail, Code, Palette, Zap } from 'lucide-react';

export default function App() {
  const { repos, profile, loading } = useGitHub('Logesh-vr');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-bg text-ink">
      <CustomCursor />
      <Navbar />
      
      <Hero />

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">
              Crafting <span className="italic text-accent">digital</span> experiences that matter.
            </h2>
            <div className="space-y-6 text-lg text-white/60 font-sans leading-relaxed">
              <p>
                {profile?.bio || "I am a creative developer focused on building immersive web experiences. I blend technical proficiency with design intuition to create products that are both functional and beautiful."}
              </p>
              <p>
                Specializing in React, Three.js, and modern animation libraries, I push the boundaries of what's possible in the browser.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <Mail className="text-accent" size={20} />
                <span className="text-sm font-mono uppercase tracking-widest">logeshrv2006@gmail.com</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Code />, title: "Development", desc: "Clean, scalable code using modern frameworks." },
              { icon: <Palette />, title: "Design", desc: "User-centric interfaces with a focus on aesthetics." },
              { icon: <Zap />, title: "Performance", desc: "Optimized for speed and smooth interactions." },
              { icon: <ArrowRight />, title: "Strategy", desc: "Aligning technical solutions with business goals." }
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/50 transition-colors group"
              >
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform inline-block">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-serif mb-2">{skill.title}</h4>
                <p className="text-xs text-white/40 font-sans leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <div id="works">
        {loading ? (
          <div className="h-screen flex items-center justify-center bg-bg">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">Loading Projects...</span>
            </div>
          </div>
        ) : (
          <HorizontalGallery projects={repos} />
        )}
      </div>

      {/* Footer / Contact */}
      <footer id="contact" className="relative py-32 px-6 overflow-hidden bg-white text-bg">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] font-mono text-bg/40 mb-8 block"
          >
            Have a project in mind?
          </motion.span>
          
          <h2 className="text-[12vw] font-serif italic leading-none tracking-tighter mb-12">
            Let's <span className="text-accent not-italic">Talk</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-24">
            <a
              href="mailto:logeshrv2006@gmail.com"
              className="text-3xl md:text-5xl font-serif hover:text-accent transition-colors underline underline-offset-8"
            >
              logeshrv2006@gmail.com
            </a>
            
            <div className="flex gap-8">
              {[
                { name: 'GitHub', url: 'https://github.com/Logesh-vr' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/logesh-rajaraman-665798323/' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-widest font-mono hover:text-accent transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-bg/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-bg/40">
              © 2024 Logesh VR. All Rights Reserved.
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-bg/40">
              Designed & Developed with Passion
            </span>
          </div>
        </div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
          <span className="text-[40vw] font-serif italic">CONTACT</span>
        </div>
      </footer>
    </main>
  );
}
