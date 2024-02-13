import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUsers, url } from '../../utils';

export const fetchWorkers = createAsyncThunk(
  'user/fetchWorkers',
  async (endPoint: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    try {
      const response = await fetch(url + endPoint);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error: unknown) {
      throw rejectWithValue(error);
    }
  }
);

export const fetchWorker = createAsyncThunk(
  'user/fetchWorker',
  async (endPoint: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    try {
      const response = await fetch(url + endPoint);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error: unknown) {
      throw rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    total: null,
    total_pages: null,
    singleUser: null,
    status: 'idle',
    errors: null,
    isLoggedIn: false,
    curentPage: 1,
  } as IUsers,
  reducers: {
    setLogout: (state) => {
      state.isLoggedIn = false;
    },

    setLogIn: (state) => {
      state.isLoggedIn = true;
    },

    delSingleUser: (state) => {
      state.singleUser = null;
    },

    setCurentPage: (state, action) => {
      state.curentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.users = action.payload.data;
          state.total = action.payload.total;
          state.total_pages = action.payload.total_pages;
        } else {
          state.errors = 'Сотрудники не могут быть загружены.';
        }
      })
      .addCase(fetchWorkers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка при загрузке сотрудников.';
        }
      })

      .addCase(fetchWorker.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.singleUser = action.payload.data;
        } else {
          state.errors = 'Сотрудник не могут быть загружены.';
        }
      })
      .addCase(fetchWorker.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchWorker.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка при загрузке сотрудника.';
        }
      });
  },
});

export const { setLogout, setLogIn, delSingleUser, setCurentPage } =
  userSlice.actions;
export default userSlice.reducer;
