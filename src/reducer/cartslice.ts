import { ItemPedido } from '@/interfaces/ItemPedido';
import { Produto } from '@/interfaces/Produto';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] as ItemPedido[], // Array de itens no carrinho
  totalAmount: 0, // Valor total dos itens no carrinho
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload as ItemPedido;
      const existingItem = state.items.find(item => item.produtoId === newItem.produtoId);
      
      if (!existingItem) {
        state.items.push({
            produtoId: newItem.produtoId,
          produtoNome: newItem.produtoNome,
          precoUnitario: newItem.precoUnitario,
          produtoImagem: newItem.produtoImagem,
          quantidade: 1

        });
      } else {
        existingItem.quantidade++;
      }

      state.totalAmount += newItem.precoUnitario;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.produtoId === id);

      if (existingItem) {
        state.totalAmount -= existingItem.precoUnitario;
        existingItem.quantidade--;

        if (existingItem.quantidade === 0) {
          state.items = state.items.filter(item => item.produtoId !== id);
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;