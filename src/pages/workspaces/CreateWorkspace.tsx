import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DTextField } from '../../config/material-ui/components'
import '../../assets/styles/workspaces.scss'
import { useWorkspace } from '../../composables/useWorkspace'
import { Workspace } from '../../utils/types/workspace'

const CreateWorkspace: React.FC = () => {
  const workspaceInstance = useWorkspace()
  const formInstance = useForm<Pick<Workspace, 'name' | 'description'>>()

  const onSubmit = formInstance.handleSubmit((formValues) =>
    workspaceInstance.createWorkspace(formValues),
  )

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
          <LoadingButton type="submit" variant="contained" loading={formInstance.formState.isSubmitting}>
            Create workspace
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}

export default CreateWorkspace
