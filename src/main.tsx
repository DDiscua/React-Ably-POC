import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppRouter from "./AppRouter";
import { Flowbite } from "flowbite-react";
import "./index.css";

const router = createBrowserRouter(createRoutesFromElements(AppRouter));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Flowbite>
      <RouterProvider router={router} />
    </Flowbite>
  </StrictMode>
);
