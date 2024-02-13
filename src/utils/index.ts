export const url = 'https://reqres.in';

export interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ISingleUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IUsers {
  users: IUser[];
  singleUser: ISingleUser | null;
  total: null | number;
  total_pages: null | number;
  status: string;
  errors: unknown;
  isLoggedIn: boolean;
  curentPage: null | number;
}
