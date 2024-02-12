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
  },
});

export const { setLogout } = userSlice.actions;
export default userSlice.reducer;
