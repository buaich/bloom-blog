export enum AuthType {
  Login = "login",
  Register = "register",
}

export interface RegisterParam {
  userName: string;
  userPassword: string;
}

export interface LoginParam {
  userName: string;
  userPhone: string;
  userPassword: string;
}
