import { FilterListOutlined, SearchOutlined } from '@mui/icons-material'
import { Button, IconButton, InputAdornment } from '@mui/material'
import TableToolbar from '../../components/common/TableToolbar'
import TitleBar from '../../components/common/TitleBar'
import DTextField from '../../config/material-ui/DTextField'

const Users: React.FC = () => (
  <div className="users">
    <TitleBar primary="Users" secondary="Add a new member to your workspace!">
      <Button variant="contained" size="large">
        Create a user
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
