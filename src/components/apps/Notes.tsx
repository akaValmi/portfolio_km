import React from 'react';

const welcomeText = `Bienvenido/a a mi portfolio

Soy Kevin Miranda. Este entorno simula un sistema operativo para explorar mi trabajo.

Puedes hacer click en las apps del escritorio o del dock para conocerme mejor
Gracias por tu visita. :)`;

export const Notes = () => (
    <div className="p-5 h-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-lg font-semibold">Bloc de notas</h2>
                <p className="text-xs text-white/60">Documento sin título</p>
            </div>
            <span className="text-[10px] text-white/40">NOTES</span>
        </div>
        <div className="flex-1 rounded-xl border border-white/10 bg-black/30">
            <textarea
                readOnly
                value={welcomeText}
                className="w-full h-full resize-none bg-transparent text-white/80 font-mono text-sm p-4 outline-none"
            />
        </div>
    </div>
);
