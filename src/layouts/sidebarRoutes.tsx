import {
  CalendarViewWeekOutlined,
  DashboardOutlined,
  GroupsOutlined,
  PeopleOutline,
} from '@mui/icons-material'

const routes: Record<
  string,
  Array<{ path: string; icon?: React.ReactNode }>
> = {
  psychologist: [
    {
      path: 'dashboard',
      icon: <DashboardOutlined />,
    },
    {
      path: 'appointments',
      icon: <CalendarViewWeekOutlined />,
    },
    {
      path: 'patients',
      icon: <GroupsOutlined />,
    },
    {
      path: 'team-members',
      icon: <PeopleOutline />,
    },
  ],
  teacher: [
    {
      path: 'dashboard',
      icon: <DashboardOutlined />,
    },
  ],
}

export const getSidebarMenu = (workspaceId: string, layout: string) => {
  const routesCurrentWorkspace = routes[layout]

  return routesCurrentWorkspace?.map((route) => ({
    ...route,
    to: `/${workspaceId}/${layout}/${route.path}`,
  }))
}
