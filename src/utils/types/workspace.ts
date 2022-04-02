export const workspaceLayoutOptions = [
  {
    text: 'Psychologist',
    value: 'psychologist'
  },
  {
    text: 'Teacher',
    value: 'teacher'
  }
]

export type Workspace = {
  name: string;
  description: string;
  layout: string;
}