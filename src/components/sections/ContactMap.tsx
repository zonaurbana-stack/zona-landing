"use client";

import { ContactForm } from "./ContactForm";
import dynamic from "next/dynamic";
import { COVERAGE_RADIUS_M, coveragePoints, localitiesCount } from "@/lib/coverage";

const MapComponent = dynamic(() => import("@/components/ui/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-surface-raised flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Inicializando Red...</p>
            </div>
        </div>
    )
});

export function ContactMap() {
    return (
        <section className="relative py-32 overflow-hidden bg-surface" id="mapa">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[2px] w-12 bg-brand-blue" />
                            <span className="text-brand-blue font-bold tracking-[0.2em] text-xs uppercase">Geolocalización</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                            DOMINIO <br /> <span className="text-white/20">TERRITORIAL</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-white/40 text-lg leading-relaxed">
                            Nuestra infraestructura tecnológica permite una visualización en tiempo real de los puntos de mayor impacto en la región.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    
                    {/* Tech Map (ancho completo) */}
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-blue/50 to-transparent opacity-20 blur-sm rounded-sm" />
                        <div className="relative h-[520px] md:h-[720px] w-full bg-surface-raised border border-white/5 rounded-sm overflow-hidden group">
                            <MapComponent />
                            
                            {/* Tech Overlays */}
                            <div className="absolute top-6 left-6 z-[1000] space-y-2 pointer-events-none">
                                <div className="px-4 py-2 bg-black/80 backdrop-blur-md border border-brand-blue/20 rounded-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest text-glow">System Active</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-sm">
                                    <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{localitiesCount} localidades</span>
                                </div>
                            </div>

                            {/* Legend Tech Style */}
                            <div className="absolute bottom-6 right-6 z-[1000] bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-sm min-w-[200px]">
                                <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest mb-4">Referencia de Red</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-brand-blue" />
                                            <span className="text-xs text-white/60 uppercase font-bold tracking-tighter">Cartel</span>
                                        </div>
                                        <span className="text-[10px] text-white/20">{coveragePoints.length} UNITS</span>
                                    </div>
                                    <div className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full border border-dashed border-brand-blue bg-brand-blue/20" />
                                            <span className="text-xs text-white/60 uppercase font-bold tracking-tighter">Radio</span>
                                        </div>
                                        <span className="text-[10px] text-white/20">{COVERAGE_RADIUS_M / 1000} KM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulario debajo del mapa */}
                    <div className="bg-surface-raised border border-white/5 p-8 md:p-12 relative overflow-hidden group">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                            <div className="lg:col-span-4">
                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">ANUNCIÁ <br className="hidden lg:block" />AHORA</h3>
                                <div className="h-1 w-12 bg-brand-blue mb-6" />
                                <p className="text-white/40 text-sm leading-relaxed">
                                    Ingresá a nuestra red exclusiva. Completá el formulario para recibir una auditoría de impacto personalizada.
                                </p>
                            </div>
                            
                            <div className="lg:col-span-8">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
