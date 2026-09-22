"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandMarquee } from "@/components/ui/BrandMarquee";

const slides = [
    {
        image: "/via-publica/mono1.jpeg",
        title: "Acceso Canning",
        location: "Ezeiza - Canning",
        format: "Frente de Ruta",
        impact: "+800K",
        tag: "DISPONIBLE"
    },
    {
        image: "/via-publica/zona.jpg",
        title: "Zona Sur Hub",
        location: "Avenida San Martin",
        format: "Monoposte 10x5m",
        impact: "+500K",
        tag: "DISPONIBLE"
    },
    {
        image: "/via-publica/cartepubli.jpeg",
        title: "Cartel Vía Pública",
        location: "Principales Accesos",
        format: "Extra",
        impact: "+1M",
        tag: "PREMIUM"
    },
    
    {
        image: "/via-publica/portada.jpeg",
        title: "Stand ICBC",
        location: "Mantenimiento Integral",
        format: "Cartelería LED Indoor",
        impact: "+300K",
        tag: "PREMIUM"
    },
   

    {
        image: "/via-publica/mac3.jpeg",
        title: "Zona Comercial",
        location: "Ezeiza",
        format: "Skyscraper 25x15m",
        impact: "+1.2M",
        tag: "DISPONIBLE"
    }, 
    
    
    {
        image: "/via-publica/pantalla.jpg",
        title: "Impacto Nocturno",
        location: "Principales Accesos",
        format: "Iluminación LED Front",
        impact: "+1M",
        tag: "PREMIUM"
    },
    
    
    {
        image: "/via-publica/po1.jpeg",
        title: "Sector Cowork",
        location: "Stand ICBC",
        format: "Cajeros Automáticos",
        impact: "+300K",
        tag: "PREMIUM"
    },
   
    {
        image: "/via-publica/trocha.jpeg",
        title: "Paseo La Trocha",
        location: "Acceso Principal",
        format: "Letras Corpóreas",
        impact: "+400K",
        tag: "DISPONIBLE"
    },
    {
        image: "/via-publica/trocha2.jpeg",
        title: "Producción e Instalación",
        location: "Paseo La Trocha",
        format: "Letras Corpóreas",
        impact: "+400K",
        tag: "DISPONIBLE"
    },
    {
        image: "/via-publica/trocha3.jpeg",
        title: "Cartelería Vía Pública",
        location: "Canning",
        format: "Diseño y Producción",
        impact: "+600K",
        tag: "PREMIUM"
    },

];

export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const activeSlide = slides[currentIndex % slides.length];

    useEffect(() => {
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center bg-surface overflow-hidden pt-20">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Main Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 scale-110"
                    style={{ backgroundImage: 'url(/via-publica/zonanoche.jpg)' }}
                />

                {/* Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface/80 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#1e3a8a_0%,transparent_70%)] opacity-20" />
            </div>

            <div className="container relative z-10 px-6 md:px-12 xl:px-24 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT: CONTENT */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                            className="flex items-center gap-3"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Líderes en Publicidad Exterior</span>
                        </motion.div>

                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-6xl md:text-8xl xl:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8]"
                            >
                                TU MARCA
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-6xl md:text-8xl xl:text-9xl font-black text-brand-blue uppercase tracking-tighter leading-[0.8]"
                            >
                                SIN LÍMITES
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isLoaded ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-white/40 max-w-md leading-relaxed"
                        >
                            Estrategias masivas de impacto visual. Conectamos tu marca con audiencias reales en los puntos más estratégicos del país.
                        </motion.p>
                    </div>

                    {/* RIGHT: PHOTO CAROUSEL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative w-full aspect-video lg:aspect-[4/3] max-w-2xl ml-auto"
                    >
                        {/* Frames Decorative */}
                        <div className="absolute -inset-4 border border-white/5 rounded-[2rem] pointer-events-none" />

                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-surface-raised shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${activeSlide.image})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* Slide Content */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <span className="px-3 py-1 bg-brand-blue text-[10px] font-black text-white uppercase tracking-widest rounded-sm mb-4 inline-block">
                                            {activeSlide.tag}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-1">
                                            {activeSlide.title}
                                        </h3>
                                        <p className="text-sm text-white/50 font-medium uppercase tracking-widest">
                                            {activeSlide.location}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="absolute bottom-8 right-8 flex gap-2 z-10">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-brand-blue" : "w-2 bg-white/20 hover:bg-white/40"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* BOTTOM: BRANDS MARQUEE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 lg:mt-24 pt-12 border-t border-white/5 space-y-8"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Marcas que confían</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <BrandMarquee />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
            >
                <div className="w-px h-12 bg-white" />
            </motion.div>
        </section>
    );
}
