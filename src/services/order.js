import axios from 'axios';

export const createOrder = async data => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/order/create-order`,
		data
	);
	return res.data;
};

export const getAllOrder = async userId => {
	const res = await axios.get(
		`${import.meta.env.VITE_DATABASE_URL}/order/get-all-order/${userId}`
	);
	return res.data;
};
