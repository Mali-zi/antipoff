import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    isLoggedIn: false,
  },
  reducers: {},
});

export default userSlice.reducer;
