"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SellSpaceModal } from "@/components/ui/SellSpaceModal";
import { SellSpaceInfoModal } from "@/components/ui/SellSpaceInfoModal";

export const SellYourSpace = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    return (
        <section className="relative py-24 overflow-hidden" id="ofrece">
            {/* Background with gradient darker than main bg to separate sections */}
            <div className="absolute inset-0 bg-brand-dark/50" />

            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                            ¿Tenés un espacio para vender?
                        </h2>
                        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            En Zona Urbana nos encargamos de todo el proceso. Desde la tasación hasta la firma, garantizamos una experiencia premium y sin complicaciones.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand-blue text-white rounded-full font-medium transition-all hover:bg-brand-blue/90 hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(var(--brand-blue),0.5)] cursor-pointer"
                            >
                                <span>Vender mi espacio</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsInfoModalOpen(true)}
                                className="px-8 py-4 text-white/70 hover:text-white transition-colors font-medium border border-white/10 rounded-full hover:bg-white/5 cursor-pointer"
                            >
                                Más información
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <SellSpaceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <SellSpaceInfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                onOpenForm={() => {
                    setIsInfoModalOpen(false);
                    setIsModalOpen(true);
                }}
            />
        </section>
    );
};

