import MainLayout from '../../layouts/MainLayout'
import RequireAuth from './RequireAuth'
import RequireValidWorkspace from './RequireValidWorkspace'
import RequireWorkspace from './RequireWorkspace'

const WorkspaceMiddleware: React.FC = () => {
  return (
    <RequireAuth>
      <RequireWorkspace>
        <RequireValidWorkspace>
          <MainLayout />
        </RequireValidWorkspace>
      </RequireWorkspace>
    </RequireAuth>
  )
}

export default WorkspaceMiddleware
