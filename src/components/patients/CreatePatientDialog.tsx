import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
} from '@mui/material'
import type { DialogProps } from '@mui/material'
import DTextField from '../../config/material-ui/DTextField'
import { emailValidation, phoneValidation, required } from '../../utils/validations'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import DSelect from '../../config/material-ui/DSelect'

interface Props extends DialogProps {
  patient?: any
}

const CreatePatientDialog: React.FC<Props> = (props) => {
  const { patient, ...dialogProps } = props
  const formInstance = useForm({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
  })

  const onSubmit = formInstance.handleSubmit(async (formValues) => {
    console.log(formValues)
    // closeDialog()
  })

  const closeDialog = () => dialogProps.onClose?.({}, 'escapeKeyDown')

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Create patient</DialogTitle>
      <DialogContent dividers>
        <form id="form" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(formInstance.formState.errors.name)}
                variant="standard"
                fullWidth
              >
                <InputLabel shrink htmlFor="name">
                  Name
                </InputLabel>
                <DTextField
                  placeholder="John Doe"
                  type="name"
                  id="name"
                  error={Boolean(formInstance.formState.errors.name)}
                  {...formInstance.register('name', required)}
                />
                <FormHelperText>
                  {formInstance.formState.errors.name?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(formInstance.formState.errors.email)}
                variant="standard"
                fullWidth
              >
                <InputLabel shrink htmlFor="email">
                  Email
                </InputLabel>
                <DTextField
                  placeholder="johndoe@example.com"
                  type="email"
                  id="email"
                  error={Boolean(formInstance.formState.errors.email)}
                  {...formInstance.register('email', emailValidation)}
                />
                <FormHelperText>
                  {formInstance.formState.errors.email?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(formInstance.formState.errors.phoneNumber)}
                variant="standard"
                fullWidth
              >
                <InputLabel shrink htmlFor="phoneNumber">
                  Phone number
                </InputLabel>
                <DTextField
                  placeholder="+52 123-456-7890"
                  type="tel"
                  id="phoneNumber"
                  error={Boolean(formInstance.formState.errors.phoneNumber)}
                  {...formInstance.register('phoneNumber', phoneValidation)}
                />
                <FormHelperText>
                  {formInstance.formState.errors.phoneNumber?.message}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <LoadingButton
          type="submit"
          form="form"
          loading={formInstance.formState.isSubmitting}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePatientDialog
