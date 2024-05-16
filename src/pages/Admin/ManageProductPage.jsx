/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@iconify/react';
import {
	ConfigProvider,
	Form,
	Modal,
	Select,
	Spin,
	Table,
	Upload,
	message
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { convertPrice, getBase64, renderOptions } from '../../utils';
import * as ProductService from '../../services/product';
import * as StoreService from '../../services/store';
import { Excel } from 'antd-table-saveas-excel';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hook/useDebounce';

const ManageProductPage = () => {
	const user = useSelector(state => state?.user);

	const initial = () => ({
		name: '',
		image: '',
		brand: '',
		price: '',
		newType: '',
		store: ''
	});
	const [openModal, setOpenModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [isAddNewType, setIsAddNewType] = useState(false);
	const [product, setProduct] = useState(initial());
	const [productDetail, setProductDetail] = useState(initial());
	const [dataCreateProduct, setDataCreateProduct] = useState({ data: null });
	const [dataUpdateProduct, setDataUpdateProduct] = useState({ data: null });
	const [allProduct, setAllProduct] = useState([]);
	const [typeProduct, setTypeProduct] = useState([]);
	const [rowSelected, setRowSelected] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const searchDebounce = useDebounce(searchValue);
	const [loading, setLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [form] = useForm();
	const handleOnChange = e => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handleOnChangeDetails = e => {
		setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
	};

	const handleCancelModal = () => {
		setOpenModal(false);
		setProduct({
			name: '',
			image: '',
			brand: '',
			price: '',
			newType: '',
			newCategory: '',
			storeId: ''
		});
		form.resetFields();
	};

	const handleCancelUpdateModal = () => {
		setOpenUpdateModal(false);
		setProductDetail({
			name: '',
			image: '',
			brand: '',
			price: '',
			newType: '',
			newCategory: '',
			storeId: ''
		});
		form.resetFields();
	};

	const handleOnChangeImage = async ({ fileList }) => {
		const file = fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setProduct({ ...product, image: file.preview });
	};

	const handleOnChangeImageDetail = async ({ fileList }) => {
		const file = fileList[0];
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setProductDetail({ ...productDetail, image: file.preview });
	};

	// create product
	const handleCreateProduct = async () => {
		setIsCreating(true);

		try {
			const res = await ProductService.createProduct({
				...product,
				brand: isAddNewType ? product.newType : product.brand,
				store: user?.storeId
			});
			setDataCreateProduct(res);
			if (res?.status === 'OK') {
				message.success('Thêm sản phẩm thành công');
				getProductList(user?.storeId);
				handleCancelModal();
			} else {
				message.error('Thêm sản phẩm không thành công');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsCreating(false);
		}
	};

	const getProductList = async (storeId, search) => {
		let res = {};
		setLoading(true);
		try {
			if (storeId) {
				if (search?.length > 0) {
					res = await StoreService.getProductStore(storeId, search);
				} else {
					res = await StoreService.getProductStore(storeId);
				}
			}
			setAllProduct(res.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	// update product

	const handleUpdateProduct = async () => {
		setIsUpdating(true);
		try {
			const res = await ProductService.updatedProduct(rowSelected, {
				...productDetail
			});
			setDataUpdateProduct(res);
			if (res.statusText === 'OK') {
				message.success('Sửa sản phẩm thành công');
				setRowSelected('');
				handleCancelUpdateModal();
				getProductList(user?.storeType);
			} else {
				message.error('Sửa sản phẩm thất bại');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	// delete product

	const handleDeleteProduct = async id => {
		setIsDeleting(true);
		try {
			const res = await ProductService.deleteProduct(id);
			if (res.status == 'OK') {
				message.success('Xóa sản phẩm thành công!');
				setOpenDeleteModal(false);
				getProductList(user?.storeId);
			} else {
				message.error('Xóa sản phẩm thất bại');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsDeleting(false);
		}
	};

	// product handle

	const getProductDetail = async id => {
		const res = await ProductService.getDetailProduct(id);
		setProductDetail(res.data);
	};
	const getAllType = async () => {
		const res = await StoreService.getAllType(user?.storeId);
		setTypeProduct(res);
	};

	useEffect(() => {
		if (rowSelected) {
			getProductDetail(rowSelected);
		}
	}, [openUpdateModal, rowSelected]);
	useEffect(() => {
		if (!openModal) {
			form.setFieldsValue(productDetail);
		} else {
			form.setFieldsValue(initial());
		}
	}, [openModal, productDetail, form]);

	useEffect(() => {
		getProductList(user?.storeId, searchDebounce);
	}, [searchDebounce, dataUpdateProduct, dataCreateProduct, user?.storeId]);

	useEffect(() => {
		getAllType();
	}, [user?.storeId]);

	const columns = [
		{
			title: 'Mã sản phẩm',
			dataIndex: 'id'
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name',
			sorter: (a, b) => a.name.length - b.name.length
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			sorter: (a, b) => a.price - b.price
		},
		{
			title: 'Nhóm sản phẩm',
			dataIndex: 'brand'
		}
	];

	const dataTables =
		allProduct?.length > 0 &&
		allProduct?.map(item => {
			return {
				...item,
				price: convertPrice(item.price),
				key: item._id,
				id: item._id
			};
		});

	const expandRowRender = () => {
		return (
			<div
				className={`flex items-center gap-2 border border-[#4bac4d] p-1`}
			>
				<div className='min-h-[290px] p-3 w-[35%] flex items-center flex-col'>
					<h1 className='text-lg text-primary font-semibold mb-8'>
						{productDetail.name}
					</h1>
					<img
						src={productDetail.image}
						alt='image'
						loading='lazy'
					/>
				</div>

				<div className='flex flex-1 flex-col gap-3'>
					<div className='flex flex-col gap-3'>
						<div className='border-b border-b-[#ccc] pb-2 flex items-center gap-2'>
							<span>Mã hàng hóa: </span>
							<span className='font-semibold'>
								{productDetail._id}
							</span>
						</div>

						<div className='border-b border-b-[#ccc] pb-2 flex items-center gap-2'>
							<span>Loại thực đơn: </span>
							<span className='font-semibold'>
								{productDetail.brand}
							</span>
						</div>

						<div className='border-b border-b-[#ccc] pb-2 flex items-center gap-2'>
							<span>Nhóm hàng: </span>
							<span className='font-semibold'>
								{productDetail.category}
							</span>
						</div>

						<div className='border-b border-b-[#ccc] pb-2 flex items-center gap-2'>
							<span>Giá bán: </span>
							<span className='font-semibold'>
								{convertPrice(productDetail.price)}
							</span>
						</div>
					</div>

					<div className='flex justify-end gap-2'>
						<button
							onClick={() => setOpenUpdateModal(true)}
							className='px-[20px] py-[7px] text-white bg-[#4bac4d] font-medium rounded-md flex items-center gap-1'
						>
							<Icon
								icon='material-symbols:check-box'
								height={18}
							/>
							Cập nhật
						</button>

						<button
							onClick={() => setOpenDeleteModal(true)}
							className='px-[20px] py-[7px] text-white bg-[#db4e65] font-medium rounded-md flex items-center gap-1'
						>
							<Icon
								icon='ph:trash-light'
								height={18}
							/>
							Xóa
						</button>
					</div>
				</div>
			</div>
		);
	};

	const exportExcel = () => {
		const excel = new Excel();
		excel
			.addSheet('Danh sách sản phẩm')
			.addColumns(columns)
			.addDataSource(dataTables, { str2Percent: true })
			.saveAs('DSSanPham.xlsx');
	};
	return (
		<div className='w-full h-screen'>
			<div className='max-w-7xl mx-auto pt-5'>
				<div className='flex gap-4 '>
					<div className='min-w-[284px] flex flex-col gap-3'>
						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md'>
							<div>
								<h3 className='px-3 font-semibold'>Tìm kiếm</h3>
								<div
									className='w-full mb-2'
									style={{ padding: '10px 12px 0' }}
								>
									<input
										type='text'
										placeholder='tìm kiếm sản phẩm'
										className='w-full focus:outline-none border-b-2 border-b-[#bababa] pb-2'
										value={searchValue}
										onChange={e =>
											setSearchValue(e.target.value)
										}
									/>
								</div>
							</div>
						</div>

						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md'>
							<h3 className='px-3 font-semibold'>
								Nhóm sản phẩm
							</h3>

							{typeProduct?.data?.map((item, idx) => (
								<div
									className='w-full mb-2 flex items-center gap-3'
									style={{ padding: '10px 12px 0' }}
									key={idx}
								>
									<input
										type='checkbox'
										value={item}
										className=''
									/>
									<label>{item}</label>
								</div>
							))}
						</div>
					</div>
					<div className='flex-1'>
						<div className='flex justify-between items-center'>
							<span className='text-2xl font-bold'>Hàng hóa</span>
							<div className='flex items-center gap-2'>
								<button
									onClick={() => setOpenModal(true)}
									className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'
								>
									<Icon icon='ic:baseline-plus' />
									Thêm mới
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
						</div>

						<div className='mt-3'>
							<Spin
								spinning={loading}
								delay={500}
							>
								<Table
									columns={columns}
									dataSource={dataTables}
									expandable={{
										expandedRowRender: expandRowRender,
										expandRowByClick: true,
										rowExpandable: () => true,
										expandedRowKeys: [rowSelected],
										expandIcon: () => <div />
									}}
									onRow={record => {
										return {
											onClick: () => {
												setRowSelected(record._id);
											}
										};
									}}
								/>
							</Spin>
						</div>
					</div>
				</div>
			</div>
			<Modal
				forceRender
				title='Thêm sản phẩm mới'
				open={openModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelModal}
			>
				<Spin
					spinning={isCreating}
					delay={500}
				>
					<Form
						name='basic'
						form={form}
						// onFinish={handleCreateProduct}
						labelCol={{ span: 4 }}
						labelAlign='left'
						wrapperCol={{ span: 20 }}
					>
						<Form.Item
							label='Tên hàng'
							name='name'
						>
							<input
								value={product.name}
								onChange={handleOnChange}
								name='name'
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>

						<Form.Item
							label='Loại sản phẩm'
							name='brand'
						>
							<div className='flex items-center gap-2 border-b-2 border-b-[#ccc] w-full px-2 py-1'>
								<ConfigProvider
									theme={{
										token: {
											colorBorder: '#fff',
											colorPrimaryHover: '#fff',
											controlOutline: '#fff',
											padding: '0 0'
										}
									}}
								>
									<Select
										name='type'
										value={product.brand}
										onChange={value =>
											setProduct({
												...product,
												brand: value
											})
										}
										options={renderOptions(
											typeProduct.data
										)}
										className='focus:outline-none focus:border-b-[#4bac4d]'
									/>
								</ConfigProvider>
								<Icon
									icon='ic:baseline-plus'
									height={19}
									className='hover:bg-[#ccc] hover:rounded-full cursor-pointer'
									onClick={() =>
										setIsAddNewType(!isAddNewType)
									}
								/>
							</div>
						</Form.Item>

						{isAddNewType && (
							<Form.Item
								label='Loại sản phẩm mới'
								name='newType'
							>
								<input
									value={product.newType}
									onChange={handleOnChange}
									name='newType'
									className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
								/>
							</Form.Item>
						)}

						<Form.Item
							label='Giá bán'
							name='price'
						>
							<input
								value={product.price}
								onChange={handleOnChange}
								name='price'
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/>
						</Form.Item>

						<Form.Item
							label='Ảnh sản phẩm'
							name='image'
						>
							<div>
								<Upload
									listType='picture-card'
									onChange={handleOnChangeImage}
									maxCount={1}
								>
									<Icon
										icon='material-symbols:upload'
										height={20}
									/>
								</Upload>
							</div>
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 16,
								span: 16
							}}
						>
							<button
								className='bg-primary p-2 font-semibold w-full rounded-md text-white'
								type='primary'
								onClick={handleCreateProduct}
							>
								Tạo sản phẩm mới
							</button>
						</Form.Item>
					</Form>
				</Spin>
			</Modal>

			<Modal
				forceRender
				title='Sửa sản phẩm'
				open={openUpdateModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelUpdateModal}
			>
				<Spin
					spinning={isUpdating}
					delay={500}
				>
					<Form
						name='basic2'
						form={form}
						onFinish={handleUpdateProduct}
						labelCol={{ span: 5 }}
						labelAlign='left'
						wrapperCol={{ span: 19 }}
					>
						<div className='flex items-center justify-center gap-3'>
							<div className='flex items-center justify-center mb-12'>
								{productDetail.image && (
									<img
										src={productDetail.image}
										alt='image-detail'
										style={{
											width: '200px',
											height: '200px',
											borderRadius: '8px',
											objectFit: 'contain'
										}}
									/>
								)}
							</div>
							<div className='flex-1 items-center justify-center '>
								<Form.Item
									label='Tên hàng'
									name='name'
								>
									<input
										value={productDetail.name}
										onChange={handleOnChangeDetails}
										name='name'
										className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
									/>
								</Form.Item>

								<Form.Item
									label='Loại sản phẩm'
									name='brand'
								>
									<ConfigProvider
										theme={{
											token: {
												colorBorder: '#fff',
												colorPrimaryHover: '#fff',
												controlOutline: '#fff',
												padding: '0 0'
											}
										}}
									>
										<Select
											name='type'
											value={productDetail.brand}
											onChange={value =>
												setProductDetail({
													...productDetail,
													brand: value
												})
											}
											options={renderOptions(
												typeProduct.data
											)}
											className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
										/>
									</ConfigProvider>
									{/* <input
								value={product.brand}
								onChange={handleOnChange}
								name='brand'
								className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
							/> */}
								</Form.Item>

								<Form.Item
									label='Giá bán'
									name='price'
								>
									<input
										value={productDetail.price}
										onChange={handleOnChangeDetails}
										name='price'
										className='border-b-2 border-b-[#ccc] w-full px-2 py-1 focus:outline-none focus:border-b-[#4bac4d]'
									/>
								</Form.Item>

								<Form.Item
									label='Ảnh sản phẩm'
									name='image'
								>
									<div>
										<Upload
											listType='picture-card'
											onChange={handleOnChangeImageDetail}
											maxCount={1}
										>
											<Icon
												icon='material-symbols:upload'
												height={20}
											/>
										</Upload>
									</div>
								</Form.Item>

								<Form.Item
									wrapperCol={{
										offset: 16,
										span: 16
									}}
								>
									<button
										className='bg-green-800 p-2 font-semibold w-full rounded-md text-white'
										type='primary'
									>
										Cập nhật
									</button>
								</Form.Item>
							</div>
						</div>
					</Form>
				</Spin>
			</Modal>

			<Modal
				forceRender
				title='Xóa hàng hóa'
				open={openDeleteModal}
				onCancel={() => setOpenDeleteModal(false)}
				footer={null}
			>
				<Spin
					delay={400}
					spinning={isDeleting}
				>
					<div className='flex flex-col'>
						<span className='pt-2 pb-4 text-lg'>
							Sản phẩm sẽ bị xóa hoàn toàn trong hệ thống <br />
							Bạn có chắc chắn muốn xóa
						</span>
						<div className='flex text-right justify-end items-baseline gap-2'>
							<button
								onClick={() => handleDeleteProduct(rowSelected)}
								className='p-3 bg-[#db4e65] text-white font-semibold rounded-md flex items-center gap-1'
							>
								<Icon
									icon='material-symbols:check-box'
									height={18}
								/>
								Xác nhận
							</button>

							<button
								onClick={() => setOpenDeleteModal(false)}
								className='p-3 bg-[#898c8d] text-white font-semibold rounded-md flex items-center gap-1'
							>
								<Icon
									icon='ion:ban-outline'
									height={18}
								/>
								Bỏ qua
							</button>
						</div>
					</div>
				</Spin>
			</Modal>
		</div>
	);
};

export default ManageProductPage;
