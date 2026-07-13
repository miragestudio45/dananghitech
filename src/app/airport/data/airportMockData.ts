import { between, createSeededRandom, deterministicSeries, pick } from "./seededRandom";

export type PageSize = 25 | 50 | 100;
export interface PageResult<T> { rows: T[]; total: number; page: number; pageSize: number }

export const HISTORICAL_PRESETS = ["Live", "24 Hours", "7 Days", "30 Days", "90 Days", "1 Year", "3 Years", "5 Years", "Custom"] as const;

export const AIRPORT_OVERVIEW_KPIS = [
  ["Planned area", "1,129.76 ha", "Da Nang HTP"], ["Occupancy rate", "78.4%", "+2.1 pt"], ["Active tenants", "186", "12 high-tech"],
  ["Investment projects", "42", "8 in approval"], ["Infrastructure readiness", "96.8%", "+1.4 pt"], ["Power demand", "42.8 MW", "Peak 48.2"],
  ["Power quality", "99.98%", "1 sag event"], ["Water demand", "18,420 m³/d", "+3.6%"], ["Critical incidents", "1", "P-07"],
  ["Environmental compliance", "98.6%", "2 actions"], ["Traffic throughput", "8,640 veh/d", "12.4 min gate"], ["Carbon intensity", "284 g/kWh", "-4.2%"],
  ["OT health", "98.9%", "7 alerts"], ["IT health", "99.6%", "3 alerts"], ["Data quality", "97.8%", "+0.8 pt"],
] as const;

const assetNames = [
  "Power Transformer", "MV Switchgear", "Power Quality Meter", "Smart Water Meter", "Stormwater Pump",
  "Wastewater Aeration Blower", "Air Quality Station", "Road Lighting Controller", "Fiber Cabinet", "IoT Gateway",
  "CCTV Camera", "Access Controller", "AHU", "Chiller", "CRAH Unit", "Fire Pump", "Retention Lake Sensor",
] as const;
const areas = ["Technology Precinct", "Advanced Manufacturing", "Utility Precinct", "Logistics Hub", "IOC", "Mini Data Center", "Green Corridor"] as const;
const conditions = ["Good", "Good", "Good", "Fair", "Attention", "Critical"] as const;

export interface AssetRow {
  id: string; bimGuid: string; name: string; system: string; area: string; location: string; manufacturer: string;
  condition: string; criticality: string; health: number; runtime: number; nextService: string; predictedFailure: string; dataQuality: number;
}

export function getAssetPage(page = 1, pageSize: PageSize = 25, search = ""): PageResult<AssetRow> {
  const total = 24_860;
  const offset = (page - 1) * pageSize;
  const rows = Array.from({ length: pageSize }, (_, localIndex) => {
    const index = offset + localIndex;
    const random = createSeededRandom(`htp-asset-${index}`);
    const name = pick(random, assetNames);
    const health = Math.round(between(random, 42, 100));
    const system = name.includes("Power") || name.includes("Switchgear") || name.includes("Transformer") ? "Electrical / Power Quality"
      : name.includes("Water") || name.includes("Pump") || name.includes("Wastewater") || name.includes("Lake") ? "Water & Drainage"
      : name.includes("Air Quality") ? "Environmental IoT"
      : name.includes("Lighting") ? "Public Lighting"
      : name.includes("Fiber") || name.includes("Gateway") || name.includes("CRAH") ? "ICT / Data Center"
      : name.includes("Camera") ? "CCTV / VMS"
      : name.includes("Access") ? "Access Control" : "Facility OT";
    return {
      id: `DHTP-${name.split(" ").map((part) => part[0]).join("")}-${String(index + 1).padStart(5, "0")}`,
      bimGuid: `7a${index.toString(16).padStart(6, "0")}-bim-${(index * 83).toString(16)}`,
      name, system, area: pick(random, areas), location: `P${1 + (index % 8)} · Z${1 + (index % 24)} · ${100 + (index % 180)}`,
      manufacturer: pick(random, ["Schneider Electric", "Siemens", "Honeywell", "ABB", "Belimo", "Endress+Hauser", "Cisco"]),
      condition: health < 55 ? "Critical" : health < 70 ? "Attention" : pick(random, conditions),
      criticality: index % 7 === 0 ? "Critical" : index % 3 === 0 ? "High" : "Medium", health,
      runtime: Math.round(between(random, 450, 58_000)), nextService: `${1 + (index % 28)} Aug 2026`,
      predictedFailure: health < 65 ? `${10 + (index % 120)} days` : "No near-term risk", dataQuality: Math.round(between(random, 82, 100)),
    };
  }).filter((row) => !search || JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));
  return { rows, total, page, pageSize };
}

export interface TenantRow {
  id: string; tenant: string; sector: string; plot: string; area: string; stage: string; contract: string;
  power: string; water: string; compliance: string; sla: string;
}
const sectors = ["Semiconductor", "Microelectronics", "Biotechnology", "Software & AI", "Precision Engineering", "New Materials", "Optoelectronics"] as const;
export function getTenantPage(page = 1, pageSize: PageSize = 25, search = ""): PageResult<TenantRow> {
  const total = 2_420;
  const offset = (page - 1) * pageSize;
  const rows = Array.from({ length: pageSize }, (_, localIndex) => {
    const index = offset + localIndex;
    const random = createSeededRandom(`tenant-${index}`);
    const stage = pick(random, ["Operating", "Construction", "Fit-out", "Negotiation", "Approval"] as const);
    return {
      id: `TEN-${String(index + 1).padStart(5, "0")}`,
      tenant: `${pick(random, ["Nano", "Viet", "DaNang", "Pacific", "Quantum", "Green", "Next"] as const)} ${pick(random, ["Tech", "Semicon", "Bio", "Photonics", "Robotics", "Materials", "Digital"] as const)}`,
      sector: pick(random, sectors), plot: `HTP-${String(1 + (index % 12)).padStart(2, "0")}-${String(1 + (index % 48)).padStart(2, "0")}`,
      area: `${between(random, 0.8, 12.5).toFixed(1)} ha`, stage, contract: `${2028 + (index % 25)}`,
      power: `${between(random, .4, 9.8).toFixed(1)} MW`, water: `${Math.round(between(random, 80, 1480)).toLocaleString()} m³/d`,
      compliance: index % 13 === 0 ? "Action required" : index % 7 === 0 ? "Review" : "Compliant",
      sla: `${Math.round(between(random, 91, 100))}%`,
    };
  }).filter((row) => !search || JSON.stringify(row).toLowerCase().includes(search.toLowerCase()));
  return { rows, total, page, pageSize };
}

export const INCIDENTS = [
  ["INC-2607", "Security perimeter P-07", "Critical", "Security", "Response in progress", "2 min"],
  ["INC-2606", "Voltage sag at semiconductor feeder F-03", "Warning", "Power Quality", "Root-cause analysis", "8 min"],
  ["INC-2605", "Stormwater level above pre-alert threshold", "Warning", "Drainage", "Pumps staged", "14 min"],
  ["INC-2604", "Wastewater pH trend approaching permit limit", "Warning", "Environment", "Operator review", "21 min"],
  ["INC-2603", "Main gate truck queue forecast above SLA", "Info", "Logistics", "Appointments rescheduled", "27 min"],
] as const;

export const PREDICTIONS = [
  "Transformer TR-03", "Stormwater Pump SWP-04", "Wastewater Blower BL-02", "Chiller CH-03", "AHU-RD-24",
  "Fiber Cabinet FC-17", "UPS DC-B", "Road Lighting Panel LP-04", "Water Booster Pump WBP-32",
].map((asset, index) => ({
  asset, health: 48 + index * 5, failure: 72 - index * 6, rul: `${12 + index * 17} days`, confidence: `${91 - index}%`,
  impact: index < 3 ? "Tenant production / infrastructure" : "Facility service", action: index < 3 ? "Create condition-based work order" : "Increase monitoring",
}));

export const SYSTEM_CONNECTIONS = [
  ["GIS Land & Planning", "Spatial", "OGC API / WFS", "99.92%", "32 sec", "48 ms", "98.8%"],
  ["BIM Common Data Environment", "Spatial", "IFC / REST API", "99.84%", "4 min", "112 ms", "95.7%"],
  ["Power SCADA", "OT", "IEC 61850 / OPC UA", "99.98%", "1 sec", "14 ms", "99.4%"],
  ["Power Quality Meters", "OT", "Modbus TCP / MQTT", "99.96%", "1 sec", "18 ms", "99.1%"],
  ["Water & Wastewater SCADA", "OT", "OPC UA / Modbus", "99.91%", "3 sec", "28 ms", "98.6%"],
  ["BMS / EBO", "OT", "BACnet/IP", "99.83%", "3 sec", "36 ms", "97.4%"],
  ["CCTV / VMS", "Security", "ONVIF / RTSP", "99.72%", "1 sec", "48 ms", "96.8%"],
  ["Access & Visitor", "Security", "OSDP / API", "99.88%", "4 sec", "23 ms", "98.2%"],
  ["Tenant CRM / Portal", "Enterprise", "REST / Webhook", "99.94%", "12 sec", "42 ms", "99.0%"],
  ["Environmental Monitoring", "IoT", "MQTT / REST", "99.86%", "6 sec", "31 ms", "98.7%"],
  ["Traffic & ANPR", "IoT", "RTSP / Event API", "99.81%", "2 sec", "44 ms", "97.9%"],
] as const;

export const OPERATION_EVENTS = [
  ["09:42", "Power Quality", "Voltage sag event isolated", "Feeder F-03", "Warning"],
  ["09:38", "Logistics", "Truck appointment window rebalanced", "Main Gate", "Info"],
  ["09:31", "Wastewater", "Effluent quality sample validated", "Compliant", "Normal"],
  ["09:26", "Drainage", "Retention lake level rising", "Pumps staged", "Warning"],
  ["09:18", "Investor CRM", "Site visit confirmed", "Semiconductor lead", "Normal"],
  ["09:11", "Environment", "Wind direction changed", "NE 4.6 m/s", "Info"],
] as const;

export const getParkTrend = (range = "24 Hours") => deterministicSeries(`park-ops-${range}`, range === "5 Years" ? 300 : 48, 82, 20);
export const getTenantServiceSeries = (range = "24 Hours") => deterministicSeries(`tenant-service-${range}`, range === "5 Years" ? 400 : 72, 6200, 900);
export const getEnergySeries = (range = "24 Hours") => deterministicSeries(`energy-${range}`, range === "5 Years" ? 360 : 96, 42.4, 7.6);
export const getPredictiveAssetPage = (page = 1, pageSize: PageSize = 25) => ({ rows: PREDICTIONS.slice((page - 1) * pageSize, page * pageSize), total: PREDICTIONS.length, page, pageSize });
export const getWorkOrderPage = getAssetPage;
