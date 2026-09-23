"use client";

import { useEffect, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, MessageCircle, Building2, MapPin, Phone, Mail, User, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitSpaceLead, type ContactFormState } from "@/app/actions";

interface SellSpaceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initialState: ContactFormState = { success: false, message: "" };

export function SellSpaceModal({ isOpen, onClose }: SellSpaceModalProps) {
    const [state, formAction, isPending] = useActionState(submitSpaceLead, initialState);

    // Cierre con tecla Escape y bloqueo del scroll de fondo
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
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
                    {/* Backdrop oscuro con blur que cierra al hacer clic */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                        onClick={onClose}
                    />

                    {/* Centrador de contenido */}
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
                            className="relative w-full max-w-2xl bg-[#141417] border border-zinc-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón Cerrar (X) */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors z-50 cursor-pointer shadow-md"
                                aria-label="Cerrar modal"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="mb-6 relative z-10 pr-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                    <Building2 className="w-3.5 h-3.5 text-red-400" />
                                    <span>Ofrecé tu espacio publicitario</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                    Tasá y monetizá tu ubicación
                                </h3>
                                <p className="text-sm text-zinc-300 mt-2 max-w-lg leading-relaxed">
                                    Dejanos los datos de tu propiedad, medianera o terreno. Analizamos la viabilidad técnica y comercial para presentarte una propuesta directa.
                                </p>
                            </div>

                            {state.success ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 my-6 relative z-10"
                                >
                                    <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-emerald-400 mb-2">¡Solicitud recibida!</h4>
                                        <p className="text-zinc-200 text-sm max-w-md mx-auto leading-relaxed">
                                            {state.message}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="mt-4 px-6 py-2.5 rounded-lg border border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-medium text-sm cursor-pointer"
                                    >
                                        Entendido, cerrar
                                    </button>
                                </motion.div>
                            ) : (
                                <form action={formAction} className="space-y-4 relative z-10">
                                    {state.message && (
                                        <div className="p-3.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-sm font-medium">
                                            {state.message}
                                        </div>
                                    )}

                                    {/* Fila 1: Nombre y Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="modal-name" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                                                <User className="w-3.5 h-3.5 text-zinc-400" />
                                                Nombre y Apellido <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="modal-name"
                                                name="name"
                                                placeholder="Tu nombre completo"
                                                className="bg-zinc-800/90 text-white placeholder:text-zinc-400 border border-zinc-700 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 h-11"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="modal-email" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                                                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="modal-email"
                                                name="email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                className="bg-zinc-800/90 text-white placeholder:text-zinc-400 border border-zinc-700 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 h-11"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Fila 2: Teléfono y Ubicación */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="modal-phone" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                                                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                                                Teléfono / WhatsApp <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="modal-phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="Ej: +54 9 11 2345-6789"
                                                className="bg-zinc-800/90 text-white placeholder:text-zinc-400 border border-zinc-700 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 h-11"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="modal-location" className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5 uppercase tracking-wider">
                                                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                                                Ubicación o Dirección <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="modal-location"
                                                name="location"
                                                placeholder="Ej: Panamericana km 34, Tigre"
                                                className="bg-zinc-800/90 text-white placeholder:text-zinc-400 border border-zinc-700 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 h-11"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Fila 3: Detalles adicionales */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="modal-details" className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                                            Detalles del espacio (Medidas aproximadas, orientación, visibilidad)
                                        </label>
                                        <Textarea
                                            id="modal-details"
                                            name="details"
                                            rows={3}
                                            placeholder="Ej: Terreno sobre colectora con 20m de frente, vista franca hacia el tránsito que ingresa..."
                                            className="bg-zinc-800/90 text-white placeholder:text-zinc-400 border border-zinc-700 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/30 min-h-[90px]"
                                        />
                                    </div>

                                    {/* Fila 4: Acciones */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <button
                                            type="submit"
                                            disabled={isPending}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                        >
                                            {isPending ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Enviando información...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>Enviar información del espacio</span>
                                                </>
                                            )}
                                        </button>

                                        <a
                                            href="https://wa.me/5491163828772?text=Hola,%20tengo%20un%20espacio%20publicitario%20para%20ofrecer."
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                                            <span>¿Preferís WhatsApp? Escribinos</span>
                                        </a>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
