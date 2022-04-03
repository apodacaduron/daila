import { FilterListOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, IconButton, InputAdornment } from '@mui/material'
import TableToolbar from '../../../components/common/TableToolbar'
import TitleBar from '../../../components/common/TitleBar'
import DTextField from '../../../config/material-ui/DTextField'

const Patients: React.FC = () => {
  return (
    <div className="patients">
      <TitleBar primary="Patients" secondary="View and manage your patients">
        <Button variant="contained" size="large">
          Create a patient
        </Button>
      </TitleBar>
      <TableToolbar
        actions={
          <>
            <DTextField
              size="small"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
            />
            <IconButton>
              <FilterListOutlined />
            </IconButton>
          </>
        }
      />
    </div>
  )
}

export default Patients
