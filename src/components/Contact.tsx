import React from 'react';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <footer id="contact" className="py-20 px-6 border-t border-[var(--glass-border)] bg-black/50 backdrop-blur-lg">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-mono font-bold mb-8">
                    Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)]">Connect</span>
                </h2>

                <p className="text-[var(--text-muted)] text-lg mb-12 max-w-2xl mx-auto">
                    I'm currently open to new opportunities and collaborations.
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex justify-center gap-8 mb-16">
                    <a href="#" className="p-4 rounded-full glass-panel hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300 group">
                        <Mail size={24} />
                    </a>
                    <a href="#" className="p-4 rounded-full glass-panel hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                        <Linkedin size={24} />
                    </a>
                    <a href="#" className="p-4 rounded-full glass-panel hover:bg-white hover:text-black transition-all duration-300">
                        <Github size={24} />
                    </a>
                    <a href="#" className="p-4 rounded-full glass-panel hover:bg-[#1DA1F2] hover:text-white transition-all duration-300">
                        <Twitter size={24} />
                    </a>
                </div>

                <div className="text-sm text-[var(--text-muted)] font-mono">
                    <p>© {new Date().getFullYear()} Valmi. All rights reserved.</p>
                    <p className="mt-2 text-xs opacity-50">Built with Astro, React & Tailwind</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
