import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import PrivateContainer from "./components/PrivateContainer";
import SocketContainer from "./components/SocketContainer";

import Home from "./views/Home";
import About from "./views/About";
import Project from "./views/Project";
import ProjectDetail from "./views/ProjectDetail";

import NoMatch from "./views/NoMatch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "project/",
        element: (
          <PrivateContainer>
            <SocketContainer />
          </PrivateContainer>
        ),
        children: [
          { path: "", element: <Project /> },
          { path: "detail", element: <ProjectDetail /> },
        ],
      },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
