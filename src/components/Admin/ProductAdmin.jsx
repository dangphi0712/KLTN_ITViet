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

const ProductAdmin = () => {
	const initial = () => ({
		name: '',
		image: '',
		brand: '',
		category: '',
		price: '',
		newType: ''
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
	const [category, setCategory] = useState([]);
	const [rowSelected, setRowSelected] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
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
			newType: ''
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
			newType: ''
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
	const createProductApi = async data => {
		const { name, image, brand, price, category } = data;
		const res = await ProductService.createProduct({
			name,
			image,
			brand,
			price,
			category
		});
		setDataCreateProduct(res);
	};
	// create product
	const handleCreateProduct = () => {
		const params = {
			name: product.name,
			image: product.image,
			brand: isAddNewType ? product.newType : product.brand,
			price: product.price,
			category: product.category
		};
		createProductApi(params);
	};

	useEffect(() => {
		if (dataCreateProduct.status === 'OK') {
			message.success('Thêm sản phẩm thành công');
			getProductList();
			handleCancelModal();
		}
		if (dataCreateProduct.status === 'ERR') {
			message.error('Thêm sản phẩm không thành công');
		}
	}, [dataCreateProduct.status]);

	const getProductList = async () => {
		let res = {};
		setLoading(true);
		try {
			if (searchValue.length > 0) {
				res = await ProductService.getProductList(4, searchValue);
			} else {
				res = await ProductService.getProductList();
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
				handleCancelUpdateModal();
				getProductList();
			} else {
				message.error('Sửa sản phẩm thất bại');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsUpdating(false);
		}
	};

	const getProductDetail = async id => {
		const res = await ProductService.getDetailProduct(id);
		setProductDetail(res.data);
	};
	const getAllType = async () => {
		const res = await ProductService.getAllType();
		setTypeProduct(res);
	};

	const getAllCategory = async () => {
		const res = await ProductService.getAllCategory();
		setCategory(res);
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
		getProductList();
	}, [searchValue, dataUpdateProduct]);
	useEffect(() => {
		getAllType();
		getAllCategory();
	}, []);

	const handleOpenModal = type => {
		if (type === 'update') {
			setOpenUpdateModal(true);
		} else {
			setOpenUpdateModal(false);
			setOpenDeleteModal(true);
		}
	};

	const renderAction = () => {
		return (
			<div
				className='text-center ml-3 hover:text-red-600 cursor-pointer'
				onClick={() => handleOpenModal('delete')}
			>
				<Icon
					icon='material-symbols:delete-outline'
					height={20}
				/>
			</div>
		);
	};
	const columns = [
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
		},
		{
			title: 'Nhóm cửa hàng',
			dataIndex: 'category'
		},
		{
			title: 'Action',
			dataIndex: 'action',
			render: renderAction
		}
	];
	const dataTables =
		allProduct?.length > 0 &&
		allProduct?.map(item => {
			return { ...item, price: convertPrice(item.price), key: item._id };
		});
	return (
		<div className='w-full h-screen'>
			<div className='max-w-7xl mx-auto pt-5'>
				<div className='flex gap-4 '>
					<div className='min-w-[284px] flex flex-col gap-3'>
						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md'>
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

						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md'>
							<h3 className='px-3 font-semibold'>Loại hàng</h3>

							{category?.data?.map((item, idx) => (
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

								<button className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'>
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
									onRow={record => {
										return {
											onClick: () => {
												setRowSelected(record._id);
												setOpenUpdateModal(true);
											}
										};
									}}
								/>
							</Spin>
							{rowSelected && <span>{rowSelected}</span>}
						</div>
					</div>
				</div>
			</div>
			<Modal
				title='Thêm sản phẩm mới'
				open={openModal}
				footer={null}
				className='max-w-[880px] min-w-[785px]'
				onCancel={handleCancelModal}
			>
				<Form
					form={form}
					onFinish={handleCreateProduct}
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
						label='Loại thực đơn'
						name='brand'
					>
						<div className='flex items-center gap-2 border-b-2 border-b-[#ccc] w-full px-2 py-1 '>
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
										setProduct({ ...product, brand: value })
									}
									options={renderOptions(typeProduct.data)}
									className='focus:outline-none focus:border-b-[#4bac4d]'
								/>
							</ConfigProvider>
							<Icon
								icon='ic:baseline-plus'
								height={19}
								className='hover:bg-[#ccc] hover:rounded-full cursor-pointer'
								onClick={() => setIsAddNewType(true)}
							/>
						</div>
					</Form.Item>

					{isAddNewType && (
						<Form.Item
							label='Loại thực đơn mới'
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
						label='Loại hàng'
						name='category'
					>
						<div className='flex items-center gap-2 border-b-2 border-b-[#ccc] w-full px-2 py-1 '>
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
									value={product.category}
									onChange={value =>
										setProduct({
											...product,
											category: value
										})
									}
									options={renderOptions(category.data)}
									className='focus:outline-none focus:border-b-[#4bac4d]'
								/>
							</ConfigProvider>
							<Icon
								icon='ic:baseline-plus'
								height={19}
								className='hover:bg-[#ccc] hover:rounded-full cursor-pointer'
							/>
						</div>
					</Form.Item>

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
						>
							Submit
						</button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
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
									label='Loại thực đơn'
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
									label='Loại hàng'
									name='category'
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
											name='category'
											value={productDetail.category}
											onChange={value =>
												setProductDetail({
													...productDetail,
													category: value
												})
											}
											options={renderOptions(
												category.data
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
				title='Xóa hàng hóa'
				open={openDeleteModal}
				onCancel={() => setOpenDeleteModal(false)}
				footer={null}
			>
				<div className='flex flex-col gap-2 '>
					<span>
						Sản phẩm sẽ bị xóa hoàn toàn trong hệ thống <br />
						Bạn có chắc chắn muốn xóa
					</span>
					<button className='flex  p-3 bg-red-700 text-white items-center text-center'>
						Xác nhận
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default ProductAdmin;
