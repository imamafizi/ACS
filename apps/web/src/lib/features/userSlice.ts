import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
export interface UserState {
  id: number;
  email: String;
  isDeleted: Boolean;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
  userId: number;
}

// Define the initial state using that type
const initialState: UserState = {
  id: 0,
  email: '',
  isDeleted: false,
  role: { id: 0, name: '', userId: 0 },
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isDeleted = action.payload.isDeleted;
      state.role.name = action.payload.role.name;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.email = '';
      state.isDeleted = false;
      state.role.name = '';
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
