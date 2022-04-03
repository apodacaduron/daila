import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'

const DTextField = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&.Mui-error': {
    '& .MuiInputBase-input': {
      backgroundColor: alpha(theme.palette.error.main, 0.05),
      border: `1px solid ${alpha(theme.palette.error.main, 0.25)}`,
      '&:focus': {
        boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.error.main,
      },
    },
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F4F4F4' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 16px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-inputSizeSmall': {
    padding: '4px 16px',
  },
  '& .MuiInputAdornment-positionStart ~ .MuiInputBase-inputSizeSmall': {
    paddingLeft: '36px'
  },
  '& .MuiInputAdornment-positionStart': {
    position: 'absolute',
    left: '8px',
    zIndex: 1,
    pointerEvents: 'none'
  }
}))

export default DTextField