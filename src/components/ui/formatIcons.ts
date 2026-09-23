import {
    Bus,
    PanelTop,
    SunMedium,
    Columns3,
    Building2,
    BrickWall,
    Tv,
    Layers,
    LucideIcon,
} from "lucide-react";

const FORMAT_ICONS: Record<string, LucideIcon> = {
    refugio: Bus,
    cartelera_simple: PanelTop,
    pantalla_trasnluminada: SunMedium,
    columna: Columns3,
    terraza: Building2,
    medianera: BrickWall,
    pantalla_led: Tv,
};

export function getFormatIcon(type: string): LucideIcon {
    return FORMAT_ICONS[type] ?? Layers;
}
