import { ProfileMenu } from '../components/layouts'

const NavbarLayout: React.FC = () => <div className="navbar-layout">
  <div className="navbar-layout__left"></div>
  <div className="navbar-layout__center"></div>
  <div className="navbar-layout__right">
    <ProfileMenu />
  </div>
</div>

export default NavbarLayout