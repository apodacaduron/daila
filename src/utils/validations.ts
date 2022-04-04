import type { RegisterOptions } from 'react-hook-form'

export enum Password {
  MinLength = 6,
}
export enum Phone {
  MinLength = 10,
}
const emailRegExp = /\S+@\S+\.\S+/
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

export const required: RegisterOptions = {
  required: 'This field is required',
}
export const phoneValidation: RegisterOptions = {
  ...required,
  pattern: {
    value: phoneRegExp,
    message: 'Please enter a valid phone number'
  },
  minLength: {
    value: Phone.MinLength,
    message: `Phone number should be at least ${Phone.MinLength} digits`,
  },
}
export const passwordValidation: RegisterOptions = {
  ...required,
  minLength: {
    value: Password.MinLength,
    message: `Password should be at least ${Password.MinLength} characters`,
  },
}
export const confirmPasswordValidation = (password: string): RegisterOptions => ({
  ...required,
  validate: (value: string) =>
    value === password || 'The passwords do not match',
})
export const emailValidation: RegisterOptions = {
  ...required,
  pattern: {
    value: emailRegExp,
    message: 'Please enter a valid email',
  },
}
