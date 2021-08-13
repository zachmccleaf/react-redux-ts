import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import myCounterReducer from '../features/my-counter/myCounterSlice';
import logInReducer from '../features/log-in/logInSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    myCounter: myCounterReducer,
    logIn: logInReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
