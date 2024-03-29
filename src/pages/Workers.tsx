import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { fetchWorkers } from '../redux/store/userSlice';
import { IUser } from '../utils';
import FavoriteSvg from '../assets/icons/favorite.svg';
import FavoriteBorderSvg from '../assets/icons/favorite_border.svg';
import {
  setRemoveFavorite,
  setAddFavorite,
} from '../redux/store/favouriteUserSlice';
import { Link } from 'react-router-dom';
import PageNumbersSection from '../components/PageNumbersSection';
import Loader from '../components/Loader';

interface IOver {
  over: boolean;
  id: null | number;
}

const Workers = () => {
  const dispatch = useAppDispatch();
  const { users, status, curentPage } = useAppSelector((state) => state.users);
  const favouriteUsers = useAppSelector(
    (state) => state.favouriteUsers.favouriteUsers
  );
  const [isMouseOver, setMouseOver] = useState<IOver>({
    over: false,
    id: null,
  });

  useEffect(() => {
    dispatch(fetchWorkers(`/api/users?page=${curentPage}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curentPage]);

  const handleClick = (user: IUser) => {
    const isfavourite = favouriteUsers.find(
      (favouriteUser) => user.id === favouriteUser.id
    );
    if (isfavourite) {
      dispatch(setRemoveFavorite(user));
    } else {
      dispatch(setAddFavorite(user));
    }
  };

  const userList = users.map((user) => {
    const isfavourite = favouriteUsers.find(
      (favouriteUser) => user.id === favouriteUser.id
    );

    return (
      <li key={user.id} className="card">
        <Link to={`/worker/${user.id}`}>
          <img
            src={user.avatar}
            className="w-[124px] object-cover rounded-full"
            alt="avatar"
          />
          <h2 className="text-center mt-4">
            {user.first_name + ' ' + user.last_name}
          </h2>
        </Link>
        <div className="heart-holder">
          <button
            type="button"
            className="favorite-btn"
            onClick={() => handleClick(user)}
            onMouseOver={() =>
              setMouseOver({
                over: true,
                id: user.id,
              })
            }
            onMouseOut={() =>
              setMouseOver({
                over: false,
                id: null,
              })
            }
          >
            {isfavourite || (isMouseOver.over && isMouseOver.id === user.id) ? (
              <img src={FavoriteSvg} alt="Favorite SVG" />
            ) : (
              <img src={FavoriteBorderSvg} alt="Favorite Border SVG" />
            )}
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="app">
      <Header />
      {status === 'pending' ? (
        <Loader />
      ) : (
        <main className="team">
          <PageNumbersSection />
          <ul className="userList">{userList}</ul>
        </main>
      )}
    </div>
  );
};

export default Workers;
