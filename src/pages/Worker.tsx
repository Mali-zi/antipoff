import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import LogOut from '../assets/icons/LogOut';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import {
  delSingleUser,
  fetchWorker,
  setLogout,
} from '../redux/store/userSlice';
import { useEffect } from 'react';
import PhoneSvg from '../assets/icons/phone.svg';
import MailSvg from '../assets/icons/mail.svg';
import Back from '../assets/icons/Back';

export default function Worker() {
  const dispatch = useAppDispatch();
  const { singleUser, status, errors, isLoggedIn, curentPage } = useAppSelector(
    (state) => state.users
  );

  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleGoBack = () => {
    navigate(`/${curentPage}`);
    dispatch(delSingleUser());
  };

  useEffect(() => {
    dispatch(fetchWorker(`/api/users/${id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <header className="header-wrapper">
        <nav className="flex flex-row justify-between items-start mt-2">
          <button type="button" onClick={handleGoBack}>
            <Back />
            <span className="btn menu-item">Назад</span>
          </button>
          <button type="button" onClick={handleLogout}>
            <LogOut />
            <span className="btn menu-item">Выйти</span>
          </button>
        </nav>
        <div className="flex sm:flex-row flex-col justify-start gap-8 text-white sm:ml-24 items-center">
          <img
            src={singleUser?.avatar}
            className="w-[187px] object-cover rounded-full "
            alt="avatar"
          />
          <div className="sm:text-left text-center">
            <h1>{singleUser?.first_name + ' ' + singleUser?.last_name}</h1>
            <div className="xl:text-[2rem] lg:text-2xl text-xl mt-2">
              Партнер
            </div>
          </div>
        </div>
      </header>
      <main className="flex lg:flex-row flex-col justify-evenly lg:gap-32 gap-8 lg:mt-12 mt-8">
        <article className="md:w-[630px] w-full px-4 lg:order-first order-last">
          <p className="mb-4">
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </p>
          <p className="mb-4">
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: "Один из самых позитивных моментов — это осознание
            того, что ты помог клиенту перейти на совершенно новый уровень
            компетентности, уверенность в том, что после окончания проекта у
            клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно".
          </p>
          <p className="mb-4">
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </p>
        </article>
        <div className="flex flex-col justify-start gap-6 px-4">
          <div className="flex flex-row gap-2 justify-start items-center">
            <div className="w-[21px]">
              <img src={PhoneSvg} alt="Phone SVG" />
            </div>
            +7 (954) 333-44-55
          </div>
          <div className="flex flex-row gap-2 justify-start items-center">
            <div className="w-[21px]">
              <img src={MailSvg} alt="Mail SVG" />
            </div>
            {singleUser?.email}
          </div>
        </div>
      </main>
    </div>
  );
}
