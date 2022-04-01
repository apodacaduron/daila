export type WorkspaceLayout = 'psychologist' | string

export type Workspace = {
  name: string;
  description: string;
  layout: WorkspaceLayout
}