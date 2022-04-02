import { toast } from 'react-toastify'

const handleError = (err: unknown) => {
  if (typeof err === 'string') {
    toast.error(err)
  } else if (err instanceof Error) {
    toast.error(err.message)
  }
} 

export default handleError