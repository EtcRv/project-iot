import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { loadState, saveState } from '../utils/localstorage';

const persistedState = loadState();

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
