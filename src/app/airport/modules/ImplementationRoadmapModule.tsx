import React, { useMemo, useState } from "react";
import {
  BarChart3, Boxes, CheckCircle2, ClipboardList, Database, Factory, Layers3,
  Network, ShieldCheck, Sparkles, Timer, Workflow,
} from "lucide-react";
import { toast } from "sonner";
import { AirportMetricCard, AirportPanel, AirportStatusBadge } from "../shared/AirportUI";

const phases = [
  {
    id: "P1",
    name: "Digital Spatial Foundation",
    duration: "6–9 months",
    range: [20, 28],
    scope: ["BIM-GIS platform and spatial data catalog", "Survey data, orthophoto, point cloud, DSM/DTM", "Land, planning and parcel management", "IOC foundation, integration standards and CDE"],
    dependencies: "Existing survey, planning, GIS and legal-data handover",
    acceptance: "Published web maps/scenes, governed catalog, common IDs and operational parcel workflows",
    icon: Layers3,
  },
  {
    id: "P2",
    name: "Connected Operations",
    duration: "9–14 months",
    range: [32, 48],
    scope: ["IoT, SCADA and EBO/BMS integration", "Power quality, water, environment and traffic", "FM/CMMS, asset registry and digital thread", "Cybersecurity, edge infrastructure and historian"],
    dependencies: "Point lists, protocols, field-device audit and network readiness",
    acceptance: "Live telemetry, alarm workflows, SLA dashboards, auditable commands and linked work orders",
    icon: Network,
  },
  {
    id: "P3",
    name: "Digital Twin Intelligence",
    duration: "8–12 months",
    range: [24, 38],
    scope: ["Flood and drainage simulation", "Pollution dispersion and utility-outage twin", "Predictive maintenance and energy AI", "Change detection and data-quality automation"],
    dependencies: "Calibrated models, historical data, asset criticality and operating procedures",
    acceptance: "Validated scenarios, model confidence, explainability, human approval and measurable avoided loss",
    icon: Sparkles,
  },
  {
    id: "P4",
    name: "Multi-site & Governed Automation",
    duration: "7–12 months",
    range: [18, 30],
    scope: ["Connected industrial-park operating model", "Shared KPI, regional IOC and benchmark services", "Approval-based orchestration and rollback", "Optimization, digital permits and autonomous inspection"],
    dependencies: "Cross-site governance, shared data model and operating authority",
    acceptance: "Multi-site visibility, coordinated workflows, audit trail and controlled automation",
    icon: Workflow,
  },
] as const;

export function ImplementationRoadmapModule() {
  const [scenario, setScenario] = useState<"Lean" | "Target" | "Advanced">("Target");
  const multiplier = scenario === "Lean" ? .82 : scenario === "Advanced" ? 1.18 : 1;
  const totals = useMemo(() => {
    const low = phases.reduce((sum, phase) => sum + phase.range[0], 0) * multiplier;
    const high = phases.reduce((sum, phase) => sum + phase.range[1], 0) * multiplier;
    return [Math.round(low), Math.round(high)];
  }, [multiplier]);

  return <>
    <div className="rounded-xl border border-amber-400/20 bg-amber-400/[.055] px-4 py-3 text-[10px] leading-relaxed text-amber-100">
      <b>Indicative planning estimate only.</b> The range below is a proposal-planning framework, not a commercial quotation. Final CAPEX/OPEX requires site survey, point-list audit, integration scope, device retrofit quantities, software licensing, tax and procurement assumptions.
    </div>

    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">
      <AirportMetricCard label="Delivery horizon" value="30–42 mo" trend="Phased" tone="cyan" compact />
      <AirportMetricCard label="Indicative CAPEX" value={`₫${totals[0]}–${totals[1]}B`} trend={scenario} tone="amber" compact />
      <AirportMetricCard label="Core workstreams" value="12" trend="Integrated" tone="blue" compact />
      <AirportMetricCard label="Acceptance gates" value="4" trend="Phase-based" tone="emerald" compact />
      <AirportMetricCard label="Risk reserve" value="10–15%" trend="Recommended" tone="violet" compact />
      <AirportMetricCard label="OPEX planning" value="12–18%" trend="of CAPEX / year" tone="cyan" compact />
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[.07] bg-[#071426]/80 p-3">
      <div><p className="text-[9px] uppercase tracking-[.15em] text-cyan-300">Investment scenario</p><p className="mt-1 text-[10px] text-slate-500">Adjusts scope depth, resilience, device retrofit and integration intensity.</p></div>
      <div className="flex rounded-xl border border-white/10 bg-white/[.025] p-1">{(["Lean","Target","Advanced"] as const).map((item) => <button key={item} onClick={() => setScenario(item)} className={`rounded-lg px-4 py-2 text-[9px] font-semibold ${scenario === item ? "bg-cyan-300 text-slate-950" : "text-slate-500 hover:text-white"}`}>{item}</button>)}</div>
    </div>

    <div className="grid gap-4 xl:grid-cols-4">
      {phases.map((phase, index) => {
        const Icon = phase.icon;
        const low = Math.round(phase.range[0] * multiplier);
        const high = Math.round(phase.range[1] * multiplier);
        return <AirportPanel key={phase.id} title={`${phase.id} · ${phase.name}`} subtitle={phase.duration}>
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Icon size={18}/></span><AirportStatusBadge status={index === 0 ? "normal" : index === 1 ? "info" : "warning"} label={index === 0 ? "Start here" : index === 1 ? "Core rollout" : "Data dependent"}/></div>
            <div><p className="text-[8px] uppercase tracking-[.14em] text-slate-600">Indicative range</p><p className="mt-1 text-2xl font-semibold text-white">₫{low}–{high}B</p></div>
            <div className="space-y-2">{phase.scope.map((item) => <div key={item} className="flex gap-2 rounded-lg bg-white/[.025] p-2.5 text-[9px] leading-relaxed text-slate-300"><CheckCircle2 size={13} className="mt-0.5 flex-none text-emerald-300"/>{item}</div>)}</div>
            <div className="rounded-lg border border-violet-400/12 bg-violet-400/[.035] p-3"><p className="text-[8px] uppercase tracking-[.12em] text-violet-300">Dependency</p><p className="mt-2 text-[9px] leading-relaxed text-slate-400">{phase.dependencies}</p></div>
            <div className="rounded-lg border border-cyan-400/12 bg-cyan-400/[.035] p-3"><p className="text-[8px] uppercase tracking-[.12em] text-cyan-300">Acceptance outcome</p><p className="mt-2 text-[9px] leading-relaxed text-slate-400">{phase.acceptance}</p></div>
          </div>
        </AirportPanel>;
      })}
    </div>

    <div className="grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
      <AirportPanel title="Indicative cost composition" subtitle="Adjust after site survey and bill of quantities">
        <div className="grid grid-cols-2 gap-3 p-4">{[
          ["Platform software & applications",22,"IOC, GIS, Digital Twin, FM, portals"],
          ["Integration & engineering",20,"API, SCADA, EBO, data models, workflows"],
          ["IoT / OT devices & retrofit",24,"Meters, analyzers, gateways, field upgrades"],
          ["BIM-GIS & survey data",12,"Reality capture, models, mapping and CDE"],
          ["Infrastructure & cybersecurity",12,"Edge, storage, network, resilience, SOC controls"],
          ["AI, simulation & commissioning",10,"Models, validation, training and acceptance"],
        ].map(([name,value,detail]) => <div key={String(name)} className="rounded-xl border border-white/[.07] bg-white/[.025] p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold text-white">{name}</p><b className="text-cyan-200">{value}%</b></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-cyan-300" style={{width:`${value}%`}}/></div><p className="mt-2 text-[8px] leading-relaxed text-slate-600">{detail}</p></div>)}</div>
      </AirportPanel>
      <AirportPanel title="Commercial and delivery assumptions"><div className="space-y-2 p-3">{[
        ["Included","Platform, integration, priority field retrofit, commissioning and training"],
        ["To confirm","Device quantities, existing licenses, network capacity and legacy-system access"],
        ["Excluded from demo estimate","Civil works, major plant replacement, taxes and long-term managed service"],
        ["Governance","Stage-gate approval, BoQ baseline, change control and value realization tracking"],
        ["Recommended next step","Four-week discovery and technical survey before commercial proposal"],
      ].map(([a,b],index) => <div key={a} className="rounded-xl border border-white/[.06] bg-white/[.025] p-3"><div className="flex items-start gap-3"><span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">{index === 0 ? <Boxes size={15}/> : index === 1 ? <ClipboardList size={15}/> : index === 2 ? <ShieldCheck size={15}/> : index === 3 ? <BarChart3 size={15}/> : <Timer size={15}/>}</span><div><p className="text-[9px] font-semibold text-white">{a}</p><p className="mt-1 text-[8px] leading-relaxed text-slate-500">{b}</p></div></div></div>)}</div></AirportPanel>
    </div>

    <div className="grid gap-4 xl:grid-cols-3">
      <AirportPanel title="Discovery outputs"><div className="space-y-2 p-3">{["System and data inventory","BIM-GIS readiness assessment","OT point-list and network audit","Priority use-case value baseline","Phased BoQ and commercial model"].map((item)=><div key={item} className="flex gap-2 rounded-lg bg-white/[.025] p-3 text-[9px] text-slate-300"><Database size={13} className="text-cyan-300"/>{item}</div>)}</div></AirportPanel>
      <AirportPanel title="Value tracking"><div className="space-y-2 p-3">{["Avoided production downtime","Energy and utility efficiency","Faster investor and permit workflows","Lower maintenance and inspection cost","Compliance, safety and resilience improvement"].map((item)=><div key={item} className="flex gap-2 rounded-lg bg-white/[.025] p-3 text-[9px] text-slate-300"><Sparkles size={13} className="text-violet-300"/>{item}</div>)}</div></AirportPanel>
      <AirportPanel title="Decision gates"><div className="space-y-2 p-3">{["G0 · Scope and data readiness","G1 · Foundation acceptance","G2 · Live operations acceptance","G3 · Model validation and value proof","G4 · Multi-site scale decision"].map((item,index)=><button key={item} onClick={()=>toast.info(`${item} checklist opened`)} className="flex w-full items-center justify-between rounded-lg bg-white/[.025] p-3 text-left text-[9px] text-slate-300"><span>{item}</span><AirportStatusBadge status={index<2?"normal":"info"}/></button>)}</div></AirportPanel>
    </div>
  </>;
}
