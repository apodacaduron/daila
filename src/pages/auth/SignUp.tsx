import { FormControl, InputLabel } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import SocialMediaButtons from '../../components/auth/SocialMediaButtons'
import '../../assets/styles/auth.scss'
import { DTextField } from '../../config/material-ui/components'

const SignUp: React.FC = () => {
  const formInstance = useForm()

  const onSubmit = (formValues: any) => console.log(formValues)

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Sign up</h1>
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
          <LoadingButton variant="contained" loading={false}>
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
