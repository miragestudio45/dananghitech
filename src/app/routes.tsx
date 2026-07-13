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
    path: "*",
    element: <Navigate to="/site/da-nang-high-tech-park" replace />,
  },
]);
