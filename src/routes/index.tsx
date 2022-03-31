import React from 'react'
import { RouteObject, useRoutes, Navigate } from 'react-router-dom'
import { useAuth } from '../composable/useAuth'

const RequireAuth = React.lazy(() => import('./RequireAuth'))
const NotAuth = React.lazy(() => import('./NotAuth'))

const Home = React.lazy(() => import('../pages/Home'))
const MainLayout = React.lazy(() => import('../layouts/MainLayout'))
const Dashboard = React.lazy(() => import('../pages/psychologist/Dashboard'))
const SignIn = React.lazy(() => import('../pages/auth/SignIn'))
const SignUp = React.lazy(() => import('../pages/auth/SignUp'))
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'))

const RoutesWrapper: React.FC = () => {
  const authInstance = useAuth()

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'sign-in',
      element: (
        <NotAuth authUserQuery={authInstance.authUserQuery}>
          <SignIn />
        </NotAuth>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <NotAuth authUserQuery={authInstance.authUserQuery}>
          <SignUp />
        </NotAuth>
      ),
    },
    {
      path: ':workspaceId/psychologist',
      element: (
        <RequireAuth authUserQuery={authInstance.authUserQuery}>
          <MainLayout />
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
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
