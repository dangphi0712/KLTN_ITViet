import { Icon } from '@iconify/react';
import * as UserService from '../services/user';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updatedUser } from '../redux/Slice/userSlice';
import { useEffect, useState } from 'react';
import config from '../config';
import { Spin } from 'antd';
import * as StoreService from '../services/store';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [allStore, setAllStore] = useState([]);
	const dispatch = useDispatch();

	const [isPending, setIsPending] = useState(false);
	const buttomItems = [
		{
			key: 'admin',
			title: 'Quản lý',
			icon: 'ph:chart-line',
			bgColor: 'primary'
		},
		{
			key: 'cashier',
			title: 'Cửa hàng',
			icon: 'iconoir:cart',
			bgColor: '[#28b44f]'
		}
	];

	const navigate = useNavigate();

	const fetchAllStore = async () => {
		const res = await StoreService.getAllStore();
		setAllStore(res?.data);
	};
	const handleGetDetailUser = async (id, token) => {
		try {
			const storage = localStorage.getItem('refreshToken');
			const refreshToken = JSON.parse(storage);
			const res = await UserService.getDetailUser(id, token);
			allStore?.forEach(item => {
				if (item.user === id) {
					dispatch(
						updatedUser({
							...res?.data,
							accessToken: token,
							refreshToken,
							storeId: item._id
						})
					);
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = async (data, key) => {
		setIsPending(true);
		try {
			const res = await UserService.login(data);

			if (res?.status === 'OK') {
				localStorage.setItem(
					'accessToken',
					JSON.stringify(res?.accessToken)
				);
				localStorage.setItem(
					'refreshToken',
					JSON.stringify(res?.refreshToken)
				);

				const decoded = jwtDecode(res?.accessToken);
				if (decoded?.userId) {
					handleGetDetailUser(decoded?.userId, res?.accessToken);
				}
				switch (key) {
					case 'cashier':
						return navigate(config.routes.cashier);
					case 'admin':
						return navigate(config.routes.admin);
				}
			} else if (res.status === 'ERR') {
				setError(res.message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	useEffect(() => {
		fetchAllStore();
	}, []);

	return (
		<Spin
			spinning={isPending}
			delay={500}
		>
			<div
				className='relative bg-gradient-to-b from-[#86d89e] to-[#7aa9f0] min-h-screen'
				// style={{
				// 	background:
				// 		'url(https://sapo.dktcdn.net/sso-service/images/background-bottom-pos-app.svg) no-repeat center bottom',
				// 	overflow: 'hidden',
				// 	backgroundSize: 'cover',
				// 	minHeight: '100%',
				// 	height: '100vh',
				// 	zIndex: 0
				// }}
			>
				<form
					action=''
					className='m-0 p-0 relative flex'
					style={{ height: 'calc(100vh - 52px)', zIndex: 2 }}
				>
					{/* <div className='absolute left-[142px] top-[71%] w-fit'>
						<div
							className='flex items-center bg-white rounded-3xl px-4 py-2'
							style={{
								boxShadow: ' 0 8px 24px 0 rgba(0,48,104,.04)'
							}}
						>
							<span className='w-14 h-14 flex items-center justify-center'>
								<img
									src={logo}
									alt='logo'
									width={45}
									height={45}
								/>
							</span>
							<span className='text-base font-semibold text-[#002249]'>
								Phần mềm quản lý bán hàng phổ biến nhất
							</span>
						</div>
					</div> */}
					<div
						style={{ zIndex: 5 }}
						className='w-full max-w-[440px] min-w-[320px] m-auto h-auto pt-10 px-6 pb-6 box-border bg-white rounded-2xl'
					>
						<header className='text-center text-xl font-bold'>
							ITViet
						</header>
						<section>
							<div className='flex mb-3 items-center gap-2'>
								<Icon
									icon='solar:user-linear'
									height={22}
								/>
								<input
									value={email}
									onChange={e => setEmail(e.target.value)}
									type='text'
									className='h-11 pl-7 w-full bg-transparent overflow-visible block m-0 box-border'
									style={{
										borderBottom: '1px solid #ccc'
									}}
									placeholder='Tên đăng nhập'
								/>
							</div>

							<div className='flex mb-3 items-center gap-2'>
								<Icon
									icon='solar:lock-outline'
									height={20}
								/>
								<input
									value={password}
									onChange={e => setPassword(e.target.value)}
									type='password'
									className='h-11 pl-7 w-full bg-transparent overflow-visible block m-0 box-border'
									style={{
										borderBottom: '1px solid #ccc'
									}}
									placeholder='Mật khẩu'
								/>
							</div>

							{error && (
								<aside className='mt-5 text-red-500 text-sm font-semibold ml-6'>
									{error}
								</aside>
							)}

							<aside className='mt-5 text-right text-sm text-primary'>
								<label htmlFor=''>Quên mật khẩu?</label>
							</aside>
						</section>
						<section className='mt-5 flex overflow-hidden text-center gap-2'>
							{buttomItems.map(item => (
								<button
									type='button'
									key={item.key}
									onClick={() =>
										handleLogin(
											{ email, password },
											item.key
										)
									}
									className={`flex items-center justify-center py-3 px-5 gap-2 rounded-3xl font-bold text-white bg-${item.bgColor} w-[50%]`}
								>
									<Icon
										icon={item.icon}
										height={22}
									/>
									{item.title}
								</button>
							))}
						</section>
					</div>
				</form>
			</div>
		</Spin>
	);
};

export default LoginPage;
