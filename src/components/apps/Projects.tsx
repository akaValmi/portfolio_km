import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDesktopStore } from '../../store/desktopStore';

const projects = [
   {
        title: 'Sistema Odontológico - UNAH',
        desc: 'Lidero el desarrollo de un sistema aprobado por el rector Odir Fernández para la gestión expedientes y gestión administrativa de la facultad de Odontología (UNAH).',
        tags: ['React', 'Node', 'PostgreSQL'],
        color: 'bg-sky-500',
        images: ['/assets/1.png', '/assets/2.png', '/assets/3.png', '/assets/4.png'],
        status: 'Próximo a implementarse',
        
    },
   
    {
        title: 'E-commerce Gift Joy',
        desc: 'Desarrollé un e-commerce con catálogo dinámico y gestión de pedidos.',
        tags: ['Next.js', 'Strapi', 'Tailwind'],
        color: 'bg-purple-500',
        demoUrl: 'https://giftjoy-frontend-strapi.vercel.app',
      //  githubUrl: 'https://github.com/',
    },
    
    {
        title: 'Póker de Dados - Estilo Witcher',
        desc: 'Desarrollé un juego de póker de dados inspirado en el estilo del universo The Witcher usando Websockets, con mecánicas de juego dinámicas y una interfaz visual atractiva.',
        tags: ['Next.js', 'Tailwind', 'Node'],
        color: 'bg-amber-500',
        demoUrl: 'https://frontend-dicepoker.vercel.app',
        githubUrl: 'https://github.com/akaValmi/backend_dicepoker',
        
    },
    {
        title: 'Pomorodio',
        desc: 'Un pomodoro moderno con integración de Spotify. Ten tu música favorita sin descuidar tu productividad.',
        tags: ['Next.js', 'Spotify API', 'Tailwind'],
        color: 'bg-green-500',
        demoUrl: 'https://pomorodio.vercel.app',
    },
    
];

export const Projects = () => {
    const [expandedProject, setExpandedProject] = useState<number | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { openImageViewer } = useDesktopStore();

    const handleCardClick = (project: (typeof projects)[number], index: number) => {
        if (project.demoUrl) {
            window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        setExpandedProject(expandedProject === index ? null : index);
    };

    useEffect(() => {
        if (expandedProject === null) return;

        const project = projects[expandedProject];
        if (!project.images) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [expandedProject]);

    const nextImage = () => {
        const project = projects[expandedProject!];
        setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    };

    const prevImage = () => {
        const project = projects[expandedProject!];
        setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    };

    return (
        <div className="p-6 grid gap-6">
            <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-semibold text-white">
                    Haz clic en mis proyectos para conocer mejor mis habilidades.
                </h2>
                <p className="text-white/60 text-sm">
                    Cada proyecto refleja mi experiencia en diseño, desarrollo y entrega de soluciones.
                </p>
            </div>
            {projects.map((p, i) => (
                <div key={i}>
                    <div 
                        onClick={() => handleCardClick(p, i)}
                        className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
                    >
                        <div className={`w-12 h-12 rounded-lg ${p.color} flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`} />

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-bold text-base sm:text-lg text-white">{p.title}</h3>
                                    {p.status && (
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30 whitespace-nowrap">
                                            {p.status}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {p.githubUrl && (
                                        <a
                                            href={p.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/40 hover:text-white transition-colors"
                                            aria-label="GitHub"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="text-white/60 text-xs sm:text-sm mb-3">{p.desc}</p>
                            <div className="flex gap-2">
                                {p.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/80 uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {expandedProject === i && p.images && (
                        <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4 max-w-4xl mx-auto w-full">
                            <div className="relative">
                                <img 
                                    src={p.images[currentImageIndex]} 
                                    alt={`${p.title} - Imagen ${currentImageIndex + 1}`}
                                    onClick={() => openImageViewer(p.images!, currentImageIndex)}
                                    className="w-full rounded-lg object-cover aspect-video cursor-pointer hover:opacity-90 transition-opacity"
                                />
                                
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-transparent border-2 border-cyan-400/80 hover:bg-cyan-400/20 text-cyan-300 p-1.5 sm:p-2 rounded-full transition-all"
                                >
                                    <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
                                </button>
                                
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-transparent border-2 border-cyan-400/80 hover:bg-cyan-400/20 text-cyan-300 p-1.5 sm:p-2 rounded-full transition-all"
                                >
                                    <ChevronRight size={16} className="sm:w-5 sm:h-5" />
                                </button>

                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {p.images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
