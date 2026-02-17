import React from 'react';
import { useDesktopStore, type AppId } from '../../store/desktopStore';
import { Settings, StickyNote, Music2, Terminal, Calculator } from 'lucide-react';

const apps: { id: AppId; icon: React.ElementType; label: string }[] = [
    { id: 'preferences', icon: Settings, label: 'Preferences' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'music', icon: Music2, label: 'Music' },
    { id: 'terminal', icon: Terminal, label: 'Terminal' },
    { id: 'calculator', icon: Calculator, label: 'Calculadora' },
];

export const Dock: React.FC = () => {
    const { activeWindowId, openApp, windows, minimizeApp, focusApp } = useDesktopStore();

    const handleDockClick = (id: AppId) => {
        const isOpen = windows[id].isOpen;
        const isMin = windows[id].isMinimized;
        const isActive = activeWindowId === id;

        if (isOpen && !isMin && isActive) {
            minimizeApp(id);
        } else {
            if (!isOpen) openApp(id);
            else focusApp(id);
        }
    };

    return (
        <div className="os-dock fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl flex gap-2.5 z-50">
            {apps.map((app) => {
                const isOpen = windows[app.id].isOpen;
                const isActive = activeWindowId === app.id && !windows[app.id].isMinimized;

                return (
                    <button
                        key={app.id}
                        onClick={() => handleDockClick(app.id)}
                        className={`os-dock__item relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group ${isActive ? 'is-active' : ''}`}
                    >
                        {/* Indicator Dot */}
                        {isOpen && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-60" />
                        )}

                        <app.icon
                            className={`w-6 h-6 text-white transition-opacity ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
                        />

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {app.label}
                        </span>
                    </button>
                )
            })}
        </div>
    );
};
