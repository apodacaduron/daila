import { Navigate } from 'react-router-dom'
import React from 'react'
import { UseQueryResult } from 'react-query'
import { AuthError, User } from 'firebase/auth'

interface Props {
  authUserQuery: UseQueryResult<User | null, AuthError>
}
 
const NotAuth: React.FC<Props> = (props) => {
  if (props.authUserQuery.isLoading) {
    return <div>loading...</div>
  }

  return !props.authUserQuery.data ? <>{props.children}</> : <Navigate replace to="/123/psychologist" />
}

export default NotAuth