import React from 'react';

const experiences = [
    {
        role: 'Técnico en Medios Digitales',
        company: 'Televicentro',
        companyUrl: 'https://www.linkedin.com/company/televicentro-emisoras-unidas',
        period: 'Abril 2025 - Presente',
        summary:
            'Responsable de la administración y mantenimiento de plataformas digitales de Televicentro, soporte técnico y gestión de proyectos multimedia. También he desarrollado herramientas para automatizar procesos de gestión de contenido.',
    },
    {
        role: 'Líder de desarrollo Full Stack',
        company: 'UNAH - Facultad de Odontología',
        companyUrl: 'https://www.linkedin.com/school/unahoficial',
        period: 'Julio 2024 - Presente',
        summary:
            'Desarrollo de módulos para la gestión de expedientes, reportes y administración interna de la facultad de Odontología de la UNAH. Iniciativa impulsada por estudiantes de la carrera de Ingeniería en Sistemas, docentes de la facultad de Odontología y el ingeniero Norberto Mendoza.',
    },
];

export const Experience = () => (
    <div className="p-6 grid gap-4">
        <div>
            <h2 className="text-lg font-semibold text-white">Experiencia profesional</h2>
            <p className="text-sm text-white/60">Resumen de roles y proyectos recientes.</p>
        </div>

        <div className="grid gap-4">
            {experiences.map((exp) => (
                <div
                    key={`${exp.role}-${exp.company}`}
                    className="rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col gap-3"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                            <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-cyan-400 transition-colors text-sm underline"
                            >
                                {exp.company}
                            </a>
                        </div>
                        <span className="text-xs text-white/50 bg-white/5 border border-white/10 px-2 py-1 rounded-full w-fit">
                            {exp.period}
                        </span>
                    </div>
                    <p className="text-white/70 text-sm">{exp.summary}</p>
                </div>
            ))}
        </div>
    </div>
);
