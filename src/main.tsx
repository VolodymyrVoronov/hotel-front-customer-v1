import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./layout/Main/Main";
import Home from "./pages/Home/Home";

const Facilities = lazy(() => import("./pages/Facilities/Facilities"));
const Rooms = lazy(() => import("./pages/Rooms/Rooms"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

import { ROUTES } from "./constants";

import "reset-css";
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import "@fontsource-variable/cormorant";
import "@fontsource-variable/montserrat";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Main />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.FACILITIES,
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Facilities />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ROOMS,
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Rooms />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONTACT,
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <>404</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

