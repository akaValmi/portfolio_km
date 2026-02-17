import React from 'react';

const skills = [
    { cat: 'Frontend', items: ['React', 'Tailwind', 'Astro', 'Next.js'] },
    { cat: 'Backend', items: ['Node.js', 'FastAPI', 'Django'] },
    { cat: 'Base de datos', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
    { cat: 'Infraestructura', items: ['Azure', 'Docker', 'Terraform'] },
    { cat: 'Diseño', items: ['Figma', 'Photoshop', 'Davinci Resolve'] },
];

export const Skills = () => (
    <div className="p-8 grid gap-8">
        {skills.map((s, i) => (
            <div key={i}>
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">{s.cat}</h3>
                <div className="flex flex-wrap gap-3">
                    {s.items.map(item => (
                        <div key={item} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/90 hover:border-white/30 transition-colors cursor-default">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
