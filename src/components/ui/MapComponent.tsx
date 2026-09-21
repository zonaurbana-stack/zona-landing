"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { coveragePoints } from "@/lib/coverage";
import { ClusteredPins } from "./ClusteredPins";
import { CoverageRadius } from "./CoverageRadius";

// Vista inicial sobre la zona principal (Ezeiza / Canning / Tristán Suárez).
// Los puntos del sur (Tordillo, Lezama) quedan fuera; se ven alejando el zoom.
const INITIAL_CENTER: [number, number] = [-34.85, -58.47];
const INITIAL_ZOOM = 11;

// Estilo del mapa: "dark" (original), "gray" (intermedio) o "light" (claro).
// Las clases están en globals.css; para volver atrás alcanza con cambiar este valor.
const TILE_STYLE: "dark" | "gray" | "light" = "dark";

export default function MapComponent() {
    return (
        <MapContainer
            center={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            style={{ height: "100%", width: "100%", background: TILE_STYLE === "dark" ? "#111" : "#d4d4d4" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                className={`map-tiles-${TILE_STYLE}`}
            />

            <CoverageRadius points={coveragePoints} />
            <ClusteredPins points={coveragePoints} />
        </MapContainer>
    );
}
