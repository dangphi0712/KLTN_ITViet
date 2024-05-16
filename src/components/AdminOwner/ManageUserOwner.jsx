/* eslint-disable react/prop-types */
import { Form, Modal, Table, message } from 'antd';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { optionStoreType } from '../../constants';
import * as UserService from '../../services/user';
import * as StoreService from '../../services/store';
import { Excel } from 'antd-table-saveas-excel';
const ManageUserOwner = ({ allStore }) => {
	const [openModal, setOpenModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [formComplete, setFormComplete] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [form] = useForm();

	const initAccountUser = () => ({
		name: '',
		email: '',
		password: ''
	});

	const initStore = () => ({
		name: '',
		storeType: '',
		phoneStore: '',
		user: ''
	});
	const handleCancelModal = () => {
		setOpenModal(false);
	};

	const handleCancelUpdateModal = () => {
		setOpenUpdateModal(false);
	};

	const handleCancelDeleteModal = () => {
		setOpenDeleteModal(false);
	};

	const [accountUser, setAccountUser] = useState(initAccountUser());
	const [store, setStore] = useState(initStore());
	const [idUser, setIdUser] = useState('');

	const handleOnChangeUser = e => {
		setAccountUser({ ...accountUser, [e.target.name]: e.target.value });
	};

	const handleOnChangeStore = e => {
		setStore({ ...store, [e.target.name]: e.target.value });
	};
	const columns = [
		{
			title: 'Mã người dùng',
			dataIndex: 'id'
		},

		{
			title: 'Loại cửa hàng',
			dataIndex: 'category'
		},
		{
			title: 'Ngày đăng ký',
			dataIndex: 'start'
		},
		{
			title: 'Ngày hết hạn',
			dataIndex: 'end'
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone'
		}
	];

	const dataTables = allStore.map(item => {
		const date = new Date(item.createdAt);
		date.setMonth(date.getMonth() + 3);
		const newEndDate = date.toISOString().split('T')[0];
		return {
			id: item.user,
			category: item.name,
			phone: item.phoneStore,
			start: item.createdAt.split('T')[0],
			end: newEndDate
		};
	});

	const handleSubmit = async () => {
		const params = {
			name: accountUser.name,
			email: accountUser.email,
			password: accountUser.password
		};
		if (!accountUser.name || !accountUser.email || !accountUser.password) {
			message.warning('Vui lòng nhập đầy đủ các trường');
		} else {
			const res = await UserService.register(params);

			if (res?.status === 'ERR') {
				message.warning(res?.message);
			}
			if (res?.status === 'OK') {
				setIdUser(res?.data?._id);
				setFormComplete(true);
			}
		}
	};

	const handleRegisterStore = async () => {
		const params = {
			name: store.storeType,
			storeType: store.storeType,
			phoneStore: store.phoneStore,
			user: idUser
		};
		if (store.storeType !== 'cafe' && store.storeType !== 'shop') {
			message.warning(
				'Hiện tại hệ thống chỉ hỗ trợ 2 loại cửa hàng là cafe và shop vui lòng chọn lại'
			);
		} else {
			const res = await StoreService.createStore(params);
			if (res?.status === 'OK') {
				message.success('Đăng ký cửa hàng thành công');
				setOpenModal(false);
			}
		}
	};

	const exportExcel = () => {
		const excel = new Excel();
		excel
			.addSheet('Danh sách người dùng')
			.addColumns(columns)
			.addDataSource(dataTables, { str2Percent: true })
			.saveAs('DSNguoiDung.xlsx');
	};

	return (
		<>
			<div className='p-4'>
				<div className='flex justify-end items-center gap-2'>
					<button
						onClick={() => setOpenModal(true)}
						className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'
					>
						<Icon icon='ic:baseline-plus' />
						Thêm
					</button>
					<button
						onClick={() => setOpenDeleteModal(true)}
						className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'
					>
						<Icon icon='material-symbols:delete-outline' />
						Xóa
					</button>
					<button
						onClick={() => setOpenUpdateModal(true)}
						className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'
					>
						<Icon icon='lucide:edit' />
						Sửa
					</button>
					<button
						onClick={exportExcel}
						className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'
					>
						<Icon
							icon='clarity:export-solid'
							height={19}
						/>
						Xuất file
					</button>
				</div>
				<div className='mt-3'>
					<Table
						columns={columns}
						dataSource={dataTables}
					/>
				</div>
			</div>

			<Modal
				title='Thêm người dùng mới'
				open={openModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelModal}
			>
				{!formComplete ? (
					<Form
						form={form}
						labelCol={{ span: 4 }}
						labelAlign='left'
						wrapperCol={{ span: 20 }}
					>
						{/* name */}
						<Form.Item
							label='Tên chủ cửa hàng'
							name='name'
						>
							<input
								name='name'
								value={accountUser.name}
								onChange={handleOnChangeUser}
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>
						{/* user name */}
						<Form.Item
							label='Tên đăng nhập'
							name='email'
						>
							<input
								name='email'
								value={accountUser.email}
								onChange={handleOnChangeUser}
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>
						{/* password */}
						<Form.Item
							label='Mật khẩu'
							name='password'
						>
							<input
								name='password'
								type={isShowPassword ? 'text' : 'password'}
								value={accountUser.password}
								onChange={handleOnChangeUser}
								className='relative border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
							<span
								className='absolute top-[6px] right-[10px] cursor-pointer'
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
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 16,
								span: 16
							}}
						>
							<button
								className='bg-primary p-2 font-semibold w-full rounded-md text-white'
								type='button'
								onClick={handleSubmit}
							>
								tiếp tục
							</button>
						</Form.Item>
					</Form>
				) : (
					<Form
						form={form}
						labelCol={{ span: 4 }}
						labelAlign='left'
						wrapperCol={{ span: 20 }}
					>
						{/* storeName */}
						<Form.Item
							label='Tên cửa hàng'
							name='storeName'
						>
							<input
								name='storeName'
								value={store.name}
								onChange={handleOnChangeStore}
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>
						{/* phoneStore */}
						<Form.Item
							label='Số điện thoại'
							name='phoneStore'
						>
							<input
								name='phoneStore'
								value={store.phoneStore}
								onChange={handleOnChangeStore}
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>
						{/* storeType */}
						<Form.Item
							label='Loại cửa hàng'
							name='storeType'
						>
							<select
								name='storeType'
								id=''
								value={store.storeType}
								onChange={handleOnChangeStore}
								className='cursor-pointer border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
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
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 16,
								span: 16
							}}
						>
							<button
								className='bg-primary p-2 font-semibold w-full rounded-md text-white'
								type='button'
								onClick={handleRegisterStore}
							>
								tiếp tục
							</button>
						</Form.Item>
					</Form>
				)}
			</Modal>

			<Modal
				title='Sửa thông tin người dùng'
				open={openUpdateModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelUpdateModal}
			>
				<Form
					form={form}
					labelCol={{ span: 5 }}
					labelAlign='left'
					wrapperCol={{ span: 18 }}
				>
					<Form.Item
						label='Nhập mã người dùng'
						name='id'
					>
						<input
							name='id'
							className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 16,
							span: 16
						}}
					>
						<button
							className='bg-primary p-2 font-semibold w-full rounded-md text-white'
							type='button'
						>
							tiếp tục
						</button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title='Xóa người dùng'
				open={openDeleteModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelDeleteModal}
			>
				<Form
					form={form}
					labelCol={{ span: 5 }}
					labelAlign='left'
					wrapperCol={{ span: 18 }}
				>
					<Form.Item
						label='Nhập mã người dùng'
						name='id'
					>
						<input
							name='id'
							className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
						/>
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 16,
							span: 16
						}}
					>
						<button
							className='bg-primary p-2 font-semibold w-full rounded-md text-white'
							type='button'
						>
							tiếp tục
						</button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ManageUserOwner;
