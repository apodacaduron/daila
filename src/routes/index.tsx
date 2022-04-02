import React from 'react'
import { useRoutes } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import { useAuth } from '../composables/useAuth'
import routes from './routes'

const RoutesWrapper: React.FC = () => {
  useAuth()

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      {useRoutes(routes)}
    </React.Suspense>
  )
}

export default RoutesWrapper
