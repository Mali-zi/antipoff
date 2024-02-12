import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import LogOut from '../../assets/icons/LogOut';
import { setLogout } from '../../redux/store/userSlice';

function Header() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.users);

  const handleLogout = async () => {
    dispatch(setLogout());
  };

  return (
    <header className="header-wrapper">
      <nav className="menu-wrapper">
        {isLoggedIn && (
          <button
            data-testid="logout-btn"
            type="button"
            className="btn-link menu-link"
            onClick={handleLogout}
          >
            <LogOut />
            <span className="menu-item">Выйти</span>
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
