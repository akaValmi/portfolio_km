import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Volume2, Power, Sun, Moon, Terminal } from 'lucide-react';
import { Icon } from './Icon';
import { Window } from './Window';
import { Dock } from './Dock';
import { useDesktopStore, type AppId } from '../../store/desktopStore';

const desktopApps: { id: AppId; label: string }[] = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' },
    { id: 'cv', label: 'KevinMiranda - CV.pdf' },
];

const windowApps: AppId[] = [
    'about',
    'projects',
    'skills',
    'experience',
    'calculator',
    'contact',
    'cv',
    'preferences',
    'notes',
    'music',
    'terminal',
    'imageViewer',
    'tamagotchi',
];

export const Desktop: React.FC = () => {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [now, setNow] = useState(() => new Date());
    const [booting, setBooting] = useState(true);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const { preferences } = useDesktopStore();
    const [petMood, setPetMood] = useState(0);
    const [petEnergy, setPetEnergy] = useState(72);
    const [petHappiness, setPetHappiness] = useState(65);
    const [petHunger, setPetHunger] = useState(40);
    const moods = ['Tranquilo', 'Curioso', 'Feliz', 'Dormilón'];
    const faces = [
        { eyes: '• •', mouth: '‿', blush: true },
        { eyes: '◕ ◕', mouth: 'ᴗ', blush: false },
        { eyes: '˘ ˘', mouth: '◡', blush: true },
        { eyes: '- -', mouth: 'ᴖ', blush: false },
    ];

    const clamp = (value: number) => Math.min(100, Math.max(0, value));

    useEffect(() => {
        const interval = setInterval(() => {
            setPetEnergy((v) => clamp(v - 1));
            setPetHunger((v) => clamp(v + 1));
            setPetHappiness((v) => clamp(v - 1));
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const nextMood = petEnergy < 25 || petHunger > 75
            ? 3
            : petHappiness > 75
              ? 2
              : petEnergy > 50 && petHunger < 60
                ? 1
                : 0;

        if (petMood !== nextMood) setPetMood(nextMood);
    }, [petEnergy, petHunger, petHappiness, petMood]);

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => setBooting(false), 1600);
        return () => clearTimeout(timeout);
    }, []);

    const dateLabel = useMemo(() => {
        return new Intl.DateTimeFormat('es-ES', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        }).format(now);
    }, [now]);

    const timeLabel = useMemo(() => {
        return new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(now);
    }, [now]);

    return (
        <div
            className={`os-root fixed inset-0 w-full h-full overflow-hidden text-white font-sans selection:bg-white/20 ${
                theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#d7dbe2] text-[#0b0d12]'
            }`}
            data-theme={theme}
        >
            {/* Wallpaper estilo distro */}
            <div className="absolute inset-0 pointer-events-none">
                {theme === 'dark' ? (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#2b3a5c] via-[#0c0f16] to-black" />
                        {preferences.showGlow && (
                            <>
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(120deg, rgba(56,189,248,0.22), rgba(168,85,247,0.18), rgba(16,185,129,0.18))',
                                        backgroundSize: '200% 200%',
                                    }}
                                    animate={{
                                        opacity: [0.35, 0.75, 0.4],
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        filter: ['hue-rotate(0deg)', 'hue-rotate(60deg)', 'hue-rotate(0deg)'],
                                    }}
                                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(210deg, rgba(14,165,233,0.14), rgba(59,130,246,0.18), rgba(244,114,182,0.12))',
                                        backgroundSize: '220% 220%',
                                    }}
                                    animate={{
                                        opacity: [0.3, 0.7, 0.35],
                                        backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
                                        filter: ['hue-rotate(0deg)', 'hue-rotate(-45deg)', 'hue-rotate(0deg)'],
                                    }}
                                    transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </>
                        )}
                        {preferences.showGrid && (
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
                        )}
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#e7e9ee] via-[#d8dce4] to-[#cfd5df]" />
                        {preferences.showGlow && (
                            <>
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(120deg, rgba(59,130,246,0.12), rgba(147,51,234,0.1), rgba(16,185,129,0.1))',
                                        backgroundSize: '200% 200%',
                                    }}
                                    animate={{
                                        opacity: [0.25, 0.55, 0.3],
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        filter: ['hue-rotate(0deg)', 'hue-rotate(40deg)', 'hue-rotate(0deg)'],
                                    }}
                                    transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            'linear-gradient(210deg, rgba(14,165,233,0.08), rgba(249,115,22,0.08), rgba(59,130,246,0.1))',
                                        backgroundSize: '220% 220%',
                                    }}
                                    animate={{
                                        opacity: [0.2, 0.5, 0.25],
                                        backgroundPosition: ['100% 0%', '0% 100%', '100% 0%'],
                                        filter: ['hue-rotate(0deg)', 'hue-rotate(-30deg)', 'hue-rotate(0deg)'],
                                    }}
                                    transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full h-1/2"
                                    style={{
                                        backgroundImage: 'linear-gradient(180deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08), transparent 70%)',
                                        backgroundSize: '160% 160%',
                                    }}
                                    animate={{
                                        backgroundPosition: ['0% 100%', '100% 100%'],
                                        opacity: [0.12, 0.2, 0.14],
                                    }}
                                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </>
                        )}
                        {preferences.showGrid && (
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
                        )}
                    </>
                )}
            </div>


            {/* Barra superior */}
            <header className={`relative z-20 h-11 px-4 sm:px-6 flex items-center justify-between border-b ${
                theme === 'dark' ? 'border-white/10 bg-black/40 text-white' : 'border-black/10 bg-white/60 text-[#0b0d12]'
            } ${preferences.glassEffect ? 'backdrop-blur-2xl' : ''} shadow-[0_8px_30px_rgba(0,0,0,0.25)]`}>
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <button className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 transition-colors">
                        <Terminal size={14} />
                        <span className="font-semibold tracking-wide">K. Miranda OS</span>
                    </button>
                    <span className="text-white/50 hidden sm:inline">VALMI Desktop</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                    <span className={`hidden sm:inline ${theme === 'dark' ? 'text-white/70' : 'text-black/60'}`}>{dateLabel}</span>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                    <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white/70' : 'text-black/60'}`}>
                        <Wifi size={16} />
                        <Volume2 size={16} />
                        <Battery size={16} />
                    </div>
                </div>
            </header>

            <div className="relative z-10 p-6 pb-24 sm:p-10 grid grid-cols-2 sm:grid-cols-1 gap-6 w-fit">
                {desktopApps.map((app) => (
                    <Icon key={app.id} id={app.id} label={app.label} />
                ))}
                <div className="lg:hidden">
                    <Icon id="tamagotchi" label="Tamagotchi" />
                </div>
            </div>

            <aside className="desktop-widgets absolute top-20 right-6 z-10 hidden lg:flex gap-4">
                <div className="w-64 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-white/60">Tamagotchi</div>
                        <button
                            onClick={() => setPetMood((prev) => (prev + 1) % moods.length)}
                            className="text-[10px] text-white/70 hover:text-white transition-colors"
                        >
                            {moods[petMood]}
                        </button>
                    </div>
                    <div className="mt-3 flex items-center justify-center">
                        <motion.button
                            onClick={() => {
                                setPetMood((prev) => (prev + 1) % moods.length);
                                setPetHappiness((v) => clamp(v + 4));
                            }}
                            className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-cyan-400/25 via-white/5 to-purple-400/25 border border-white/10 flex items-center justify-center shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                            aria-label="Interactuar con tamagotchi"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="absolute inset-0 rounded-[28px] border border-white/10" />
                            
                            <motion.div
                                className="absolute top-[38px] left-1/2 -translate-x-1/2 text-white/90 text-lg tracking-widest"
                                animate={{ scaleY: [1, 0.2, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                {faces[petMood].eyes}
                            </motion.div>
                            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 text-white/80 text-xl">
                                {faces[petMood].mouth}
                            </div>
                        </motion.button>
                    </div>
                    <div className="mt-3 space-y-2 text-[10px] text-white/70">
                        <div className="flex items-center justify-between">
                            <span>Energía</span>
                            <span className="text-white/90">{petEnergy}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-cyan-400/70" style={{ width: `${petEnergy}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Hambre</span>
                            <span className="text-white/90">{petHunger}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-amber-400/70" style={{ width: `${petHunger}%` }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Ánimo</span>
                            <span className="text-white/90">{petHappiness}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-emerald-400/70" style={{ width: `${petHappiness}%` }} />
                        </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        <button
                            onClick={() => {
                                setPetEnergy((v) => clamp(v - 3));
                                setPetHappiness((v) => clamp(v + 6));
                            }}
                            className="rounded-lg bg-white/10 border border-white/10 py-1 text-[10px] text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                        >
                            Mimar
                        </button>
                        <button
                            onClick={() => {
                                setPetHunger((v) => clamp(v - 10));
                                setPetHappiness((v) => clamp(v + 4));
                            }}
                            className="rounded-lg bg-white/10 border border-white/10 py-1 text-[10px] text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                        >
                            Comer
                        </button>
                        <button
                            onClick={() => {
                                setPetEnergy((v) => clamp(v + 8));
                                setPetHappiness((v) => clamp(v + 2));
                            }}
                            className="rounded-lg bg-white/10 border border-white/10 py-1 text-[10px] text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                        >
                            Dormir
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-64">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                    <div className="text-xs text-white/60">Hora local</div>
                    <div className="text-3xl font-semibold text-white mt-1">{timeLabel}</div>
                    <div className="text-xs text-white/50 mt-1">{dateLabel}</div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="text-xs text-white/60">Accesos rápidos</div>
                    <div className="mt-3 grid gap-2">
                        <button
                            onClick={() => window.open('https://github.com/akaValmi', '_blank', 'noopener,noreferrer')}
                            className="text-left text-sm text-white/80 hover:text-white transition-colors"
                        >
                            GitHub
                        </button>
                        <button
                            onClick={() => window.open('https://www.linkedin.com/in/kevin-miranda-5ba759275/', '_blank', 'noopener,noreferrer')}
                            className="text-left text-sm text-white/80 hover:text-white transition-colors"
                        >
                            LinkedIn
                        </button>
                        <button
                            onClick={() => window.open('https://frontend-dicepoker.vercel.app', '_blank', 'noopener,noreferrer')}
                            className="text-left text-sm text-white/80 hover:text-white transition-colors"
                        >
                            Póker de Dados - Estilo Witcher
                        </button>
                        <button
                            onClick={() => window.open('https://pomorodio.vercel.app', '_blank', 'noopener,noreferrer')}
                            className="text-left text-sm text-white/80 hover:text-white transition-colors"
                        >
                            Pomorodio
                        </button>
                    </div>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="text-xs text-white/60">Estado</div>
                    <div className="mt-2 space-y-2 text-sm text-white/70">
                        <div className="flex items-center justify-between">
                            <span>Modo</span>
                            <span className="text-white/90">{theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Glass</span>
                            <span className="text-white/90">{preferences.glassEffect ? 'On' : 'Off'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Rejilla</span>
                            <span className="text-white/90">{preferences.showGrid ? 'On' : 'Off'}</span>
                        </div>
                    </div>
                </div>
                </div>
            </aside>

            {/* Ventanas */}
            <div ref={constraintsRef} className="absolute inset-0 z-30 pointer-events-none">
                {windowApps.map((app) => (
                    <div key={app} className="pointer-events-auto">
                        <Window id={app} constraintsRef={constraintsRef} />
                    </div>
                ))}
            </div>

            <Dock />

            {/* Boot screen */}
            {booting && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95">
                    <div className="w-[320px] text-center space-y-5">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"
                        >
                            <Power size={20} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            className="text-sm text-white/80 tracking-widest uppercase"
                        >
                            Iniciando portfolio de Kevin Miranda
                        </motion.div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '20%' }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Desktop;
