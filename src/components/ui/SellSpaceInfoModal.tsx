"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    TrendingUp,
    ShieldCheck,
    HardHat,
    Handshake,
    ArrowRight,
    MessageCircle,
    Building2,
    Sparkles,
} from "lucide-react";

interface SellSpaceInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenForm: () => void;
}

const BENEFICIOS = [
    {
        icon: TrendingUp,
        title: "Tasación al mejor valor de mercado",
        description:
            "Analizamos el flujo vehicular, peatonal y la visibilidad de tu espacio para ofrecerte el mejor canon locativo y acuerdo económico.",
        accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
        icon: ShieldCheck,
        title: "Gestión y permisos 100% a nuestro cargo",
        description:
            "Habilitaciones municipales, seguros y cálculos de ingeniería civil. Nosotros nos encargamos de todo el papeleo legal y reglamentario.",
        accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
        icon: HardHat,
        title: "Inversión, montaje y mantenimiento",
        description:
            "Fabricamos, instalamos y mantenemos la cartelería o pantalla publicitaria con los máximos estándares de calidad. Cero costo para vos.",
        accent: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    },
    {
        icon: Handshake,
        title: "Renta mensual asegurada",
        description:
            "Contratos claros a mediano y largo plazo con pagos puntuales garantizados todos los meses, revalorizando tu propiedad.",
        accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
];

export function SellSpaceInfoModal({
    isOpen,
    onClose,
    onOpenForm,
}: SellSpaceInfoModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                        onClick={onClose}
                    />

                    {/* Centrador */}
                    <div
                        className="min-h-full flex items-center justify-center p-4 sm:p-6"
                        onClick={onClose}
                    >
                        {/* Contenedor del Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                            className="relative w-full max-w-3xl bg-[#141417] border border-zinc-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Resplandor decorativo de fondo */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[90px] pointer-events-none" />

                            {/* Botón Cerrar (X) */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors z-50 cursor-pointer shadow-md"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="mb-6 relative z-10 pr-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/25 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-3">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Rentabilidad mensual garantizada</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                                    ¿Tenés un terreno, terraza, medianera o espacio con vista?
                                </h3>
                                <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                                    Transformá los metros ociosos de tu propiedad en una fuente constante de ingresos mensuales. 
                                    En <strong className="text-white">Zona Urbana</strong> nos encargamos de absolutamente todo, 
                                    desde la tasación y los permisos hasta la colocación y el mantenimiento.
                                </p>
                            </div>

                            {/* Grid de Beneficios */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8 relative z-10">
                                {BENEFICIOS.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700/80 transition-all flex flex-col justify-between"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${item.accent}`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold text-sm sm:text-base leading-tight mb-1">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Banner destacado: tipos de espacios */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-brand-blue/15 via-purple-500/10 to-transparent border border-brand-blue/25 mb-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-brand-blue/20 flex items-center justify-center shrink-0 text-white">
                                        <Building2 className="w-5 h-5 text-brand-blue" />
                                    </div>
                                    <div className="text-xs sm:text-sm text-zinc-300">
                                        <span className="font-semibold text-white block">
                                            Aceptamos diversas tipologías de inmuebles:
                                        </span>
                                        Lotes sobre rutas o autopistas, techos/terrazas en esquinas, medianeras ciegas y fachadas comerciales.
                                    </div>
                                </div>
                            </div>

                            {/* Acciones / Botones */}
                            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                                <button
                                    type="button"
                                    onClick={onOpenForm}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(var(--brand-blue),0.5)] cursor-pointer"
                                >
                                    <span>Tasar mi espacio ahora</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <a
                                    href="https://wa.me/5491163828772?text=Hola,%20tengo%20un%20espacio%20(terreno/terraza/medianera)%20y%20quisiera%20recibir%20asesoramiento%20para%20monetizarlo."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-200 hover:text-white transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                                    <span>Consultar por WhatsApp</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
