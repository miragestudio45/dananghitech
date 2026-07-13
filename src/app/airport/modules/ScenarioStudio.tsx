import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, Building2, CheckCircle2, CloudRain, Factory, GitBranch,
  Gauge, MapPin, Play, ShieldCheck, Sparkles, Waves, Wind, Zap,
} from "lucide-react";
import { toast } from "sonner";
import { AirportMetricCard, AirportPanel, AirportStatusBadge } from "../shared/AirportUI";

type ScenarioType = "flood" | "pollution" | "utility";

type ScenarioInputs = {
  rainfall: number;
  duration: number;
  downstream: number;
  pumps: number;
  releaseRate: number;
  windSpeed: number;
  windDirection: number;
  isolation: number;
  reserve: number;
  response: number;
};

const defaults: ScenarioInputs = {
  rainfall: 84,
  duration: 3,
  downstream: 67,
  pumps: 7,
  releaseRate: 12,
  windSpeed: 4.6,
  windDirection: 45,
  isolation: 3,
  reserve: 42,
  response: 18,
};

export function ScenarioStudio({ type }: { type: ScenarioType }) {
  const [inputs, setInputs] = useState(defaults);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(true);
  const [responseEnabled, setResponseEnabled] = useState(true);
  const config = scenarioConfig(type, inputs, responseEnabled);

  const update = (key: keyof ScenarioInputs, value: number) => setInputs((current) => ({ ...current, [key]: value }));
  const run = () => {
    setRunning(true);
    setCompleted(false);
    window.setTimeout(() => {
      setRunning(false);
      setCompleted(true);
      toast.success("Scenario completed — spatial impact and response recommendations updated");
    }, 1400);
  };

  return <>
    <div className="grid grid-cols-3 gap-2 xl:grid-cols-6">{config.metrics.map(([label, value, trend, tone]) => <AirportMetricCard key={label} label={label} value={value} trend={trend} tone={tone} compact />)}</div>

    <div className="grid gap-4 xl:grid-cols-[.68fr_1.32fr]">
      <AirportPanel title="Scenario definition" subtitle={config.subtitle}>
        <div className="space-y-4 p-4">
          <div className="rounded-xl border border-violet-400/15 bg-violet-400/[.045] p-4">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">{config.icon}</span><div><p className="text-[9px] uppercase tracking-[.14em] text-violet-300">What-if scenario</p><h3 className="mt-1 text-sm font-semibold text-white">{config.title}</h3></div></div>
            <p className="mt-3 text-[10px] leading-relaxed text-slate-400">{config.description}</p>
          </div>

          {config.controls.map((control) => <label key={control.key} className="block rounded-xl border border-white/[.06] bg-white/[.025] p-3">
            <div className="flex items-center justify-between"><span className="text-[10px] text-slate-300">{control.label}</span><b className="text-[10px] text-cyan-200">{control.format(inputs[control.key])}</b></div>
            <input type="range" min={control.min} max={control.max} step={control.step} value={inputs[control.key]} onChange={(event) => update(control.key, Number(event.target.value))} className="mt-3 w-full accent-cyan-300" />
            <div className="mt-1 flex justify-between text-[8px] text-slate-700"><span>{control.format(control.min)}</span><span>{control.format(control.max)}</span></div>
          </label>)}

          <button onClick={() => setResponseEnabled((value) => !value)} className={`flex w-full items-center justify-between rounded-xl border p-3 text-left ${responseEnabled ? "border-emerald-400/20 bg-emerald-400/[.055]" : "border-white/[.07] bg-white/[.025]"}`}>
            <div><p className="text-[10px] font-semibold text-white">Optimized response package</p><p className="mt-1 text-[9px] text-slate-500">Compare baseline impact against recommended response actions.</p></div>
            <span className={`h-5 w-9 rounded-full p-0.5 transition ${responseEnabled ? "bg-emerald-400" : "bg-slate-700"}`}><span className={`block h-4 w-4 rounded-full bg-white transition-transform ${responseEnabled ? "translate-x-4" : ""}`} /></span>
          </button>

          <button onClick={run} disabled={running} className="airport-button w-full justify-center !border-violet-400/20 !bg-violet-400/10 !py-3 !text-violet-200"><Play size={14}/>{running ? "Running spatial simulation…" : "Run What-if simulation"}</button>
          <p className="text-center text-[8px] leading-relaxed text-slate-600">Demonstration decision-support model. Production use requires calibrated hydraulic, dispersion and utility-network models.</p>
        </div>
      </AirportPanel>

      <div className="space-y-4">
        <AirportPanel title="Spatial impact model" subtitle="Dynamic scenario layer · affected plots, networks and response zones">
          <div className="relative min-h-[430px] overflow-hidden rounded-b-xl bg-[#04111f]">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.12) 1px,transparent 1px)", backgroundSize: "38px 38px" }} />
            <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 1000 430" preserveAspectRatio="none">
              <path d="M20 345 C180 275, 340 360, 480 245 S760 175, 980 105" fill="none" stroke="rgba(96,165,250,.55)" strokeWidth="12" />
              <path d="M80 85 L925 370" fill="none" stroke="rgba(52,211,153,.26)" strokeWidth="4" strokeDasharray="14 10" />
            </svg>

            {config.zones.map((zone, index) => <motion.div key={zone.label} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: completed ? 1 : .25, scale: completed ? 1 : .82 }} transition={{ delay: index * .08 }} style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.size}%`, height: `${zone.size * .72}%` }} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${zone.tone === "red" ? "border-red-300/65 bg-red-400/12 shadow-[0_0_32px_rgba(248,113,113,.2)]" : zone.tone === "amber" ? "border-amber-300/65 bg-amber-400/12 shadow-[0_0_30px_rgba(251,191,36,.18)]" : "border-cyan-300/60 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,.16)]"}`}>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-white/10 bg-[#06111f]/88 px-2 py-1 text-[8px] font-semibold text-white">{zone.label}</span>
            </motion.div>)}

            <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-[#06111f]/88 p-3 backdrop-blur-xl"><p className="text-[8px] uppercase tracking-[.14em] text-cyan-300">Simulation state</p><div className="mt-2 flex items-center gap-2">{running ? <Sparkles size={15} className="animate-pulse text-violet-300"/> : <CheckCircle2 size={15} className="text-emerald-300"/>}<p className="text-[10px] font-semibold text-white">{running ? "Calculating spatial impacts" : "Scenario results available"}</p></div></div>
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-[#06111f]/90 p-4 backdrop-blur-xl"><div className="grid grid-cols-4 gap-3">{config.resultCards.map(([label, value, detail, status]) => <div key={label} className="rounded-lg bg-white/[.03] p-3"><div className="flex items-center justify-between"><p className="text-[8px] text-slate-500">{label}</p><AirportStatusBadge status={status}/></div><p className="mt-2 text-lg font-semibold text-white">{value}</p><p className="mt-1 text-[8px] text-slate-600">{detail}</p></div>)}</div></div>
          </div>
        </AirportPanel>

        <div className="grid gap-4 xl:grid-cols-2">
          <AirportPanel title="Baseline vs optimized response"><div className="space-y-4 p-4">{config.comparison.map(([label, baseline, response]) => <div key={label}><div className="flex justify-between text-[9px]"><span className="text-slate-400">{label}</span><span><b className="text-amber-200">{baseline}</b><span className="mx-2 text-slate-700">→</span><b className="text-emerald-300">{response}</b></span></div><div className="mt-2 grid grid-cols-2 gap-1"><div className="h-2 overflow-hidden rounded bg-white/[.06]"><div className="h-full bg-amber-400" style={{ width: `${config.baselineBars[label] ?? 80}%` }} /></div><div className="h-2 overflow-hidden rounded bg-white/[.06]"><div className="h-full bg-emerald-400" style={{ width: `${config.responseBars[label] ?? 45}%` }} /></div></div></div>)}</div></AirportPanel>
          <AirportPanel title="Recommended governed actions"><div className="space-y-2 p-3">{config.actions.map((action, index) => <div key={action} className="rounded-lg border border-violet-400/12 bg-violet-400/[.04] p-3"><div className="flex items-start gap-3"><span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-violet-400/10 text-[9px] font-bold text-violet-300">{index + 1}</span><div className="flex-1"><p className="text-[9px] leading-relaxed text-slate-300">{action}</p><p className="mt-1 text-[8px] text-slate-600">Human approval · audit · rollback available</p></div><ShieldCheck size={14} className="text-emerald-300"/></div></div>)}</div></AirportPanel>
        </div>
      </div>
    </div>
  </>;
}

function scenarioConfig(type: ScenarioType, inputs: ScenarioInputs, responseEnabled: boolean) {
  if (type === "pollution") {
    const radius = Math.max(.5, (inputs.releaseRate * 0.06) + (inputs.windSpeed * .16));
    const affected = Math.max(2, Math.round(radius * 6.4));
    const lead = Math.max(8, Math.round(34 - inputs.windSpeed * 2.4));
    return {
      title: "Airborne pollution and chemical dispersion",
      subtitle: "Source term + real-time weather + terrain + affected tenants + evacuation routing",
      description: "Test a hypothetical gas or chemical release before deciding on isolation, shelter-in-place and evacuation actions.",
      icon: <Wind size={20}/>,
      controls: [
        { key: "releaseRate" as const, label: "Release rate", min: 2, max: 30, step: 1, format: (value:number)=>`${value} kg/min` },
        { key: "windSpeed" as const, label: "Wind speed", min: 1, max: 12, step: .1, format: (value:number)=>`${value.toFixed(1)} m/s` },
        { key: "windDirection" as const, label: "Wind direction", min: 0, max: 360, step: 5, format: (value:number)=>`${value}°` },
        { key: "response" as const, label: "Response deployment", min: 4, max: 30, step: 1, format: (value:number)=>`${value} min` },
      ],
      metrics: [
        ["Impact radius", `${radius.toFixed(1)} km`, "Modelled", "amber"],
        ["Affected tenants", `${affected}`, "Scenario", "red"],
        ["Warning lead time", `${lead} min`, "Weather-driven", "cyan"],
        ["Safe routes", responseEnabled ? "4" : "2", "Calculated", "emerald"],
        ["Sensors correlated", "18", "Live", "blue"],
        ["Model confidence", "91.4%", "Decision support", "violet"],
      ] as const,
      zones: [{x:54,y:48,size:26,tone:"red",label:"Source / exclusion"},{x:68,y:57,size:34,tone:"amber",label:"High exposure"},{x:81,y:69,size:40,tone:"cyan",label:"Advisory zone"}] as const,
      resultCards: [["Priority zone",`${Math.max(1,Math.round(affected*.18))} tenants`,`Immediate notification`,"critical"],["Evacuation routes",responseEnabled?"4":"2","Outside plume envelope","normal"],["Shelter zones","3","Positive-pressure buildings","warning"],["Response ETA",`${inputs.response} min`,`HazMat team`,inputs.response>20?"warning":"normal"]] as const,
      comparison: [["People exposure",`${Math.round(affected*86)}`,` ${responseEnabled?Math.round(affected*24):Math.round(affected*72)}`],["Business interruption","4.8 h",responseEnabled?"1.6 h":"4.2 h"],["Response lead","18 min",responseEnabled?"6 min":"15 min"]] as const,
      baselineBars: {"People exposure":86,"Business interruption":92,"Response lead":78} as Record<string,number>,
      responseBars: {"People exposure":24,"Business interruption":34,"Response lead":26} as Record<string,number>,
      actions: ["Confirm source isolation and establish hot/warm/cold zones","Notify affected plots by geofenced tenant and workforce lists","Activate safe routes and shelter-in-place instructions","Deploy mobile sensors downwind and re-run every minute"],
    };
  }

  if (type === "utility") {
    const affected = Math.round(inputs.isolation * 4.8 + (100 - inputs.reserve) * .08);
    const recovery = Math.max(18, Math.round(68 - inputs.reserve * .7 + inputs.isolation * 4));
    const avoided = responseEnabled ? Math.max(8, Math.round((affected * 1.4 + inputs.reserve * .35) * 10) / 10) : 0;
    return {
      title: "Power and water outage impact twin",
      subtitle: "Network topology + tenant criticality + alternate supply + governed switching sequence",
      description: "Simulate feeder, pipe or plant isolation to identify affected tenants and validate alternative supply before issuing commands.",
      icon: <GitBranch size={20}/>,
      controls: [
        { key: "isolation" as const, label: "Isolation points", min: 1, max: 8, step: 1, format: (value:number)=>`${value} nodes` },
        { key: "reserve" as const, label: "Available reserve capacity", min: 10, max: 90, step: 1, format: (value:number)=>`${value}%` },
        { key: "response" as const, label: "Field response readiness", min: 5, max: 45, step: 1, format: (value:number)=>`${value} min` },
      ],
      metrics: [
        ["Affected tenants", `${affected}`, "Sensitive loads", "red"],
        ["Interrupted power", `${(affected*.7).toFixed(1)} MW`, "Scenario", "amber"],
        ["Interrupted water", `${Math.round(affected*268)} m³/d`, "Scenario", "amber"],
        ["Alternate routes", responseEnabled ? "3" : "1", "Available", "emerald"],
        ["Estimated recovery", `${recovery} min`, "With rerouting", "cyan"],
        ["Loss avoided", responseEnabled ? `₫${avoided}B` : "₫0", "Illustrative", "emerald"],
      ] as const,
      zones: [{x:30,y:44,size:22,tone:"red",label:"Isolated node"},{x:49,y:50,size:34,tone:"amber",label:"Affected service area"},{x:75,y:34,size:25,tone:"cyan",label:"Alternate supply"}] as const,
      resultCards: [["Critical tenants",`${Math.max(2,Math.round(affected*.24))}`,"Semiconductor / cleanroom","critical"],["Switching paths",responseEnabled?"3":"1","Feeder / valve alternatives","normal"],["Reserve margin",`${inputs.reserve}%`,`Post-switching capacity`,inputs.reserve<30?"warning":"normal"],["Field ETA",`${inputs.response} min`,`Isolation verification`,inputs.response>25?"warning":"normal"]] as const,
      comparison: [["Service interruption","68 min",responseEnabled ? `${recovery} min` : "61 min"],["Critical-load loss","12.6 MW",responseEnabled?"2.4 MW":"10.8 MW"],["Tenant impact",`${affected}`,responseEnabled?`${Math.max(2,Math.round(affected*.32))}`:`${affected-2}`]] as const,
      baselineBars: {"Service interruption":88,"Critical-load loss":92,"Tenant impact":84} as Record<string,number>,
      responseBars: {"Service interruption":42,"Critical-load loss":22,"Tenant impact":31} as Record<string,number>,
      actions: ["Confirm protection, interlock and hydraulic constraints","Request approval for feeder and valve switching sequence","Notify critical tenants and validate local backup readiness","Verify post-action loading, pressure and restoration evidence"],
    };
  }

  const floodIndex = inputs.rainfall * inputs.duration * (inputs.downstream / 100) / Math.max(1, inputs.pumps);
  const depth = Math.min(1.4, .08 + floodIndex / 88);
  const atRisk = Math.max(1, Math.round(floodIndex / 3.4));
  const impact = Math.round((atRisk * 2.8 + depth * 14) * 10) / 10;
  const reducedDepth = responseEnabled ? depth * .42 : depth * .91;
  return {
    title: "Flood and drainage simulation",
    subtitle: "Rainfall + downstream water level + DTM + drainage capacity + pump operation",
    description: "Test rainfall and pumping scenarios against terrain and drainage-network capacity before staging pumps and issuing route guidance.",
    icon: <CloudRain size={20}/>,
    controls: [
      { key: "rainfall" as const, label: "Rainfall intensity", min: 20, max: 180, step: 2, format: (value:number)=>`${value} mm/h` },
      { key: "duration" as const, label: "Rainfall duration", min: 1, max: 8, step: .5, format: (value:number)=>`${value} h` },
      { key: "downstream" as const, label: "Downstream / retention level", min: 20, max: 95, step: 1, format: (value:number)=>`${value}%` },
      { key: "pumps" as const, label: "Available pumps", min: 2, max: 8, step: 1, format: (value:number)=>`${value} / 8` },
    ],
    metrics: [
      ["Forecast horizon", "2 hours", "5-min steps", "violet"],
      ["At-risk plots", `${atRisk}`, `${Math.round(atRisk*6.4)} ha`, "amber"],
      ["Max water depth", `${depth.toFixed(2)} m`, "Baseline", "red"],
      ["Response depth", `${reducedDepth.toFixed(2)} m`, responseEnabled ? "Optimized" : "No action", "cyan"],
      ["Estimated impact", `₫${impact}B`, "Illustrative", "amber"],
      ["Warning lead time", `${Math.max(28,112-Math.round(floodIndex))} min`, "Actionable", "emerald"],
    ] as const,
    zones: [{x:29,y:66,size:22,tone:"red",label:`${depth.toFixed(2)} m`},{x:53,y:56,size:34,tone:"amber",label:"Road R4 risk"},{x:73,y:72,size:28,tone:"cyan",label:"Pump catchment"}] as const,
    resultCards: [["Road closures",`${Math.max(1,Math.round(atRisk*.35))}`,"Dynamic rerouting","critical"],["Affected plots",`${atRisk}`,"Tenant notification","warning"],["Pumps staged",`${inputs.pumps} / 8`,`N+1 assessment`,inputs.pumps<5?"warning":"normal"],["Retention level",`${inputs.downstream}%`,`Operating constraint`,inputs.downstream>80?"critical":"warning"]] as const,
    comparison: [["Maximum depth",`${depth.toFixed(2)} m`,`${reducedDepth.toFixed(2)} m`],["Affected area",`${Math.round(atRisk*6.4)} ha`,`${Math.round(atRisk*2.1)} ha`],["Estimated impact",`₫${impact}B`,responseEnabled?`₫${(impact*.31).toFixed(1)}B`:`₫${(impact*.88).toFixed(1)}B`]] as const,
    baselineBars: {"Maximum depth":86,"Affected area":82,"Estimated impact":91} as Record<string,number>,
    responseBars: {"Maximum depth":36,"Affected area":28,"Estimated impact":31} as Record<string,number>,
    actions: ["Stage stormwater pumps by catchment and preserve N+1 reserve","Optimize retention-lake release against downstream level","Close affected road segments and publish safe logistics routes","Notify plots and critical assets using predicted depth and lead time"],
  };
}
