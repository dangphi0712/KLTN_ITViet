import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	name: '',
	email: '',
	isAdmin: false,
	id: '',
	accessToken: '',
	refreshToken: '',
	storeId: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		updatedUser: (state, action) => {
			const {
				name = '',
				email = '',
				isAdmin,
				_id = '',
				accessToken = '',
				refreshToken = '',
				storeId = ''
			} = action.payload;

			state.name = name ? name : state.name;
			state.email = email ? email : state.email;
			state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
			state.id = _id ? _id : state?.id;
			state.accessToken = accessToken ? accessToken : state.accessToken;
			state.storeId = storeId ? storeId : state.storeId;
			state.refreshToken = refreshToken
				? refreshToken
				: state.refreshToken;
		},

		resetUser: state => {
			(state.name = ''),
				(state.email = ''),
				(state.isAdmin = ''),
				(state.id = '');
			(state.storeId = ''),
				(state.accessToken = ''),
				(state.refreshToken = '');
		}
	}
});

export const { updatedUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
