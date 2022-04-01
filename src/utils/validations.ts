import type { RegisterOptions } from 'react-hook-form'

export enum Password {
  MinLength = 6,
}
const emailRegExp = /\S+@\S+\.\S+/

export const required: RegisterOptions = {
  required: 'This field is required',
}
export const passwordValidation: RegisterOptions = {
  required: 'This field is required',
  minLength: {
    value: Password.MinLength,
    message: `Password should be at least ${Password.MinLength} characters`,
  },
}
export const confirmPasswordValidation = (password: string): RegisterOptions => ({
  required: 'This field is required',
  validate: (value: string) =>
    value === password || 'The passwords do not match',
})
export const emailValidation: RegisterOptions = {
  required: 'This field is required',
  pattern: {
    value: emailRegExp,
    message: 'Please enter a valid email',
  },
}
