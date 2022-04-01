import { FormControl, InputLabel } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import SocialMediaButtons from '../../components/auth/SocialMediaButtons'
import '../../assets/styles/auth.scss'
import { DTextField } from '../../config/material-ui/components'

const SignIn: React.FC = () => {
  const formInstance = useForm()

  const onSubmit = (formValues: any) => console.log(formValues)

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Sign in</h1>
        <form
          onSubmit={formInstance.handleSubmit(onSubmit)}
          className="auth__container__form"
        >
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="email">
              Email
            </InputLabel>
            <DTextField
              placeholder="johndoe@example.com"
              type="email"
              id="email"
              {...formInstance.register('email', { required: true })}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="password">
              Password
            </InputLabel>
            <DTextField
              placeholder="•••••••••"
              type="password"
              id="password"
              {...formInstance.register('email', { required: true })}
            />
          </FormControl>
          <Link
            className="auth__container__forgot-password"
            to="/reset-password"
          >
            Forgot your password?
          </Link>
          <LoadingButton type="submit" variant="contained" loading={formInstance.formState.isSubmitting}>
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
