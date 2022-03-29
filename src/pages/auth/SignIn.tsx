import { TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import SocialMediaButtons from '../../components/auth/SocialMediaButtons'
import { useForm } from 'react-hook-form'

const SignIn: React.FC = () => {
  const formInstance = useForm()

  const onSubmit = (formValues: any) => console.log(formValues)

  return (
    <div className="auth">
      <h1>Sign in</h1>
      <form
        onSubmit={formInstance.handleSubmit(onSubmit)}
        className="auth__form"
      >
        <TextField {...formInstance.register('email', { required: true })} />
        <TextField {...formInstance.register('password', { required: true })} />
        <Link to="/auth/reset-password">Forgot your password?</Link>
        <LoadingButton loading={false}>Sign in</LoadingButton>
      </form>
      <div className="auth__account">
        Don't have an account yet? <Link to="/auth/sign-up">Sign up</Link>
      </div>
      <SocialMediaButtons />
    </div>
  )
}

export default SignIn
