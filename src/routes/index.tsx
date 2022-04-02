import React from 'react'
import { RouteObject, useRoutes, Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import { useAuth } from '../composables/useAuth'

const RequireValidWorkspace = React.lazy(() => import('./RequireValidWorkspace'))
const RequireWorkspace = React.lazy(() => import('./RequireWorkspace'))
const RequireAuth = React.lazy(() => import('./RequireAuth'))
const NotAuth = React.lazy(() => import('./NotAuth'))

const MainLayout = React.lazy(() => import('../layouts/MainLayout'))

const Home = React.lazy(() => import('../pages/Home'))
const CreateWorkspace = React.lazy(() => import('../pages/workspaces/CreateWorkspace'))
const SignIn = React.lazy(() => import('../pages/auth/SignIn'))
const SignUp = React.lazy(() => import('../pages/auth/SignUp'))
const PageNotFound = React.lazy(() => import('../pages/PageNotFound'))

// Psychologist
const PsychologistDashboard = React.lazy(() => import('../pages/psychologist/Dashboard'))

// Teacher
const TeacherDashboard = React.lazy(() => import('../pages/teacher/Dashboard'))

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
          <RequireWorkspace>
            <RequireValidWorkspace>
              <MainLayout />
            </RequireValidWorkspace>
          </RequireWorkspace>
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: <PsychologistDashboard />,
        },
      ],
    },
    {
      path: ':workspaceId/teacher',
      element: (
        <RequireAuth authUserQuery={authInstance.authUserQuery}>
          <RequireWorkspace>
            <RequireValidWorkspace>
              <MainLayout />
            </RequireValidWorkspace>
          </RequireWorkspace>
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="dashboard" />,
        },
        {
          path: 'dashboard',
          element: <TeacherDashboard />,
        },
      ],
    },
    {
      path: 'workspaces',
      element: (
        <RequireAuth authUserQuery={authInstance.authUserQuery}>
          <Outlet />
        </RequireAuth>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="create" />,
        },
        {
          path: 'create',
          element: <CreateWorkspace />,
        },
      ],
    },
    { path: '*', element: <PageNotFound /> },
  ]

  return (
    <React.Suspense fallback={<LoadingScreen />}>{useRoutes(routes)}</React.Suspense>
  )
}

export default RoutesWrapper
