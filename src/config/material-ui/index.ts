import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#0660FD',
    },
  },
}

const theme = createTheme(themeOptions)

export default theme;