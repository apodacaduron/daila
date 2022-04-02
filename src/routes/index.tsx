import React from 'react'
import { RouteObject, useRoutes, Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import { useAuth } from '../composables/useAuth'
import psychologistRoutes from './psychologistRoutes'
import teacherRoutes from './teacherRoutes'

// Middlewares
const WorkspaceMiddleware = React.lazy(() =>
  import('./middleware/WorkspaceMiddleware'),
)
const RequireAuth = React.lazy(() => import('./middleware/RequireAuth'))
const NotAuth = React.lazy(() => import('./middleware/NotAuth'))

// Shared routes
const Home = React.lazy(() => import('../pages/Home'))
const CreateWorkspace = React.lazy(() =>
  import('../pages/workspaces/CreateWorkspace'),
)
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
      path: ':workspaceId',
      element: (
        <WorkspaceMiddleware authUserQuery={authInstance.authUserQuery} />
      ),
      children: [
        {
          path: '',
          element: <Navigate to="psychologist" />,
        },
        {
          path: 'psychologist',
          children: psychologistRoutes,
        },
        {
          path: 'teacher',
          children: teacherRoutes,
        },
        {
          path: '*',
          element: <Navigate to="psychologist" />,
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
    <React.Suspense fallback={<LoadingScreen />}>
      {useRoutes(routes)}
    </React.Suspense>
  )
}

export default RoutesWrapper
