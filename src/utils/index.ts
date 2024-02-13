export const url = 'https://reqres.in';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ISingleUser {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

export interface IUsers {
  users: IUser[];
  singleUser: ISingleUser | null;
  status: string;
  errors: unknown;
  isLoggedIn: boolean;
}
