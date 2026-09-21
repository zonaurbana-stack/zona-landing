"use client";

import { useState } from "react";
import { Circle, useMap, useMapEvents } from "react-leaflet";
import { COVERAGE_RADIUS_M, type CoveragePoint } from "@/lib/coverage";

const BRAND = "#dc2626";
// Debajo de este zoom los radios se pisan y ensucian el mapa; ahí alcanzan los clusters.
const MIN_ZOOM = 12;

export function CoverageRadius({ points }: { points: CoveragePoint[] }) {
    const map = useMap();
    const [zoom, setZoom] = useState(map.getZoom());
    useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

    if (zoom < MIN_ZOOM) return null;

    return points.map((p) => (
        <Circle
            key={p.id}
            center={p.pos}
            radius={COVERAGE_RADIUS_M}
            interactive={false}
            pathOptions={{ color: BRAND, weight: 1, opacity: 0.6, fillColor: BRAND, fillOpacity: 0.08, dashArray: "5 4" }}
        />
    ));
}
