import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Repository } from '../hooks/useGitHub';
import { ExternalLink, Star, Code2 } from 'lucide-react';

interface HorizontalGalleryProps {
  projects: Repository[];
}

export default function HorizontalGallery({ projects }: HorizontalGalleryProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.max(0, (projects.length * 40))}%`]);

  return (
    <section ref={targetRef} className={projects.length === 0 ? "py-32 px-6 md:px-24 bg-bg text-center" : "relative h-[400vh] bg-bg"}>
      {projects.length === 0 ? (
        <>
          <h2 className="text-4xl font-serif mb-8">No projects found.</h2>
          <p className="text-white/40">Check back later for new works.</p>
        </>
      ) : (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
            <div className="flex flex-col justify-center min-w-[400px] md:min-w-[600px]">
              <h2 className="text-7xl md:text-9xl font-serif italic text-white/10 leading-none">
                Featured<br />Works
              </h2>
              <p className="mt-8 text-xl text-white/50 max-w-md font-sans">
                A collection of projects exploring the intersection of design and code.
              </p>
            </div>

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-8 flex flex-col justify-between"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <span className="text-8xl font-serif italic">0{index + 1}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-accent mb-4">
                    <Code2 size={16} />
                    <span className="text-xs uppercase tracking-widest font-mono">{project.language || 'Code'}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif mb-4 group-hover:text-accent transition-colors">
                    {project.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-white/60 line-clamp-3 max-w-sm font-sans">
                    {project.description || "No description provided for this repository."}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/40 text-sm">
                      <Star size={14} />
                      <span>{project.stargazers_count}</span>
                    </div>
                  </div>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-bg px-6 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all"
                  >
                    View Repo <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
