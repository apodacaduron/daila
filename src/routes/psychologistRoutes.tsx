import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Dashboard = React.lazy(() => import('../pages/psychologist/Dashboard'))
const Appointments = React.lazy(() =>
  import('../pages/psychologist/Appointments'),
)
const Patients = React.lazy(() =>
  import('../pages/psychologist/patients/index'),
)
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
    path: 'appointments',
    element: <Appointments />,
  },
  {
    path: 'patients',
    element: <Patients />,
  },
  {
    path: 'users',
    element: <Users />,
  },
]

export default psychologistRoutes
