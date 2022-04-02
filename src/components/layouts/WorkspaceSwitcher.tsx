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
import { useNavigate } from 'react-router-dom'
import { useMenu } from 'use-mui'
import { useWorkspace } from '../../composables/useWorkspace'
import { DMenu } from '../../config/material-ui/components'

const WorkspaceSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const workspaceInstance = useWorkspace()
  const menuInstance = useMenu({
    onClose: () => {
      setAnchorEl(null)
    },
  })

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    menuInstance.setOpen(true)
  }

  const navigateToCreateWorkspace = () => {
    menuInstance.handleClose()
    navigate('/workspaces/create')
  }

  const navigateToWorkspace = (workspace: any) => {
    menuInstance.handleClose()
    if (workspace.id === workspaceInstance.currentWorkspace.id) return
    navigate(`/${workspace.id}/${workspace.layout}`)
    workspaceInstance.switchWorkspace(workspace)
  }

  return (
    <>
      <button className="workspace-switcher" onClick={openMenu}>
        <div className="workspace-switcher__text">
          {workspaceInstance.currentWorkspace?.name} <br />
          <span>Switch workspaces</span>
        </div>
        <KeyboardArrowDownOutlined />
      </button>
      <DMenu
        anchorEl={anchorEl}
        onClose={menuInstance.handleClose}
        open={menuInstance.open}
      >
        {workspaceInstance.workspacesList.map((workspace: any) => {
          return (
            <MenuItem
              key={workspace.id}
              onClick={() => navigateToWorkspace(workspace)}
            >
              <ListItemIcon>
                <Avatar sx={{ width: '20px', height: '20px' }} />
              </ListItemIcon>
              <ListItemText>{workspace.name}</ListItemText>
            </MenuItem>
          )
        })}
        <Divider />
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Workspace settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={navigateToCreateWorkspace}>
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
