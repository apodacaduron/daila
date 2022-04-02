import { Select } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const DSelect = styled(Select)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& fieldset': {
    display: 'none'
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
    '&:focus, &[aria-expanded="true"]': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

export default DSelect