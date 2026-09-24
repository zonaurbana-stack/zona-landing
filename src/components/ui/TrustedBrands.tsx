import { BrandMarquee } from "@/components/ui/BrandMarquee";

export function TrustedBrands() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-blue">Marcas que confían</span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <BrandMarquee />
        </div>
    );
}
