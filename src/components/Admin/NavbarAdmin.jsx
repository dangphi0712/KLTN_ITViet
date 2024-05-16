import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import * as UserService from '../../services/user';
import { resetUser } from '../../redux/Slice/userSlice';

const NavbarAdmin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state?.user);

	const handleLogout = async () => {
		const res = await UserService.logout();
		if (res?.status === 'OK') {
			dispatch(resetUser());
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			navigate(config.routes.login);
		}
	};

	return (
		<header className='flex flex-col'>
			<nav className='gap-2 h-12  w-full'>
				<div className='max-w-7xl mx-auto flex item-center justify-between'>
					<div
						className='flex gap-1 items-center'
						onClick={() => navigate(config.routes.home)}
					>
						<img
							src='../src/assets/images/logo.png'
							alt=''
							width={30}
							height={30}
						/>
						<h1 className='text-2xl font-bold my-2 text-blue-900'>
							VIET
						</h1>
					</div>
					<div className='flex hover cursor-pointer gap-1 '>
						<div className='flex h-[49px] hover cursor-pointer items-center gap-1 px-3 text-gray-600'>
							<Icon icon='ic:outline-contact-support'></Icon>
							<h1>Hỗ trợ</h1>
						</div>
						<div className='flex h-[49px] hover cursor-pointer gap-2 items-center px-3 text-gray-600'>
							<h1>Chi nhánh trung tâm</h1>
							<Icon icon='mdi:address-marker'></Icon>
						</div>
						<div className='px-3 h-[49px] text-gray-600'>
							<button className='flex peer gap-2 px-2 rounded-md relative items-center'>
								<Icon
									icon='emojione:flag-for-vietnam'
									className='my-3 items-center'
									height={25}
								></Icon>
								<h1 className='text-sm'>Tiếng Việt</h1>
								<Icon
									icon='teenyicons:down-solid'
									height={10}
								></Icon>
							</button>
							<div className='hidden peer-hover:flex hover:flex bg-white drop-shadow-lg rounded-md gap-1 absolute top-12 z-40'>
								<div className='hover:bg-gray-200 rounded-md flex items-center gap-2 p-5'>
									<Icon
										icon='emojione:flag-for-united-states'
										className='items-center'
										height={20}
									></Icon>
									<h1 className='text-sm'>Tiếng Anh</h1>
								</div>
							</div>
						</div>
						<div className='h-[49px] py-4 cursor-pointer'>
							<Icon
								icon='material-symbols:mail-outline'
								height={20}
							></Icon>
						</div>
						<div className='flex h-[49px] items-center gap-1 px-3'>
							<h1>Thiết lập</h1>
							<Icon
								icon='uiw:setting'
								height={15}
							></Icon>
						</div>
						<div className=''>
							<button className='flex group hover:bg-gray-200 text-black gap-1 px-2 rounded-md relative'>
								<h1 className='py-3 font-semibold'>
									{user?.name}
								</h1>
								<Icon
									icon='tabler:user-circle'
									className='my-3 items-center'
									height={25}
								></Icon>
								<ul className='dropdown-menu grid-cols-1 right-20 z-20 w-56 group-hover:top-10 text-[15px] '>
									<li className='hover:bg-gray-200 p-3 rounded-md flex gap-3 items-center'>
										<Icon
											icon='codicon:account'
											height={18}
										></Icon>
										<h1>Tài khoản</h1>
									</li>
									<li className='hover:bg-gray-200 p-3 rounded-md flex gap-3 items-center'>
										<Icon
											icon='mingcute:store-line'
											height={18}
										></Icon>
										<h1>Thông tin gian hàng</h1>
									</li>
									<li
										onClick={handleLogout}
										type='button'
										className='hover:bg-gray-200 p-3 rounded-md flex gap-3 items-center'
									>
										<Icon
											icon='tabler:logout'
											height={18}
										></Icon>
										<h1>Đăng xuất</h1>
									</li>
								</ul>
							</button>
						</div>
					</div>
				</div>
			</nav>
			<nav className='bg-[#4b6580] text-white h-10 items-center'>
				<div className='max-w-7xl mx-auto flex item-center'>
					<div
						onClick={() => navigate(config.routes.admin)}
						className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'
					>
						<Icon icon='ph:eye-bold'></Icon>
						<h1>Tổng quan</h1>
					</div>
					<div
						onClick={() => navigate(config.routes.manageProduct)}
						className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'
					>
						<Icon icon='gravity-ui:box'></Icon>
						<h1>Hàng hóa</h1>
					</div>
					<div
						onClick={() => navigate(config.routes.manageBill)}
						className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'
					>
						<Icon icon='tabler:table'></Icon>
						<h1>Hóa đơn</h1>
					</div>
					<div
						onClick={() => navigate(config.routes.ieManage)}
						className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'
					>
						<Icon icon='fluent:arrow-swap-16-filled'></Icon>
						<h1>Kho</h1>
					</div>
					<div className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'>
						<Icon icon='mdi:partnership-outline'></Icon>
						<h1>Đối tác</h1>
					</div>
					<div className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'>
						<Icon icon='mdi:human-queue'></Icon>
						<h1>Nhân viên</h1>
					</div>
					<div className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'>
						<Icon icon='material-symbols:shopping-cart-outline'></Icon>
						<h1>Website</h1>
					</div>
					<div className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'>
						<Icon icon='dashicons:money-alt'></Icon>
						<h1>Sổ quỹ</h1>
					</div>
					<div className='flex gap-2 items-center h-10 px-2 hover:bg-[#3e5369] cursor-pointer rounded-md'>
						<Icon icon='tabler:report'></Icon>
						<h1>Báo cáo</h1>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default NavbarAdmin;
