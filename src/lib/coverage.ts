import raw from "@/data/cobertura.json";

export type LatLng = [number, number];

export interface CoveragePoint {
    id: number;
    locality: string;
    street: string;
    pos: LatLng;
}

/** Radio de cobertura de cada cartel, en metros. */
export const COVERAGE_RADIUS_M = 800;

interface GeoFeature {
    properties: { locality: string; street: string };
    geometry: { type: string; coordinates: number[] };
}

// GeoJSON guarda [lng, lat]; Leaflet espera [lat, lng].
export const coveragePoints: CoveragePoint[] = (raw.features as GeoFeature[])
    .filter((f) => f.geometry.type === "Point")
    .map((f, id) => ({
        id,
        locality: f.properties.locality,
        street: f.properties.street,
        pos: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
    }));

export function countLocalities(points: CoveragePoint[]) {
    return new Set(points.map((p) => p.locality)).size;
}

interface RawLocation {
    id: number;
    locality: string;
    street: string;
    latitude: string;
    longitude: string;
}

/** Trae los puntos live del backend de Sistema Zona; si no hay API URL, falla o no trae nada, usa el fallback estático. */
export async function getCoveragePoints(): Promise<CoveragePoint[]> {
    const apiUrl = process.env.SISTEMA_ZONA_API_URL;
    if (!apiUrl) return coveragePoints;

    try {
        const res = await fetch(`${apiUrl}/api/v1/public/locations/`, {
            next: { revalidate: 86400 }, // 1 vez por día: no tiene sentido pegarle más seguido a un mapa de terrenos que casi no cambia
        });
        if (!res.ok) return coveragePoints;

        const data: RawLocation[] = await res.json();
        if (!data.length) return coveragePoints;

        return data.map((loc) => ({
            id: loc.id,
            locality: loc.locality,
            street: loc.street,
            pos: [Number(loc.latitude), Number(loc.longitude)] as LatLng,
        }));
    } catch {
        return coveragePoints; // backend caído o sin red: la landing sigue andando con los datos locales
    }
}

const ROUTE_RE = /\b(?:ruta|rp|rn)\s*(?:provincial|prov\.?|nacional)?\s*(\d+)/gi;

/** Nombres cortos para mostrar: localidades (más carteles primero) y rutas mencionadas en las direcciones. */
export function coverageLabels(points: CoveragePoint[]): string[] {
    const counts = new Map<string, number>();
    const routes = new Set<string>();

    for (const p of points) {
        const name = p.locality.replace(/^Partido de /, "").replace(" Internacional", "");
        counts.set(name, (counts.get(name) ?? 0) + 1);
        for (const m of p.street.matchAll(ROUTE_RE)) routes.add(`Ruta ${m[1]}`);
    }

    const localities = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
    const sortedRoutes = [...routes].sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)));

    // Intercala una ruta cada dos localidades para que el banner no quede agrupado.
    const out: string[] = [];
    localities.forEach((loc, i) => {
        out.push(loc);
        if (i % 2 === 1 && sortedRoutes.length) out.push(sortedRoutes.shift()!);
    });
    return [...out, ...sortedRoutes];
}
