import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isLoggedIn: false,
  },
  reducers: {
    setLogout: (state) => {
      state.isLoggedIn = false;
    },

    setLogIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setLogout, setLogIn } = userSlice.actions;
export default userSlice.reducer;
