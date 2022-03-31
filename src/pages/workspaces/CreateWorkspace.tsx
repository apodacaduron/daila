import { LoadingButton } from '@mui/lab'
import { FormControl, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { DTextField } from '../../config/material-ui/components'
import '../../assets/styles/workspaces.scss'

const CreateWorkspace: React.FC = () => {
  const formInstance = useForm()

  const onSubmit = (formValues: any) => console.log(formValues)

  return (
    <div className="create-workspace">
      <div className="create-workspace__container">
        <h1>Create workspace</h1>
        <form
          onSubmit={formInstance.handleSubmit(onSubmit)}
          className="create-workspace__container__form"
        >
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
              {...formInstance.register('description', { required: true })}
            />
          </FormControl>
          <LoadingButton variant="contained" loading={false}>
            Create workspace
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}

export default CreateWorkspace
