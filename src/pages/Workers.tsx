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

const Workers = () => {
  const dispatch = useAppDispatch();
  const { users, status, errors, isLoggedIn } = useAppSelector(
    (state) => state.users
  );
  const favouriteUsers = useAppSelector(
    (state) => state.favouriteUsers.favouriteUsers
  );
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkers('/api/users'));
  }, []);

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
        <img src={user.avatar} className="parent" alt="avatar" />
        <button
          type="button"
          className="favorite-btn"
          onClick={() => handleClick(user)}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}
        >
          {isfavourite || isMouseOver ? (
            <img src={FavoriteSvg} alt="Favorite SVG" />
          ) : (
            <img src={FavoriteBorderSvg} alt="Favorite Border SVG" />
          )}
        </button>
      </li>
    );
  });

  return (
    <main className="app">
      <Header />

      <ul className="userList">{userList}</ul>
    </main>
  );
};

export default Workers;
