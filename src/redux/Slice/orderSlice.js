import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	orderItems: [],
	orderItemsSelected: []
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addOrderProduct: (state, action) => {
			const { orderItem } = action.payload;
			const itemOrder = state?.orderItems.find(
				item => item.id === orderItem.id
			);
			if (itemOrder) {
				itemOrder.amount += orderItem?.amount;
			} else {
				state?.orderItems?.push(orderItem);
			}
		},
		increaseAmount: (state, action) => {
			const { idProduct } = action.payload;
			const itemOrder = state?.orderItems.find(
				item => item.id === idProduct
			);
			if (itemOrder) {
				itemOrder.amount = itemOrder.amount + 1;
			}
		},
		decreaseAmount: (state, action) => {
			const { idProduct } = action.payload;
			const itemOrder = state?.orderItems.find(
				item => item.id === idProduct
			);
			if (itemOrder) {
				itemOrder.amount = itemOrder.amount - 1;
			}
		},
		removeProduct: (state, action) => {
			const { idProduct } = action.payload;
			const itemOrder = state?.orderItems.filter(
				item => item.id !== idProduct
			);
			state.orderItems = itemOrder;
		},
		resetOrder: state => {
			state.orderItems = [];
		}
	}
});

export const {
	addOrderProduct,
	increaseAmount,
	decreaseAmount,
	removeProduct,
	resetOrder
} = orderSlice.actions;
export default orderSlice.reducer;
