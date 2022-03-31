import {
  AddOutlined,
  KeyboardArrowDownOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material'
import React from 'react'
import { useMenu } from 'use-mui'
import { DMenu } from '../../config/material-ui/components'

const WorkspaceSwitcher: React.FC = () => {
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

  return (
    <>
      <button className="workspace-switcher" onClick={openMenu}>
        <div className="workspace-switcher__text">
          WorkspaceSwitcher <br />
          <span>Switch workspaces</span>
        </div>
        <KeyboardArrowDownOutlined />
      </button>
      <DMenu
        anchorEl={anchorEl}
        onClose={menuInstance.handleClose}
        open={menuInstance.open}
      >
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <Avatar sx={{ width: '20px', height: '20px' }} />
          </ListItemIcon>
          <ListItemText>Personal workspace</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Workspace settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <AddOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create new workspace</ListItemText>
        </MenuItem>
      </DMenu>
    </>
  )
}

export default WorkspaceSwitcher
