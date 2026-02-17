import React, { useMemo, useState } from 'react';
import { useDesktopStore } from '../../store/desktopStore';

type Line = { type: 'input' | 'output'; text: string };

export const TerminalApp = () => {
    const { openApp } = useDesktopStore();
    const [input, setInput] = useState('');
    const [lines, setLines] = useState<Line[]>([
        { type: 'output', text: 'Bienvenido a ValmiOS Terminal.' },
        { type: 'output', text: 'Escribe "help" para ver los comandos disponibles.' },
    ]);

    const helpText = useMemo(
        () =>
            [
                'Comandos disponibles:',
                '- help: lista de comandos',
                '- about | skills | projects | experience | contact | cv: abre apps',
                '- open <app>: abre una app (ej: open projects)',
                '- date: fecha actual',
                '- clear: limpia la terminal',
            ].join('\n'),
        []
    );

    const runCommand = (raw: string) => {
        const value = raw.trim();
        if (!value) return;

        const [cmd, ...args] = value.split(' ');
        const normalized = cmd.toLowerCase();
        const target = args.join(' ').toLowerCase();

        const openById = (id: 'about' | 'skills' | 'projects' | 'experience' | 'contact' | 'cv') => {
            openApp(id);
            return `Abriendo ${id}...`;
        };

        if (normalized === 'help') return helpText;
        if (normalized === 'clear') return '__clear__';
        if (normalized === 'date') return new Date().toLocaleString('es-ES');

        if (['about', 'skills', 'projects', 'experience', 'contact', 'cv'].includes(normalized)) {
            return openById(normalized as any);
        }

        if (normalized === 'open' && target) {
            if (['about', 'skills', 'projects', 'experience', 'contact', 'cv'].includes(target)) {
                return openById(target as any);
            }
            return `App desconocida: ${target}`;
        }

        return `Comando no reconocido: ${value}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const command = input;
        if (!command.trim()) return;

        const result = runCommand(command);

        if (result === '__clear__') {
            setLines([
                { type: 'output', text: 'Terminal limpia.' },
                { type: 'output', text: 'Escribe "help" para ver los comandos disponibles.' },
            ]);
        } else {
            setLines((prev) => [
                ...prev,
                { type: 'input', text: command },
                { type: 'output', text: result as string },
            ]);
        }

        setInput('');
    };

    return (
        <div className="p-6 font-mono text-sm h-full flex flex-col">
            <div className="text-white/60 mb-4">kevin@valmi-os:~$</div>
            <div className="flex-1 overflow-auto space-y-3 pr-1">
                {lines.map((line, idx) => (
                    <div key={`${line.type}-${idx}`} className="whitespace-pre-wrap">
                        {line.type === 'input' ? (
                            <div className="text-white">$ {line.text}</div>
                        ) : (
                            <div className="text-white/70">{line.text}</div>
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
                <span className="text-white/60">$</span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    placeholder="Escribe help para ver comandos"
                    autoComplete="off"
                />
            </form>
        </div>
    );
};
