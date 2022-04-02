import { Navigate } from 'react-router-dom'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useWorkspace } from '../../composables/useWorkspace'

const RequireWorkspace: React.FC = (props) => {
  const workspaceInstance = useWorkspace()

  if (workspaceInstance.isLoading) {
    return <LoadingScreen />
  }

  return workspaceInstance.lastWorkspaceId ? (
    <>{props.children}</>
  ) : (
    <Navigate replace to="/workspaces/create" />
  )
}

export default RequireWorkspace
