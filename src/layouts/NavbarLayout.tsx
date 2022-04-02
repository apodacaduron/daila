import { ProfileMenu } from '../components/layouts'
import { ReactComponent as DailaLogo } from '../assets/svg/daila-logo.svg'
import { IconButton } from '@mui/material'
import { InboxOutlined, NotificationsOutlined } from '@mui/icons-material'

const NavbarLayout: React.FC = () => (
  <div className="navbar-layout">
    <div className="navbar-layout__left">
      <div className="logo">
        <DailaLogo />
      </div>
    </div>
    <div className="navbar-layout__center"></div>
    <div className="navbar-layout__right">
      <IconButton>
        <InboxOutlined />
      </IconButton>
      <IconButton>
        <NotificationsOutlined />
      </IconButton>
      <ProfileMenu />
    </div>
  </div>
)

export default NavbarLayout
