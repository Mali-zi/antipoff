import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/app/hooks';

const AppLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.users.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }

    if (isLoggedIn) {
      navigate('/workers');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="main">
      <Outlet />
    </div>
  );
};

export default AppLayout;
