import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import * as UserService from '../../services/user';
import * as StoreService from '../../services/store';
import { resetUser } from '../../redux/Slice/userSlice';
import { useEffect, useState } from 'react';
import ChartOwner from '../../components/AdminOwner/ChartOwner';
import ManageUserOwner from '../../components/AdminOwner/ManageUserOwner';
import StatisticOwner from '../../components/AdminOwner/StatisticOwner';

const AdminOwnerPage = () => {
	const [allStore, setAllStore] = useState([]);

	const getAllStore = async () => {
		try {
			const res = await StoreService.getAllStore();
			setAllStore(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		Promise.all([getAllStore()]);
	}, []);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		const res = await UserService.logout();
		if (res?.status === 'OK') {
			dispatch(resetUser());
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			navigate(config.routes.login);
		}
	};

	const items = [
		{
			key: 'product',
			title: 'Doanh thu',
			icon: 'streamline:decent-work-and-economic-growth'
		},
		{
			key: 'user',
			title: 'Quản lý tài khoản',
			icon: 'mdi:account-file-outline'
		},
		{
			key: 'order',
			title: 'Thống kê chi tiết',
			icon: 'bx:detail'
		}
	];

	const [keySelected, setKeySelected] = useState('product');

	const renderPage = key => {
		switch (key) {
			case 'product':
				return <ChartOwner allStore={allStore} />;
			case 'user':
				return <ManageUserOwner allStore={allStore} />;
			case 'order':
				return <StatisticOwner allStore={allStore} />;
			default:
				return <></>;
		}
	};

	const handleOnClick = key => {
		setKeySelected(key);
	};

	return (
		<div className='flex'>
			<nav className='bg-[#4b6580] min-h-screen text-white w-[20%] rounded-r-lg'>
				<div className='flex item-center flex-col p-4'>
					{items.map(item => (
						<div
							onClick={() => handleOnClick(item.key)}
							key={item.key}
							className='flex gap-2 items-center h-12 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md text-lg'
						>
							<Icon icon={item.icon} />
							<h1>{item.title}</h1>
						</div>
					))}
					<div
						onClick={handleLogout}
						className='flex gap-2 items-center h-12 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md text-lg'
					>
						<Icon
							icon='tabler:logout'
							height={18}
						></Icon>
						<h1>Đăng xuất</h1>
					</div>
				</div>
			</nav>
			<div className='flex-1'>{renderPage(keySelected)}</div>
		</div>
	);
};

export default AdminOwnerPage;
