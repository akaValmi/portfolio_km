import React from 'react';

export const Trash = () => (
    <div className="p-6 grid gap-4">
        <div>
            <h2 className="text-xl font-semibold">Trash</h2>
            <p className="text-sm text-white/60">Proyectos descartados, experiments y notas rápidas.</p>
        </div>
        <div className="rounded-xl border border-dashed border-white/20 p-6 text-sm text-white/60 text-center">
            Nada por aquí aún. Arrastra experiments para revisarlos después.
        </div>
    </div>
);
