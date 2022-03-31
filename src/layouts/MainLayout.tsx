import { Outlet } from "react-router-dom"
import NavbarLayout from "./NavbarLayout"
import SidebarLayout from "./SidebarLayout"
import '../assets/styles/layout.scss'

const MainLayout: React.FC = (props) => {
  return <div className="main-layout">
    <SidebarLayout />
    <div className="main-layout__content">
      <NavbarLayout />
      <div className="main-layout__content__outlet">
        <Outlet />
      </div>
    </div>
  </div>
}

export default MainLayout