import {
  AddOutlined,
  KeyboardArrowDownOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMenu } from 'use-mui'
import { useWorkspace } from '../../composables/useWorkspace'
import { DMenu } from '../../config/material-ui/components'
import { useColor } from '../../hooks/useColor'

const WorkspaceSwitcher: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { stringToHex } = useColor()
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

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToHex(name),
      },
      children: name.charAt(0).toUpperCase(),
    }
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
              <ListItemAvatar>
                <Avatar {...stringAvatar(workspace.name)} />
              </ListItemAvatar>
              <ListItemText
                primary={workspace.name}
                secondary={workspace.layout}
              />
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
