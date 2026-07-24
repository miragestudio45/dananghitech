import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity, Boxes, Building2, Camera, CheckCircle2, ChevronRight, ClipboardCheck,
  CloudCog, Database, FileBox, FileClock, FileSearch, Layers3, Map, MapPin,
  Maximize2, Minimize2, Mountain, Network, PanelRightOpen, RadioTower, Route, Satellite, ScanLine, Search, ShieldCheck, X,
  Sparkles, TimerReset, UploadCloud, Waves, Workflow, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { AirportMetricCard, AirportPanel, AirportStatusBadge } from "../shared/AirportUI";
import { SpatialOperatingMap } from "./SpatialOperatingMap";
import { PlanningOperationsMap } from "./PlanningOperationsMap";

const spatialMetrics = [
  ["Managed area", "1,128 ha", "BIM-GIS extent", "cyan"],
  ["Survey coverage", "100%", "UAV + LiDAR", "emerald"],
  ["Spatial layers", "186", "Published", "blue"],
  ["BIM facilities", "28", "12 federated", "violet"],
  ["Mapped assets", "48,620", "94.7% linked", "cyan"],
  ["Data freshness", "18 sec", "Operational feeds", "emerald"],
] as const;

const realitySources = [
  { name: "UAV photogrammetry", detail: "Orthophoto, textured mesh and construction progress", coverage: 100, icon: Satellite, status: "Published" },
  { name: "UAV LiDAR", detail: "Point cloud, canopy penetration and terrain extraction", coverage: 96, icon: ScanLine, status: "Validated" },
  { name: "Mobile mapping", detail: "Road corridor imagery, LiDAR and asset inventory", coverage: 82, icon: Route, status: "Processing" },
  { name: "Panorama 360", detail: "Field evidence and street-level inspection context", coverage: 74, icon: Camera, status: "Published" },
  { name: "GNSS RTK", detail: "Survey control, checkpoints and coordinate validation", coverage: 100, icon: MapPin, status: "Certified" },
  { name: "USV / sonar", detail: "Water-body depth and underwater survey context", coverage: 48, icon: Waves, status: "Planned" },
];

const parcels = [
  { id: "HTP-01-08", name: "Semiconductor Cluster A", left: 12, top: 18, width: 28, height: 24, zone: "High-tech manufacturing", area: "18.6 ha", state: "Operating", investor: "Strategic tenant", readiness: 98, density: "55%", floors: "3–5", utilities: "22 kV · 4.2 bar · Dual fiber" },
  { id: "HTP-02-14", name: "R&D and Laboratory Campus", left: 43, top: 12, width: 22, height: 29, zone: "Research & innovation", area: "12.4 ha", state: "Operating", investor: "Multi-tenant", readiness: 96, density: "40%", floors: "5–9", utilities: "22 kV · 4.5 bar · Private 5G" },
  { id: "HTP-03-17", name: "Advanced Manufacturing Plot", left: 18, top: 51, width: 31, height: 28, zone: "Advanced manufacturing", area: "24.8 ha", state: "Under construction", investor: "Approved project", readiness: 88, density: "60%", floors: "2–4", utilities: "22 kV · Water reserved · Fiber ready" },
  { id: "HTP-04-06", name: "Available Investment Plot", left: 54, top: 48, width: 20, height: 18, zone: "High-tech industry", area: "9.2 ha", state: "Available", investor: "Open for investment", readiness: 92, density: "55%", floors: "3–6", utilities: "Substation 1.2 km · Main water 400 mm" },
  { id: "HTP-05-09", name: "Precision Engineering Campus", left: 72, top: 22, width: 20, height: 26, zone: "Precision engineering", area: "14.7 ha", state: "Negotiation", investor: "Qualified lead", readiness: 89, density: "50%", floors: "3–5", utilities: "Dual feeder option · Wastewater reserved" },
  { id: "HTP-06-03", name: "Green Technology Plot", left: 63, top: 70, width: 27, height: 19, zone: "Green technology", area: "16.1 ha", state: "Available", investor: "Investment campaign", readiness: 84, density: "45%", floors: "2–4", utilities: "Solar-ready · Reuse water connection" },
];

const layerGroups = [
  { title: "Base & survey", items: ["Orthophoto", "Satellite", "Point cloud", "Panorama 360", "Survey control"] },
  { title: "Terrain", items: ["DSM", "DTM", "Contour", "Slope", "Hydrology"] },
  { title: "Planning", items: ["Land use", "Plot boundary", "Functional zones", "Protection corridors", "Planned roads"] },
  { title: "Infrastructure", items: ["Road", "Drainage", "Water", "Wastewater", "Power", "Lighting", "Telecom"] },
  { title: "Operations", items: ["Assets", "IoT sensors", "Alarms", "Work orders", "Tenant services"] },
];

export function SpatialDataModule({ sectionId }: { sectionId: string }) {
  if (sectionId === "reality-capture") return <RealityCapture />;
  if (sectionId === "terrain-elevation") return <TerrainElevation />;
  if (sectionId === "planning-parcels") return <PlanningParcelMap />;
  if (sectionId === "infrastructure-network") return <InfrastructureNetwork />;
  if (sectionId === "bim-federation") return <BimFederation />;
  if (sectionId === "survey-missions") return <SurveyMissions />;
  if (sectionId === "change-detection") return <ChangeDetection />;
  if (sectionId === "spatial-data-cde") return <SpatialDataCde />;
  return <SpatialCommandCenter />;
}

function MetricStrip() {
  const tones = { cyan: "border-cyan-400/18 bg-cyan-400/[.055]", emerald: "border-emerald-400/18 bg-emerald-400/[.055]", blue: "border-blue-400/18 bg-blue-400/[.055]", violet: "border-violet-400/18 bg-violet-400/[.055]" };
  return <div className="grid grid-cols-3 gap-1.5 xl:grid-cols-6">{spatialMetrics.map(([label, value, trend, tone]) => <div key={label} className={`rounded-lg border px-2.5 py-2 ${tones[tone]}`}><p className="truncate text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">{label}</p><div className="mt-1 flex items-end justify-between gap-1.5"><strong className="whitespace-nowrap text-sm leading-none text-white">{value}</strong><span className="truncate text-right text-[10px] text-cyan-200/80">{trend}</span></div></div>)}</div>;
}

function SpatialCommandCenter() {
  const [activeLayer, setActiveLayer] = useState("Orthophoto");
  const [selectedSite, setSelectedSite] = useState("110 kV Hoa Lien Substation");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const selectSite = useCallback((name: string) => { setSelectedSite(name); setContextOpen(true); }, []);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("airport-fullscreen-map-change", { detail: isMapExpanded }));
    if (!isMapExpanded) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsMapExpanded(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isMapExpanded]);
  useEffect(() => () => { window.dispatchEvent(new CustomEvent("airport-fullscreen-map-change", { detail: false })); }, []);
  return <div className="flex h-full min-h-0 flex-col gap-3">
    <div className="flex-none"><MetricStrip /></div>
    <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
      <AirportPanel title="BIM-GIS spatial operating picture" subtitle="Kéo để di chuyển · cuộn để zoom · chọn marker để xem ngữ cảnh" action={<button onClick={() => setIsMapExpanded((value) => !value)} className="airport-icon-button" title={isMapExpanded ? "Đóng chế độ mở rộng" : "Mở rộng bản đồ"}>{isMapExpanded ? <X size={15} /> : <Maximize2 size={14} />}</button>} className={`flex flex-col overflow-hidden ${isMapExpanded ? "fixed bottom-4 left-4 right-4 top-[76px] z-[96] min-h-0 bg-[var(--airport-panel)]" : "min-h-[520px] xl:min-h-0"}`}>
        <div className="relative min-h-[470px] flex-1 overflow-hidden p-3 xl:min-h-0">
          <SpatialOperatingMap selectedSite={selectedSite} onSelectSite={selectSite} activeLayer={activeLayer} />
          <div className="pointer-events-none absolute inset-3 z-10 grid grid-cols-[180px_1fr] gap-4">
            <div className="pointer-events-auto flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--airport-sidebar)]/90 p-3 shadow-2xl backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[.17em] text-cyan-300">Spatial layers</p>
              <div className="spatial-layer-scrollbar mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">{layerGroups.map((group) => <div key={group.title}><p className="text-[10px] uppercase tracking-[.12em] text-slate-600">{group.title}</p><div className="mt-1 space-y-1">{group.items.map((item) => <button key={item} onClick={() => setActiveLayer(item)} className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-[11px] transition ${activeLayer === item ? "bg-cyan-400/12 text-cyan-200" : "text-slate-400 hover:bg-white/5"}`}><span>{item}</span><span className={`h-1.5 w-1.5 rounded-full ${activeLayer === item ? "bg-cyan-300" : "bg-slate-700"}`} /></button>)}</div></div>)}</div>
            </div>
            <div className="relative">
              <div className="pointer-events-auto absolute right-11 top-0 rounded-lg border border-cyan-400/20 bg-[var(--airport-sidebar)]/88 px-3 py-2 shadow-xl backdrop-blur"><p className="text-[10px] uppercase tracking-[.15em] text-cyan-300">Active layer</p><p className="mt-1 text-xs font-semibold text-white">{activeLayer}</p></div>
              {contextOpen ? <div className="pointer-events-auto absolute bottom-0 right-0 w-72 rounded-xl border border-cyan-400/20 bg-[var(--airport-sidebar)]/94 p-3 shadow-2xl backdrop-blur-xl"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[10px] uppercase tracking-[.14em] text-cyan-300">Selected spatial context</p><h3 className="mt-1 text-xs font-semibold leading-snug text-white">{selectedSite}</h3></div><button onClick={() => setContextOpen(false)} className="airport-icon-button h-7 w-7 flex-none" title="Đóng chi tiết"><Minimize2 size={12} /></button></div><div className="mt-3 grid grid-cols-2 gap-1.5">{[["GIS features","184"],["BIM objects","2,842"],["Linked assets","1,286"],["Open issues","4"]].map(([a,b]) => <div key={a} className="rounded-lg bg-white/[.035] px-2 py-1.5"><p className="text-[10px] text-slate-500">{a}</p><p className="mt-0.5 text-[13px] font-semibold text-white">{b}</p></div>)}</div></div> : <button onClick={() => setContextOpen(true)} className="airport-button pointer-events-auto absolute bottom-0 right-0 bg-[var(--airport-sidebar)]/90 shadow-xl"><PanelRightOpen size={13} /> Chi tiết vị trí</button>}
            </div>
          </div>
        </div>
      </AirportPanel>
      <div className="grid min-h-0 grid-rows-[minmax(0,.85fr)_minmax(0,1fr)] gap-3">
        <AirportPanel title="Digital spatial foundation detail" className="flex min-h-0 flex-col overflow-hidden"><div className="airport-scrollbar min-h-0 flex-1 space-y-1.5 overflow-y-auto p-2.5">{["Reality capture and survey control","Terrain and hydrology model","Planning and parcel cadastre","BIM federation and common IDs","Operational assets and IoT linkage"].map((item, index) => <div key={item} className="flex items-center gap-2 rounded-lg border border-white/[.06] bg-white/[.025] px-2.5 py-2"><span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-cyan-400/10 text-[11px] font-bold text-cyan-300">{index + 1}</span><p className="min-w-0 flex-1 text-[11px] leading-snug text-slate-300">{item}</p><CheckCircle2 size={12} className="flex-none text-emerald-300" /></div>)}</div></AirportPanel>
        <AirportPanel title="Decision use cases" className="flex min-h-0 flex-col overflow-hidden"><div className="airport-scrollbar grid min-h-0 flex-1 content-start gap-1.5 overflow-y-auto p-2.5">{["Land and investment decisions","Utility capacity and connection readiness","Construction progress and compliance","Flood and environmental simulation","Asset lifecycle and predictive maintenance"].map((item) => <button key={item} onClick={() => toast.info(item)} className="flex items-center justify-between gap-2 rounded-lg border border-cyan-400/10 bg-cyan-400/[.035] px-2.5 py-2 text-left text-[11px] leading-snug text-slate-300 hover:border-cyan-400/25"><span>{item}</span><ChevronRight size={12} className="flex-none text-cyan-300" /></button>)}</div></AirportPanel>
      </div>
    </div>
  </div>;
}

function RealityCapture() {
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Orthophoto","3.5 cm","GSD","cyan"],["Point cloud","18.4B","points","violet"],["Survey controls","168","validated","emerald"],["Panoramas","12,840","geotagged","blue"],["Road coverage","82%","mobile mapping","amber"],["Latest mission","2 days","ago","cyan"]].map(([a,b,c,d]) => <AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact />)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
      <AirportPanel title="Reality capture sources and processing status"><div className="grid grid-cols-2 gap-3 p-4">{realitySources.map((source) => { const Icon = source.icon; return <div key={source.name} className="rounded-xl border border-white/[.07] bg-white/[.025] p-4"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={18} /></span><AirportStatusBadge status={source.status === "Planned" ? "offline" : source.status === "Processing" ? "warning" : "normal"} label={source.status} /></div><h3 className="mt-3 text-xs font-semibold text-white">{source.name}</h3><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{source.detail}</p><div className="mt-4 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded bg-white/[.06]"><div className="h-full rounded bg-cyan-300" style={{ width: `${source.coverage}%` }} /></div><span className="text-[11px] font-semibold text-cyan-200">{source.coverage}%</span></div></div>; })}</div></AirportPanel>
      <AirportPanel title="Survey-to-digital-twin workflow"><div className="space-y-3 p-4">{[["01","Mission planning","Coverage, permits, control points"],["02","Field capture","UAV, LiDAR, GNSS, mobile mapping"],["03","Processing","Point cloud, orthophoto, DSM/DTM"],["04","Quality control","Accuracy, completeness, coordinate checks"],["05","Publishing","SLPK, web scene, BIM/GIS layers"],["06","Change detection","Compare versions and create issues"]].map(([n,a,b],index) => <div key={n} className="relative flex gap-3 rounded-lg border border-white/[.06] bg-white/[.025] p-3"><span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-violet-400/10 text-[12px] font-bold text-violet-300">{n}</span><div><p className="text-[12px] font-semibold text-white">{a}</p><p className="mt-1 text-[11px] text-slate-500">{b}</p></div>{index < 5 && <div className="absolute -bottom-3 left-7 h-3 w-px bg-violet-400/25" />}</div>)}</div></AirportPanel>
    </div>
  </>;
}

function TerrainElevation() {
  const [surface, setSurface] = useState<"DSM" | "DTM">("DTM");
  const points = surface === "DTM" ? [24,28,31,35,42,49,57,54,48,41,36,32,29,27] : [26,38,44,62,55,71,82,68,64,58,43,39,31,29];
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Elevation range","4.2–128 m","Hòn Dấu","cyan"],["DTM resolution","0.5 m","terrain","emerald"],["DSM resolution","0.25 m","surface","blue"],["Contours","1 m","interval","violet"],["High-slope area","6.8%",">15°","amber"],["Drainage basins","18","modelled","cyan"]].map(([a,b,c,d]) => <AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact />)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
      <AirportPanel title="Terrain and elevation analytical surface" action={<div className="flex rounded-lg border border-white/10 bg-white/[.03] p-1">{(["DTM","DSM"] as const).map((item) => <button key={item} onClick={() => setSurface(item)} className={`rounded px-3 py-1.5 text-[11px] font-bold ${surface === item ? "bg-cyan-300 text-[var(--airport-accent-ink)]" : "text-slate-500"}`}>{item}</button>)}</div>}>
        <div className="p-4">
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-cyan-400/12 bg-gradient-to-b from-[var(--airport-panel-strong)] to-[var(--airport-panel)]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 360" preserveAspectRatio="none">
              <defs><linearGradient id="terrainFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(34,211,238,.55)"/><stop offset=".55" stopColor="rgba(52,211,153,.22)"/><stop offset="1" stopColor="rgba(4,17,31,.1)"/></linearGradient></defs>
              <path d={`M 0 ${340-points[0]*3} ${points.map((p,i)=>`L ${(i/(points.length-1))*1000} ${340-p*3}`).join(" ")} L 1000 360 L 0 360 Z`} fill="url(#terrainFill)" />
              <path d={`M 0 ${340-points[0]*3} ${points.map((p,i)=>`L ${(i/(points.length-1))*1000} ${340-p*3}`).join(" ")}`} fill="none" stroke="#67e8f9" strokeWidth="3" />
              {[70,140,210,280].map((y)=><line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,.08)" />)}
            </svg>
            <div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-[var(--airport-sidebar)]/80 px-3 py-2"><p className="text-[10px] uppercase tracking-[.14em] text-cyan-300">Active surface</p><p className="mt-1 text-sm font-semibold text-white">{surface === "DTM" ? "Bare-earth terrain" : "Buildings and vegetation surface"}</p></div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-4 gap-2">{[["Lowest","4.2 m"],["Median","34.8 m"],["Highest","128 m"],["Flood threshold","18.0 m"]].map(([a,b]) => <div key={a} className="rounded-lg border border-white/10 bg-[var(--airport-sidebar)]/75 p-2 backdrop-blur"><p className="text-[10px] text-slate-500">{a}</p><p className="mt-1 text-xs font-semibold text-white">{b}</p></div>)}</div>
          </div>
        </div>
      </AirportPanel>
      <div className="space-y-4">
        <AirportPanel title="Analytical products"><div className="grid gap-2 p-3">{["Elevation and contour","Slope and aspect","Catchment and flow direction","Cut / fill planning","Flood simulation terrain","Protection-corridor checks"].map((item,index)=><div key={item} className="flex items-center gap-3 rounded-lg border border-white/[.06] bg-white/[.025] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">{index < 2 ? <Mountain size={15}/> : index < 4 ? <Map size={15}/> : <Waves size={15}/>}</span><p className="text-[12px] text-slate-300">{item}</p></div>)}</div></AirportPanel>
        <AirportPanel title="Model confidence"><div className="space-y-3 p-4">{[["Vertical accuracy","±7 cm",96],["Ground classification","98.2%",98],["Hydrology completeness","94.8%",95],["Survey control closure","1:48,000",99]].map(([a,b,v])=><div key={a as string}><div className="flex justify-between text-[11px]"><span className="text-slate-400">{a}</span><b className="text-white">{b}</b></div><div className="mt-1 h-1.5 overflow-hidden rounded bg-white/[.06]"><div className="h-full bg-emerald-300" style={{width:`${v}%`}}/></div></div>)}</div></AirportPanel>
      </div>
    </div>
  </>;
}

export function PlanningParcelMap() {
  const [selected, setSelected] = useState(parcels[0]);
  const [filter, setFilter] = useState("All");
  const [isPlanningExpanded, setIsPlanningExpanded] = useState(false);
  const filtered = useMemo(() => filter === "All" ? parcels : parcels.filter((parcel) => parcel.state === filter), [filter]);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("airport-fullscreen-map-change", { detail: isPlanningExpanded }));
    if (!isPlanningExpanded) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsPlanningExpanded(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isPlanningExpanded]);
  useEffect(() => () => { window.dispatchEvent(new CustomEvent("airport-fullscreen-map-change", { detail: false })); }, []);
  return <>
    <div className="grid grid-cols-3 gap-1.5 xl:grid-cols-6">{[["Total plots","186","managed"],["Occupied area","78%","park-wide"],["Available land","146.8 ha","investment"],["Negotiation","12 plots","qualified"],["Construction","18 projects","active"],["Utility ready","91.6%","weighted"]].map(([a,b,c]) => <div key={a} className="rounded-lg border border-cyan-400/15 bg-cyan-400/[.045] px-2.5 py-2"><p className="truncate text-[10px] font-semibold uppercase tracking-[.12em] text-slate-500">{a}</p><div className="mt-1 flex items-end justify-between gap-1"><strong className="whitespace-nowrap text-sm leading-none text-white">{b}</strong><span className="truncate text-[10px] text-cyan-200/75">{c}</span></div></div>)}</div>
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/[.07] bg-[var(--airport-panel)]/80 p-2"><Search size={14} className="ml-2 text-slate-500"/><input className="min-w-52 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-slate-600" placeholder="Search plot, investor or project…"/>{["All","Available","Negotiation","Under construction","Operating"].map((item)=><button key={item} onClick={()=>setFilter(item)} className={`rounded-lg px-3 py-2 text-[11px] font-semibold ${filter===item?"bg-cyan-300 text-[var(--airport-accent-ink)]":"bg-white/[.035] text-slate-400"}`}>{item}</button>)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.4fr_.6fr]">
      <AirportPanel title="Planning and parcel operations map" subtitle="Bản đồ GIS thật · ranh giới lô đất · trạng thái đầu tư · công trình 3D" action={<button onClick={() => setIsPlanningExpanded((value) => !value)} className="airport-icon-button" title={isPlanningExpanded ? "Đóng chế độ mở rộng" : "Mở rộng bản đồ"}>{isPlanningExpanded ? <X size={15}/> : <Maximize2 size={14}/>}</button>} className={`flex flex-col overflow-hidden ${isPlanningExpanded ? "fixed bottom-4 left-4 right-4 top-[76px] z-[96] bg-[var(--airport-panel)]" : ""}`}>
        <div className="relative min-h-[580px] flex-1 overflow-hidden rounded-b-xl bg-[var(--airport-panel)]"><PlanningOperationsMap parcels={filtered} selectedId={selected.id} onSelect={(id) => { const parcel = parcels.find((item) => item.id === id); if (parcel) setSelected(parcel); }} /></div>
      </AirportPanel>
      <AirportPanel title={selected.name} subtitle={`${selected.id} · ${selected.zone}`}>
        <div className="space-y-4 p-4">
          <div className="flex items-center justify-between"><AirportStatusBadge status={selected.state === "Available" ? "optimized" : selected.state === "Under construction" ? "warning" : "normal"} label={selected.state}/><span className="text-[11px] text-slate-500">Readiness <b className="text-cyan-200">{selected.readiness}%</b></span></div>
          <div className="grid grid-cols-2 gap-2">{[["Area",selected.area],["Investor",selected.investor],["Build density",selected.density],["Permitted height",selected.floors]].map(([a,b])=><div key={a} className="rounded-lg border border-white/[.06] bg-white/[.025] p-3"><p className="text-[10px] text-slate-500">{a}</p><p className="mt-1 text-[12px] font-semibold text-white">{b}</p></div>)}</div>
          <div className="rounded-xl border border-cyan-400/12 bg-cyan-400/[.035] p-3"><p className="text-[10px] uppercase tracking-[.14em] text-cyan-300">Infrastructure connectivity</p><p className="mt-2 text-[12px] leading-relaxed text-slate-300">{selected.utilities}</p></div>
          <div className="space-y-2">{[["Planning dossier","Published"],["Investment workflow",selected.state === "Available" ? "Open campaign" : "Active"],["BIM / survey context","Linked"],["Environmental constraints","No critical conflict"]].map(([a,b],index)=><div key={a} className="flex items-center justify-between rounded-lg bg-white/[.025] px-3 py-2.5"><span className="text-[11px] text-slate-400">{a}</span><AirportStatusBadge status={index===1&&selected.state==="Under construction"?"warning":"normal"} label={b}/></div>)}</div>
          <button onClick={()=>toast.success(`${selected.id} digital dossier opened`)} className="airport-button w-full justify-center"><FileSearch size={14}/>Open digital land dossier</button>
        </div>
      </AirportPanel>
    </div>
  </>;
}

function InfrastructureNetwork() {
  const networks = [
    ["Electrical", "248 km", "99.998%", "#fbbf24", Zap],
    ["Water supply", "186 km", "4.2 bar", "#22d3ee", Waves],
    ["Wastewater", "142 km", "68% load", "#a78bfa", Workflow],
    ["Stormwater", "214 km", "N+1 pumps", "#60a5fa", CloudCog],
    ["Telecom & 5G", "328 km", "99.97%", "#34d399", RadioTower],
    ["Road & lighting", "92 km", "99.4%", "#fb7185", Route],
  ] as const;
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{networks.map(([name,length,status])=><AirportMetricCard key={name} label={name} value={length} trend={status} compact />)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
      <AirportPanel title="Integrated infrastructure network topology"><div className="relative min-h-[500px] overflow-hidden p-4"><div className="absolute inset-0 bg-[var(--airport-panel)]"/><svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 500" preserveAspectRatio="none">{networks.map(([, , ,color],index)=><path key={color} d={`M 40 ${70+index*66} C 210 ${30+index*74}, 360 ${130+index*35}, 520 ${85+index*58} S 780 ${150+index*40}, 960 ${70+index*61}`} fill="none" stroke={color} strokeWidth={index===0?7:4} opacity=".68" strokeDasharray={index===2?"12 8":"0"}/>)}</svg><div className="relative grid grid-cols-3 gap-3">{networks.map(([name,length,status,color,Icon])=><button key={name} onClick={()=>toast.info(`${name} network context opened`)} className="rounded-xl border border-white/10 bg-[var(--airport-sidebar)]/75 p-3 text-left backdrop-blur"><div className="flex items-center justify-between"><Icon size={16} style={{color}}/><AirportStatusBadge status={name==="Stormwater"?"warning":"normal"}/></div><p className="mt-3 text-[12px] font-semibold text-white">{name}</p><p className="mt-1 text-[11px] text-slate-500">{length} · {status}</p></button>)}</div><div className="absolute bottom-4 left-4 right-4 rounded-xl border border-cyan-400/15 bg-[var(--airport-sidebar)]/88 p-4 backdrop-blur"><div className="grid grid-cols-5 gap-3">{[["Common ID","INF-000184"],["GIS feature","LineString ZM"],["BIM link","Utility corridor U-04"],["Sensors","28 linked"],["Work orders","2 open"]].map(([a,b])=><div key={a}><p className="text-[10px] text-slate-500">{a}</p><p className="mt-1 text-[11px] font-semibold text-white">{b}</p></div>)}</div></div></div></AirportPanel>
      <AirportPanel title="Underground-utility governance"><div className="space-y-2 p-3">{["Common utility corridor model","Depth and protection corridor checks","Permit-to-dig workflow","As-built and survey evidence","Isolation and outage impact tracing","Inspection and maintenance history"].map((item,index)=><div key={item} className="flex items-center gap-3 rounded-lg border border-white/[.06] bg-white/[.025] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">{index<3?<Network size={15}/>:<ClipboardCheck size={15}/>}</span><div className="flex-1"><p className="text-[12px] text-slate-300">{item}</p><p className="mt-1 text-[10px] text-slate-600">{index<3?"Planning and risk control":"Lifecycle evidence"}</p></div><CheckCircle2 size={14} className="text-emerald-300"/></div>)}</div></AirportPanel>
    </div>
  </>;
}

function BimFederation() {
  const [selected, setSelected] = useState("110 kV Hoa Lien Substation");
  const models = [
    ["Administration & IOC", "LOD 300", "94% mapped", "Published"],
    ["110 kV Hoa Lien Substation", "LOD 350", "98% mapped", "Live linked"],
    ["Wastewater Treatment Plant", "LOD 350", "96% mapped", "Live linked"],
    ["Hoa Trung Water Plant", "LOD 300", "91% mapped", "Validated"],
    ["Tenant factory portfolio", "Mixed", "78% mapped", "In progress"],
  ];
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Federated models","28","facilities","cyan"],["BIM objects","1.84M","indexed","violet"],["Common IDs","94.7%","coverage","emerald"],["Sensor links","124,860","operational","blue"],["Open clashes","42","12 priority","amber"],["Document links","86,420","controlled","cyan"]].map(([a,b,c,d])=><AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact/>)}</div>
    <div className="grid gap-4 xl:grid-cols-[.55fr_1.45fr]">
      <AirportPanel title="Federated model portfolio"><div className="space-y-2 p-3">{models.map(([name,lod,mapped,state])=><button key={name} onClick={()=>setSelected(name)} className={`w-full rounded-xl border p-3 text-left ${selected===name?"border-cyan-400/25 bg-cyan-400/[.07]":"border-white/[.06] bg-white/[.025]"}`}><div className="flex items-center justify-between"><p className="text-[12px] font-semibold text-white">{name}</p><AirportStatusBadge status={state==="In progress"?"warning":"normal"} label={state}/></div><div className="mt-2 flex gap-3 text-[10px] text-slate-500"><span>{lod}</span><span>•</span><span>{mapped}</span></div></button>)}</div></AirportPanel>
      <div className="space-y-4">
        <AirportPanel title={`${selected} · Digital thread`} subtitle="GIS feature → BIM object → asset → sensor → alarm → work order → document">
          <div className="p-4"><div className="grid grid-cols-7 gap-2">{[["GIS","Spatial feature",Map],["BIM","IFC object",Boxes],["Asset","Master record",Building2],["IoT","Live telemetry",Activity],["Alarm","Operational event",ShieldCheck],["Work","CMMS workflow",Workflow],["Docs","Controlled evidence",FileBox]].map(([title,detail,Icon],index)=><div key={title as string} className="relative rounded-xl border border-cyan-400/12 bg-cyan-400/[.035] p-3 text-center"><span className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={16}/></span><p className="mt-2 text-[11px] font-semibold text-white">{title}</p><p className="mt-1 text-[10px] text-slate-600">{detail}</p>{index<6&&<ChevronRight size={14} className="absolute -right-[12px] top-1/2 z-10 -translate-y-1/2 text-cyan-300/45"/>}</div>)}</div></div>
        </AirportPanel>
        <div className="grid gap-4 xl:grid-cols-2">
          <AirportPanel title="BIM-GIS readiness"><div className="grid grid-cols-2 gap-2 p-4">{[["IFC properties","98.2%"],["Spatial placement","100%"],["Asset mapping","94.7%"],["Sensor mapping","91.8%"],["Document linkage","96.4%"],["Change history","100%"]].map(([a,b])=><div key={a} className="rounded-lg border border-white/[.06] bg-white/[.025] p-3"><p className="text-[10px] text-slate-500">{a}</p><p className="mt-1 text-sm font-semibold text-white">{b}</p></div>)}</div></AirportPanel>
          <AirportPanel title="Open coordination issues"><div className="space-y-2 p-3">{["Cable trench conflicts with drainage culvert","Four equipment objects missing asset IDs","As-built elevation differs from survey by 86 mm","Maintenance zone clearance requires review"].map((item,index)=><div key={item} className="rounded-lg border border-amber-400/12 bg-amber-400/[.035] p-3"><div className="flex justify-between gap-3"><p className="text-[11px] text-slate-300">{item}</p><AirportStatusBadge status={index===0?"critical":"warning"}/></div></div>)}</div></AirportPanel>
        </div>
      </div>
    </div>
  </>;
}

function SurveyMissions() {
  const missions = [
    ["UAV-260711-04","Plot HTP-03-17","Construction progress","92%","Processing"],
    ["LDR-260710-02","Green Corridor","LiDAR terrain update","100%","Validated"],
    ["MM-260708-01","Internal Road R3","Mobile mapping","78%","Capturing"],
    ["USV-260705-03","Retention Lake A","Bathymetry","100%","Published"],
    ["GNSS-260704-02","Park-wide","Control verification","100%","Certified"],
  ];
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Active missions","4","authorized","cyan"],["Completed month","28","survey packages","emerald"],["Coverage update","18.6 km²","processed","blue"],["Processing queue","3","jobs","amber"],["QC pass rate","98.4%","first pass","emerald"],["Evidence packages","42","published","violet"]].map(([a,b,c,d])=><AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact/>)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.25fr_.75fr]">
      <AirportPanel title="Survey mission control"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-white/[.025] text-[10px] uppercase tracking-[.12em] text-slate-500"><tr>{["Mission","Area","Purpose","Coverage","Status"].map(x=><th key={x} className="px-4 py-3">{x}</th>)}</tr></thead><tbody>{missions.map(([id,area,purpose,coverage,status])=><tr key={id} className="border-t border-white/[.055] text-[12px]"><td className="px-4 py-3 font-mono text-cyan-300">{id}</td><td className="px-4 py-3 text-white">{area}</td><td className="px-4 py-3 text-slate-400">{purpose}</td><td className="px-4 py-3 text-slate-300">{coverage}</td><td className="px-4 py-3"><AirportStatusBadge status={status==="Processing"||status==="Capturing"?"warning":"normal"} label={status}/></td></tr>)}</tbody></table></div></AirportPanel>
      <AirportPanel title="Mission data lifecycle"><div className="space-y-3 p-4">{[[UploadCloud,"Upload raw data","Checksum and mission metadata"],[CloudCog,"Process","Orthophoto, point cloud, DSM/DTM"],[ClipboardCheck,"Quality control","Accuracy and completeness"],[Database,"Publish","SLPK, web scene and catalog"],[Sparkles,"Detect change","Create issues and update digital twin"]].map(([Icon,title,detail],index)=><div key={title as string} className="flex gap-3 rounded-lg border border-white/[.06] bg-white/[.025] p-3"><span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={16}/></span><div><p className="text-[12px] font-semibold text-white">{title as string}</p><p className="mt-1 text-[10px] text-slate-500">{detail as string}</p></div>{index<3?<AirportStatusBadge status="normal" label="Ready"/>:<AirportStatusBadge status="info" label="Automated"/>}</div>)}</div></AirportPanel>
    </div>
  </>;
}

function ChangeDetection() {
  const [threshold, setThreshold] = useState(12);
  const changes = useMemo(() => [
    ["Construction progress","Plot HTP-03-17","+8.6% volume",threshold<15?"Review":"Normal"],
    ["Unauthorized stockpile","Road reserve R4","1,840 m³",threshold<20?"Priority":"Review"],
    ["Terrain modification","Green corridor","420 m²",threshold<10?"Review":"Normal"],
    ["New rooftop equipment","Tenant TEN-042","12 objects","Normal"],
    ["Vegetation encroachment","Power corridor PC-02","186 m","Review"],
  ], [threshold]);
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Survey versions","14","retained","cyan"],["Detected changes","84","this cycle","amber"],["Auto-classified","91.6%","confidence","emerald"],["Priority issues","6","field verify","red"],["Work orders","18","generated","blue"],["Approved updates","62","published","violet"]].map(([a,b,c,d])=><AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact/>)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
      <AirportPanel title="Survey version comparison"><div className="p-4"><div className="relative h-[430px] overflow-hidden rounded-2xl border border-white/10 bg-[var(--airport-sidebar)]"><div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(34,211,238,.1),rgba(139,92,246,.08)),radial-gradient(circle_at_30%_40%,rgba(52,211,153,.18),transparent_28%)]"/><div className="absolute left-1/2 top-0 h-full w-px bg-white/35"/><div className="absolute left-4 top-4 rounded-lg border border-white/10 bg-[var(--airport-sidebar)]/80 px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Baseline</p><p className="mt-1 text-[12px] font-semibold text-white">Survey 2026-05-18</p></div><div className="absolute right-4 top-4 rounded-lg border border-cyan-400/20 bg-[var(--airport-sidebar)]/80 px-3 py-2 text-right"><p className="text-[10px] uppercase text-cyan-300">Current</p><p className="mt-1 text-[12px] font-semibold text-white">Survey 2026-07-11</p></div>{[[28,34],[63,48],[45,70],[78,25]].map(([x,y],i)=><div key={i} style={{left:`${x}%`,top:`${y}%`}} className="absolute h-16 w-24 -translate-x-1/2 -translate-y-1/2 rounded border-2 border-amber-300/70 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,.18)]"><span className="absolute -top-5 left-0 text-[10px] font-semibold text-amber-200">Δ {i+1}</span></div>)}</div><div className="mt-4"><div className="flex justify-between text-[11px]"><span className="text-slate-400">Detection threshold</span><b className="text-cyan-200">{threshold} cm / {threshold*2} m²</b></div><input type="range" min="5" max="30" value={threshold} onChange={(e)=>setThreshold(Number(e.target.value))} className="mt-2 w-full accent-cyan-300"/></div></div></AirportPanel>
      <AirportPanel title="Detected changes and workflow"><div className="space-y-2 p-3">{changes.map(([type,area,value,state],index)=><button key={type as string} onClick={()=>toast.info(`${type} · ${area}`)} className="w-full rounded-xl border border-white/[.06] bg-white/[.025] p-3 text-left"><div className="flex items-start justify-between gap-3"><div><p className="text-[12px] font-semibold text-white">{type}</p><p className="mt-1 text-[11px] text-slate-500">{area} · {value}</p></div><AirportStatusBadge status={state==="Priority"?"critical":state==="Review"?"warning":"normal"} label={state}/></div><div className="mt-3 flex items-center gap-2 text-[10px] text-slate-600"><span>Detect</span><ChevronRight size={10}/><span>Verify</span><ChevronRight size={10}/><span>Issue</span><ChevronRight size={10}/><span>Publish</span></div></button>)}</div></AirportPanel>
    </div>
  </>;
}

function SpatialDataCde() {
  const formats = ["LAS / LAZ","SLPK","IFC","RVT","DWG","XLSX","Feature Class","Multipatch","Web Map","Web Scene"];
  const stages = [
    ["Work in Progress","Authoring and internal checks","84 packages","warning"],
    ["Shared","Coordination and review","42 packages","info"],
    ["Published","Approved operational data","186 layers","normal"],
    ["Archive","Immutable historical versions","1.84 TB","offline"],
  ] as const;
  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{[["Catalog items","2,842","discoverable","cyan"],["Published layers","186","operational","emerald"],["Controlled files","86,420","versioned","blue"],["Lineage coverage","92.4%","improving","violet"],["Approval SLA","1.8 days","median","emerald"],["Access reviews","12","open","amber"]].map(([a,b,c,d])=><AirportMetricCard key={a} label={a} value={b} trend={c} tone={d as any} compact/>)}</div>
    <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
      <AirportPanel title="Common Data Environment lifecycle"><div className="grid grid-cols-4 gap-3 p-4">{stages.map(([name,detail,count,status],index)=><div key={name} className="relative rounded-xl border border-cyan-400/12 bg-cyan-400/[.035] p-4"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">{index===0?<FileClock size={18}/>:index===1?<Workflow size={18}/>:index===2?<ClipboardCheck size={18}/>:<Database size={18}/>}</span><h3 className="mt-4 text-xs font-semibold text-white">{name}</h3><p className="mt-1 text-[11px] leading-relaxed text-slate-500">{detail}</p><p className="mt-4 text-lg font-semibold text-cyan-200">{count}</p><div className="mt-2"><AirportStatusBadge status={status}/></div>{index<3&&<ChevronRight size={16} className="absolute -right-[13px] top-1/2 z-10 text-cyan-300/50"/>}</div>)}</div></AirportPanel>
      <AirportPanel title="Spatial standards and interoperability"><div className="p-4"><div className="grid grid-cols-2 gap-2">{formats.map((format)=><div key={format} className="flex items-center gap-2 rounded-lg border border-white/[.06] bg-white/[.025] px-3 py-2.5"><FileBox size={14} className="text-cyan-300"/><span className="text-[12px] text-slate-300">{format}</span></div>)}</div><div className="mt-4 grid grid-cols-2 gap-2">{[["Horizontal CRS","VN-2000"],["Vertical datum","Hòn Dấu"],["Common identifier","Spatial ID + Asset ID"],["Exchange policy","OpenBIM + GIS services"]].map(([a,b])=><div key={a} className="rounded-lg bg-white/[.025] p-3"><p className="text-[10px] text-slate-500">{a}</p><p className="mt-1 text-[12px] font-semibold text-white">{b}</p></div>)}</div></div></AirportPanel>
    </div>
    <div className="grid gap-4 xl:grid-cols-3">
      <AirportPanel title="Governance"><div className="space-y-2 p-3">{["Role-based access and data classification","Version, approval and immutable audit trail","Metadata, lineage and quality score","Common ID and change history"].map(x=><div key={x} className="flex gap-2 rounded-lg bg-white/[.025] p-3 text-[11px] text-slate-300"><ShieldCheck size={14} className="text-emerald-300"/>{x}</div>)}</div></AirportPanel>
      <AirportPanel title="Collection roadmap"><div className="space-y-2 p-3">{["Phase 1 · Existing GIS, survey and planning","Phase 2 · BIM and asset mapping","Phase 3 · IoT / OT live linkage","Phase 4 · Simulation and automated update"].map((x,i)=><div key={x} className="flex items-center gap-3 rounded-lg bg-white/[.025] p-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-violet-400/10 text-[11px] font-bold text-violet-300">{i+1}</span><p className="text-[11px] text-slate-300">{x}</p></div>)}</div></AirportPanel>
      <AirportPanel title="Data ownership"><div className="space-y-2 p-3">{[["Park Management Board","Land, planning, enterprise records"],["Infrastructure operator","Utility and asset data"],["Tenants","Project, building and compliance data"],["Survey / BIM consultants","Authoring and update packages"]].map(([a,b])=><div key={a} className="rounded-lg bg-white/[.025] p-3"><p className="text-[11px] font-semibold text-white">{a}</p><p className="mt-1 text-[10px] text-slate-500">{b}</p></div>)}</div></AirportPanel>
    </div>
  </>;
}
