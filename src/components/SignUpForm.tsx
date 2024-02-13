import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from './Spinner';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchSignUp } from '../redux/store/userSlice';
import { IFormInput, schema } from '../utils';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
  const navigate = useNavigate();
  const { isLoggedIn, status } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

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

  const onSubmit = async (
    data: IFormInput,
    e?: React.BaseSyntheticEvent
  ): Promise<void> => {
    e?.preventDefault();
    dispatch(fetchSignUp({ email: data.email, password: data.password }));
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
            disabled={status === 'pending'}
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
            disabled={status === 'pending'}
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
            disabled={status === 'pending'}
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
            disabled={status === 'pending'}
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
        {status === 'pending' ? (
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
