import * as React from 'react'
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { styled } from '@mui/system'
import { alpha } from '@mui/material'

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
}

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
}

const StyledButton = styled('button')(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '&': {
    textAlign: 'left',
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F4F4F4' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 16px',
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    [`&.${selectUnstyledClasses.focusVisible}`]: {
      outline: `3px solid ${
        theme.palette.mode === 'dark' ? blue[600] : blue[100]
      }`,
    },
    [`&.${selectUnstyledClasses.expanded}`]: {
      '&::after': {
        content: '"▴"',
      },
    },
    '&::after': {
      content: '"▾"',
      float: 'right',
    },
  },
}))

// const StyledButton = styled('button')(
//   ({ theme }) => `
//   box-sizing: border-box;
//   min-height: calc(1.5em + 22px);
//   min-width: 320px;
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
//   border-radius: 0.75em;
//   margin-top: 0.5em;
//   padding: 10px;
//   text-align: left;
//   line-height: 1.5;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//   }

//   &.${selectUnstyledClasses.focusVisible} {
//     outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
//   }

//   &.${selectUnstyledClasses.expanded} {
//     &::after {
//       content: '▴';
//     }
//   }

//   &::after {
//     content: '▾';
//     float: right;
//   }
//   `,
// )

const StyledListbox = styled('ul')(
  ({ theme }) => `
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.03) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.03) 0px 4px 6px -2px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  width: 100%;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
)

export const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
  width: 100%;
`

function DSelect(props: SelectUnstyledProps<number>) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} components={components} />
}

export default DSelect

// export default function UnstyledSelectsMultiple() {
//   const [value, setValue] = React.useState<number | null>(10)
//   return (
//     <div>
//       <DSelect value={value} onChange={setValue}>
//         <StyledOption value={10}>Ten</StyledOption>
//         <StyledOption value={20}>Twenty</StyledOption>
//         <StyledOption value={30}>Thirty</StyledOption>
//       </DSelect>

//       <Paragraph>Selected value: {value}</Paragraph>
//     </div>
//   )
// }
