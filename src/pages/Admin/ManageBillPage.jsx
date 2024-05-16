import { useEffect, useState } from 'react';
import * as OrderService from '../../services/order';
import { convertPrice, formatDate } from '../../utils';
import { Spin, Table } from 'antd';
import { Icon } from '@iconify/react';
import { useDebounce } from '../../hook/useDebounce';
import { useSelector } from 'react-redux';
import { Excel } from 'antd-table-saveas-excel';

const ManageBillPage = () => {
	const [loading, setLoading] = useState(false);
	const [allOrder, setAllOrder] = useState([]);
	const [value, setValue] = useState('');
	const user = useSelector(state => state?.user);
	const getAllOrder = async () => {
		try {
			setLoading(true);
			const res = await OrderService.getAllOrder(user?.id);
			setAllOrder(res.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getAllOrder();
	}, []);

	const column = [
		{
			title: 'Mã hóa đơn',
			dataIndex: '_id',
			filterSearch: true,
			onFilter: (value, record) => record._id.startWith(value),
			witdh: '30%'
		},
		{
			title: 'Giá tiền tạm tính',
			dataIndex: 'itemPrice'
		},
		{
			title: 'Giá tiền giảm giá',
			dataIndex: 'discountPrice'
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'totalPrice'
		},
		{
			title: 'Thời gian giao dịch',
			dataIndex: 'createdAt'
		}
	];

	const handleOnChange = e => {
		e.preventDefault();
		setValue(e.target.value);
	};

	const searchDebounce = useDebounce(value);

	let dataTables;

	if (searchDebounce.length > 0) {
		const filter = allOrder.filter(item => item._id.includes(value));
		dataTables = filter.map(item => {
			return {
				...item,
				itemPrice: convertPrice(item.itemPrice),
				discountPrice:
					item.discountPrice > 100
						? `${convertPrice(item.discountPrice)}đ`
						: `${item.discountPrice}%`,
				totalPrice: convertPrice(item.totalPrice),
				createdAt: formatDate(item.createdAt),
				key: item._id
			};
		});
	} else {
		dataTables = allOrder.map(item => {
			return {
				...item,
				itemPrice: convertPrice(item.itemPrice),
				discountPrice:
					item.discountPrice > 100
						? `${convertPrice(item.discountPrice)}đ`
						: `${item.discountPrice}%`,
				totalPrice: convertPrice(item.totalPrice),
				createdAt: formatDate(item.createdAt),
				key: item._id
			};
		});
	}

	const exportExcel = () => {
		const excel = new Excel();
		excel
			.addSheet('Danh sách hóa đơn')
			.addColumns(column)
			.addDataSource(dataTables, { str2Percent: true })
			.saveAs('DSHoadon.xlsx');
	};
	return (
		<>
			<div className='w-full min-h-screen h-full'>
				<div className='max-w-7xl mx-auto pt-5'>
					<div className='flex justify-between items-center'>
						<div className='my-2 w-[560px] relative'>
							<input
								type='text'
								placeholder='Tìm mã hóa đơn'
								className='w-full pl-3 py-2 rounded-2xl'
								value={value}
								onChange={handleOnChange}
							/>
							<Icon
								icon='tabler:search'
								height={22}
								className='absolute top-2 right-4'
							/>
						</div>

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
					<div className='mt-4 w-full'>
						<Spin
							delay={500}
							spinning={loading}
						>
							<Table
								columns={column}
								dataSource={dataTables}
							/>
						</Spin>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageBillPage;
