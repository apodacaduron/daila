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
} from '@mui/material'
import type { DialogProps } from '@mui/material'
import DTextField from '../../config/material-ui/DTextField'
import { emailValidation, required } from '../../utils/validations'
import { useForm } from 'react-hook-form'

interface Props extends DialogProps {
  patient?: any
}

const CreatePatientDialog: React.FC<Props> = (props) => {
  const { patient, ...dialogProps } = props
  const formInstance = useForm()

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>Create patient</DialogTitle>
      <DialogContent dividers>
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
              error={Boolean(formInstance.formState.errors.phone)}
              variant="standard"
              fullWidth
            >
              <InputLabel shrink htmlFor="phone">
                Phone
              </InputLabel>
              <DTextField
                placeholder="614-528-59-77"
                type="phone"
                id="phone"
                error={Boolean(formInstance.formState.errors.phone)}
                {...formInstance.register('phone', required)}
              />
              <FormHelperText>
                {formInstance.formState.errors.phone?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dialogProps.onClose?.({}, 'escapeKeyDown')}>
          Cancel
        </Button>
        <Button onClick={() => dialogProps.onClose?.({}, 'escapeKeyDown')}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreatePatientDialog
