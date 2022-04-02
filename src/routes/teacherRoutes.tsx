import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Dashboard = React.lazy(() => import('../pages/teacher/Dashboard'))

const teacherRoutes: RouteObject[] = [
  {
    path: '',
    element: <Navigate to="dashboard" />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
  },
]

export default teacherRoutes
