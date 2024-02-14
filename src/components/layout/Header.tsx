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
      <nav className="flex flex-col justify-start items-center gap-4">
        <button type="button" className="self-end" onClick={handleLogout}>
          <LogOut />
          <span className="btn menu-item">Выйти</span>
        </button>
        <div className="xl:mx-52 lg:mx-32 md:mx-18 sm:mx-8 text-white">
          <h1 className="mb-4">Наша команда</h1>
          <h2 className="mb-8">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </h2>
        </div>
      </nav>
    </header>
  );
}

export default Header;
