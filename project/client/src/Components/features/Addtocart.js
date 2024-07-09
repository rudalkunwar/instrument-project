import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';


const initialState = {
  success: null,
  cartItems: [],
  message: null,
};



export const productFetch = createAsyncThunk(
  'cart/productFetch',
  async () => {

    const response = await axios.get('fetchcartapi', {
      headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token':localStorage.getItem('token'),
      },
  });
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (id, thunkAPI) => {
    console.log("delete cart");
    const response = await axios.delete(`deletecartapi/${id}`, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token':localStorage.getItem('token'),
      },
    });
    return response.data;
  }
);


export const AddToCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state, action) => {
        state.success = 'pending';
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.success = 'completed';
        state.cartItems = action.payload;
        state.message = action.payload.message;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.success = 'rejected';
      })
      .addCase(deleteCart.pending, (state, action) => {
        state.success = 'pending';
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.success = 'completed';
        state.message = action.payload.message;
      
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.success = 'rejected';
      });
  },
});

export const { addcart, removecart } = AddToCart.actions;
export default AddToCart.reducer;
