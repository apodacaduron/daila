import React from 'react'
import { RouteObject, Navigate, Outlet } from 'react-router-dom'
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

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'sign-in',
    element: (
      <NotAuth>
        <SignIn />
      </NotAuth>
    ),
  },
  {
    path: 'sign-up',
    element: (
      <NotAuth>
        <SignUp />
      </NotAuth>
    ),
  },
  {
    path: ':workspaceId',
    element: <WorkspaceMiddleware />,
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
        element: <div>Page not found</div>,
      },
    ],
  },
  {
    path: 'workspaces',
    element: (
      <RequireAuth>
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

export default routes
