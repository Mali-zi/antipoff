import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/app/hooks';

const AppLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.users);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  return (
    <div className="app-wrapper">
      <Outlet />
    </div>
  );
};

export default AppLayout;
