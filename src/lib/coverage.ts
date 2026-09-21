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

export const localitiesCount = new Set(coveragePoints.map((p) => p.locality)).size;

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
