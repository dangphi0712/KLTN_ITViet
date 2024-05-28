/* eslint-disable no-unused-vars */
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { optionStoreType } from '../constants';
import * as UserService from '../services/user';
import * as StoreService from '../services/store';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import config from '../config';
const RegisterPage = () => {
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [isConfirmPassword, setIsConfirmPassword] = useState(false);
	const [fullName, setFullName] = useState('');
	const [nameStore, setNameStore] = useState('');
	const [phone, setPhone] = useState('');
	const [storeType, setStoreType] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [idUser, setIdUser] = useState('');
	const [formComplete, setFormComplete] = useState(false);
	const navigate = useNavigate();
	const handleSubmit = async data => {
		const validName = /\d/;
		if (validName.test(fullName)) {
			message.warning('Họ tên không được chứa số');
			return;
		}
		if (!email || !password || !fullName) {
			message.warning('Vui lòng nhập đầy đủ các trường');
			return;
		}
		if (password !== confirmPassword) {
			message.warning('Password không trùng khớp');
			return;
		} else {
			const res = await UserService.register(data);

			if (res?.status === 'ERR') {
				message.warning(res?.message);
				return;
			}
			if (res?.status === 'OK') {
				setIdUser(res.data._id);
				setFormComplete(true);
			}
		}
	};

	const handleRegister = async data => {
		if (storeType !== 'cafe' && storeType !== 'shop') {
			message.warning(
				'Hiện tại hệ thống chỉ hỗ trợ 2 loại cửa hàng là cafe và shop vui lòng chọn lại'
			);
			return;
		} else {
			const res = await StoreService.createStore(data);
			if (res?.status === 'OK') {
				navigate(config.routes.login);
			}
		}
	};
	return (
		<div className='w-full'>
			<div className='flex justify-center'>
				<div
					className='h-screen hidden lg:flex justify-center w-[40%] relative'
					style={{
						backgroundImage:
							'url(https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/31095247/background-register1-1.jpg)',
						backgroundPosition: '50%',
						backgroundSize: 'cover'
					}}
				>
					<div className='flex items-center flex-col justify-center gap-4 text-white'>
						<h1 className='text-[40px] font-bold text-center'>
							Quản lý dễ dàng <br /> Bán hàng đơn giản
						</h1>

						<h3 className='text-base font-semibold'>
							Hỗ trợ đăng ký 18006162
						</h3>
					</div>
				</div>

				{!formComplete ? (
					<div className='flex lg:flex-1 flex-col justify-center items-center mt-[120px] lg:mt-0'>
						<h1 className='text-2xl font-bold mb-4'>
							Tạo tài khoản dùng thử miễn phí
						</h1>

						<form
							action=''
							className='flex flex-col gap-3 max-w-[500px] w-full'
						>
							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px]'>
									<input
										type='text'
										placeholder='Nhập họ tên chủ sỡ hữu'
										className='px-3 focus:outline-none w-full'
										value={fullName}
										onChange={e =>
											setFullName(e.target.value)
										}
									/>
								</div>
							</div>

							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px]'>
									<input
										type='text'
										placeholder='Tên đăng nhập'
										className='px-3 focus:outline-none w-full'
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px] relative'>
									<input
										type={
											isShowPassword ? 'text' : 'password'
										}
										placeholder='Mật khẩu'
										className='px-3 focus:outline-none w-full'
										value={password}
										onChange={e =>
											setPassword(e.target.value)
										}
									/>
									<span
										className='absolute top-[12px] right-[14px] cursor-pointer'
										onClick={() =>
											setIsShowPassword(!isShowPassword)
										}
									>
										{isShowPassword ? (
											<Icon
												icon='mdi:eye-outline'
												height={20}
											/>
										) : (
											<Icon
												icon='mdi:eye-off-outline'
												height={20}
											/>
										)}
									</span>
								</div>
							</div>

							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px] relative'>
									<input
										type={
											isConfirmPassword
												? 'text'
												: 'password'
										}
										placeholder='Nhập lại mật khẩu'
										className='px-3 focus:outline-none w-full'
										value={confirmPassword}
										onChange={e =>
											setConfirmPassword(e.target.value)
										}
									/>

									<span
										className='absolute top-[12px] right-[14px] cursor-pointer'
										onClick={() =>
											setIsConfirmPassword(
												!isConfirmPassword
											)
										}
									>
										{isConfirmPassword ? (
											<Icon
												icon='mdi:eye-outline'
												height={20}
											/>
										) : (
											<Icon
												icon='mdi:eye-off-outline'
												height={20}
											/>
										)}
									</span>
								</div>
							</div>

							<button
								type='button'
								onClick={() =>
									handleSubmit({
										name: fullName,
										email,
										password
									})
								}
								className='py-[11px] px-[23px] bg-primary hover:bg-[#005ac3] font-bold text-white cursor-pointer text-base rounded-3xl'
							>
								Tiếp tục
							</button>
						</form>
					</div>
				) : (
					<div className='flex lg:flex-1 flex-col justify-center items-center mt-[120px] lg:mt-0'>
						<h1 className='text-2xl font-bold mb-4'>
							Tạo cửa hàng
						</h1>

						<form
							action=''
							className='flex flex-col gap-3 max-w-[500px] w-full'
						>
							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px]'>
									<input
										type='text'
										placeholder='Tên cửa hàng'
										className='px-3 focus:outline-none w-full'
										value={nameStore}
										onChange={e =>
											setNameStore(e.target.value)
										}
									/>
								</div>
							</div>
							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px] relative'>
									<input
										type='text'
										placeholder='Số điện thoại'
										className='pl-14 focus:outline-none w-full'
										value={phone}
										onChange={e => setPhone(e.target.value)}
									/>
									<span className='absolute top-[12px] left-[14px] cursor-pointer'>
										<Icon
											icon='twemoji:flag-vietnam'
											height={20}
										/>
									</span>
								</div>
							</div>
							<div className='w-full'>
								<div className='w-full flex items-center border rounded-lg min-h-[48px] py-[5px] relative'>
									<select
										name='storeType'
										id=''
										className='mx-3 focus:outline-none w-full cursor-pointer'
										value={storeType}
										onChange={e =>
											setStoreType(e.target.value)
										}
									>
										{optionStoreType.map((item, idx) => (
											<>
												<option
													value={item.value}
													key={idx}
													className='px-3'
												>
													{item.title}
												</option>
											</>
										))}
									</select>
								</div>
							</div>

							<button
								type='button'
								onClick={() =>
									handleRegister({
										name: storeType,
										storeType,
										phoneStore: phone,
										user: idUser
									})
								}
								className='py-[11px] px-[23px] bg-primary hover:bg-[#005ac3] font-bold text-white cursor-pointer text-base rounded-3xl'
							>
								Đăng ký
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default RegisterPage;
