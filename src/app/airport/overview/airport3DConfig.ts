import { AIRPORT_3D_TARGETS } from "./airport3DTargets";

export const AIRPORT_3D_CONFIG = {
  enabled: true,
  modelUrl: "/models/park-overview.glb?v=room-20260723",
  interior: {
    targetId: "factory-interior-entry",
    label: "Smart Factory Interior",
    modelUrl: "/models/factory-interior.glb",
    sourceUrl: "https://pub-ad3c98c8c26c4e95ad475279f7257940.r2.dev/cheese_optimize.glb",
    entryZone: {
      // Normalized against the centered Overview model bounds.
      // This is the foreground factory highlighted in the supplied reference image.
      center: [0.286, 0.5, 0.12] as [number, number, number],
      size: [0.36, 1.35, 0.32] as [number, number, number],
    },
    transitionDurationMs: 1050,
  },
  dracoPath: "",
  background: "#020a14",
  defaultCamera: {
    position: [18, 12, 20] as [number, number, number],
    target: [0, 0, 0] as [number, number, number],
    fov: 38,
    near: 0.02,
    far: 10000,
  },
  lighting: {
    exposure: 0.82,
    environmentIntensity: 0.85,
    keyIntensity: 3.2,
    fillIntensity: 1.65,
    rimIntensity: 1.35,
  },
  targets: AIRPORT_3D_TARGETS,
};
