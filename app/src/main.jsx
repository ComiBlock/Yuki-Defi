import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Swap from "./routes/Swap";
import TryPage from "./routes/TryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Swap />,
  },
  {
    path: "/try",
    element: <TryPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
