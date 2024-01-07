import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  access_token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    updateAccessToken(state, action) {
      const { access_token } = action.payload;
      state.access_token = access_token;
    },
  },
});

export const { updateUser, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;
