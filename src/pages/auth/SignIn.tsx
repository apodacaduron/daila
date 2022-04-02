import {
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import SocialMediaButtons from '../../components/auth/SocialMediaButtons'
import '../../assets/styles/auth.scss'
import { DTextField } from '../../config/material-ui/components'
import { useAuth } from '../../composables/useAuth'
import type { SignIn as SignInType } from '../../utils/types/auth'
import { emailValidation, required } from '../../utils/validations'

const SignIn: React.FC = () => {
  const authInstance = useAuth()
  const formInstance = useForm<SignInType>()

  const onSubmit = formInstance.handleSubmit(async (formValues) =>{
    await authInstance.signInWithCredentials(formValues)
  })

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Sign in</h1>
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
          <FormControl
            error={Boolean(formInstance.formState.errors.password)}
            variant="standard"
          >
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <DTextField
              placeholder="•••••••••"
              type="password"
              id="password"
              error={Boolean(formInstance.formState.errors.password)}
              {...formInstance.register('password', required)}
            />
            <FormHelperText>
              {formInstance.formState.errors.password?.message}
            </FormHelperText>
          </FormControl>
          <Link
            className="auth__container__forgot-password"
            to="/reset-password"
          >
            Forgot your password?
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formInstance.formState.isSubmitting}
          >
            Sign in
          </LoadingButton>
        </form>
        <div className="auth__container__account">
          Don&apos;t have an account yet? <Link to="/sign-up">Sign up</Link>
        </div>
        <SocialMediaButtons />
      </div>
    </div>
  )
}

export default SignIn
