import { AuthError, User } from 'firebase/auth'
import { UseQueryResult } from 'react-query'
import { useGetUserById } from '../composables/useUser'
import { Navigate } from 'react-router-dom'

interface Props {
  authUserQuery: UseQueryResult<User | null, AuthError>
}

const RequireWorkspace: React.FC<Props> = (props) => {
  const getUserByIdQuery = useGetUserById(props.authUserQuery.data?.uid)

  if (getUserByIdQuery.isLoading) {
    return <div>loading...</div>
  }

  const user = getUserByIdQuery.data?.data()
  const lastWorkspaceId = user?.specialistSettings?.lastWorkspaceId

  return lastWorkspaceId ? <>{props.children}</> : <Navigate replace to="/workspaces/create" />
}

export default RequireWorkspace