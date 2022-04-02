import { Navigate } from 'react-router-dom'
import type React from 'react'
import type { UseQueryResult } from 'react-query'
import type { AuthError, User } from 'firebase/auth'

interface Props {
  authUserQuery: UseQueryResult<User | null, AuthError>
}
 
const RequireAuth: React.FC<Props> = (props) => {
  if (props.authUserQuery.isLoading) {
    return <div>loading...</div>
  }

  return props.authUserQuery.data ? <>{props.children}</> : <Navigate replace to="/sign-in" />
}

export default RequireAuth