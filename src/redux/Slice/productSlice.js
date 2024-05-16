import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	product: []
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		updateProduct: (state, action) => {
			const { product } = action.payload;
			state.product.push(product);
		}
	}
});

export const { updateProduct } = productSlice.actions;
export default productSlice.reducer;
