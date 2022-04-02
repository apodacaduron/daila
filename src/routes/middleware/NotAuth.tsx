import { Navigate } from 'react-router-dom'
import type React from 'react'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useAuth } from '../../composables/useAuth'

const NotAuth: React.FC = (props) => {
  const authInstance = useAuth()
  if (authInstance.authUserQuery.isLoading) {
    return <LoadingScreen />
  }

  return !authInstance.authUserQuery.data ? (
    <>{props.children}</>
  ) : (
    <Navigate replace to="/123/psychologist" />
  )
}

export default NotAuth
