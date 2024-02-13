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

export const fetchSignUp = createAsyncThunk(
  'user/fetchLogIn',
  async (pasData: { email: string; password: string }, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pasData),
    };
    try {
      const response = await fetch(url + '/api/register', requestOptions);
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

const initialState: IUsers = {
  users: [],
  total: null,
  total_pages: null,
  singleUser: null,
  status: 'idle',
  errors: null,
  isLoggedIn: false,
  token: null,
  registeredUser: null,
  curentPage: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogout: (state) => {
      Object.assign(state, initialState);
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
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.registeredUser = action.payload.id;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        } else {
          state.errors = 'Ошибка регистрации.';
        }
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка регистрации.';
        }
      })

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

export const { setLogout, delSingleUser, setCurentPage } = userSlice.actions;
export default userSlice.reducer;
