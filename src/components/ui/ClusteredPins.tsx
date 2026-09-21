"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import type { CoveragePoint } from "@/lib/coverage";

const BRAND = "#dc2626";

const pinIcon = L.divIcon({
    className: "",
    html: `<svg width="22" height="30" viewBox="0 0 24 32" style="filter:drop-shadow(0 0 4px ${BRAND}99)">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${BRAND}" stroke="#fff" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4.5" fill="#fff"/>
    </svg>`,
    iconSize: [22, 30],
    iconAnchor: [11, 30],
    popupAnchor: [0, -28],
});

const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function clusterIcon(cluster: L.MarkerCluster) {
    return L.divIcon({
        className: "",
        html: `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:${BRAND}d9;border:2px solid #fff;color:#fff;font-weight:800;font-size:13px;box-shadow:0 0 14px ${BRAND}99">${cluster.getChildCount()}</div>`,
        iconSize: [40, 40],
    });
}

export function ClusteredPins({ points }: { points: CoveragePoint[] }) {
    const map = useMap();

    useEffect(() => {
        const group = L.markerClusterGroup({ iconCreateFunction: clusterIcon, maxClusterRadius: 40, disableClusteringAtZoom: 15 });
        for (const p of points) {
            L.marker(p.pos, { icon: pinIcon })
                .bindPopup(
                    `<div class="p-1"><h3 class="font-bold text-black">${escapeHtml(p.street || "Sin dirección")}</h3><p class="text-sm text-neutral-600">${escapeHtml(p.locality)}</p></div>`,
                    { className: "premium-popup" }
                )
                .addTo(group);
        }
        map.addLayer(group);
        return () => {
            map.removeLayer(group);
        };
    }, [map, points]);

    return null;
}
