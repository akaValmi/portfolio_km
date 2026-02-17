import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-[var(--glass-bg)]' : 'bg-transparent border-transparent backdrop-blur-none'
                            }`}
                    >
                        {/* Logo */}
                        <a href="#" className="font-mono text-xl font-bold tracking-tighter text-white hover:text-[var(--neon-cyan)] transition-colors">
                            VALMI<span className="text-[var(--neon-cyan)]">.DEV</span>
                        </a>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--neon-cyan)] transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}

                            <div className="h-5 w-[1px] bg-[var(--glass-border)] mx-2" />

                            <div className="flex items-center gap-4">
                                <a href="https://github.com" target="_blank" rel="noopener" className="text-[var(--text-muted)] hover:text-white transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-[var(--text-muted)] hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                        >
                            {isMobileOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[var(--bg-dark)] pt-32 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-2xl font-mono font-bold text-white hover:text-[var(--neon-pink)] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
