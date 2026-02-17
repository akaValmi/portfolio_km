import React from 'react';

const timeline = [
    { year: '2021', title: 'Inicio profesional', detail: 'Primeros proyectos freelance y hackathons.' },
    { year: '2023', title: 'Full Stack', detail: 'Aplicaciones completas con React + Node.' },
    { year: '2025', title: 'UX + Sistemas', detail: 'Experiencias tipo OS para portfolios creativos.' },
];

export const Calendar = () => (
    <div className="p-6 grid gap-5">
        <div>
            <h2 className="text-xl font-semibold">Calendar</h2>
            <p className="text-sm text-white/60">Línea de tiempo profesional y experiencia.</p>
        </div>
        <div className="space-y-4">
            {timeline.map((item) => (
                <div key={item.year} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">{item.year}</div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-white/60 mt-1">{item.detail}</div>
                </div>
            ))}
        </div>
    </div>
);
