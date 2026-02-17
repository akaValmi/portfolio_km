import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Tamagotchi: React.FC = () => {
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

    return (
        <div className="p-6 flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-5">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-white/60">Tamagotchi</div>
                    <button
                        onClick={() => setPetMood((prev) => (prev + 1) % moods.length)}
                        className="text-[10px] text-white/70 hover:text-white transition-colors"
                    >
                        {moods[petMood]}
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
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
                <div className="mt-4 space-y-2 text-[10px] text-white/70">
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
                <div className="mt-4 grid grid-cols-3 gap-2">
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
        </div>
    );
};
