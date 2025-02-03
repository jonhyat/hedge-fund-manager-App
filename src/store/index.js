import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioSlice';
import marketDataReducer from './slices/marketDataSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    marketData: marketDataReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }),
});

export default store; 