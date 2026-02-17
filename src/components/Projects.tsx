import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const projects = [
    {
        title: 'Project Alpha',
        description: 'A futuristic dashboard for monitoring system metrics in real-time, built with Next.js and WebSockets.',
        tags: ['Next.js', 'Socket.io', 'Tailwind'],
        github: '#',
        live: '#',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Neon Commerce',
        description: 'High-performance e-commerce platform featuring glassmorphism UI and seamless payment integration.',
        tags: ['React', 'Stripe', 'Framer Motion'],
        github: '#',
        live: '#',
        color: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Cyber Chat',
        description: 'End-to-end encrypted messaging application with a cyberpunk aesthetic and file sharing capabilities.',
        tags: ['TypeScript', 'Firebase', 'Encryption'],
        github: '#',
        live: '#',
        color: 'from-green-400 to-emerald-600'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-mono font-bold mb-16 text-center">
                    Featured <span className="text-[var(--neon-cyan)]">Works</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl -z-10 blur-xl ${project.color}" />

                            <div className="h-full glass-panel p-8 rounded-2xl transition-transform duration-300 group-hover:-translate-y-2 border border-[var(--glass-border)] group-hover:border-[var(--neon-cyan)]/30">
                                <div className="flex justify-between items-start mb-6">
                                    <Folder className="text-[var(--neon-cyan)]" size={40} />
                                    <div className="flex gap-4">
                                        <a href={project.github} className="text-[var(--text-muted)] hover:text-white transition-colors">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.live} className="text-[var(--text-muted)] hover:text-white transition-colors">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-[var(--neon-cyan)] transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono text-[var(--neon-pink)] bg-[var(--neon-pink)]/10 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
