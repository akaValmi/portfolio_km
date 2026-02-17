import React from 'react';

export const Finder = () => (
    <div className="p-6 grid gap-4">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold">Finder</h2>
                <p className="text-sm text-white/60">Navegador de archivos con todos los proyectos.</p>
            </div>
            <span className="text-xs text-white/50">/home/kevin/portfolio</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
            {['Sistemas', 'Frontend', 'Backend', 'Mobile', 'UI Kits', 'Experimentos'].map((folder) => (
                <div key={folder} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                    <div className="text-sm font-medium">📁 {folder}</div>
                    <div className="text-xs text-white/50 mt-1">Colección de proyectos</div>
                </div>
            ))}
        </div>
    </div>
);
