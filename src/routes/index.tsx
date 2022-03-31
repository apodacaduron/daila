import React from 'react'
import { RouteObject, useRoutes, Navigate } from 'react-router-dom'

const Home = React.lazy(() => import('../pages/Home'))
const MainLayout = React.lazy(() => import('../layouts/MainLayout'))
const Dashboard = React.lazy(() => import('../pages/psychologist/Dashboard'))
const SignIn = React.lazy(() => import('../pages/auth/SignIn'))
const SignUp = React.lazy(() => import('../pages/auth/SignUp'))
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'))

const RoutesWrapper: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'sign-in',
      element: <SignIn />,
    },
    {
      path: 'sign-up',
      element: <SignUp />,
    },
    {
      path: ':workspaceId',
      children: [
        {
          path: 'psychologist',
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <Navigate to="dashboard" />,
            },
            {
              path: 'dashboard',
              element: <Dashboard />,
            },
          ]
        },
      ],
    },
    { path: '*', element: <PageNotFound /> },
  ]

  return (
    <React.Suspense fallback="loading...">{useRoutes(routes)}</React.Suspense>
  )
}

export default RoutesWrapper
