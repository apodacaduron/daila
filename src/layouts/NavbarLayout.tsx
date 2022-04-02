import { ProfileMenu } from '../components/layouts'
import { ReactComponent as DailaLogo } from '../assets/svg/daila-logo.svg'

const NavbarLayout: React.FC = () => (
  <div className="navbar-layout">
    <div className="navbar-layout__left">
      <div className="logo">
        <DailaLogo />
      </div>
    </div>
    <div className="navbar-layout__center"></div>
    <div className="navbar-layout__right">
      <ProfileMenu />
    </div>
  </div>
)

export default NavbarLayout
