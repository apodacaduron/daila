import { FormControl, FormHelperText, InputLabel } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import SocialMediaButtons from '../../components/auth/SocialMediaButtons'
import '../../assets/styles/auth.scss'
import { DTextField } from '../../config/material-ui/components'
import { useAuth } from '../../composables/useAuth'
import type { SignUp as SignUpType } from '../../utils/types/auth'
import { confirmPasswordValidation, emailValidation, passwordValidation } from '../../utils/validations'

const SignUp: React.FC = () => {
  const authInstance = useAuth()
  const formInstance = useForm<SignUpType>()

  const onSubmit = formInstance.handleSubmit((formValues) =>
    authInstance.signUpWithCredentials(formValues),
  )

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Sign up</h1>
        <form onSubmit={onSubmit} className="auth__container__form">
          <FormControl error={Boolean(formInstance.formState.errors.email)} variant="standard">
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
          <FormControl error={Boolean(formInstance.formState.errors.password)} variant="standard">
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <DTextField
              placeholder="•••••••••"
              type="password"
              id="password"
              error={Boolean(formInstance.formState.errors.password)}
              {...formInstance.register('password', passwordValidation)}
            />
            <FormHelperText>
              {formInstance.formState.errors.password?.message}
            </FormHelperText>
          </FormControl>
          <FormControl error={Boolean(formInstance.formState.errors.confirmPassword)} variant="standard">
            <InputLabel shrink htmlFor="confirmPassword">
              Confirm password
            </InputLabel>
            <DTextField
              placeholder="•••••••••"
              type="password"
              id="confirmPassword"
              error={Boolean(formInstance.formState.errors.confirmPassword)}
              {...formInstance.register(
                'confirmPassword',
                confirmPasswordValidation(formInstance.getValues().password),
              )}
            />
            <FormHelperText>
              {formInstance.formState.errors.confirmPassword?.message}
            </FormHelperText>
          </FormControl>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formInstance.formState.isSubmitting}
          >
            Sign up
          </LoadingButton>
        </form>
        <div className="auth__container__account">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </div>
        <SocialMediaButtons />
      </div>
    </div>
  )
}

export default SignUp
