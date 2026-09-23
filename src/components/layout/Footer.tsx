"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-surface-sunken border-t border-white/5 pt-20 pb-10 overflow-hidden">
            <div className="container px-6 md:px-12 xl:px-24 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    
                    {/* Branding */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="relative w-40 h-14 md:w-48 md:h-16">
                                <Image 
                                    src="/logo.jpeg" 
                                    alt="Zona Urbana" 
                                    fill 
                                    className="object-contain object-left" 
                                />
                            </div>
                        </div>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                            Expertos en comunicación visual y publicidad exterior. Transformamos marcas en hitos urbanos.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Secciones</h4>
                        <ul className="space-y-4">
                            {["Nuestra Red", "Ofrece tu espacio", "Mapa de Cobertura", "Contacto"].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-neutral-400 hover:text-brand-blue transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Contacto</h4>
                        <div className="space-y-4">
                            <a href="mailto:contacto@zonaurbana.com.ar" className="block group">
                                <p className="text-[10px] text-neutral-600 uppercase font-black mb-1">Email General</p>
                                <p className="text-sm text-neutral-300 group-hover:text-brand-blue transition-colors font-medium">contacto@zonaurbana.com.ar</p>
                            </a>
                            <div className="pt-2">
                                <p className="text-[10px] text-neutral-600 uppercase font-black mb-1">Ubicación</p>
                                <a 
                                    href="https://maps.google.com/?q=Trieste+110,+Union+Ferroviaria,+Buenos+Aires"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/location block"
                                >
                                    <p className="text-sm text-neutral-300 group-hover/location:text-brand-blue transition-colors font-medium">
                                        Trieste 110, Ezeiza
                                    </p>
                                    <p className="text-[10px] text-brand-blue/80 group-hover/location:text-brand-blue font-bold uppercase tracking-widest mt-1 transition-colors">
                                        Cómo llegar →
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Redes Sociales</h4>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://www.instagram.com/zonaurbanapublicidad?igsh=YTdjenh4djdvaTk=" icon="instagram" />
                            <SocialLink href="https://www.tiktok.com/@zona.urbana676?_r=1&_t=ZS-96KIvI6wPL6" icon="tiktok" />
                        </div>
                        <div className="pt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                            <p className="text-[10px] text-brand-blue font-black uppercase tracking-widest mb-1 italic">Seguinos</p>
                            <p className="text-neutral-500 text-xs">Enterate de nuestras últimas instalaciones en tiempo real.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-600">
                        © {new Date().getFullYear()} ZONA URBANA PUBLICIDAD. TODOS LOS DERECHOS RESERVADOS.
                    </p>
                    <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <span className="text-[9px] font-black uppercase tracking-tighter text-neutral-400">Desarrollado por</span>
                        <span className="text-[10px] font-black text-white tracking-widest">M.VAGLIVIELLO</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: "instagram" | "tiktok" | "facebook" }) {
    const icons = {
        instagram: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        ),
        tiktok: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
        ),
        facebook: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
        )
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300"
        >
            {icons[icon]}
        </motion.a>
    );
}
