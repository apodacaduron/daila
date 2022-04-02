import { Navigate, useParams } from 'react-router-dom'
import { useWorkspace } from '../composables/useWorkspace'

const RequireValidWorkspace: React.FC = (props) => {
  const { workspaceId } = useParams()
  const workspaceInstance = useWorkspace()

  if (workspaceInstance.isLoading) {
    return <div>loading...</div>
  }

  const hasWorkspace = workspaceInstance.workspaceExists(workspaceId)

  return hasWorkspace ? <>{props.children}</> : <Navigate replace to={`/${workspaceInstance.currentWorkspace.id}/${workspaceInstance.currentWorkspace.layout}`} />
}

export default RequireValidWorkspace