import {
  KeyboardArrowDownOutlined,
  LogoutOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material'
import React from 'react'
import { useMenu } from 'use-mui'
import { useAuth } from '../../composables/useAuth'
import { DMenu } from '../../config/material-ui/components'

const ProfileMenu: React.FC = () => {
  const authInstance = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuInstance = useMenu({
    onClose: () => {
      setAnchorEl(null)
    },
  })

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    menuInstance.setOpen(true)
  }

  const signOut = async () => {
    authInstance.signOut()
    menuInstance.handleClose()
  }

  return (
    <>
      <button className="profile-menu" onClick={openMenu}>
        <div className="profile-menu__text">
          Daniel Apodaca
        </div>
        <Avatar />
        <KeyboardArrowDownOutlined />
      </button>
      <DMenu
        anchorEl={anchorEl}
        onClose={menuInstance.handleClose}
        open={menuInstance.open}
      >
        {/* <Divider /> */}
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </DMenu>
    </>
  )
}

export default ProfileMenu
