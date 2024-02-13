import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from './Spinner';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { setLogIn } from '../redux/store/userSlice';
import { IFormInput } from '../utils';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  const schema = yup
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
    console.log('data: ', data);
    dispatch(setLogIn());
    reset();
  };

  useEffect(() => {
    if (formState.isValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formState]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/1');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="form-wrapper">
      <form
        className="w-full flex flex-col gap-3 text-start justify-between items-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Регистрация</h2>
        <label htmlFor="name" className="block">
          <span className="block mb-2">Имя</span>
          <input
            type="text"
            id="name"
            autoComplete="name"
            disabled={isLoading}
            placeholder="Артур"
            className={`inp focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            ${formState.errors.name && 'inp-invalid inp-invalid:focus'}`}
            {...register('name')}
          />
          <div className="inp-error">
            {formState.errors.name && formState.errors.name.message}
          </div>
        </label>

        <label htmlFor="email" className="block">
          <span className="block mb-2">Электронная почта</span>
          <input
            type="email"
            id="email"
            autoComplete="email"
            disabled={isLoading}
            placeholder="example@mail.ru"
            className={`inp focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            ${formState.errors.email && 'inp-invalid inp-invalid:focus'}`}
            {...register('email')}
          />
          <div className="inp-error">
            {formState.errors.email && formState.errors.email.message}
          </div>
        </label>

        <label htmlFor="password" className="block text-left">
          <span className="block mb-2">Пароль</span>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isLoading}
            placeholder="******"
            className={`inp focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            ${formState.errors.password && 'inp-invalid inp-invalid:focus'}`}
            {...register('password')}
          />
          <div className="inp-error">
            {formState.errors.password && formState.errors.password.message}
          </div>
        </label>

        <label htmlFor="confirmPassword" className="block">
          <span className="block mb-2">Подтвердите пароль</span>
          <input
            type="password"
            id="confirmPassword"
            data-testid="confirmPassword"
            disabled={isLoading}
            placeholder="******"
            autoComplete="none"
            className={`inp focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            ${formState.errors.confirmPassword && 'inp-invalid inp-invalid:focus'}`}
            {...register('confirmPassword')}
          />
          <div className="inp-error">
            {formState.errors.confirmPassword &&
              formState.errors.confirmPassword.message}
          </div>
        </label>
        {isLoading ? (
          <Spinner text="Загрузка..." />
        ) : (
          <button type="submit" disabled={isDisabled} className="btn mt-2">
            Зарегистрироваться
          </button>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;
