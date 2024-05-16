import axios from 'axios';

export const axiosJWT = axios.create({
	baseURL: import.meta.env.VITE_DATABASE_URL
});

export const login = async user => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/user/login`,
		user
	);
	return res.data;
};

export const register = async data => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/user/register`,
		data
	);

	return res.data;
};

export const logout = async () => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/user/logout`
	);

	return res.data;
};

export const getDetailUser = async (id, accessToken) => {
	const res = await axiosJWT.get(
		`${import.meta.env.VITE_DATABASE_URL}/user/get-detail-user/${id}`,
		{
			headers: {
				token: `Bearer ${accessToken}`
			}
		}
	);
	return res.data;
};

export const getAllUser = async () => {
	const res = await axios.get(
		`${import.meta.env.VITE_DATABASE_URL}/user/get-all-user`
	);
	return res.data;
};

export const refreshToken = async token => {
	const res = await axios.post(
		`${import.meta.env.VITE_DATABASE_URL}/user/get-new-token`,
		{},
		{
			headers: {
				token: `Bearer ${token}`
			}
		}
	);
	return res.data;
};
