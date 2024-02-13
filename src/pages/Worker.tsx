import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import LogOut from '../assets/icons/LogOut';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchWorker, setLogout } from '../redux/store/userSlice';
import { useEffect } from 'react';

export default function Worker() {
  const dispatch = useAppDispatch();
  const { singleUser, status, errors, isLoggedIn } = useAppSelector(
    (state) => state.users
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleGoBack = () => {
    navigate('/workers');
  };

  useEffect(() => {
    dispatch(fetchWorker(`/api/users/${id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <header className="header-wrapper">
        <nav className="flex flex-row justify-between">
          <button type="button" className="btn" onClick={handleGoBack}>
            <LogOut />
            <span className="menu-item">Назад</span>
          </button>

          <button type="button" className="btn" onClick={handleLogout}>
            <LogOut />
            <span className="menu-item">Выйти</span>
          </button>
        </nav>
        <div className="mx-52 mb-8 text-white">
          <h1>Наша команда</h1>
          <h2>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </h2>
        </div>
      </header>
      <div className="">{singleUser?.first_name}</div>
    </div>
  );
}
