import axios from 'axios';

export const getDetailStore = async idStore => {
	const res = await axios.get(
		`${import.meta.env.VITE_DATABASE_URL}/store/get-detail-store/${idStore}`
	);
	return res.data;
};

export const createStore = async data => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/store/create-store`,
		data
	);
	return res.data;
};

export const getAllStore = async () => {
	const res = await axios.get(
		`${import.meta.env.VITE_DATABASE_URL}/store/get-all-store`
	);
	return res.data;
};

export const getProductStore = async (idStore, search) => {
	let res = {};
	if (search?.length > 0) {
		res = await axios.get(
			`${
				import.meta.env.VITE_DATABASE_URL
			}/store/get-products-store/${idStore}/products?search=${search}`
		);
	} else {
		res = await axios.get(
			`${
				import.meta.env.VITE_DATABASE_URL
			}/store/get-products-store/${idStore}/products`
		);
	}
	return res.data;
};

export const getAllType = async idStore => {
	const res = await axios.get(
		`${
			import.meta.env.VITE_DATABASE_URL
		}/store/get-all-type/${idStore}/allTypeProduct`
	);
	return res.data;
};
