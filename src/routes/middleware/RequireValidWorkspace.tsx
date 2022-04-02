import { Navigate, useLocation, useParams } from 'react-router-dom'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useWorkspace } from '../../composables/useWorkspace'

const RequireValidWorkspace: React.FC = (props) => {
  const location = useLocation()
  const { workspaceId } = useParams()
  const workspaceInstance = useWorkspace()

  if (workspaceInstance.isLoading) {
    return <LoadingScreen />
  }

  const workspaceFromUrl = workspaceInstance.getWorkspaceById(workspaceId)
  const layoutFromUrl = location.pathname.split('/')[2] ?? ''
  const workspaceMatches = workspaceFromUrl?.id === workspaceId
  const layoutMatches = workspaceFromUrl?.layout === layoutFromUrl

  return workspaceMatches && layoutMatches ? (
    <>{props.children}</>
  ) : (
    <Navigate
      replace
      to={`/${workspaceInstance.currentWorkspace.id}/${workspaceInstance.currentWorkspace.layout}`}
    />
  )
}

export default RequireValidWorkspace
