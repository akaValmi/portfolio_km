import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Smartphone, Terminal, Cpu } from 'lucide-react';

const skills = [
    { name: 'Frontend', icon: Layout, tech: ['React', 'Next.js', 'Tailwind', 'Framer Motion'], color: 'text-cyan-400' },
    { name: 'Backend', icon: Database, tech: ['Node.js', 'Express', 'PostgreSQL', 'Firebase'], color: 'text-pink-400' },
    { name: 'Languages', icon: Code2, tech: ['TypeScript', 'JavaScript', 'Python', 'SQL'], color: 'text-yellow-400' },
    { name: 'Tools', icon: Terminal, tech: ['Git', 'Docker', 'VS Code', 'Linux'], color: 'text-green-400' },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--glass-bg)] rounded-full blur-[100px] -z-10 opacity-30" />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-mono font-bold mb-16 text-center">
                    Technical <span className="text-[var(--neon-pink)]">Arsenal</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-panel p-6 rounded-2xl border-t border-l border-white/10 hover:border-[var(--neon-cyan)]/50 transition-colors duration-300"
                        >
                            <div className={`mb-4 ${skill.color}`}>
                                <skill.icon size={40} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                            <ul className="space-y-2">
                                {skill.tech.map(t => (
                                    <li key={t} className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--glass-border)]" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;
