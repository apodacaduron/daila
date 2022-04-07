import { FilterListOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, IconButton, InputAdornment } from '@mui/material'
import TableToolbar from '../../components/common/TableToolbar'
import TitleBar from '../../components/common/TitleBar'
import DTextField from '../../config/material-ui/DTextField'

const Users: React.FC = () => (
  <div className="team">
    <TitleBar primary="Team members" secondary="Add a new member to your workspace!">
      <Button variant="contained" size="large">
        Add a team member
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

export default Users
