import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/site/da-nang-high-tech-park" replace />,
  },
  {
    path: "/site/da-nang-high-tech-park",
    lazy: async () => {
      const module = await import("./airport/AirportDigitalTwinPage");
      return { Component: module.AirportDigitalTwinPage };
    },
  },
  {
    path: "/site/yooenergy",
    lazy: async () => {
      const module = await import("./energy/YooEnergyPage");
      return { Component: module.YooEnergyPage };
    },
  },
  {
    path: "*",
    element: <Navigate to="/site/da-nang-high-tech-park" replace />,
  },
]);
