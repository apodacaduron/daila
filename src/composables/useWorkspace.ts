import { useFunctionsCall } from '@react-query-firebase/functions'
import React from 'react'
import { functions } from '../config/firebase'
import type { Workspace } from '../utils/types/workspace'
import { useGetUserQuery } from './useUser'

export const useWorkspace = () => {
  // Queries
  const getUserQuery = useGetUserQuery()

  // Variables
  const lastWorkspaceId = getUserQuery.data?.data()?.specialistSettings?.lastWorkspaceId
  const workspaces = getUserQuery.data?.data()?.specialistSettings?.workspaces
  const workspacesList = Object.values(getUserQuery.data?.data()?.specialistSettings?.workspaces ?? [])
  const isLoading = getUserQuery.isLoading

  // State
  const [currentWorkspace, setCurrentWorkspace] = React.useState(getUserQuery.data?.data()?.specialistSettings?.workspaces?.[lastWorkspaceId])

  // Mutations
  const createWorkspaceMutation = useFunctionsCall(functions, 'onCreateWorkspace')
  const switchWorkspaceMutation = useFunctionsCall(functions, 'onSwitchWorkspace')

  // Handlers
  const createWorkspace = (formData: Pick<Workspace, 'name' | 'description' | 'layout'>) =>
    createWorkspaceMutation.mutateAsync(formData)

  const switchWorkspace = (workspace: any) => {
    setCurrentWorkspace(workspace)
    switchWorkspaceMutation.mutateAsync(workspace)
  }

  const workspaceExists = (workspaceId: string | undefined) => {
    return Boolean(workspaces?.[workspaceId ?? ''])
  }


  return {
    // Mutations
    createWorkspaceMutation,

    // Variables
    lastWorkspaceId,
    workspaces,
    workspacesList,
    isLoading,

    // State
    currentWorkspace,

    // Handlers
    createWorkspace,
    switchWorkspace,
    workspaceExists,
  }
}