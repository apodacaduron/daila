import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { WorkspaceSwitcher } from '../components/layouts'
import { useWorkspace } from '../composables/useWorkspace'
import { getSidebarMenu } from './sidebarRoutesParser'

type RouterLinkProps = React.PropsWithChildren<{
  to: string
  text: string
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
        }}
      >
        {/* {props.icon} */}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItemButton>
  )
}

const SidebarLayout: React.FC = () => {
  const workspaceInstance = useWorkspace()

  React.useEffect(() => {
    console.log(
      getSidebarMenu(
        workspaceInstance.currentWorkspace.id,
        workspaceInstance.currentWorkspace.layout,
      ),
    )
  }, [workspaceInstance.currentWorkspace.id])

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
          <RouterLink key={route.to} to={route.to} text={route.path} />
        ))}
      </List>
    </div>
  )
}

export default SidebarLayout
