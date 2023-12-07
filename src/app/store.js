import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { search: searchReducer },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(saga);
