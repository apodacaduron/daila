import { Navigate } from 'react-router-dom'
import { useWorkspace } from '../composables/useWorkspace'

const RequireWorkspace: React.FC = (props) => {
  const workspaceInstance = useWorkspace()

  if (workspaceInstance.isLoading) {
    return <div>loading...</div>
  }

  return workspaceInstance.lastWorkspaceId ? <>{props.children}</> : <Navigate replace to="/workspaces/create" />
}

export default RequireWorkspace