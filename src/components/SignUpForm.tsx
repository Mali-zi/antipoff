import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from './Spinner';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';

export interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUpForm() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, navigate]);

  const schema = yup
    .object({
      name: yup
        .string()
        .min(3, 'Имя пользователя должно содержать не менее 3 символов')
        .required('Требуется имя пользователя'),
      email: yup.string().email().required('Требуется адрес электронной почты'),
      password: yup
        .string()
        .matches(/^\S*$/, 'Пробелы не допускаются')
        .min(8, 'Пароль должен содержать не менее 8 символов')
        .matches(
          /[@$!%*#?&+=()/.,'"-<+<>~`]/,
          'Пароль должен содержать как минимум 1 специальный символ'
        )
        .matches(/[0-9]/, 'Пароль должен содержать не менее 1 цифры')
        .matches(
          /\p{Ll}/gu,
          'Пароль должен содержать не менее 1 символа в нижнем регистре'
        )
        .matches(
          /\p{Lu}/gu,
          'Пароль должен содержать не менее 1 символа в верхнем регистре'
        )
        .required('Требуется пароль'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Требуется подтвердить пароль'),
    })
    .required();

  const { register, handleSubmit, reset, formState } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    data: IFormInput,
    e?: React.BaseSyntheticEvent
  ): Promise<void> => {
    e?.preventDefault();
    setIsLoading(true);

    console.log('data', data);
    reset();
  };

  useEffect(() => {
    if (formState.isValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formState]);

  return (
    <div className="form-wrapper">
      <div className="flex flex-col justify-center my-4 p-4 xs:p-8 xs:my-8 lg:px-16 w-full border rounded-lg lg:shadow-xl xs:shadow-md bg-white">
        <h2 className="mt-8 mb-4 text-start text-xl leading-9 tracking-tight">
          Регистрация
        </h2>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="block h-24 text-left">
            <span className="block text-sm font-medium text-gray-900">Имя</span>
            <input
              type="text"
              id="name"
              autoComplete="name"
              disabled={isLoading}
              placeholder="Артур"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              {...register('name')}
            />
            <div
              className="block text-xs font-medium text-red-600"
              data-testid="email-error"
            >
              {formState.errors.name && formState.errors.name.message}
            </div>
          </label>

          <label htmlFor="email" className="block h-24 text-left">
            <span className="block text-sm font-medium text-gray-900">
              Электронная почта
            </span>
            <input
              type="email"
              id="email"
              autoComplete="email"
              data-testid="email"
              disabled={isLoading}
              placeholder="example@mail.ru"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              {...register('email')}
            />
            <div
              className="block text-xs font-medium text-red-600"
              data-testid="email-error"
            >
              {formState.errors.email && formState.errors.email.message}
            </div>
          </label>

          <label htmlFor="password" className="block h-24 text-left">
            <span className="block text-sm font-medium text-gray-900">
              Пароль
            </span>
            <input
              type="password"
              id="password"
              data-testid="password"
              autoComplete="new-password"
              disabled={isLoading}
              placeholder="******"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              {...register('password')}
            />
            <div className="block text-xs font-medium text-red-600">
              {formState.errors.password && formState.errors.password.message}
            </div>
          </label>

          <label htmlFor="confirmPassword" className="block h-24 text-left">
            <span className="block text-sm font-medium text-gray-900">
              Подтвердите пароль
            </span>
            <input
              type="password"
              id="confirmPassword"
              data-testid="confirmPassword"
              disabled={isLoading}
              placeholder="******"
              autoComplete="none"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              {...register('confirmPassword')}
            />
            <div className="block text-xs font-medium text-red-600">
              {formState.errors.confirmPassword &&
                formState.errors.confirmPassword.message}
            </div>
          </label>
          <div className="mt-4">
            {isLoading ? (
              <Spinner text="Загрузка..." />
            ) : (
              <button
                type="submit"
                data-testid="submit-btn"
                disabled={isDisabled}
                className="btn"
              >
                Зарегистрироваться
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
