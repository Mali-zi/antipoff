import { useAppDispatch } from '../../redux/app/hooks';
import LogOut from '../../assets/icons/LogOut';
import { setLogout } from '../../redux/store/userSlice';

function Header() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <header className="header-wrapper">
      <nav className="flex flex-row justify-end">
        <button type="button" className="btn" onClick={handleLogout}>
          <LogOut />
          <span className="menu-item">Выйти</span>
        </button>
      </nav>
      <div className="mx-52 mb-8 text-white">
        <h1>Наша команда</h1>
        <h2>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </h2>
      </div>
    </header>
  );
}

export default Header;
