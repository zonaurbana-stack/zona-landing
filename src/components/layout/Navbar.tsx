"use client";

import { cn } from "@/lib/utils";
import { Search, ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-surface/70 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
            )}
        >
            <div className="w-full px-4 md:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
                    <div className="relative w-36 h-12 sm:w-44 sm:h-14 md:w-56 md:h-16 group-hover:scale-105 transition-transform duration-300">
                        <Image 
                            src="/logo.jpeg" 
                            alt="Zona Urbana" 
                            fill 
                            className="object-contain object-left" 
                            priority 
                        />
                    </div>
                    <div className="h-7 sm:h-8 md:h-10 w-[1px] bg-white/20" />
                    <div className="relative w-7 h-9 sm:w-8 sm:h-11 md:w-10 md:h-13 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <Image 
                            src="/aca-te-ven-bien-white.svg" 
                            alt="Acá te ven bien" 
                            fill 
                            className="object-contain" 
                        />
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
                    <Link href="#portfolio" className="hover:text-white transition-colors">Nuestra Red</Link>
                    <Link href="#ofrece" className="hover:text-white transition-colors">Ofrece tu espacio</Link>
                    <Link href="#mapa" className="hover:text-white transition-colors">Mapa de Cobertura</Link>
                    <Link href="#mapa" className="hover:text-white transition-colors">Contacto</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-neutral-300 hover:text-white transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-neutral-300 hover:text-white transition-colors z-50 relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col"
                    >
                        <div className="flex flex-col gap-6 text-2xl font-medium text-white/80">
                            <Link
                                href="#portfolio"
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-white/10 pb-4 hover:text-white hover:border-brand-blue/50 transition-all"
                            >
                                Nuestra Red
                            </Link>
                            <Link
                                href="#ofrece"
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-white/10 pb-4 hover:text-white hover:border-brand-blue/50 transition-all"
                            >
                                Ofrece tu espacio
                            </Link>
                            <Link
                                href="#mapa"
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-white/10 pb-4 hover:text-white hover:border-brand-blue/50 transition-all"
                            >
                                Mapa de Cobertura
                            </Link>
                            <Link
                                href="#mapa"
                                onClick={() => setIsMenuOpen(false)}
                                className="border-b border-white/10 pb-4 hover:text-white hover:border-brand-blue/50 transition-all"
                            >
                                Contacto
                            </Link>
                        </div>

                        <div className="mt-auto mb-12 space-y-4">
                            <p className="text-neutral-500 text-sm uppercase tracking-widest">Contacto</p>
                            <p className="text-xl text-white">+54 9 11 6382-8772</p>
                            <p className="text-neutral-400">info@zonaurbana.com.ar</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
