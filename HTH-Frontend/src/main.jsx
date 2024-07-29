import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";


// const route = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<FlightStatus />} />
//       <Route path="/notification" element={<Notifications />} />
//     </>
//   )
// );

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App/>
    {/* <RouterProvider router={route} /> */}
  </React.StrictMode>
);
