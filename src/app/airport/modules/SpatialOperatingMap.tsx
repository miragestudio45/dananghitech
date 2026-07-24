import React, { useEffect, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource, type Map as MapLibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "../../theme/ThemeProvider";

export const SPATIAL_OPERATING_SITES = [
  { name: "Administration & IOC", coordinates: [108.22114, 16.08649] as [number, number], tone: "#67e8f9" },
  { name: "110 kV Hoa Lien Substation", coordinates: [108.2169, 16.0903] as [number, number], tone: "#fbbf24" },
  { name: "Wastewater Treatment Plant", coordinates: [108.2267, 16.0819] as [number, number], tone: "#34d399" },
  { name: "Hoa Trung Water Plant", coordinates: [108.2288, 16.0902] as [number, number], tone: "#60a5fa" },
  { name: "Tenant factory portfolio", coordinates: [108.2204, 16.0838] as [number, number], tone: "#a78bfa" },
] as const;

const MAP_CENTER: [number, number] = [108.2211382, 16.0864903];
type MapTheme = "light" | "dark";

const MAP_STYLES: Record<MapTheme, string> = {
  light: "https://tiles.openfreemap.org/styles/bright",
  dark: "https://tiles.openfreemap.org/styles/fiord",
};

function createOperationalLayerData(layer: string) {
  const [lng, lat] = MAP_CENTER;
  const seed = [...layer].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const offset = ((seed % 7) - 3) * 0.00035;
  const isPointLayer = /(point|panorama|sensor|alarm|asset|work order|service)/i.test(layer);
  const isAreaLayer = /(land use|plot|zone|corridor|satellite|orthophoto)/i.test(layer);
  if (isPointLayer) {
    return { type: "FeatureCollection", features: Array.from({ length: 9 }, (_, index) => ({ type: "Feature", properties: { layer, index }, geometry: { type: "Point", coordinates: [lng + Math.sin(index * 1.7 + seed) * 0.005, lat + Math.cos(index * 1.3 + seed) * 0.004] } })) } as const;
  }
  if (isAreaLayer) {
    return { type: "FeatureCollection", features: Array.from({ length: 5 }, (_, index) => { const x = lng + (index - 2) * 0.0023 + offset; const y = lat + ((index % 2) - 0.5) * 0.0032; return { type: "Feature", properties: { layer, index }, geometry: { type: "Polygon", coordinates: [[[x - 0.00085, y - 0.00062], [x + 0.00085, y - 0.00062], [x + 0.00072, y + 0.00068], [x - 0.0009, y + 0.00055], [x - 0.00085, y - 0.00062]]] } }; }) } as const;
  }
  return { type: "FeatureCollection", features: Array.from({ length: 5 }, (_, index) => ({ type: "Feature", properties: { layer, index }, geometry: { type: "LineString", coordinates: Array.from({ length: 7 }, (_, point) => [lng - 0.007 + point * 0.0024, lat - 0.004 + index * 0.0018 + Math.sin(point + seed) * 0.00055]) } })) } as const;
}

function operationalLayerColor(layer: string) {
  return /(alarm|power|lighting)/i.test(layer) ? "#fbbf24" : /(water|drainage|hydrology)/i.test(layer) ? "#60a5fa" : /(planning|land|plot|zone)/i.test(layer) ? "#a78bfa" : "#67e8f9";
}

function addSpatialLayers(map: MapLibreMap, activeLayer: string, is3D: boolean) {
  const color = operationalLayerColor(activeLayer);
  if (!map.getSource("operational-layer")) map.addSource("operational-layer", { type: "geojson", data: createOperationalLayerData(activeLayer) });
  if (!map.getLayer("operational-fill")) map.addLayer({ id: "operational-fill", type: "fill", source: "operational-layer", filter: ["==", ["geometry-type"], "Polygon"], paint: { "fill-color": color, "fill-opacity": 0.18, "fill-outline-color": "#67e8f9" } });
  if (!map.getLayer("operational-line")) map.addLayer({ id: "operational-line", type: "line", source: "operational-layer", filter: ["==", ["geometry-type"], "LineString"], paint: { "line-color": color, "line-width": 3, "line-opacity": 0.82, "line-dasharray": [2, 1.2] } });
  if (!map.getLayer("operational-points")) map.addLayer({ id: "operational-points", type: "circle", source: "operational-layer", filter: ["==", ["geometry-type"], "Point"], paint: { "circle-radius": 6, "circle-color": color, "circle-stroke-color": "#06111f", "circle-stroke-width": 2, "circle-opacity": 0.9 } });

  const labelLayer = map.getStyle().layers.find((layer) => layer.type === "symbol" && layer.layout?.["text-field"])?.id;
  if (!map.getSource("openfreemap-buildings")) map.addSource("openfreemap-buildings", { type: "vector", url: "https://tiles.openfreemap.org/planet" });
  if (!map.getLayer("3d-buildings")) map.addLayer({ id: "3d-buildings", source: "openfreemap-buildings", "source-layer": "building", type: "fill-extrusion", minzoom: 14, filter: ["!=", ["get", "hide_3d"], true], layout: { visibility: is3D ? "visible" : "none" }, paint: { "fill-extrusion-color": ["interpolate", ["linear"], ["coalesce", ["get", "render_height"], 8], 0, "#29445d", 40, "#4f7fa0", 120, "#7dd3fc"], "fill-extrusion-height": ["coalesce", ["get", "render_height"], 8], "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0], "fill-extrusion-opacity": 0.82 } }, labelLayer);
}

export function SpatialOperatingMap({ selectedSite, onSelectSite, activeLayer }: { selectedSite: string; onSelectSite: (name: string) => void; activeLayer: string }) {
  const { theme: appTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const onSelectSiteRef = useRef(onSelectSite);
  const activeLayerRef = useRef(activeLayer);
  const is3DRef = useRef(true);
  const mapThemeRef = useRef<MapTheme>(appTheme);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [is3D, setIs3D] = useState(true);
  const [mapTheme, setMapTheme] = useState<MapTheme>(appTheme);

  useEffect(() => { onSelectSiteRef.current = onSelectSite; }, [onSelectSite]);
  useEffect(() => { activeLayerRef.current = activeLayer; }, [activeLayer]);
  useEffect(() => { is3DRef.current = is3D; }, [is3D]);
  useEffect(() => { setMapTheme(appTheme); }, [appTheme]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLES[mapThemeRef.current],
      center: MAP_CENTER,
      zoom: 15.8,
      pitch: 58,
      bearing: -167.304,
      attributionControl: false,
      antialias: true,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-right");

    const markers = SPATIAL_OPERATING_SITES.map((site) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = "spatial-map-marker";
      element.style.setProperty("--marker-color", site.tone);
      element.title = site.name;
      element.setAttribute("aria-label", site.name);
      element.addEventListener("click", () => onSelectSiteRef.current(site.name));
      return new maplibregl.Marker({ element, anchor: "center" }).setLngLat(site.coordinates).setPopup(new maplibregl.Popup({ offset: 18, closeButton: false }).setText(site.name)).addTo(map);
    });
    markersRef.current = markers;

    map.once("load", () => {
      addSpatialLayers(map, activeLayerRef.current, is3DRef.current);
      setReady(true);
      map.resize();
    });
    map.on("error", (event) => {
      if (!event.error?.message?.includes("404")) return;
      setFailed(true);
    });

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
      markers.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    const source = map.getSource("operational-layer") as GeoJSONSource | undefined;
    source?.setData(createOperationalLayerData(activeLayer));
    const color = operationalLayerColor(activeLayer);
    if (map.getLayer("operational-fill")) map.setPaintProperty("operational-fill", "fill-color", color);
    if (map.getLayer("operational-line")) map.setPaintProperty("operational-line", "line-color", color);
    if (map.getLayer("operational-points")) map.setPaintProperty("operational-points", "circle-color", color);
  }, [activeLayer, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    if (map.getLayer("3d-buildings")) map.setLayoutProperty("3d-buildings", "visibility", is3D ? "visible" : "none");
    map.easeTo({ pitch: is3D ? 62 : 0, bearing: is3D ? -167.304 : 0, duration: 700 });
  }, [is3D, ready]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map || mapThemeRef.current === mapTheme) return;
    mapThemeRef.current = mapTheme;
    setFailed(false);
    const restoreLayers = () => {
      addSpatialLayers(map, activeLayerRef.current, is3DRef.current);
      map.resize();
    };
    map.once("style.load", restoreLayers);
    map.setStyle(MAP_STYLES[mapTheme]);
    return () => { map.off("style.load", restoreLayers); };
  }, [mapTheme, ready]);

  useEffect(() => {
    const site = SPATIAL_OPERATING_SITES.find((item) => item.name === selectedSite);
    if (!site || !mapRef.current || !ready) return;
    mapRef.current.easeTo({ center: site.coordinates, zoom: 16.5, duration: 800 });
    markersRef.current.forEach((marker, index) => {
      marker.getElement().classList.toggle("is-active", SPATIAL_OPERATING_SITES[index].name === selectedSite);
    });
  }, [ready, selectedSite]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl bg-[var(--airport-panel)]">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute left-1/2 top-3 z-20 flex -translate-x-1/2 items-center rounded-lg border border-white/10 bg-[var(--airport-sidebar)]/88 p-1 shadow-xl backdrop-blur-xl">
        <button onClick={() => setIs3D(false)} className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${!is3D ? "bg-cyan-300 text-[var(--airport-accent-ink)]" : "text-slate-400 hover:text-white"}`}>2D</button>
        <button onClick={() => setIs3D(true)} className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${is3D ? "bg-cyan-300 text-[var(--airport-accent-ink)]" : "text-slate-400 hover:text-white"}`}>3D Buildings</button>
        <span className="mx-1 h-4 w-px bg-white/10" />
        <button onClick={() => setMapTheme("light")} title="Chế độ bản đồ sáng" className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${mapTheme === "light" ? "bg-[#fef3c7] text-slate-950" : "text-slate-400 hover:text-white"}`}>Sáng</button>
        <button onClick={() => setMapTheme("dark")} title="Chế độ bản đồ tối" className={`rounded-md px-2.5 py-1.5 text-[11px] font-semibold ${mapTheme === "dark" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"}`}>Tối</button>
      </div>
      {!ready && !failed && <div className="absolute inset-0 grid place-items-center bg-[var(--airport-sidebar)]"><div className="text-center"><span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" /><p className="mt-3 text-[12px] text-slate-400">Loading live GIS basemap...</p></div></div>}
      {failed && <div className="absolute inset-0 grid place-items-center bg-[var(--airport-sidebar)]"><div className="max-w-xs text-center"><p className="text-xs font-semibold text-white">GIS basemap is temporarily unavailable</p><p className="mt-2 text-[12px] leading-relaxed text-slate-500">Operational layers remain available. Check the OpenFreeMap connection and reload this view.</p></div></div>}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,20,.34),transparent_32%,transparent_72%,rgba(3,10,20,.18))]" />
    </div>
  );
}
