export const workspaceLayoutOptions = [
  {
    text: 'Psychologist',
    value: 'psychologist'
  }
]

export type Workspace = {
  name: string;
  description: string;
  layout: string;
}