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

// Theme-aware scene palettes for the Three.js Overview 3D scene. The rest of the
// app switched to a light/dark theme driven by CSS variables, but the 3D scene's
// background/fog/sky/lighting are set at the Three.js layer (not CSS), so they
// need their own explicit palette per theme.
export type Airport3DThemeName = "dark" | "light";

export type Airport3DSceneTheme = {
  background: string;
  fog: { color: string };
  sky: {
    // Linear-ish 0..1 RGB triples consumed directly by the sky dome shader.
    zenith: [number, number, number];
    upper: [number, number, number];
    horizon: [number, number, number];
    airglow: [number, number, number];
    glow: [number, number, number];
    showStars: boolean;
  };
  lighting: {
    exposure: number;
    environmentIntensity: number;
    ambientIntensity: number;
    hemisphereIntensity: number;
    keyIntensity: number;
    fillIntensity: number;
    rimIntensity: number;
    warmIntensity: number;
  };
};

export const AIRPORT_3D_SCENE_THEMES: Record<Airport3DThemeName, Airport3DSceneTheme> = {
  dark: {
    background: "#020a14",
    fog: { color: "#020a14" },
    sky: {
      zenith: [0.004, 0.01, 0.03],
      upper: [0.008, 0.03, 0.075],
      horizon: [0.02, 0.06, 0.115],
      airglow: [0.01, 0.036, 0.048],
      glow: [0.005, 0.018, 0.045],
      showStars: true,
    },
    lighting: {
      exposure: 0.82,
      environmentIntensity: 0.85,
      ambientIntensity: 0.95,
      hemisphereIntensity: 2.2,
      keyIntensity: 3.2,
      fillIntensity: 1.65,
      rimIntensity: 1.35,
      warmIntensity: 0.84,
    },
  },
  light: {
    // Soft blue-grey daytime sky, matching the light-theme CSS panel colors
    // (#e8edf3 / #eef2f7) used elsewhere in the app.
    background: "#e8edf3",
    fog: { color: "#eef2f7" },
    sky: {
      zenith: [0.56, 0.68, 0.82],
      upper: [0.74, 0.81, 0.89],
      horizon: [0.91, 0.93, 0.96],
      airglow: [0, 0, 0],
      glow: [0, 0, 0],
      showStars: false,
    },
    lighting: {
      exposure: 0.98,
      environmentIntensity: 1.05,
      ambientIntensity: 1.1,
      hemisphereIntensity: 1.35,
      keyIntensity: 3.0,
      fillIntensity: 1.4,
      rimIntensity: 1.0,
      warmIntensity: 0.55,
    },
  },
};
