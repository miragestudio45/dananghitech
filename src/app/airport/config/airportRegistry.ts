import type { LucideIcon } from "lucide-react";
import {
  Activity, AirVent, BarChart3, Boxes, BrainCircuit, Building2, Camera, CircleGauge,
  Car, Database, Droplets, ArrowUpDown, Factory, Fan, Flame, Gauge, HardHat, LayoutDashboard,
  Lightbulb, LockKeyhole, Map, MapPin, MonitorCog, Network, ParkingCircle, Radar,
  Settings2, ShieldCheck, Snowflake, Sparkles, Users, Wrench, Zap, LandPlot, Leaf,
  Truck, Waves, RadioTower, FileCheck2, Handshake, Route, Workflow, Cpu, Cable,
  Wind, GitBranch, Siren, Server, ScanLine, Mountain, Layers3, Satellite, ClipboardList, Clock3,
} from "lucide-react";

export type AirportModuleId =
  | "OVERVIEW"
  | "SPATIAL"
  | "AIRPORT_OPS"
  | "PASSENGERS"
  | "ASSETS_FM"
  | "BMS"
  | "INTELLIGENCE"
  | "SAFETY"
  | "SYSTEMS";

export type AirportStatus = "normal" | "optimized" | "warning" | "critical" | "offline";

export interface AirportSectionDefinition {
  id: string;
  label: string;
  description: string;
  icon?: LucideIcon;
}

export interface AirportModuleDefinition {
  id: AirportModuleId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  accent: string;
  defaultSection: string;
  sections: AirportSectionDefinition[];
}

export const AIRPORT_MODULES: AirportModuleDefinition[] = [
  {
    id: "OVERVIEW", label: "High-Tech Park Overview", shortLabel: "Overview", icon: LayoutDashboard,
    accent: "cyan", defaultSection: "command-center",
    sections: [
      { id: "command-center", label: "IOC Command Center", description: "Live operating picture across land, infrastructure, tenants, safety and utilities", icon: CircleGauge },
      { id: "spatial-hierarchy", label: "Spatial Hierarchy", description: "Park, precinct, plot, building, level, zone, system and asset context", icon: Map },
      { id: "operational-readiness", label: "Operational Readiness", description: "Park-wide readiness, constraints, resilience and incident posture", icon: Activity },
      { id: "digital-twin-maturity", label: "Digital Twin Maturity", description: "Roadmap from visualization to real-time monitoring, simulation and optimization", icon: Sparkles },
    ],
  },
  {
    id: "SPATIAL", label: "BIM-GIS & Spatial Data", shortLabel: "BIM-GIS", icon: Layers3,
    accent: "cyan", defaultSection: "spatial-command",
    sections: [
      { id: "spatial-command", label: "Spatial Command Center", description: "Unified BIM-GIS operating picture across 1,128 ha, survey data, planning, infrastructure and live operations", icon: Satellite },
      { id: "reality-capture", label: "Reality Capture", description: "UAV photogrammetry, LiDAR, mobile mapping, GNSS, panorama 360 and survey coverage", icon: ScanLine },
      { id: "terrain-elevation", label: "Terrain, DSM & DTM", description: "Elevation, slope, contour, hydrology and terrain inputs for planning and flood analysis", icon: Mountain },
      { id: "planning-parcels", label: "Planning & Parcel Map", description: "Land-use zoning, plot boundaries, planning indicators, investor status and infrastructure readiness", icon: LandPlot },
      { id: "infrastructure-network", label: "Infrastructure Network", description: "Road, drainage, water, wastewater, power, lighting, telecom and underground utility context", icon: Network },
      { id: "bim-federation", label: "BIM Federation & Digital Thread", description: "IFC/Revit federation linked to GIS features, assets, sensors, alarms, work orders and documents", icon: Boxes },
      { id: "survey-missions", label: "Survey Missions", description: "UAV and field survey planning, permits, coverage, processing status and evidence", icon: Route },
      { id: "change-detection", label: "Change Detection", description: "Compare survey versions, identify construction progress, encroachment and asset changes", icon: Clock3 },
      { id: "spatial-data-cde", label: "Spatial Data & CDE", description: "VN-2000, Hòn Dấu elevation, LAS/SLPK/IFC/RVT/DWG governance, versioning and approval", icon: ClipboardList },
    ],
  },
  {
    id: "AIRPORT_OPS", label: "Infrastructure & Park Operations", shortLabel: "Park Ops", icon: Factory,
    accent: "blue", defaultSection: "operations-center",
    sections: [
      { id: "operations-center", label: "Integrated Operations Center", description: "Unified live picture of technical infrastructure and park services", icon: Radar },
      { id: "power-quality", label: "Power Quality Twin", description: "Voltage sag, swell, harmonics, frequency and sensitive-load protection", icon: Zap },
      { id: "water-drainage", label: "Water & Drainage Network", description: "Supply, pressure, wastewater, pumping and stormwater drainage", icon: Droplets },
      { id: "environment-monitoring", label: "Environmental Monitoring", description: "Air, water, noise, groundwater and emission compliance", icon: Leaf },
      { id: "traffic-logistics", label: "Traffic & Logistics", description: "Gate traffic, truck appointments, routing, parking and loading areas", icon: Truck },
      { id: "public-lighting", label: "Road & Public Lighting", description: "Schedules, dimming, faults and energy performance by precinct", icon: Lightbulb },
      { id: "low-altitude-airspace", label: "Low-Altitude Airspace", description: "UAV corridors, no-fly zones, permits and mission tracking", icon: RadioTower },
      { id: "multi-site-operations", label: "Multi-site Operations", description: "Standardized KPI and coordinated operations across connected industrial parks", icon: Network },
    ],
  },
  {
    id: "PASSENGERS", label: "Land, Investment & Tenant Services", shortLabel: "Land & Tenants", icon: LandPlot,
    accent: "cyan", defaultSection: "land-planning",
    sections: [
      { id: "land-planning", label: "Land & Planning", description: "Plot boundaries, planning indicators, land use and infrastructure connectivity", icon: Map },
      { id: "occupancy-leasing", label: "Occupancy & Leasing", description: "Available, negotiating, leased and development status across precincts", icon: Building2 },
      { id: "investor-portal", label: "Investor Portal", description: "Plot discovery, policies, incentives, booking and investment workflow", icon: Handshake },
      { id: "investor-crm", label: "Investor CRM & Funnel", description: "Lead, site visit, negotiation, approval and contract conversion", icon: Users },
      { id: "tenant-portal", label: "Tenant Service Portal", description: "Requests, notifications, documents, consumption and service status", icon: MonitorCog },
      { id: "contracts-billing", label: "Contracts, Fees & Billing", description: "Lease terms, service fees, utility allocation, invoices and payment status", icon: FileCheck2 },
      { id: "tenant-compliance", label: "Tenant Compliance", description: "Permits, environmental obligations, audits and corrective actions", icon: ShieldCheck },
      { id: "service-quality", label: "Service Quality", description: "SLA, tenant satisfaction, feedback and service improvement", icon: Sparkles },
    ],
  },
  {
    id: "ASSETS_FM", label: "FM & Asset Lifecycle", shortLabel: "FM & Assets", icon: Wrench,
    accent: "emerald", defaultSection: "fm-overview",
    sections: [
      { id: "fm-overview", label: "FM Overview", description: "Asset health, maintenance, inspections and service-level posture", icon: CircleGauge },
      { id: "bim-explorer", label: "BIM-GIS Explorer", description: "Federated model, underground utilities, properties and data completeness", icon: Boxes },
      { id: "asset-registry", label: "Asset Registry", description: "Park-wide asset master data linked to spatial and operational context", icon: Database },
      { id: "maintenance-plans", label: "Maintenance Plans", description: "Preventive, predictive, condition-based and statutory plans", icon: Wrench },
      { id: "work-orders", label: "Work Orders", description: "Request, dispatch, field execution, SLA, cost and root cause", icon: HardHat },
      { id: "inspections", label: "Inspections", description: "Road, utility, safety, environmental and facility inspection programs", icon: ShieldCheck },
      { id: "underground-assets", label: "Underground Utilities", description: "Power cables, water, drainage, telecom and hidden infrastructure", icon: Cable },
      { id: "documents", label: "Documents & Digital Thread", description: "O&M, drawings, certificates, contracts and BIM references", icon: Database },
      { id: "warranty-contracts", label: "Warranty & Contracts", description: "Coverage, expiry, supplier obligations and service performance", icon: FileCheck2 },
      { id: "space-management", label: "Space & Facility Management", description: "Buildings, factories, warehouses, shared areas and utilization", icon: Building2 },
    ],
  },
  {
    id: "BMS", label: "Facility Operations & EBO", shortLabel: "Facility Ops", icon: MonitorCog,
    accent: "cyan", defaultSection: "facility-ops-overview",
    sections: [
      { id: "facility-ops-overview", label: "Facility Operations Overview", description: "Park-wide operating posture across integrated EBO facility systems", icon: CircleGauge },
      { id: "ebo-command", label: "EBO Command Center", description: "Integrated EBO tree, monitoring, commands, alarms and audit trail", icon: MonitorCog },
      { id: "bms-hvac", label: "BMS / HVAC", description: "Chiller, AHU, FCU, VAV, heat exchanger and CRAH operation", icon: Fan },
      { id: "bms-chiller-plant", label: "Chiller Plant", description: "Central cooling plant, schematic, 3D model and controls", icon: Snowflake },
      { id: "bms-floor-plan", label: "HVAC Floor Plan", description: "2D and 3D facility HVAC context and asset positions", icon: Map },
      { id: "energy-power", label: "Energy & Power", description: "Power monitoring, single-line diagram, UPS, generators and microgrid", icon: Zap },
      { id: "cctv-vms-ebo", label: "CCTV / VMS", description: "Camera wall, video analytics, events and recording health", icon: Camera },
      { id: "access-control-ebo", label: "Access Control", description: "Doors, readers, credentials and restricted-zone access", icon: LockKeyhole },
      { id: "smart-parking-ebo", label: "Smart Parking", description: "Parking occupancy, guidance, entry-exit and EV charging", icon: ParkingCircle },
      { id: "fire-life-safety-ebo", label: "Fire & Life Safety", description: "Fire panels, detectors, suppression and evacuation readiness", icon: Flame },
      { id: "water-utilities-ebo", label: "Water & Utilities", description: "Water supply, pumps, wastewater and quality monitoring", icon: Droplets },
      { id: "lighting-ebo", label: "Lighting", description: "Road, public-area and facility lighting control and schedules", icon: Lightbulb },
      { id: "vertical-transport-ebo", label: "Vertical Transport", description: "Elevators, escalators, traffic and maintenance status", icon: ArrowUpDown },
      { id: "ebo-alarms-events", label: "Alarms & Events", description: "Cross-domain EBO alarm queue, ownership and response", icon: Activity },
      { id: "ebo-trends-reports", label: "Trends & Reports", description: "Historian, performance trends, SLA and automated reporting", icon: BarChart3 },
    ],
  },
  {
    id: "INTELLIGENCE", label: "AI, Simulation & Optimization", shortLabel: "AI & Simulation", icon: BrainCircuit,
    accent: "violet", defaultSection: "intelligence-overview",
    sections: [
      { id: "intelligence-overview", label: "Intelligence Overview", description: "AI insights, scenario readiness and quantified operational value", icon: BrainCircuit },
      { id: "flood-simulation", label: "Flood & Drainage Simulation", description: "Rainfall, tide, drainage capacity and two-hour flood forecast", icon: Waves },
      { id: "pollution-dispersion", label: "Pollution Dispersion", description: "Airborne chemical dispersion, impact zone and evacuation route", icon: Wind },
      { id: "utility-outage", label: "Utility Outage What-if", description: "Power and water isolation, affected tenants and rerouting options", icon: GitBranch },
      { id: "predictive-maintenance", label: "Predictive Maintenance", description: "Failure probability, remaining useful life and proactive work", icon: Wrench },
      { id: "energy-ai", label: "Energy & Microgrid AI", description: "Demand forecasting, tariff optimization, solar, storage and load shifting", icon: Zap },
      { id: "capacity-forecast", label: "Land & Infrastructure Forecast", description: "Occupancy, utility demand, traffic and expansion capacity", icon: BarChart3 },
      { id: "anomaly-detection", label: "Anomaly Detection", description: "Cross-domain anomaly detection and root-cause triage", icon: Activity },
      { id: "autonomous-operations", label: "Human-governed Automation", description: "Approval-based response workflows with audit and rollback", icon: Workflow },
    ],
  },
  {
    id: "SAFETY", label: "Safety, Security & Environment", shortLabel: "Safety & ESG", icon: ShieldCheck,
    accent: "amber", defaultSection: "security-overview",
    sections: [
      { id: "security-overview", label: "Integrated Safety Overview", description: "Park-wide security, life safety, environmental and response posture", icon: ShieldCheck },
      { id: "cctv-vms", label: "CCTV / AI Video", description: "Camera coverage, analytics, evidence and event correlation", icon: Camera },
      { id: "access-control", label: "Access & Visitor Management", description: "People, vehicles, contractors, QR and restricted areas", icon: LockKeyhole },
      { id: "perimeter-security", label: "Perimeter Security", description: "Fence, thermal camera, radar and intrusion detection", icon: Radar },
      { id: "fire-life-safety", label: "Fire & Life Safety", description: "Fire panels, devices, water supply and evacuation readiness", icon: Flame },
      { id: "environment-compliance", label: "Environmental Compliance", description: "Emission, wastewater, noise and permit compliance", icon: Leaf },
      { id: "hazardous-waste", label: "Hazardous Waste Traceability", description: "QR traceability, transport, storage and disposal evidence", icon: Boxes },
      { id: "emergency-command", label: "Emergency Command", description: "SOP, teams, communications, evacuation and audit trail", icon: Siren },
      { id: "incident-management", label: "Incident Management", description: "Ownership, field response, evidence, lessons learned and closure", icon: Activity },
    ],
  },
  {
    id: "SYSTEMS", label: "Systems, Data & Integration", shortLabel: "Systems & Data", icon: Database,
    accent: "cyan", defaultSection: "systems-overview",
    sections: [
      { id: "systems-overview", label: "Systems Overview", description: "OT, IT, spatial, security and enterprise service health", icon: CircleGauge },
      { id: "unified-data-lake", label: "Unified Data Lakehouse", description: "IoT, OT, GIS, BIM, enterprise data and AI-ready products", icon: Database },
      { id: "edge-architecture", label: "Edge & Data Architecture", description: "Device, network/data and application layers with resilient security", icon: Cpu },
      { id: "facility-ot", label: "Facility OT & SCADA", description: "BMS, EMS, water, lighting, pumps and utility automation", icon: Factory },
      { id: "electrical", label: "Electrical & Power Quality", description: "Grid, substations, protection, power quality and distribution", icon: Zap },
      { id: "water", label: "Water, Wastewater & Drainage", description: "Supply, pressure, treatment, discharge and flood infrastructure", icon: Droplets },
      { id: "environment-iot", label: "Environmental IoT", description: "Air, water, noise, weather and groundwater sensor fleet", icon: Leaf },
      { id: "it-systems", label: "IT Systems", description: "Applications, servers, services, directory and business platforms", icon: Database },
      { id: "network-wifi", label: "Network, Fiber & Private 5G", description: "Coverage, capacity, latency, segmentation and resilience", icon: Network },
      { id: "data-center", label: "Mini Data Center / Edge", description: "Compute, storage, network, UPS and environmental health", icon: Server },
      { id: "bim-gis", label: "BIM-GIS Platform", description: "Planning, 2D/3D, underground utilities and digital thread", icon: MapPin },
      { id: "integration-hub", label: "Integration Hub", description: "BACnet, Modbus, OPC UA, MQTT, API, event bus and master data", icon: Boxes },
      { id: "cybersecurity", label: "OT/IT Cybersecurity", description: "Network segmentation, identities, threats, vulnerabilities and response", icon: ShieldCheck },
      { id: "data-quality", label: "Data Quality & Governance", description: "Completeness, freshness, accuracy, lineage and access control", icon: BarChart3 },
      { id: "iot-devices", label: "IoT & Edge Devices", description: "Sensors, gateways, firmware, calibration and connectivity", icon: Activity },
      { id: "implementation-roadmap", label: "Implementation Roadmap & Investment", description: "Phased delivery, indicative budget range, dependencies, value and acceptance criteria", icon: ClipboardList },
    ],
  },
];

export const AIRPORT_SECTION_REGISTRY = Object.fromEntries(
  AIRPORT_MODULES.flatMap((module) => module.sections.map((section) => [section.id, { ...section, moduleId: module.id }])),
);

export interface SpatialNode { id: string; label: string; type: string; children?: SpatialNode[] }
const child = (id: string, label: string, type = "Zone"): SpatialNode => ({ id, label, type });

export const AIRPORT_SPATIAL_HIERARCHY: SpatialNode[] = [
  { id: "technology-precinct", label: "Technology & R&D Precinct", type: "Park Precinct", children: [
    child("semiconductor", "Semiconductor & Microelectronics"), child("digital-tech", "Digital Technology & Software"),
    child("biotech", "Biotechnology"), child("precision", "Precision Engineering"), child("new-materials", "New Materials & Nanotechnology"),
  ] },
  { id: "industrial-precinct", label: "Advanced Manufacturing Precinct", type: "Park Precinct", children: [
    child("factories", "Factories & Production Buildings"), child("warehouses", "Warehouses & Logistics"),
    child("labs", "Laboratories & Cleanrooms"), child("support-buildings", "Support Facilities"),
  ] },
  { id: "utility-precinct", label: "Utility & Infrastructure Precinct", type: "Park Precinct", children: [
    child("substations", "Substations & Power Distribution"), child("water-network", "Water Supply Network"),
    child("wastewater", "Wastewater Treatment"), child("drainage", "Stormwater & Drainage"),
    child("telecom", "Fiber & Private 5G"), child("public-lighting", "Road & Public Lighting"),
  ] },
  { id: "land-investment", label: "Land & Investment Portfolio", type: "Management Domain", children: [
    child("available-plots", "Available Plots"), child("negotiation-plots", "Plots Under Negotiation"),
    child("leased-plots", "Leased Plots"), child("development-projects", "Development Projects"),
  ] },
  { id: "transport-logistics", label: "Transport & Logistics", type: "Park Area", children: [
    child("main-gates", "Main Gates"), child("internal-roads", "Internal Roads"), child("truck-parking", "Truck Parking"), child("loading-yards", "Loading Yards"),
  ] },
  child("administration", "Administration & IOC", "Facility"), child("utility-plant", "Central Utility Plant", "Facility"),
  child("data-center", "Mini Data Center", "Facility"), child("green-corridor", "Green Corridor & Water Bodies", "Park Area"),
];

export interface AirportHotspotDefinition {
  id: string; label: string; type: string; x: number; y: number; status: AirportStatus;
  severity: "info" | "low" | "medium" | "high" | "critical"; module: AirportModuleId;
  kpis: Array<{ label: string; value: string }>;
}

export const AIRPORT_HOTSPOTS: AirportHotspotDefinition[] = [
  { id: "semiconductor", label: "Semiconductor & Precision Manufacturing", type: "Technology Precinct", x: 67, y: 68, status: "normal", severity: "low", module: "AIRPORT_OPS", kpis: [{ label: "Power quality", value: "99.98%" }, { label: "Sensitive load", value: "18.6 MW" }] },
  { id: "rd-zone", label: "R&D and Laboratory Campus", type: "Innovation Precinct", x: 51, y: 46, status: "optimized", severity: "info", module: "PASSENGERS", kpis: [{ label: "Occupancy", value: "81%" }, { label: "Projects", value: "42" }] },
  { id: "available-plots", label: "Available Investment Plots", type: "Land Portfolio", x: 84, y: 34, status: "normal", severity: "info", module: "PASSENGERS", kpis: [{ label: "Available area", value: "146.8 ha" }, { label: "Qualified leads", value: "28" }] },
  { id: "utility", label: "Central Utility Plant", type: "OT Facility", x: 25, y: 55, status: "warning", severity: "medium", module: "BMS", kpis: [{ label: "Power demand", value: "42.8 MW" }, { label: "Cooling", value: "86%" }] },
  { id: "substation", label: "110 kV Hoa Lien Substation", type: "Power Infrastructure", x: 89, y: 45, status: "warning", severity: "high", module: "AIRPORT_OPS", kpis: [{ label: "THD", value: "4.1%" }, { label: "Voltage sag", value: "1 event" }] },
  { id: "wastewater", label: "Wastewater Treatment Plant", type: "Environmental Facility", x: 15, y: 43, status: "normal", severity: "low", module: "SAFETY", kpis: [{ label: "Flow", value: "8,420 m³/d" }, { label: "Effluent", value: "Compliant" }] },
  { id: "drainage", label: "Stormwater & Drainage Network", type: "Infrastructure Network", x: 73, y: 77, status: "warning", severity: "medium", module: "INTELLIGENCE", kpis: [{ label: "Flood risk", value: "Moderate" }, { label: "Pump reserve", value: "N+1" }] },
  { id: "main-gate", label: "Main Gate & Logistics Hub", type: "Transport Node", x: 43, y: 87, status: "warning", severity: "medium", module: "AIRPORT_OPS", kpis: [{ label: "Truck wait", value: "12.4 min" }, { label: "Vehicles", value: "418/h" }] },
  { id: "ioc", label: "Administration & IOC", type: "Command Facility", x: 48, y: 60, status: "normal", severity: "low", module: "SYSTEMS", kpis: [{ label: "Systems online", value: "112/115" }, { label: "Data freshness", value: "6 sec" }] },
  { id: "datacenter", label: "Mini Data Center", type: "IT Facility", x: 59, y: 38, status: "normal", severity: "low", module: "SYSTEMS", kpis: [{ label: "Availability", value: "99.97%" }, { label: "PUE", value: "1.42" }] },
  { id: "perimeter", label: "Security Perimeter P-07", type: "Security Zone", x: 94, y: 69, status: "critical", severity: "critical", module: "SAFETY", kpis: [{ label: "Incident", value: "Investigating" }, { label: "Response", value: "2 min" }] },
  { id: "green-corridor", label: "Green Corridor & Water Bodies", type: "Environmental Area", x: 18, y: 28, status: "optimized", severity: "info", module: "SAFETY", kpis: [{ label: "AQI", value: "42" }, { label: "Water level", value: "67%" }] },
  { id: "low-airspace", label: "UAV Survey & Inspection Corridor", type: "Digital Airspace", x: 82, y: 16, status: "normal", severity: "info", module: "AIRPORT_OPS", kpis: [{ label: "Active missions", value: "4" }, { label: "Conflicts", value: "0" }] },
  { id: "survey-foundation", label: "Reality Capture & Survey Foundation", type: "Spatial Data", x: 10, y: 67, status: "normal", severity: "info", module: "SPATIAL", kpis: [{ label: "Survey coverage", value: "100%" }, { label: "Latest update", value: "2 days" }] },
  { id: "bim-federation", label: "BIM-GIS Federation", type: "Digital Thread", x: 56, y: 29, status: "optimized", severity: "info", module: "SPATIAL", kpis: [{ label: "BIM facilities", value: "28" }, { label: "Asset mapping", value: "94.7%" }] },
];

export const AIRPORT_LAYERS = [
  "Orthophoto & Survey", "Point Cloud & Reality Capture", "Terrain & Elevation", "Land & Planning",
  "Tenants & Projects", "BIM-GIS & Digital Thread", "Power & Energy", "Water & Drainage", "Environment",
  "Traffic & Logistics", "Facilities", "Underground Utilities", "Security & Incidents", "UAV Airspace",
];

export function getAirportModule(id: AirportModuleId) {
  return AIRPORT_MODULES.find((module) => module.id === id) ?? AIRPORT_MODULES[0];
}
