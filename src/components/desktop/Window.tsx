import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useDesktopStore, type AppId } from '../../store/desktopStore';
import { About } from '../apps/About';
import { Projects } from '../apps/Projects';
import { Skills } from '../apps/Skills';
import { Experience } from '../apps/Experience';
import { Calculator } from '../apps/Calculator';
import { Contact } from '../apps/Contact';
import { CV } from '../apps/CV';
import { Preferences } from '../apps/Preferences';
import { Notes } from '../apps/Notes';
import { Music } from '../apps/Music';
import { TerminalApp } from '../apps/TerminalApp';
import { ImageViewer } from '../apps/ImageViewer';
import { Tamagotchi } from '../apps/Tamagotchi';

interface WindowProps {
    id: AppId;
    constraintsRef: React.RefObject<HTMLDivElement>;
}

const apps: Record<AppId, React.ComponentType<any>> = {
    about: About,
    projects: Projects,
    skills: Skills,
    experience: Experience,
    calculator: Calculator,
    contact: Contact,
    cv: CV,
    preferences: Preferences,
    notes: Notes,
    music: Music,
    terminal: TerminalApp,
    imageViewer: ImageViewer,
    tamagotchi: Tamagotchi,
};

const windowLayouts: Record<AppId, { top: string; left: string; width: string; height: string }> = {
    about: { top: '4.5rem', left: '4.5rem', width: 'min(720px, 92vw)', height: 'min(520px, 80vh)' },
    projects: { top: '6.5rem', left: '9.5rem', width: 'min(760px, 94vw)', height: 'min(520px, 80vh)' },
    skills: { top: '8.5rem', left: '6.5rem', width: 'min(680px, 90vw)', height: 'min(520px, 80vh)' },
    experience: { top: '7.5rem', left: '8rem', width: 'min(760px, 92vw)', height: 'min(520px, 80vh)' },
    calculator: { top: '9rem', left: '9rem', width: 'min(420px, 90vw)', height: 'min(520px, 80vh)' },
    cv: { top: '5rem', left: '8rem', width: 'min(760px, 92vw)', height: 'min(540px, 85vh)' },
    contact: { top: '10rem', left: '11rem', width: 'min(620px, 88vw)', height: 'min(460px, 75vh)' },
    preferences: { top: '5.5rem', left: '12rem', width: 'min(760px, 92vw)', height: 'min(520px, 80vh)' },
    notes: { top: '50%', left: '50%', width: 'min(620px, 88vw)', height: 'min(480px, 75vh)' },
    music: { top: '9rem', left: '14rem', width: 'min(720px, 92vw)', height: 'min(520px, 80vh)' },
    terminal: { top: '10rem', left: '6rem', width: 'min(680px, 90vw)', height: 'min(460px, 75vh)' },
    imageViewer: { top: '0', left: '0', width: '100vw', height: '100vh' },
    tamagotchi: { top: '8rem', left: '10rem', width: 'min(420px, 90vw)', height: 'min(520px, 80vh)' },
};

export const Window: React.FC<WindowProps> = ({ id, constraintsRef }) => {
    const { windows, closeApp, minimizeApp, focusApp, activeWindowId, imageViewerData, preferences } = useDesktopStore();
    const windowState = windows[id];
    const AppComponent = apps[id];
    const layout = windowLayouts[id];
    const isActive = activeWindowId === id;
    const [windowSize, setWindowSize] = useState({ width: layout.width, height: layout.height });
    const [isMaximized, setIsMaximized] = useState(id === 'imageViewer');
    const windowRef = useRef<HTMLDivElement>(null);

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const currentWidth = windowRef.current?.offsetWidth || 400;
        const currentHeight = windowRef.current?.offsetHeight || 300;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;
            const newWidth = Math.max(300, currentWidth + deltaX);
            const newHeight = Math.max(250, currentHeight + deltaY);
            setWindowSize({ width: `${newWidth}px`, height: `${newHeight}px` });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (!windowState.isOpen || windowState.isMinimized) return null;

    return (
        <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: windowState.zIndex }}
        >
            <motion.div
                drag
                dragMomentum={false}
                dragConstraints={constraintsRef}
                dragElastic={0.08}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onMouseDown={() => focusApp(id)}
                ref={windowRef}
                style={{
                    width: isMaximized ? '100vw' : windowSize.width,
                    height: isMaximized ? '100vh' : windowSize.height,
                }}
                className={`os-window ${isMaximized ? 'is-maximized' : ''} relative bg-[#111318]/90 ${preferences.glassEffect ? 'backdrop-blur-2xl' : ''} border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.55)] flex flex-col overflow-hidden ${
                    isActive ? 'ring-1 ring-cyan-400/30 shadow-[0_30px_90px_rgba(0,0,0,0.6)]' : ''
                }`}
            >
                {/* Title Bar */}
                <div className="os-window__titlebar h-11 bg-white/5 flex items-center justify-between px-4 select-none cursor-move border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-white/80 tracking-wide">{windowState.title}</span>
                        <span className="text-[10px] text-white/40 uppercase">Ventana</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                            className="p-1.5 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors"
                            title={isMaximized ? 'Restaurar' : 'Maximizar'}
                        >
                            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                            className="p-1.5 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors"
                        >
                            <Minus size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                            className="p-1.5 hover:bg-red-500/80 rounded-md text-white/50 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="os-window__content flex-1 bg-[#0c0e13] overflow-auto relative text-white">
                    {id === 'imageViewer' && imageViewerData ? (
                        <AppComponent images={imageViewerData.images} initialIndex={imageViewerData.initialIndex} />
                    ) : (
                        <AppComponent />
                    )}
                </div>

                {/* Resize Handle */}
                <div
                    onMouseDown={handleResizeStart}
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize bg-gradient-to-tl from-cyan-400/30 to-transparent rounded-tl-lg hover:from-cyan-400/50 transition-colors pointer-events-auto"
                    title="Arrastra para redimensionar"
                />
            </motion.div>
        </div>
    );
};
