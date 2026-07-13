export interface Airport3DTarget {
  id: string;
  label: string;
  objectPatterns: string[];
  materialPatterns?: string[];
  module: string;
  cameraPadding?: number;
}

export const AIRPORT_3D_TARGETS: Airport3DTarget[] = [
  {
    id: "high-tech-buildings",
    label: "High-Tech Manufacturing Buildings",
    objectPatterns: ["building", "factory", "warehouse", "workshop", "mesh"],
    materialPatterns: ["concrete", "wall", "roof", "glass"],
    module: "AIRPORT_OPS",
    cameraPadding: 1.55,
  },
  {
    id: "park-infrastructure",
    label: "Road & Utility Infrastructure",
    objectPatterns: ["road", "street", "utility", "infrastructure"],
    materialPatterns: ["road", "asphalt", "pavement"],
    module: "SPATIAL",
    cameraPadding: 1.45,
  },
  {
    id: "park-landscape",
    label: "Landscape & Water Context",
    objectPatterns: ["landscape", "terrain", "water", "tree", "grass"],
    materialPatterns: ["grass", "water", "terrain", "landscape"],
    module: "SPATIAL",
    cameraPadding: 1.35,
  },
];
