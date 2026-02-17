import { create } from 'zustand';

export type AppId =
    | 'about'
    | 'projects'
    | 'skills'
    | 'experience'
    | 'calculator'
    | 'contact'
    | 'cv'
    | 'preferences'
    | 'notes'
    | 'music'
    | 'terminal'
    | 'imageViewer';

interface WindowState {
    id: AppId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    zIndex: number;
}

interface DesktopState {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    maxZIndex: number;
    imageViewerData: { images: string[]; initialIndex: number } | null;
    preferences: {
        showGrid: boolean;
        showGlow: boolean;
        glassEffect: boolean;
    };

    openApp: (id: AppId) => void;
    closeApp: (id: AppId) => void;
    minimizeApp: (id: AppId) => void;
    focusApp: (id: AppId) => void;
    openImageViewer: (images: string[], initialIndex: number) => void;
    togglePreference: (key: 'showGrid' | 'showGlow' | 'glassEffect') => void;
}

const initialWindows: Record<AppId, WindowState> = {
    about: { id: 'about', title: 'Sobre mí', isOpen: false, isMinimized: false, zIndex: 1 },
    projects: { id: 'projects', title: 'Proyectos', isOpen: false, isMinimized: false, zIndex: 1 },
    skills: { id: 'skills', title: 'Skills', isOpen: false, isMinimized: false, zIndex: 1 },
    experience: { id: 'experience', title: 'Experiencia profesional', isOpen: false, isMinimized: false, zIndex: 1 },
    calculator: { id: 'calculator', title: 'Calculadora', isOpen: false, isMinimized: false, zIndex: 1 },
    contact: { id: 'contact', title: 'Contacto', isOpen: false, isMinimized: false, zIndex: 1 },
    cv: { id: 'cv', title: 'KevinMiranda - CV.pdf', isOpen: false, isMinimized: false, zIndex: 1 },
    preferences: { id: 'preferences', title: 'System Preferences', isOpen: false, isMinimized: false, zIndex: 1 },
    notes: { id: 'notes', title: 'Notes', isOpen: true, isMinimized: false, zIndex: 20 },
    music: { id: 'music', title: 'Music Player', isOpen: false, isMinimized: false, zIndex: 1 },
    terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, zIndex: 1 },
    imageViewer: { id: 'imageViewer', title: 'Image Viewer', isOpen: false, isMinimized: false, zIndex: 1 },
};

export const useDesktopStore = create<DesktopState>((set) => ({
    windows: initialWindows,
    activeWindowId: 'notes',
    maxZIndex: 20,
    imageViewerData: null,
    preferences: {
        showGrid: true,
        showGlow: true,
        glassEffect: true,
    },

    openApp: (id) =>
        set((state) => {
            const newZIndex = state.maxZIndex + 1;
            return {
                windows: {
                    ...state.windows,
                    [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZIndex },
                },
                activeWindowId: id,
                maxZIndex: newZIndex,
            };
        }),

    closeApp: (id) =>
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: { ...state.windows[id], isOpen: false },
            },
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        })),

    minimizeApp: (id) =>
        set((state) => ({
            windows: {
                ...state.windows,
                [id]: { ...state.windows[id], isMinimized: true },
            },
            activeWindowId: null,
        })),

    focusApp: (id) =>
        set((state) => {
            if (state.activeWindowId === id) return state; // Already focused
            const newZIndex = state.maxZIndex + 1;
            return {
                windows: {
                    ...state.windows,
                    [id]: { ...state.windows[id], zIndex: newZIndex, isMinimized: false },
                },
                activeWindowId: id,
                maxZIndex: newZIndex,
            };
        }),

    openImageViewer: (images, initialIndex) =>
        set((state) => {
            const newZIndex = state.maxZIndex + 1;
            return {
                windows: {
                    ...state.windows,
                    imageViewer: { ...state.windows.imageViewer, isOpen: true, isMinimized: false, zIndex: newZIndex },
                },
                activeWindowId: 'imageViewer',
                maxZIndex: newZIndex,
                imageViewerData: { images, initialIndex },
            };
        }),

    togglePreference: (key) =>
        set((state) => ({
            preferences: {
                ...state.preferences,
                [key]: !state.preferences[key],
            },
        })),
}));
