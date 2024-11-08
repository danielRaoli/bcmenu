import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducer/cartslice';

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Adicione o reducer do carrinho
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;