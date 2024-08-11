import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
  userName: string;
};

const initialState: initialState = {
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state: initialState, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
