import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const cvFile = '/assets/KevinMiranda - CV.pdf';

export const CV = () => (
    <div className="p-6 h-full flex flex-col gap-4">
        <div>
            <h2 className="text-xl font-semibold">KevinMiranda - CV.pdf</h2>
            <p className="text-sm text-white/60">Currículum vitae - Descargar o ver</p>
        </div>
        <div className="flex gap-3 flex-wrap">
            <a href={cvFile} download className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition-transform flex items-center gap-2">
                <Download size={18} />
                Descargar PDF
            </a>
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="hidden sm:flex px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors items-center gap-2">
                <ExternalLink size={18} />
                Abrir en nueva pestaña
            </a>
        </div>
        <div className="hidden sm:flex flex-1 rounded-xl border border-white/10 bg-black/30 overflow-hidden">
            <iframe 
                src={cvFile} 
                className="w-full h-full" 
                title="CV Preview"
            />
        </div>
    </div>
);
