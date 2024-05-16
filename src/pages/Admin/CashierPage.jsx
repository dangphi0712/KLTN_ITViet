/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import {
	Modal,
	Table,
	Tabs,
	Switch,
	ConfigProvider,
	message,
	Spin
} from 'antd';
import { tableOrder } from '../../constants';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addOrderProduct,
	decreaseAmount,
	increaseAmount,
	removeProduct,
	resetOrder
} from '../../redux/Slice/orderSlice';
import { useReactToPrint } from 'react-to-print';
import * as StoreService from '../../services/store';
import * as OrderService from '../../services/order';
import * as UserService from '../../services/user';
import { convertPrice } from '../../utils';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { resetUser } from '../../redux/Slice/userSlice';
import { useDebounce } from '../../hook/useDebounce';
import QRCode from '../../assets/images/QRcode.jpg';

const CashierPage = () => {
	const [selectedTable, setSelectedTable] = useState(null);
	const [selectedTabKey, setSelectedTabKey] = useState('1');
	const [label, setLabel] = useState('');
	const [allProduct, setAllProduct] = useState([]);
	const [checked, setChecked] = useState(false);
	const [discount, setDiscount] = useState('');
	const [dataCreateOrder, setDataCreateOrder] = useState({});
	const [loadingProduct, setLoadingProduct] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();
	const user = useSelector(state => state?.user);
	const searchDebounce = useDebounce(searchValue);

	const printref = useRef();
	const dispatch = useDispatch();
	const order = useSelector(state => state?.order);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isVNPayModal, setVNPayModal] = useState(false);
	const [countdown, setCountdown] = useState(180);

	const [allStore, setAllStore] = useState([]);

	// get all store
	const getAllStore = async () => {
		try {
			const res = await StoreService.getAllStore();
			setAllStore(res?.data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		getAllStore();
	}, []);
	// payment online
	const handleCanceVNPaylModal = () => {
		setVNPayModal(false);
		setCountdown(180);
	};
	useEffect(() => {
		let interval;
		if (isVNPayModal) {
			interval = setInterval(() => {
				setCountdown(prevCountdown => prevCountdown - 1);
			}, 1000); // Cập nhật giá trị mỗi giây
		} else {
			clearInterval(interval); // Dừng đếm ngược khi modal đóng
		}

		return () => clearInterval(interval); // Clean up
	}, [isVNPayModal]);

	useEffect(() => {
		if (countdown === 0) {
			handleCanceVNPaylModal(); // Khi đếm ngược đạt 0, gọi hàm để đóng modal
		}
	}, [countdown, handleCanceVNPaylModal]);

	// modal discount
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancelModal = () => {
		setIsModalOpen(false);
	};

	const handleTableClick = (idx, item) => {
		setSelectedTable(idx);
		setSelectedTabKey('2');
		setLabel(item.title);
	};

	const handleOnChangeCount = (type, idProduct, limited) => {
		if (type === 'increase') {
			dispatch(increaseAmount({ idProduct }));
		} else if (type === 'decrease') {
			if (!limited) {
				dispatch(decreaseAmount({ idProduct }));
			}
		}
	};

	const handleDeleteProduct = idProduct => {
		dispatch(removeProduct({ idProduct }));
	};

	// price memo
	const priceMemo = useMemo(() => {
		const result = order?.orderItems.reduce((total, current) => {
			return total + current?.price * current?.amount;
		}, 0);
		return result;
	}, [order]);

	const priceTotalMemo = useMemo(() => {
		let result = 0;
		if (Number(discount) > priceMemo) {
			message.warning('Số tiền giảm giá không hợp lệ');
		}
		if (!checked) {
			result = priceMemo - Number(discount);
		} else {
			let dis = (priceMemo * Number(discount)) / 100;
			if (dis > priceMemo) {
				message.warning('Phần trăm giảm giá không hợp lệ');
			}
			result = priceMemo - dis;
		}
		return result;
	}, [priceMemo, discount]);

	// get product by storeId
	const getProductStore = async () => {
		setLoadingProduct(true);
		try {
			let res = {};
			if (user?.storeId) {
				if (searchDebounce.length > 0) {
					res = await StoreService.getProductStore(
						user?.storeId,
						searchDebounce
					);
				} else {
					res = await StoreService.getProductStore(user?.storeId);
				}
			}
			setAllProduct(res?.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingProduct(false);
		}
	};

	useEffect(() => {
		getProductStore();
	}, [user?.storeId, searchDebounce]);

	const handleAddOrder = data => {
		dispatch(
			addOrderProduct({
				orderItem: data
			})
		);
	};

	const handleCheck = () => {
		setChecked(!checked);
	};

	const handleOnChangeDiscountValue = e => {
		let priceText = e.target.value;
		const isNegative = priceText.indexOf('-') === 0;
		priceText = priceText.substr(Number(isNegative)).replace(/\D/g, '');
		setDiscount(`${isNegative ? '-' : ''}${priceText}`);
	};

	const items = [
		{
			key: '1',
			label: 'Phòng bàn',
			children: (
				<ul className='h-full flex flex-wrap gap-y-6'>
					{tableOrder.map((item, idx) => (
						<li
							onClick={() => handleTableClick(idx, item)}
							key={idx}
							className={`cursor-pointer text-center w-[12.5%] h-[25%] hover:bg-[#d5d5d5d5] rounded-2xl flex flex-col items-center gap-1 
							${selectedTable === idx ? 'bg-[#4b6580] ' : ''}`}
						>
							{idx === 0 ? (
								<>
									<Icon
										icon={item.icon}
										height={40}
										className='my-2'
									/>
									{item.title}
								</>
							) : (
								<>
									<img
										src={item.icon}
										alt='table-icon'
										className='pt-4'
									/>
									{item.title}
								</>
							)}
						</li>
					))}
				</ul>
			)
		},
		{
			key: '2',
			label: 'Sản phẩm',
			children: (
				<Spin
					delay={500}
					spinning={loadingProduct}
					className='flex items-center justify-center'
				>
					<ul className='flex flex-wrap gap-y-6 h-full'>
						{allProduct?.map(item => (
							<li
								key={item._id}
								onClick={() =>
									handleAddOrder({
										name: item.name,
										amount: 1,
										image: item.image,
										price: item.price,
										id: item._id
									})
								}
								className='cursor-pointer w-[20%] h-[25%] hover:bg-[#d5d5d5d5] rounded-2xl gap-1 flex flex-col items-center justify-center'
							>
								<div className='p-0 overflow-hidden text-center h-[100px]'>
									<img
										src={item?.image}
										alt='anh-cf'
										width={50}
										height={50}
										className='h-full max-w-full pt-2'
										loading='lazy'
									/>
								</div>
								<h2 className='overflow-hidden font-semibold text-center w-[120px] truncate'>
									{item?.name}
								</h2>
								<span className='text-primary font-semibold'>
									{convertPrice(item?.price)}
									<sup>đ</sup>
								</span>
							</li>
						))}
					</ul>
				</Spin>
			)
		},
		{
			key: '3',
			label: 'Khác',
			children: 'Content of Tab Pane 3'
		}
	];

	const PrintOrder = React.forwardRef(({ allProduct, priceTotal }, ref) => {
		const columns = [
			{
				title: 'Tên sản phẩm',
				dataIndex: 'name'
			},

			{
				title: 'Số lượng',
				dataIndex: 'amount'
			},

			{
				title: 'Đơn giá',
				dataIndex: 'price'
			},
			{
				title: 'Thành tiền',
				dataIndex: 'total'
			}
		];

		const dataSource =
			allProduct?.length > 0 &&
			allProduct?.map(item => {
				return {
					...item,
					price: convertPrice(item.price),
					total: convertPrice(item.price * item.amount),
					key: item?._id
				};
			});
		return (
			<div
				className='flex-col gap-2 '
				ref={ref}
			>
				<div className='flex flex-col items-center justify-center gap-2 p-4'>
					<h1 className='text-2xl font-bold'>Hệ thống ITViet</h1>
					<div className='flex items-center text-base gap-1'>
						<span>Địa chỉ:</span>
						<span>
							254 Nguyễn Văn Linh, Quận Thanh Khê - Tp. Đà Nẵng
						</span>
					</div>
					<div className='flex items-center text-base gap-1'>
						<span>Điện thoại:</span>
						<span>(+84) 236.3650403 - (+84) 236.3827111</span>
					</div>
				</div>
				<div className='text-xl text-center p-4'>
					<h3 className='font-bold'>Hóa đơn thanh toán</h3>
					{allStore.map(item => {
						if (item?.user === user?.id && item.name === 'cafe') {
							return <h3 key={item.name}>{label}</h3>;
						}
					})}
				</div>
				<div>
					<Table
						columns={columns}
						dataSource={dataSource}
						pagination={false}
					/>
					<div className='flex justify-between px-4 mt-2'>
						<span>Tạm tính:</span>
						<span className='mr-24'>{convertPrice(priceMemo)}</span>
					</div>
					<div className='flex justify-between px-4 mt-2'>
						<span>Giảm giá:</span>
						<span className='mr-24'>
							{discount
								? `${convertPrice(Number(discount))} ${
										checked ? '%' : 'đ'
								  }`
								: '0'}
						</span>
					</div>
					<div className='flex justify-between px-4 mt-2'>
						<span>Tổng cộng:</span>
						<span className='mr-24'>{priceTotal}</span>
					</div>
				</div>

				<span className='flex justify-center mt-2 text-sm'>
					Cảm ơn quý khách và hẹn gặp lại !!!
				</span>
				<div className='mt-4 flex justify-center text-sm flex-col items-center'>
					<span>Wifi : HETHONGITVIET</span>
					<span>PassWifi : 86868686</span>
				</div>
			</div>
		);
	});

	const handlePrint = useReactToPrint({
		content: () => printref.current
	});

	const handleLogout = async () => {
		const res = await UserService.logout();
		if (res?.status === 'OK') {
			dispatch(resetUser());
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			navigate(config.routes.login);
		}
	};
	//create order

	const createOrderApi = async data => {
		const { orderItems, itemPrice, discountPrice, totalPrice, userId } =
			data;

		const res = await OrderService.createOrder({
			orderItems,
			itemPrice,
			discountPrice,
			totalPrice,
			userId
		});
		setDataCreateOrder(res);
	};

	const handleCreateOrder = () => {
		if (order && order.orderItems && order.orderItems.length > 0) {
			const params = {
				orderItems: order?.orderItems,
				itemPrice: priceMemo,
				discountPrice: Number(discount),
				totalPrice: priceTotalMemo,
				userId: user.id
			};
			createOrderApi(params);
		}
	};

	useEffect(() => {
		if (dataCreateOrder.status === 'OK') {
			try {
				dispatch(resetOrder());
				setDiscount('');
				if (order?.orderItems && order.orderItems.length > 0) {
					handlePrint();
				}
			} catch (error) {
				console.error(error);
			}
		}
		if (dataCreateOrder.status === 'ERR') {
			message.error('Thất bại');
		}
	}, [dataCreateOrder]);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<>
			<div>
				<div className=' bg-[#2f3f50] pt-3 pr-8 w-full  text-white relative'>
					<div className='absolute top-1 right-10 my-2 group'>
						<span
							onClick={handleOpen}
							className='flex gap-1 items-center cursor-pointer text-base'
						>
							<Icon
								icon='ph:user-light'
								height={20}
							/>
							{user.name}
						</span>

						{open && (
							<ul className='text-black shadow-2xl absolute bg-gray-200 w-[210px] grid-cols-1 -right-7 top-10 z-20 p-5 rounded-lg cursor-pointer'>
								<li className='hover:text-primary text-base flex items-center gap-1 pb-2'>
									<Icon
										icon='ph:user-light'
										height={20}
									/>
									Thông tin tài khoản
								</li>
								<li className='hover:text-primary text-base flex items-center gap-1 py-2'>
									<Icon
										icon='ant-design:setting-outlined'
										height={20}
									/>
									Cài đặt
								</li>
								<li
									className='hover:text-primary text-base flex items-center gap-1 pt-2'
									onClick={handleLogout}
								>
									<Icon
										icon='ic:twotone-logout'
										height={20}
									/>
									Đăng xuất
								</li>
							</ul>
						)}
					</div>
				</div>
				<div className='pt-10 px-3 w-full h-full min-h-screen flex bg-[#2f3f50] gap-4'>
					<div className='w-[65%] bg-white rounded-2xl p-4'>
						<div className='relative'>
							<div className='absolute z-10 flex items-center w-[50%] bg-white overflow-hidden right-0 top-4 '>
								<div className='grid place-items-center h-full w-12 text-gray-500'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
									</svg>
								</div>

								<input
									className='peer h-full w-full border outline-none text-sm text-gray-700 focus-within:border-b-2 focus-within:border-primary mr-5 rounded-2xl p-2'
									type='text'
									id='search'
									placeholder='Tìm kiếm sản phẩm'
									value={searchValue}
									onChange={e =>
										setSearchValue(e.target.value)
									}
								/>
							</div>
						</div>

						{allStore.map(item => {
							if (
								item?.user === user?.id &&
								item.name === 'cafe'
							) {
								return (
									<Tabs
										key={item.name}
										items={items}
										activeKey={selectedTabKey}
										onChange={setSelectedTabKey}
									/>
								);
							} else if (
								item?.user === user?.id &&
								item.name === 'shop'
							) {
								return (
									<Spin
										key={item.name}
										delay={500}
										spinning={loadingProduct}
										className='flex items-center justify-center '
									>
										<ul className='flex flex-wrap gap-y-6 h-full mt-16'>
											{allProduct?.map(item => (
												<li
													key={item._id}
													onClick={() =>
														handleAddOrder({
															name: item.name,
															amount: 1,
															image: item.image,
															price: item.price,
															id: item._id
														})
													}
													className='cursor-pointer w-[20%] h-[25%] hover:bg-[#d5d5d5d5] rounded-2xl gap-1 flex flex-col items-center justify-center'
												>
													<div className='overflow-hidden text-center h-[263px] '>
														<img
															src={item?.image}
															alt='anh-cf'
															width={146}
															className='pt-2'
															loading='lazy'
														/>
													</div>
													<h2 className='overflow-hidden font-semibold text-center w-[120px] truncate'>
														{item?.name}
													</h2>
													<span className='text-primary font-semibold'>
														{convertPrice(
															item?.price
														)}
														<sup>đ</sup>
													</span>
												</li>
											))}
										</ul>
									</Spin>
								);
							}
						})}
					</div>

					<div className='w-[35%] flex flex-col bg-white rounded-2xl p-4'>
						<div className='h-full '>
							{allStore.map(item => {
								if (
									item?.user === user?.id &&
									item.name === 'cafe'
								) {
									return (
										<div
											className='w-full border-b-2 p-3'
											key={item.name}
										>
											<h1>{label || 'Số bàn'}</h1>
										</div>
									);
								}
							})}

							{order?.orderItems.length === 0 && (
								<div className='flex items-center flex-col justify-center mt-10'>
									<i
										className='w-[96px] h-[96px] min-w-[96px]'
										style={{
											background:
												'url(https://static-kvfnb.kiotviet.vn/Content/WebPos/food-icon.svg) no-repeat'
										}}
									></i>
									<div className='text-center'>
										<p className='font-medium text-xl'>
											Chưa có sản phẩm nào
										</p>
										<span>Vui lòng chọn sản phẩm</span>
									</div>
								</div>
							)}
							{order?.orderItems.length > 0 &&
								order?.orderItems?.map(item => (
									<div
										key={item._id}
										className='my-[5px] pb-3 '
										ref={printref}
									>
										<div
											style={{
												backgroundColor: 'unset',
												boxShadow:
													'0px 4px 10px rgba(0, 0, 0, 0.1)',
												border: '1px solid transparent',
												borderRadius: '10px',
												padding: '14px 0'
											}}
										>
											<div className='flex w-full items-center'>
												<span
													className='px-2 hover:text-red-500 cursor-pointer'
													onClick={() =>
														handleDeleteProduct(
															item?.id
														)
													}
												>
													<Icon
														icon='ph:trash-light'
														height={20}
													/>
												</span>
												<div className='flex flex-1 gap-x-2 '>
													<div
														className=''
														style={{
															flex: '1 1 20%',
															wordBreak:
																'break-word'
														}}
													>
														<span className='font-semibold'>
															{item.name}
														</span>
													</div>

													<div className='w-[100px]'>
														<div className='flex items-center'>
															<button
																className='w-7 h-7 min-w-7 rounded-full flex items-center justify-center'
																style={{
																	border: '1px solid #4D5258'
																}}
																onClick={() =>
																	handleOnChangeCount(
																		'decrease',
																		item.id,
																		item?.amount ===
																			1
																	)
																}
															>
																-
															</button>

															<input
																min={1}
																value={
																	item?.amount
																}
																className='w-8 h-5 border-none text-center'
																type='number'
															/>

															<button
																className='w-7 h-7 min-w-7 rounded-full flex items-center justify-center'
																style={{
																	border: '1px solid #4D5258'
																}}
																onClick={() =>
																	handleOnChangeCount(
																		'increase',
																		item.id
																	)
																}
															>
																+
															</button>
														</div>
													</div>
													<div className='font-semibold w-[100px]'>
														{convertPrice(
															item?.price *
																item?.amount
														)}
														<sup>đ</sup>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
						</div>

						<div className='flex flex-col gap-2'>
							<div className='flex w-full items-center justify-between border-t border-t-gray-600 pt-4 pb-3'>
								<div className='text-lg font-semibold flex flex-col items-center gap-2'>
									<span>Tạm tính:</span>
									<span>Giảm giá:</span>
									<span>Tổng tiền</span>
								</div>
								<span className='text-lg font-semibold flex flex-col items-center gap-2'>
									<span>
										{convertPrice(priceMemo)}
										<sup>đ</sup>
									</span>
									<div
										className=''
										onClick={showModal}
									>
										<span className='flex items-center hover:boxShadow hover:cursor-pointer px-2 rounded-md'>
											{discount
												? `${convertPrice(
														Number(discount)
												  )} ${checked ? '%' : 'đ'}`
												: '0'}
										</span>
									</div>
									<span>
										{convertPrice(priceTotalMemo)}
										<sup>đ</sup>
									</span>
								</span>
							</div>

							<div className='flex items-center gap-2'>
								<button
									onClick={() => setVNPayModal(true)}
									className='flex gap-1 items-center py-4 px-6 w-full bg-primary rounded-2xl justify-center font-semibold text-white'
								>
									<Icon icon='solar:dollar-linear' />
									Chuyển khoản
								</button>

								<button
									onClick={handleCreateOrder}
									className='flex gap-1 items-center py-4 px-6 w-full bg-[#28b44f] rounded-2xl justify-center font-semibold text-white'
								>
									<Icon icon='solar:dollar-linear' />
									Tiền mặt
								</button>
							</div>

							<div className='hidden'>
								<PrintOrder
									ref={printref}
									allProduct={order?.orderItems}
									priceTotal={convertPrice(priceTotalMemo)}
								/>
							</div>
						</div>
					</div>
				</div>
				<Modal
					forceRender
					title='Bảng giảm giá'
					open={isModalOpen}
					footer={() => (
						<div className='py-4 mb-3'>
							<button
								onClick={handleCancelModal}
								className='float-right px-2 py-2 w-[120px] bg-[#28b44f] rounded-2xl font-semibold text-white'
							>
								<div className='w-full flex items-center justify-center gap-2'>
									<Icon icon='solar:dollar-linear' />
									Xác nhận
								</div>
							</button>
						</div>
					)}
					onCancel={handleCancelModal}
				>
					<div className='flex flex-col gap-2'>
						<div className='flex w-full items-center justify-between'>
							<div className='font-semibold flex flex-col gap-2'>
								<span>Loại giảm giá:</span>
								<span>Số tiền / Phần trăm:</span>
							</div>
							<div className='font-semibold flex flex-col gap-2'>
								<ConfigProvider
									theme={{
										components: {
											Switch: {
												colorPrimary: '#28b44f',
												colorPrimaryHover: '#28b44f'
											}
										}
									}}
								>
									<Switch
										className='bg-primary'
										checkedChildren='%'
										unCheckedChildren='Tiền'
										checked={checked}
										onChange={handleCheck}
									/>
								</ConfigProvider>

								<div className=' flex items-center gap-2'>
									<input
										type='text'
										className='border border-[#ccc] rounded-lg focus:outline-none px-2 w-[120px] py-1'
										value={Number(
											discount
										).toLocaleString()}
										onChange={handleOnChangeDiscountValue}
									/>
									<span className=''>
										{checked ? '%' : 'VND'}
									</span>
								</div>
							</div>
						</div>
					</div>
				</Modal>

				<Modal
					forceRender
					title=''
					open={isVNPayModal}
					footer={null}
					onCancel={handleCanceVNPaylModal}
					width={400}
					height={400}
				>
					<div className='flex flex-col'>
						<div className='flex gap-2 items-center justify-between text-xl mt-4 flex-col'>
							<h1 className=''>Thanh toán bằng QR Code</h1>

							<span className='text-base'>
								Thời gian còn lại: {Math.floor(countdown / 60)}:
								{countdown % 60 < 10
									? `0${countdown % 60}`
									: countdown % 60}
							</span>
						</div>
						<img
							src={QRCode}
							alt=''
						/>
						<div className='flex gap-2 items-center justify-center text-2xl'>
							<span className='text-red-600 font-bold'>
								{`${convertPrice(priceTotalMemo)} VND` || 0}
							</span>
						</div>
					</div>
				</Modal>
			</div>
		</>
	);
};

export default CashierPage;
