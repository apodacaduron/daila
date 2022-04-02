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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          color: '#A0A6B1',
          fontSize: '12px'
        }
      }
    }
  }
}

const theme = createTheme(themeOptions)

export default theme