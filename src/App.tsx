import { QueryClientProvider } from 'react-query'
import RoutesWrapper from './routes'
import theme from './config/material-ui'
import { ThemeProvider } from '@mui/material'
import queryClient from './config/react-query'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RoutesWrapper />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
