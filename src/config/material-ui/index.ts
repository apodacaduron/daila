import { createTheme, ThemeOptions } from '@mui/material'

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0660FD',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
  }
}

const theme = createTheme(themeOptions)

export default theme