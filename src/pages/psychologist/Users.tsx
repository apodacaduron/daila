import { Button } from '@mui/material'
import TitleBar from '../../components/common/TitleBar'

const Users: React.FC = () => (
  <div className="users">
    <TitleBar primary="Users" secondary="Add a new member to your workspace!">
      <Button variant="contained">Create a user</Button>
    </TitleBar>
  </div>
)

export default Users
