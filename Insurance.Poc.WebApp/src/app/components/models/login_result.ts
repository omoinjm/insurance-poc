//Model for when the user logs in.
export class LoginResultModel {
  email?: string;
  username?: string;
  token?: string;
  expireDate?: Date;
  timeStamp?: number;
  loginMessage: string = 'Login Successful';
  role?: string;
  success?: boolean;
  userId?: number;

  constructor() {}
}
