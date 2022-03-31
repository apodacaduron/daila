import { AuthError, User } from 'firebase/auth'
import { UseQueryResult } from 'react-query'
import { useGetUserById } from '../composable/useUser'
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
  console.log(getUserByIdQuery, user)
  const lastWorkspace = user?.userSettings?.lastWorkspace

  return lastWorkspace ? <>{props.children}</> : <Navigate replace to="/workspaces/create" />
}

export default RequireWorkspace