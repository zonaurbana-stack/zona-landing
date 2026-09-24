"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AdSpot, LiveAdSpot } from "@/components/ui/LiveAdSpot";

const SPOT_DURATION = 5; // segundos por spot

// Color del halo que la pantalla "tira" sobre el fondo, según el spot activo.
const GLOW: Record<AdSpot["kind"], string> = {
    photo: "rgba(255, 196, 140, 0.35)",
    brand: "rgba(220, 38, 38, 0.55)",
    stat: "rgba(220, 38, 38, 0.3)",
};

interface LiveAdScreenProps {
    activeFormats: number;
    href: string;
    showPole?: boolean;
}

export function LiveAdScreen({ activeFormats, href, showPole = true }: LiveAdScreenProps) {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    const spots = useMemo<AdSpot[]>(() => {
        const list: AdSpot[] = [
            { kind: "photo", image: "/via-publica/mono1.jpeg", kicker: "¿Lo viste?", headline: "Así funciona la vía pública." },
            { kind: "brand", kicker: "Espacio disponible", headline: ["Tu marca", "acá."] },
            { kind: "photo", image: "/via-publica/pantalla.jpg", kicker: "Día y noche", headline: "Tu marca, las 24 horas." },
        ];
        if (activeFormats > 0) {
            list.splice(2, 0, { kind: "stat", value: activeFormats, label: "Formatos activos" });
        }
        return list;
    }, [activeFormats]);

    useEffect(() => {
        const timer = setInterval(() => setIndex((i) => (i + 1) % spots.length), SPOT_DURATION * 1000);
        return () => clearInterval(timer);
    }, [spots.length]);

    const spot = spots[index % spots.length];

    return (
        <motion.a
            href={href}
            aria-label="Este espacio puede ser tuyo — consultá disponibilidad"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative block"
        >
            {/* Halo sobre el fondo */}
            <motion.div
                aria-hidden
                className="absolute -inset-8 rounded-[3rem] blur-3xl pointer-events-none"
                animate={{ backgroundColor: GLOW[spot.kind] }}
                transition={{ duration: 1.2 }}
                style={{ opacity: 0.6 }}
            />

            {/* Pantalla */}
            <div className="relative rounded-xl p-[3px] bg-gradient-to-b from-white/25 via-white/10 to-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="@container relative aspect-video overflow-hidden rounded-[9px] bg-black">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={index}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <LiveAdSpot spot={spot} duration={SPOT_DURATION} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Progreso por spot, estilo stories */}
                    <div className="absolute top-[4cqw] left-[5cqw] right-[5cqw] flex gap-[1.2cqw] z-10">
                        {spots.map((_, i) => (
                            <div key={i} className="h-[0.7cqw] min-h-[2px] flex-1 rounded-full bg-white/25 overflow-hidden">
                                {i < index && <div className="h-full w-full bg-white" />}
                                {i === index && (
                                    <motion.div
                                        key={index}
                                        className="h-full bg-white"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: SPOT_DURATION, ease: "linear" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Indicador en vivo */}
                    <div className="absolute top-[8cqw] right-[5cqw] z-10 flex items-center gap-[1.5cqw] rounded-full bg-black/40 backdrop-blur-sm px-[2.5cqw] py-[1cqw]">
                        <span className="relative flex h-[1.8cqw] w-[1.8cqw]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                            <span className="relative inline-flex h-full w-full rounded-full bg-brand-blue" />
                        </span>
                        <span className="text-[2.8cqw] font-semibold uppercase tracking-[0.2em] text-white/90">En vivo</span>
                    </div>

                    {/* Reflejo del vidrio */}
                    {!reduceMotion && (
                        <motion.div
                            aria-hidden
                            className="absolute inset-y-0 -left-1/2 w-1/2 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]"
                            animate={{ x: ["0%", "400%"] }}
                            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 7 }}
                        />
                    )}
                    <div aria-hidden className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
                </div>
            </div>

            {/* Estructura: poste que se pierde en el fondo */}
            {showPole && <div aria-hidden className="mx-auto h-24 w-[5px] bg-gradient-to-b from-white/25 via-white/10 to-transparent" />}
        </motion.a>
    );
}
