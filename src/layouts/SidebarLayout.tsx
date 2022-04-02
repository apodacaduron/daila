import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { WorkspaceSwitcher } from '../components/layouts'
import { useWorkspace } from '../composables/useWorkspace'
import { getSidebarMenu } from './sidebarRoutes'
import { sentenceCase } from 'sentence-case'

type RouterLinkProps = React.PropsWithChildren<{
  to: string
  text: string
  icon: React.ReactNode
}>

const RouterLink = (props: RouterLinkProps) => {
  type MyNavLinkProps = Omit<NavLinkProps, 'to'>
  const MyNavLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<HTMLAnchorElement, MyNavLinkProps>(
        (navLinkProps, ref) => {
          const { className: previousClasses, ...rest } = navLinkProps
          const elementClasses = previousClasses?.toString() ?? ''

          return (
            <NavLink
              {...rest}
              ref={ref}
              to={props.to}
              end
              className={({ isActive }) =>
                isActive ? elementClasses + ' Mui-selected' : elementClasses
              }
            />
          )
        },
      ),
    [props.to],
  )

  return (
    <ListItemButton component={MyNavLink}>
      <ListItemIcon
        sx={{
          '.Mui-selected > &': { color: (theme) => theme.palette.primary.main },
          minWidth: '35px',
        }}
      >
        {props.icon}
      </ListItemIcon>
      <ListItemText
        primary={props.text}
        sx={{
          '.Mui-selected > &': { color: (theme) => theme.palette.primary.main },
          '&': { color: 'rgba(0, 0, 0, 0.54)' },
        }}
      />
    </ListItemButton>
  )
}

const SidebarLayout: React.FC = () => {
  const workspaceInstance = useWorkspace()

  const sidebarMenuRoutes = () =>
    getSidebarMenu(
      workspaceInstance.currentWorkspace.id,
      workspaceInstance.currentWorkspace.layout,
    )
  return (
    <div className="sidebar-layout">
      <WorkspaceSwitcher workspaceInstance={workspaceInstance} />
      <List>
        {sidebarMenuRoutes()?.map((route) => (
          <RouterLink
            key={route.to}
            to={route.to}
            text={sentenceCase(route.path)}
            icon={route.icon}
          />
        ))}
      </List>
    </div>
  )
}

export default SidebarLayout
