import React from 'react';
import { useDesktopStore, type AppId } from '../../store/desktopStore';
import { Folder, Trash2, Settings, CalendarDays, StickyNote, Music2, Terminal, User, Mail, FileText, Briefcase, Calculator } from 'lucide-react';

interface IconProps {
    id: AppId;
    label: string;
}

const icons = {
    about: User,
    projects: Folder,
    skills: Terminal,
    experience: Briefcase,
    calculator: Calculator,
    contact: Mail,
    cv: FileText,
    finder: Folder,
    trash: Trash2,
    preferences: Settings,
    calendar: CalendarDays,
    notes: StickyNote,
    music: Music2,
    terminal: Terminal,
}

export const Icon: React.FC<IconProps> = ({ id, label }) => {
    const { openApp, windows, minimizeApp, focusApp, activeWindowId } = useDesktopStore();
    const IconComponent = icons[id];

    const handleIconOpen = () => {
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
        <button
            onClick={handleIconOpen}
            onKeyDown={(event) => {
                if (event.key === 'Enter') handleIconOpen();
            }}
            className="os-icon flex flex-col items-center gap-2 p-3 w-24 rounded-2xl transition-all group text-center focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
        >
            <div className="os-icon__badge w-12 h-12 flex items-center justify-center rounded-2xl border border-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-sm text-white">
                <IconComponent size={24} />
            </div>
            <span className="os-icon__label text-[11px] text-white/90 leading-tight">{label}</span>
        </button>
    );
};
