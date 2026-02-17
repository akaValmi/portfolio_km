import React, { useState } from 'react';
import { Mail, Linkedin, Github, Check, FileText } from 'lucide-react';

const email = 'kev24miranda@gmail.com';
const cvFile = '/assets/KevinMiranda - CV.pdf';
const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/kevin-miranda-5ba759275/',
    github: 'https://github.com/akaValmi',
};

export const Contact = () => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Conversemos</h2>
            <p className="text-white/60 text-sm mb-6 max-w-sm">
                Estoy disponible para proyectos, colaboraciones o simplemente para conversar ideas.
            </p>

            <div className="flex gap-3 mb-10 flex-wrap justify-center">
                <a href={`mailto:${email}`} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform">
                    <Mail size={20} />
                    {email}
                </a>
                <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                    {copied ? (
                        <>
                            <Check size={20} />
                            Copiado
                        </>
                    ) : (
                        <>
                            <Mail size={20} />
                            Copiar
                        </>
                    )}
                </button>
                <a href={cvFile} download className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                    <FileText size={20} />
                    Descargar CV
                </a>
            </div>

            <div className="flex gap-4">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all" aria-label="LinkedIn">
                    <Linkedin size={24} />
                </a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all" aria-label="GitHub">
                    <Github size={24} />
                </a>
            </div>
        </div>
    );
};

