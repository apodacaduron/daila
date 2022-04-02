import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Dashboard = React.lazy(() => import('../pages/psychologist/Dashboard'))
const Users = React.lazy(() => import('../pages/psychologist/Users'))

const psychologistRoutes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="dashboard" />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    path: 'users',
    element: <Users />,
  },
]

export default psychologistRoutes
