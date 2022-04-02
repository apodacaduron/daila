import type { AuthError, User } from 'firebase/auth'
import type { UseQueryResult } from 'react-query'
import MainLayout from '../../layouts/MainLayout'
import RequireAuth from './RequireAuth'
import RequireValidWorkspace from './RequireValidWorkspace'
import RequireWorkspace from './RequireWorkspace'

interface Props {
  authUserQuery: UseQueryResult<User | null, AuthError>
}

const WorkspaceMiddleware: React.FC<Props> = (props) => {
  return (
    <RequireAuth authUserQuery={props.authUserQuery}>
      <RequireWorkspace>
        <RequireValidWorkspace>
          <MainLayout />
        </RequireValidWorkspace>
      </RequireWorkspace>
    </RequireAuth>
  )
}

export default WorkspaceMiddleware
