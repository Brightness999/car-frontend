import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { carsReducer } from './cars.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carsReducer
  },
});