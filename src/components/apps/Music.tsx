import React from 'react';

export const Music = () => (
    <div className="p-6 grid gap-4">
        <div>
            <p className="text-sm text-white/60">Como curiosidad: me gusta hacer música. :)</p>
        </div>
        <div className="grid gap-3 max-w-2xl mx-auto w-full">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-white/50 mb-2">Nos vemos en el más allá</div>
                <div className="relative w-full aspect-video rounded-lg bg-black/40 border border-white/10 overflow-hidden">
                   <iframe 
                       className="w-full h-full" 
                       src="https://www.youtube.com/embed/WBsshtLQpJ0?si=QOjmw70eKdQ9moVs" 
                       title="YouTube video player" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                       referrerPolicy="strict-origin-when-cross-origin" 
                       allowFullScreen
                   ></iframe>
                </div>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="text-xs text-white/50 mb-2">verte lejos</div>
                <div className="relative w-full aspect-video rounded-lg bg-black/40 border border-white/10 overflow-hidden">
                    <iframe 
                        className="w-full h-full" 
                        src="https://www.youtube.com/embed/Hki-YUwFUuo?si=HayuUCNrpZvI5wBR" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
);
