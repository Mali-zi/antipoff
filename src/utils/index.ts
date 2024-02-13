import * as yup from 'yup';

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
  token: null | string;
  registeredUser: null | number;
  curentPage: null | number;
}

export const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Имя пользователя должно содержать не менее 3 символов')
      .required('Требуется имя пользователя'),
    email: yup
      .string()
      .email('Ошибка')
      .required('Требуется адрес электронной почты'),
    password: yup
      .string()
      .matches(/^\S*$/, 'Пробелы не допускаются')
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Требуется пароль'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
      .required('Требуется подтвердить пароль'),
  })
  .required();
