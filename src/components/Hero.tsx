import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--neon-pink)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider">AVAILABLE FOR HIRE</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                        Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)]">Digital Future</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
                        I'm Valmi, a Full Stack Developer crafting high-performance interactive experiences with modern web technologies.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-[var(--neon-cyan)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                        >
                            View My Work
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-4 rounded-full border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] backdrop-blur-md text-white font-semibold transition-all duration-300"
                        >
                            Contact Me
                        </a>
                    </div>

                    {/* Tech Stack Hints */}
                    <div className="mt-20 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Simple Icons or Text for Stack */}
                        <div className="flex items-center gap-2"><Code size={20} /> <span>React</span></div>
                        <div className="flex items-center gap-2"><Terminal size={20} /> <span>TypeScript</span></div>
                        <div className="flex items-center gap-2"><Cpu size={20} /> <span>Node.js</span></div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
