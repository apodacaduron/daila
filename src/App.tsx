import { QueryClientProvider } from 'react-query'
import RoutesWrapper from './routes'
import theme from './config/material-ui'
import { ThemeProvider } from '@mui/material'
import queryClient from './config/react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
import { defaultConfig } from './config/react-toastify'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RoutesWrapper />
        <ReactQueryDevtools />
        <ToastContainer {...defaultConfig} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
