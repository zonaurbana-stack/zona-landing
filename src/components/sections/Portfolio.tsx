"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { WorksModal, worksImages } from "@/components/ui/WorksModal";
import { TrustedBrands } from "@/components/ui/TrustedBrands";
import { ArrowUpRight, Eye, Sparkles, MapPin, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
    {
        id: "01",
        category: "Publicidad Vial",
        title: "Vía Pública & LED",
        desc: "Grandes formatos estratégicos y pantallas LED de gran escala en los principales accesos, rutas y autopistas de mayor circulación.",
        image: "/via-publica/mono4.jpeg",
        accentColor: "#2563eb",
        stats: [{ label: "Ubicaciones", value: "+120" }, { label: "Impacto", value: "Masivo" }],
        features: [
            "Monopostes y Pantallas LED de Alta Resolución",
            "Posiciones Estratégicas en Accesos y Rutas Clave",
            "Exposición Continua 24/7 de Máxima Visibilidad"
        ]
    },
    {
        id: "02",
        category: "Digital & Dinámico",
        title: "Negocios & Ploteos",
        desc: "Marquesinas, cartelería comercial, letras corpóreas 3D y ploteos integrales de locales y flotas para potenciar la identidad de tu marca.",
        image: "/negocios-ploteos/sancor.jpeg",
        accentColor: "#8b5cf6",
        stats: [{ label: "Locales", value: "300+" }, { label: "Calidad", value: "Premium" }],
        features: [
            "Marquesinas Comerciales y Renovación de Fachadas",
            "Letras Corpóreas 3D con Iluminación LED Front/Backlight",
            "Ploteos Integrales para Vidrieras y Vehículos Comerciales"
        ]
    },
    {
        id: "03",
        category: "Señalética & Fachadas",
        title: "Arquitectura Comercial",
        desc: "Identidad corporativa aplicada a fachadas, tótems de ingreso y sistemas de señalización inteligente para grandes superficies.",
        image: "/senaletica/ca.jpeg",
        accentColor: "#10b981",
        stats: [{ label: "Proyectos", value: "+80" }, { label: "Diseño", value: "360°" }],
        features: [
            "Sistemas de Señalética Integral Interior y Exterior",
            "Montajes Estructurales y Colocación Segura en Altura",
            "Materiales Nobles Resistentes a la Intemperie"
        ]
    },
    {
        id: "04",
        category: "Impresión & Formato",
        title: "Mobiliario Urbano",
        desc: "Impresión digital de alta fidelidad para gigantografías, lonas de gran formato, banners y piezas gráficas especiales.",
        image: "/impresion/arqui1.jpeg",
        accentColor: "#ef4444",
        stats: [{ label: "m² Mes", value: "5000+" }, { label: "Resolución", value: "Ultra HD" }],
        features: [
            "Gigantografías en Lonas Frontlight y Backlight",
            "Tecnología de Impresión UV de Larga Durabilidad",
            "Confección, Soldadura y Terminaciones Reforzadas"
        ]
    }
];

function ServiceCard({
    service,
    index,
    onOpenModal
}: {
    service: typeof services[0];
    index: number;
    onOpenModal: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Smooth tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(smoothMouseY, [-200, 200], [4, -4]);
    const rotateY = useTransform(smoothMouseX, [-200, 200], [-4, 4]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const imageCount = worksImages[service.id]?.length || 0;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-[88vw] sm:w-[80vw] lg:w-[75vw] max-w-[1050px] shrink-0 snap-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] via-surface-raised/90 to-surface/95 p-3 sm:p-5 md:p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20"
        >
            {/* Ambient Background Aura */}
            <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 pointer-events-none -z-10"
                style={{ backgroundColor: service.accentColor }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Image Column */}
                <motion.div
                    style={{ perspective: 1000, rotateX, rotateY }}
                    onClick={onOpenModal}
                    className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] rounded-2xl overflow-hidden cursor-pointer group/img select-none"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover/img:scale-105 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                    <div
                        className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${service.accentColor}25 0%, transparent 75%)`
                        }}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-bold tracking-wider uppercase shadow-xl">
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: service.accentColor }}
                            />
                            <span>{service.category}</span>
                        </div>

                        <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/80 font-mono text-xs font-bold tracking-wider shadow-xl">
                            {service.id} <span className="text-white/30">/ 04</span>
                        </div>
                    </div>

                    {/* Center hover indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 pointer-events-none z-10">
                        <div className="px-5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-2xl scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <Eye className="w-4 h-4" style={{ color: service.accentColor }} />
                            <span>Ver Trabajos ({imageCount} fotos)</span>
                        </div>
                    </div>

                    {/* Floating Bottom Stats */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center gap-3">
                        {service.stats.map((s, i) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-xl transition-all duration-300 hover:border-white/30 hover:scale-105"
                            >
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                                    style={{
                                        backgroundColor: `${service.accentColor}25`,
                                        color: service.accentColor
                                    }}
                                >
                                    {i === 0 ? <MapPin className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                                </div>
                                <div>
                                    <p className="text-base font-black text-white leading-none tracking-tight">
                                        {s.value}
                                    </p>
                                    <p className="text-[9px] uppercase font-bold tracking-wider text-white/50 mt-0.5">
                                        {s.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Text & Content Column */}
                <div className="lg:col-span-5 flex flex-col justify-between p-3 sm:p-5 lg:p-6">
                    <div className="space-y-4 sm:space-y-5">
                        {/* Category badge */}
                        <div className="flex items-center gap-2.5">
                            <span
                                className="h-1.5 w-6 rounded-full"
                                style={{ backgroundColor: service.accentColor }}
                            />
                            <span
                                className="text-xs font-extrabold uppercase tracking-[0.25em]"
                                style={{ color: service.accentColor }}
                            >
                                {service.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                            {service.desc}
                        </p>

                        {/* Feature Highlights */}
                        <div className="pt-1 space-y-2.5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                                <Sparkles className="w-3 h-3" style={{ color: service.accentColor }} />
                                Características Clave
                            </p>
                            <div className="space-y-2">
                                {service.features.map((feat) => (
                                    <div
                                        key={feat}
                                        className="flex items-start gap-2.5 text-xs text-neutral-300 font-medium"
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                                            style={{ backgroundColor: service.accentColor }}
                                        />
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02, x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onOpenModal}
                            className="group/btn inline-flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 cursor-pointer shadow-lg"
                            style={{
                                backgroundColor: `${service.accentColor}20`,
                                border: `1px solid ${service.accentColor}50`
                            }}
                        >
                            <span>Ver Trabajos</span>
                            <div
                                className="w-5 h-5 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                                style={{ backgroundColor: `${service.accentColor}30` }}
                            >
                                <ArrowUpRight className="w-3 h-3" style={{ color: service.accentColor }} />
                            </div>
                        </motion.button>

                        <div className="text-white/40 text-xs font-mono">
                            <span>{imageCount} fotos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Portfolio() {
    const [activeModal, setActiveModal] = useState<typeof services[0] | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const scrollToIndex = (index: number) => {
        if (!trackRef.current) return;
        const container = trackRef.current;
        const cards = container.children;
        if (cards[index]) {
            const card = cards[index] as HTMLElement;
            const containerWidth = container.offsetWidth;
            const cardLeft = card.offsetLeft;
            const cardWidth = card.offsetWidth;
            container.scrollTo({
                left: cardLeft - (containerWidth - cardWidth) / 2,
                behavior: "smooth"
            });
            setCurrentIndex(index);
        }
    };

    const handlePrev = () => {
        const nextIdx = Math.max(0, currentIndex - 1);
        scrollToIndex(nextIdx);
    };

    const handleNext = () => {
        const nextIdx = Math.min(services.length - 1, currentIndex + 1);
        scrollToIndex(nextIdx);
    };

    // Detect active card on manual scroll
    const handleScroll = () => {
        if (!trackRef.current) return;
        const container = trackRef.current;
        const centerPos = container.scrollLeft + container.offsetWidth / 2;
        const cards = Array.from(container.children) as HTMLElement[];

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, idx) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(centerPos - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = idx;
            }
        });

        if (closestIndex !== currentIndex) {
            setCurrentIndex(closestIndex);
        }
    };

    return (
        <section id="portfolio" className="relative bg-surface overflow-hidden py-12 sm:py-16">
            {/* Works Modal */}
            {activeModal && (
                <WorksModal
                    serviceId={activeModal.id}
                    serviceTitle={activeModal.title}
                    accentColor={activeModal.accentColor}
                    onClose={() => setActiveModal(null)}
                />
            )}

            {/* Marcas que confían (solo celular; en desktop va en el Hero) */}
            <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mb-10">
                <TrustedBrands />
            </div>

            {/* Header Marquee */}
            <div className="relative overflow-hidden border-y border-white/5 py-5 bg-white/[0.01] backdrop-blur-sm mb-10">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-16"
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <span className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                SOLUCIONES 360°
                            </span>
                            <div className="w-2.5 h-2.5 bg-brand-blue rotate-45" />
                            <span className="text-2xl md:text-4xl font-black text-white/30 uppercase tracking-tighter">
                                CARTELERÍA COMERCIAL
                            </span>
                            <div className="w-2.5 h-2.5 bg-white/20 rotate-45" />
                            <span className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                PLOTEO INTEGRAL
                            </span>
                            <div className="w-2.5 h-2.5 bg-brand-blue rotate-45" />
                            <span className="text-2xl md:text-4xl font-black text-white/30 uppercase tracking-tighter">
                                MARQUESINAS & LED
                            </span>
                            <div className="w-2.5 h-2.5 bg-white/20 rotate-45" />
                            <span className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                GRAN FORMATO
                            </span>
                            <div className="w-2.5 h-2.5 bg-brand-blue rotate-45" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Section Header with Navigation Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-brand-blue text-xs font-bold tracking-widest uppercase mb-3">
                            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                            Unidades de Negocio
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
                            Nuestra Red & Servicios
                        </h2>
                    </div>

                    {/* Lateral Navigation Arrows */}
                    <div className="flex items-center gap-4">
                        <div className="text-xs font-mono text-white/40 hidden sm:block">
                            <span className="text-white font-bold">{String(currentIndex + 1).padStart(2, "0")}</span>
                            <span> / 04</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                aria-label="Anterior"
                                className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === services.length - 1}
                                aria-label="Siguiente"
                                className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Category Selector Pills */}
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide py-4">
                    {services.map((s, idx) => {
                        const isActive = currentIndex === idx;
                        return (
                            <button
                                key={s.id}
                                onClick={() => scrollToIndex(idx)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 border ${
                                    isActive
                                        ? "bg-white text-black border-white shadow-lg"
                                        : "bg-white/[0.03] text-white/50 border-white/10 hover:text-white hover:border-white/20"
                                }`}
                            >
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: s.accentColor }}
                                />
                                <span>{s.title}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Horizontal Scroll Track */}
            <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-1280px)/2+2rem))] py-4 select-none cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: "smooth" }}
            >
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        index={index}
                        onOpenModal={() => setActiveModal(service)}
                    />
                ))}
            </div>

            {/* Track Footer Indicators */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {services.map((s, idx) => (
                        <button
                            key={s.id}
                            onClick={() => scrollToIndex(idx)}
                            aria-label={`Ir a ${s.title}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                currentIndex === idx ? "w-8 bg-brand-blue" : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                        />
                    ))}
                </div>
                <p className="text-[11px] uppercase tracking-widest text-white/30 font-medium">
                    ← Desliza lateralmente para explorar →
                </p>
            </div>

            {/* Bottom CTA Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-surface-raised via-surface to-surface-raised p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

                    <div className="relative z-10 text-center md:text-left">
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-blue" />
                            ¿Listo para destacar tu negocio?
                        </p>
                        <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                            TU MARCA, NUESTRA CIUDAD
                        </h4>
                        <p className="text-white/60 text-sm mt-2 max-w-lg">
                            Consúltanos por disponibilidad de espacios publicitarios, cotizaciones a medida y proyectos especiales.
                        </p>
                    </div>

                    <a
                        href="#mapa"
                        className="relative z-10 px-8 sm:px-10 py-4 sm:py-5 bg-brand-blue text-white font-black uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-white hover:text-black transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] shrink-0 flex items-center gap-3 cursor-pointer"
                    >
                        <span>HABLAR CON UN ASESOR</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
