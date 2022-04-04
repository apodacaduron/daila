import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DSelect, DTextField } from '../../config/material-ui/components'
import '../../assets/styles/workspaces.scss'
import { useWorkspace } from '../../composables/useWorkspace'
import type { Workspace as WorkspaceType } from '../../utils/types/workspace'
import { workspaceLayoutOptions } from '../../utils/types/workspace'
import {
  useGetUserQuery,
  useInvalidateUserQueries,
} from '../../composables/useUser'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const CreateWorkspace: React.FC = () => {
  const [workspaceReady, setWorkspaceReady] = React.useState(false)
  const invalidateUserQueries = useInvalidateUserQueries()
  const getUserQuery = useGetUserQuery()
  const workspaceInstance = useWorkspace()
  const navigate = useNavigate()
  const formInstance = useForm<
    Pick<WorkspaceType, 'name' | 'description' | 'layout'>
  >({
    defaultValues: {
      name: '',
      description: '',
      layout: workspaceLayoutOptions[0]?.value ?? 'psychologist',
    },
  })

  React.useEffect(() => {
    if (!getUserQuery.isFetching && workspaceReady) {
      const specialistSettings = getUserQuery.data?.data()?.specialistSettings
      const lastWorkspaceId = specialistSettings.lastWorkspaceId
      const workspace = specialistSettings.workspaces?.[lastWorkspaceId]
      if (lastWorkspaceId && workspace) {
        navigate(`/${lastWorkspaceId}/${workspace.layout}`)
      } else {
        throw new Error('Something went wrong, we could not get your workspace')
      }
    }
  }, [getUserQuery.isFetching, workspaceReady])

  const onSubmit = formInstance.handleSubmit(async (formValues) => {
    await workspaceInstance.createWorkspace(formValues)
    await invalidateUserQueries()
    setWorkspaceReady(true)
  })

  return (
    <div className="create-workspace">
      <div className="create-workspace__container">
        <h1>Create workspace</h1>
        <form onSubmit={onSubmit} className="create-workspace__container__form">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="name">
              Workspace name
            </InputLabel>
            <DTextField
              placeholder="My awesome workspace"
              id="name"
              {...formInstance.register('name', { required: true })}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="description">
              Workspace description
            </InputLabel>
            <DTextField
              placeholder="This is a description"
              id="description"
              multiline
              rows={4}
              {...formInstance.register('description')}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="layout">
              Workspace layout
            </InputLabel>
            <DSelect
              variant="outlined"
              {...formInstance.register('layout')}
            >
              {workspaceLayoutOptions.map((workspaceLayoutOption, index) => (
                <MenuItem key={index} value={workspaceLayoutOption.value}>
                  {workspaceLayoutOption.text}
                </MenuItem>
              ))}
            </DSelect>
          </FormControl>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formInstance.formState.isSubmitting}
          >
            Create workspace
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}

export default CreateWorkspace
