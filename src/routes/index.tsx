import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const SignIn = React.lazy(() => import("../pages/auth/SignIn"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const PageNotFound = React.lazy(() => import("../pages/PageNotFound"));

const RoutesWrapper: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    { path: "*", element: <PageNotFound /> },
  ];
  
  return <React.Suspense fallback="loading...">{useRoutes(routes)}</React.Suspense>
}

export default RoutesWrapper;