/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { privateRoutes, routes } from './router/index';
import DefaultLayout from './Layouts/DefaultLayout';
import * as UserService from './services/user';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { resetUser, updatedUser } from './redux/Slice/userSlice';
import AdminLayout from './Layouts/AdminLayout';

function App() {
	const user = useSelector(state => state?.user);
	const dispatch = useDispatch();

	const handleGetDetailUser = async (id, token) => {
		const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
		const res = await UserService.getDetailUser(id, token);

		dispatch(
			updatedUser({
				...res?.data,
				accessToken: token,
				refreshToken
			})
		);
	};

	const handleDecode = () => {
		let storage =
			user?.accessToken ||
			JSON.parse(localStorage.getItem('accessToken'));

		let decoded = {};
		if (storage && !user?.accessToken) {
			decoded = jwtDecode(storage);
		}
		return { decoded, storage };
	};
	useEffect(() => {
		const { decoded, storage } = handleDecode();
		if (decoded?.userId) {
			handleGetDetailUser(decoded?.userId, storage);
		}
	}, []);

	UserService.axiosJWT.interceptors.request.use(
		async config => {
			const { decoded } = handleDecode();
			const currentTime = new Date();
			let refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
			const decodedRefreshToken = jwtDecode(refreshToken);
			if (decoded?.exp < currentTime.getTime() / 1000) {
				if (decodedRefreshToken?.exp > currentTime.getTime / 1000) {
					const data = await UserService.refreshToken(refreshToken);
					config.headers['token'] = `Bearer ${data?.accessToken}`;
					refreshToken = data?.accessToken;
					localStorage.setItem(
						'refreshToken',
						JSON.stringify(refreshToken)
					);
				} else {
					dispatch(resetUser());
				}
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	return (
		<>
			<Router>
				<Routes>
					{routes.map(route => {
						const Page = route.page;
						let Layout = DefaultLayout;
						if (route?.layout) {
							Layout = route?.layout;
						} else if (route?.layout === null) {
							Layout = Fragment;
						}
						return (
							<Route
								key={route.path}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}

					{privateRoutes.map(route => {
						const Page = route.page;
						let Layout = AdminLayout;
						if (route?.layout) {
							Layout = route?.layout;
						} else if (route?.layout === null) {
							Layout = Fragment;
						}
						return (
							<Route
								key={route.path}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
			</Router>
		</>
	);
}

export default App;
