import { Apple, Facebook, Google, Twitter } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { ButtonProps } from '@mui/material'
import { useAuth } from '../../composable/useAuth'
import { googleAuthProvider } from '../../config/firebase'

const SocialMediaButtons: React.FC = () => {
  const authInstance = useAuth()

  const buttonProps: ButtonProps = {
    size: 'large',
    variant: 'outlined',
    disableElevation: true,
    fullWidth: true,
  }

  return (
    <div className="social-media-buttons">
      <LoadingButton
        {...buttonProps}
        loading={authInstance.isLoading}
        onClick={() => authInstance.signInWithPopup(googleAuthProvider)}
      >
        <Google />
      </LoadingButton>
      <LoadingButton {...buttonProps}>
        <Facebook />
      </LoadingButton>
      <LoadingButton {...buttonProps}>
        <Apple />
      </LoadingButton>
      <LoadingButton {...buttonProps}>
        <Twitter />
      </LoadingButton>
    </div>
  )
}

export default SocialMediaButtons