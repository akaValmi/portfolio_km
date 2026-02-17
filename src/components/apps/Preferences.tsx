import React from 'react';
import { useDesktopStore } from '../../store/desktopStore';

const Toggle: React.FC<{ label: string; description: string; checked: boolean; onToggle: () => void }> = ({
    label,
    description,
    checked,
    onToggle,
}) => (
    <button
        onClick={onToggle}
        className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-left hover:bg-white/10 transition-colors"
    >
        <div>
            <div className="text-sm font-medium">{label}</div>
            <p className="text-xs text-white/50">{description}</p>
        </div>
        <span
            className={`w-10 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-cyan-500/80' : 'bg-white/15'}`}
        >
            <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    checked ? 'translate-x-4' : 'translate-x-0'
                }`}
            />
        </span>
    </button>
);

export const Preferences = () => {
    const { preferences, togglePreference } = useDesktopStore();

    return (
        <div className="p-6 grid gap-5">
            <div>
                <h2 className="text-xl font-semibold">System Preferences</h2>
                <p className="text-sm text-white/60">Ajustes que impactan el aspecto del portfolio.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <Toggle
                    label="Rejilla del fondo"
                    description="Muestra u oculta la malla del escritorio."
                    checked={preferences.showGrid}
                    onToggle={() => togglePreference('showGrid')}
                />
                <Toggle
                    label="Luces de fondo"
                    description="Activa los degradados y brillos del wallpaper."
                    checked={preferences.showGlow}
                    onToggle={() => togglePreference('showGlow')}
                />
                <Toggle
                    label="Efecto glass"
                    description="Aplica blur a la barra superior y ventanas."
                    checked={preferences.glassEffect}
                    onToggle={() => togglePreference('glassEffect')}
                />
            </div>
        </div>
    );
};
