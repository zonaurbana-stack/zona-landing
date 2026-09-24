"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";

export type AdSpot =
    | { kind: "photo"; image: string; kicker: string; headline: string }
    | { kind: "brand"; kicker: string; headline: [string, string] }
    | { kind: "stat"; value: number; label: string };

interface LiveAdSpotProps {
    spot: AdSpot;
    duration: number;
}

// Tamaños en cqw: la pantalla es un container, así el texto escala con su ancho.
export function LiveAdSpot({ spot, duration }: LiveAdSpotProps) {
    const reduceMotion = useReducedMotion();

    if (spot.kind === "photo") {
        return (
            <div className="absolute inset-0">
                <motion.img
                    src={spot.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: reduceMotion ? 1.15 : 1 }}
                    transition={{ duration: duration + 1, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                <div className="absolute left-[7cqw] right-[7cqw] bottom-[9cqw]">
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-[3.6cqw] font-semibold uppercase tracking-[0.25em] text-brand-blue mb-[1.5cqw]"
                    >
                        {spot.kicker}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-[8.5cqw] font-bold leading-[1] tracking-tight text-white"
                    >
                        {spot.headline}
                    </motion.p>
                </div>
            </div>
        );
    }

    if (spot.kind === "brand") {
        return (
            <div className="absolute inset-0 bg-brand-blue overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.28),transparent_55%)]" />
                <div className="absolute -right-[12cqw] -bottom-[20cqw] w-[60cqw] aspect-square rounded-full border-[1.2cqw] border-white/15" />
                <div className="absolute left-[7cqw] top-[9cqw] bottom-[9cqw] flex flex-col justify-between">
                    <p className="text-[3.6cqw] font-semibold uppercase tracking-[0.25em] text-white/75">
                        {spot.kicker}
                    </p>
                    <div className="font-display font-black uppercase leading-[0.85] tracking-tighter text-white">
                        {spot.headline.map((line, i) => (
                            <motion.p
                                key={line}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[15cqw]"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return <StatSpot value={spot.value} label={spot.label} />;
}

function StatSpot({ value, label }: { value: number; label: string }) {
    const [shown, setShown] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setShown(Math.round(v)),
        });
        return () => controls.stop();
    }, [value]);

    return (
        <div className="absolute inset-0 bg-[#0b0c0f] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(220,38,38,0.35),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:8cqw_8cqw]" />
            <div className="absolute left-[7cqw] right-[7cqw] bottom-[9cqw]">
                <p className="font-display text-[26cqw] font-extralight leading-[0.8] tracking-tighter text-white tabular-nums">
                    {shown}
                </p>
                <div className="mt-[3cqw] flex items-center gap-[2cqw]">
                    <span className="h-[0.6cqw] w-[6cqw] bg-brand-blue" />
                    <p className="text-[3.6cqw] font-semibold uppercase tracking-[0.25em] text-white/60">{label}</p>
                </div>
            </div>
        </div>
    );
}
