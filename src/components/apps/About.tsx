import React from 'react';

export const About = () => (
    <div className="about-content p-8 max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-2">
            <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-black flex items-center justify-center text-3xl">
                <img
                    src="/assets/fotoKevin.jpg"
                    alt="Kevin Miranda"
                    className="w-full h-full object-cover rounded-full"
                />
            </div>
        </div>

        <h1 className="text-3xl font-bold text-white">Hola, soy Kevin Miranda</h1>
        <h2 className="text-lg text-blue-400 font-medium">Ingeniero en Sistemas</h2>

        <p className="text-white/80 leading-relaxed text-base">
            Construyo herramientas digitales que mezclan <span className="text-white font-semibold">diseño</span> y <span className="text-white font-semibold">rendimiento</span>.
            Ahora mismo enfocado en aplicaciones web interactivas con stacks modernos.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-xs font-medium text-white/80">Rápido</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-2xl mb-1">🎨</div>
                <div className="text-xs font-medium text-white/80">Creativo</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="text-2xl mb-1">🛠️</div>
                <div className="text-xs font-medium text-white/80">Escalable</div>
            </div>
        </div>
    </div>
);
