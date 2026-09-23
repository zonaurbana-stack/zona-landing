import { BillboardFormat } from "@/lib/formats";
import { getFormatIcon } from "@/components/ui/formatIcons";

interface AvailableFormatsStripProps {
    formats: BillboardFormat[];
}

export function AvailableFormatsStrip({ formats }: AvailableFormatsStripProps) {
    if (!formats || formats.length === 0) return null;

    const totalCount = formats.reduce((sum, f) => sum + f.count, 0);

    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4 border-y border-white/[0.06]">
            {/* Live label + total */}
            <div className="flex items-center gap-3 pr-6 lg:border-r border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-blue" />
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-semibold">
                    Red en vivo
                </span>
                <span className="text-xl font-light text-white tracking-tight leading-none">
                    {totalCount}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-medium">
                    Formatos activos
                </span>
            </div>

            {/* Formats */}
            {formats.map((item) => {
                const Icon = getFormatIcon(item.type);
                return (
                    <div key={item.type} className="flex items-center gap-2 group cursor-default">
                        <Icon
                            className="w-[14px] h-[14px] text-white/30 group-hover:text-brand-blue transition-colors duration-300"
                            strokeWidth={1.5}
                        />
                        <span className="text-[11px] text-white/50 font-medium tracking-wide group-hover:text-white/90 transition-colors duration-300">
                            {item.label}
                        </span>
                        <span className="text-[11px] font-semibold text-white/80">{item.count}</span>
                    </div>
                );
            })}
        </div>
    );
}
