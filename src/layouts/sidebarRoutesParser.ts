const routes: Record<string, Array<{ path: string, icon?: React.ReactNode }>> =
{
  psychologist: [
    {
      path: 'dashboard',
      icon: '',
    },
    {
      path: 'users',
      icon: '',
    },
  ],
  teacher: [
    {
      path: 'dashboard',
      icon: '',
    },
  ],
}

export const getSidebarMenu = (workspaceId: string, layout: string) => {
  const routesCurrentWorkspace = routes[layout]

  return routesCurrentWorkspace?.map(route => ({ ...route, to: `/${workspaceId}/${layout}/${route.path}` }))
}
