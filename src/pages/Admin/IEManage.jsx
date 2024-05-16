/* eslint-disable react-hooks/rules-of-hooks */
import { Icon } from '@iconify/react';
import { Table } from 'antd';
import { useState } from 'react';

const ieManagePage = () => {
	const columns = [
		{
			title: 'Mã nguyên liệu',
			dataIndex: 'id'
		},
		{
			title: 'Tên nguyên liệu',
			dataIndex: 'name'
		},
		{
			title: 'Nhà cung cấp',
			dataIndex: 'supplier'
		},
		{
			title: 'Tồn kho',
			dataIndex: 'stock'
		}
	];
	// column Nhập
	const columnsInput = [
		{
			title: 'Mã nhập',
			dataIndex: 'id'
		},
		{
			title: 'Ngày nhập',
			dataIndex: 'date'
		},
		{
			title: 'Tên nguyên liệu',
			dataIndex: 'name'
		},
		{
			title: 'Nhà cung cấp',
			dataIndex: 'supplier'
		},
		{
			title: 'Số lượng',
			dataIndex: 'amount'
		}
	];
	// column Xuất
	const columnsOutput = [
		{
			title: 'Mã xuất',
			dataIndex: 'id'
		},
		{
			title: 'Ngày xuất',
			dataIndex: 'date'
		},
		{
			title: 'Tên nguyên liệu',
			dataIndex: 'name'
		},
		{
			title: 'Số lượng',
			dataIndex: 'amount'
		}
	];

	const dataTables = [
		{
			key: 1,
			id: 'NL001',
			name: 'Cà phê Phin',
			supplier: 'Trung Nguyên',
			stock: '10'
		},
		{
			key: 2,
			id: 'NL002',
			name: 'Sữa đặc',
			supplier: 'Ngôi sao Phương Nam',
			stock: '5'
		},
		{
			key: 3,
			id: 'NL003',
			name: 'Sữa tươi không đường',
			supplier: 'Vinamilk',
			stock: '5'
		},
		{
			key: 4,
			id: 'NL004',
			name: 'Trà nhài',
			supplier: 'Lạt Sơn',
			stock: '5'
		},
		{
			key: 5,
			id: 'NL005',
			name: 'Rich',
			supplier: 'Lạt Sơn',
			stock: '10'
		},
		{
			key: 6,
			id: 'NL006',
			name: 'Base',
			supplier: 'Lạt Sơn',
			stock: '10'
		},
		{
			key: 7,
			id: 'NL007',
			name: 'Bột Matcha',
			supplier: 'Lạt Sơn',
			stock: '2'
		},
		{
			key: 8,
			id: 'NL008',
			name: 'Trà túi lọc',
			supplier: 'Lạt Sơn',
			stock: '3'
		},
		{
			key: 9,
			id: 'NL009',
			name: 'Sirup Đào',
			supplier: 'Monin',
			stock: '4'
		},
		{
			key: 10,
			id: 'NL010',
			name: 'Sữa chua không đường',
			supplier: 'Vinamilk',
			stock: '3'
		},
		{
			key: 11,
			id: 'NL011',
			name: 'Bột sữa',
			supplier: 'Lạt Sơn',
			stock: '1'
		},
		{
			key: 12,
			id: 'NL012',
			name: 'Trân châu đen',
			supplier: 'Lạt Sơn',
			stock: '5'
		},
		{
			key: 13,
			id: 'NL013',
			name: 'Trân châu trắng 3Q',
			supplier: 'Lạt Sơn',
			stock: '5'
		},
		{
			key: 14,
			id: 'NL014',
			name: 'Đào lon',
			supplier: 'Lạt Sơn',
			stock: '5'
		},
		{
			key: 15,
			id: 'NL015',
			name: 'Bột Cheese',
			supplier: 'Lạt Sơn',
			stock: '1'
		}
	];
	// data Nhập
	const dataTablesInput = [
		{
			key: 1,
			id: 'N001',
			date: '17/04/2024',
			name: 'Cà phê Phin',
			supplier: 'Trung Nguyên',
			amount: '20'
		},
		{
			key: 2,
			id: 'N002',
			date: '17/04/2024',
			name: 'Sữa đặc',
			supplier: 'Ngôi sao Phương Nam',
			amount: '10'
		},
		{
			key: 3,
			id: 'N003',
			date: '17/04/2024',
			name: 'Sữa tươi không đường',
			supplier: 'Vinamilk',
			amount: '10'
		},
		{
			key: 4,
			id: 'N004',
			date: '17/04/2024',
			name: 'Trà nhài',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 5,
			id: 'N005',
			date: '17/04/2024',
			name: 'Rich',
			supplier: 'Lạt Sơn',
			amount: '10'
		},
		{
			key: 6,
			id: 'N006',
			date: '17/04/2024',
			name: 'Base',
			supplier: 'Lạt Sơn',
			amount: '10'
		},
		{
			key: 7,
			id: 'N007',
			date: '17/04/2024',
			name: 'Bột Matcha',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 8,
			id: 'N008',
			date: '17/04/2024',
			name: 'Trà túi lọc',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 9,
			id: 'N009',
			date: '17/04/2024',
			name: 'Sirup Đào',
			supplier: 'Monin',
			amount: '5'
		},
		{
			key: 10,
			id: 'N010',
			date: '17/04/2024',
			name: 'Sữa chua không đường',
			supplier: 'Vinamilk',
			amount: '5'
		},
		{
			key: 11,
			id: 'N011',
			date: '17/04/2024',
			name: 'Bột sữa',
			supplier: 'Lạt Sơn',
			amount: '3'
		},
		{
			key: 12,
			id: 'N012',
			date: '17/04/2024',
			name: 'Trân châu đen',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 13,
			id: 'N013',
			date: '17/04/2024',
			name: 'Trân châu trắng 3Q',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 14,
			id: 'N014',
			date: '17/04/2024',
			name: 'Đào lon',
			supplier: 'Lạt Sơn',
			amount: '5'
		},
		{
			key: 15,
			id: 'N015',
			date: '17/04/2024',
			name: 'Bột Cheese',
			supplier: 'Lạt Sơn',
			amount: '3'
		}
	];
	// data Xuất
	const dataTablesOutput = [
		{
			key: 1,
			id: 'X001',
			date: '17/04/2024',
			name: 'Cà phê Phin',
			amount: '2'
		},
		{
			key: 2,
			id: 'X002',
			date: '17/04/2024',
			name: 'Sữa đặc',
			amount: '3'
		},
		{
			key: 3,
			id: 'X003',
			date: '17/04/2024',
			name: 'Sữa tươi không đường',
			amount: '2'
		},
		{
			key: 4,
			id: 'X004',
			date: '17/04/2024',
			name: 'Trà nhài',
			amount: '2'
		},
		{
			key: 5,
			id: 'X005',
			date: '17/04/2024',
			name: 'Rich',
			amount: '5'
		},
		{
			key: 6,
			id: 'X006',
			date: '17/04/2024',
			name: 'Base',
			amount: '5'
		},
		{
			key: 7,
			id: 'X007',
			date: '17/04/2024',
			name: 'Bột Matcha',
			amount: '1'
		},
		{
			key: 8,
			id: 'X008',
			date: '17/04/2024',
			name: 'Trà túi lọc',
			amount: '1'
		},
		{
			key: 9,
			id: 'X009',
			date: '17/04/2024',
			name: 'Sirup Đào',
			amount: '1'
		},
		{
			key: 10,
			id: 'X010',
			date: '17/04/2024',
			name: 'Sữa chua không đường',
			amount: '2'
		},
		{
			key: 11,
			id: 'X011',
			date: '17/04/2024',
			name: 'Bột sữa',
			amount: '1'
		},
		{
			key: 12,
			id: 'X012',
			date: '17/04/2024',
			name: 'Trân châu đen',
			amount: '1'
		},
		{
			key: 13,
			id: 'X013',
			date: '17/04/2024',
			name: 'Trân châu trắng 3Q',
			amount: '1'
		},
		{
			key: 14,
			id: 'X014',
			date: '17/04/2024',
			name: 'Đào lon',
			amount: '2'
		},
		{
			key: 15,
			id: 'X015',
			date: '17/04/2024',
			name: 'Bột Cheese',
			amount: '1'
		}
	];

	const [checked, setChecked] = useState('all');
	const handleOnChange = e => {
		setChecked(e.target.value);
	};
	return (
		<div className='w-full min-h-screen'>
			<div className='max-w-7xl mx-auto pt-5'>
				<div className='flex gap-4 '>
					<div className='min-w-[250px] flex flex-col gap-3'>
						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md'>
							<h3 className='px-3 font-semibold'>Tìm kiếm</h3>
							<div
								className='w-full mb-2'
								style={{ padding: '10px 12px 0' }}
							>
								<input
									type='text'
									placeholder='Nguyên liệu'
									className='w-full focus:outline-none border-b-2 border-b-[#bababa] pb-2'
								/>
							</div>
						</div>

						<div className='w-full bg-white flex flex-col justify-start py-2 rounded-md gap-2 '>
							<h3 className='px-3 font-semibold'>Bộ lọc</h3>
							<div
								className='w-full mb-2 flex flex-col gap-4 ml-3'
								style={{ padding: '10px 12px 0' }}
							>
								<div className='flex gap-1'>
									<input
										type='radio'
										id='all'
										name='input_radio'
										value='all'
										checked={checked === 'all'}
										onChange={handleOnChange}
									/>
									<label htmlFor='all'>Nguyên liệu</label>
								</div>
								<div className='flex gap-1'>
									<input
										type='radio'
										id='input'
										name='input_radio'
										value='input'
										checked={checked === 'input'}
										onChange={handleOnChange}
									/>
									<label htmlFor='input'>Nhập</label>
								</div>
								<div className='flex gap-1'>
									<input
										type='radio'
										id='output'
										name='input_radio'
										value='output'
										checked={checked === 'output'}
										onChange={handleOnChange}
									/>
									<label htmlFor='output'>Xuất</label>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col flex-1'>
						{/* Bảng Nguyên Liệu */}
						{checked === 'all' && (
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<span className='text-2xl font-bold'>
										Nguyên liệu
									</span>
									<div className='flex items-center gap-2'>
										<button className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'>
											<Icon icon='ic:baseline-plus' />
											Nhập
										</button>
										<button className='bg-green-600 text-white font-semibold text-base px-2 py-3 rounded-md flex items-center gap-1'>
											<Icon
												icon='clarity:export-solid'
												height={19}
											/>
											Xuất
										</button>
									</div>
								</div>

								<div className='mt-3'>
									<Table
										columns={columns}
										dataSource={dataTables}
									/>
								</div>
							</div>
						)}

						{/* Bảng Nhập */}
						{checked === 'input' && (
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<span className='text-2xl font-bold'>
										Nhập
									</span>
								</div>

								<div className='mt-3'>
									<Table
										columns={columnsInput}
										dataSource={dataTablesInput}
									/>
								</div>
							</div>
						)}
						{/* Bảng xuất */}

						{checked === 'output' && (
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<span className='text-2xl font-bold'>
										Xuất
									</span>
								</div>

								<div className='mt-3'>
									<Table
										columns={columnsOutput}
										dataSource={dataTablesOutput}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ieManagePage;
