"use client";

import Image from "next/image";

// Lista de marcas. 
// Si hay un 'logo', usará la imagen. Si no, usará el texto.
const brands = [
    { name: "Sancor Seguros", logo: "/logos/sancor-seguros-logo.svg" },
    { name: "Mercado Libre", logo: "/logos/mercado-libre-logo.svg" }, // SVG real
    { name: "YPF", logo: "/logos/ypf-s-a-logo.svg" },
    { name: "Sinteplast", logo: "/logos/sinte.png" },
    { name: "Santander", logo: "/logos/santander1.svg" },
    { name: "McDonald's", logo: "/logos/mcdonalds-china.svg" },
    { name: "Samsung", logo: "/logos/samsung-electronics.svg", scale: 1.3, opacity: 1 },
    { name: "Movistar", logo: "/logos/logo-movistar.svg" },
    { name: "Carrefour", logo: "/logos/carrefour-logo-1.svg" },
    { name: "DirecTV", logo: "/logos/directv-logo-1.svg" },
    { name: "Uber", logo: "/logos/uber-15.svg" },
    { name: "Sodimac", logo: "/logos/sodimac-homecenter.svg" },
    { name: "Betano", logo: "/logos/betano.svg" },
    { name: "Corona", logo: "/logos/corona-logo.svg", scale: 1.8 }, // Le damos más escala
    { name: "Patagonia", logo: "/logos/patagonia.png" },
    { name: "Aeropuertos Argentina", logo: "/logos/aa.webp" },
    { name: "American Tourister", logo: "/logos/american-tourister.svg" },
    { name: "Samsonite", logo: "/logos/samsonite-logo.svg", scale: 1.3, opacity: 1 },
    { name: "Giannoni", logo: "/logos/giaoni.png" },
    { name: "Mostaza", logo: "/logos/Mostaza3.svg" },

    { name: "Toribio Achaval", logo: "/logos/torivio.png" },
    { name: "Guapaletas", logo: "/logos/guapa.png", scale: 1.4, opacity: 1 },
    { name: "Persicco", logo: "/logos/Logo_Persicco.jpeg", scale: 0.8 },
    { name: "BNA", logo: "/logos/bna.jpg.webp" },
    { name: "Alikal", logo: "/logos/alikal.jpg" },
    { name: "Pameli", logo: "/logos/pame.jpeg" },
];

// Separador entre marcas
function Dot() {
    return <span className="text-white/10 text-3xl mx-4 select-none">◆</span>;
}

function BrandItem({ brand }: { brand: typeof brands[0] }) {
    const scale = (brand as any).scale || 1;
    const opacity = (brand as any).opacity ?? 0.9;

    return (
        <div
            className="flex items-center justify-center transition-all duration-500 hover:scale-110"
            style={{ transform: `scale(${scale})` }}
        >
            {brand.logo ? (
                <div
                    className="relative w-32 h-12 md:w-48 md:h-24 hover:opacity-100 transition-all duration-500 filter brightness-110 contrast-125"
                    style={{ opacity }}
                >
                    <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                    />
                </div>
            ) : (
                <span className="text-white/40 hover:text-white text-xl md:text-2xl font-black uppercase tracking-widest whitespace-nowrap transition-all duration-500">
                    {brand.name}
                </span>
            )}
        </div>
    );
}

export function BrandMarquee() {
    return (
        <div className="relative overflow-hidden w-full py-12 group">
            <style>{`
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee-scroll 80s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="marquee-track items-center gap-16 md:gap-24">
                {/* Primer set */}
                {brands.map((brand, idx) => (
                    <div key={`a-${idx}`} className="flex items-center gap-16 md:gap-24 shrink-0">
                        <BrandItem brand={brand} />
                        <Dot />
                    </div>
                ))}
                {/* Copia exacta para loop perfecto */}
                {brands.map((brand, idx) => (
                    <div key={`b-${idx}`} className="flex items-center gap-16 md:gap-24 shrink-0">
                        <BrandItem brand={brand} />
                        <Dot />
                    </div>
                ))}
            </div>

            {/* Fades en los bordes para un look más premium */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-surface via-surface/80 to-transparent z-10 pointer-events-none" />
        </div>
    );
}
