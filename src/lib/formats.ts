export interface BillboardFormat {
    type: string;
    label: string;
    count: number;
}

/** Fallback inicial seguro en caso de fallo de red, backend apagado o respuesta inválida */
export const DEFAULT_FORMATS: BillboardFormat[] = [
    { type: "refugio", label: "Refugio", count: 67 },
    { type: "cartelera_simple", label: "Cartelería", count: 34 },
    { type: "pantalla_trasnluminada", label: "Pantalla transluminada", count: 20 },
    { type: "columna", label: "Columna", count: 5 },
    { type: "terraza", label: "Terraza", count: 5 },
    { type: "medianera", label: "Medianera", count: 2 },
    { type: "pantalla_led", label: "Pantalla LED", count: 1 },
];

function isValidFormatItem(item: unknown): item is BillboardFormat {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Record<string, unknown>;
    return (
        typeof candidate.type === "string" &&
        candidate.type.trim().length > 0 &&
        typeof candidate.label === "string" &&
        candidate.label.trim().length > 0 &&
        typeof candidate.count === "number" &&
        Number.isFinite(candidate.count) &&
        candidate.count >= 0
    );
}

/**
 * Trae los formatos de carteles y soportes activos desde el endpoint público del ERP.
 * Se ejecuta únicamente en el servidor con caché (revalidate de 1 hora) para no exceder el throttle de 30 req/min por IP.
 * Si la petición falla o la respuesta no es válida, retorna el fallback por defecto sin romper la página.
 */
export async function getBillboardFormats(): Promise<BillboardFormat[]> {
    const apiUrl = process.env.SISTEMA_ZONA_API_URL;
    if (!apiUrl) return DEFAULT_FORMATS;

    try {
        const res = await fetch(`${apiUrl}/api/v1/public/formats/`, {
            next: { revalidate: 3600 }, // 1 hora de caché server-side
        });

        if (!res.ok) return DEFAULT_FORMATS;

        const data: unknown = await res.json();
        if (!Array.isArray(data) || data.length === 0) return DEFAULT_FORMATS;

        const validated: BillboardFormat[] = [];
        for (const item of data) {
            if (isValidFormatItem(item)) {
                validated.push({
                    type: item.type,
                    label: item.label,
                    count: Math.round(item.count),
                });
            }
        }

        if (validated.length === 0) return DEFAULT_FORMATS;

        // Garantiza orden descendente por cantidad de unidades
        return validated.sort((a, b) => b.count - a.count);
    } catch {
        return DEFAULT_FORMATS;
    }
}
