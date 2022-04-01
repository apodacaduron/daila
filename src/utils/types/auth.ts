export type SignIn = {
  email: string;
  password: string;
}

export type SignUp = {
  confirmPassword: string;
} & SignIn