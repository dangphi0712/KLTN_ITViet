/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { convertPrice } from '../../utils';
import { Tabs } from 'antd';
import VerticalChart from '../VerticalChart';
import HorizontalChart from '../HorizontalChart';
import { useEffect, useState } from 'react';
const ChartAdmin = ({ allOrder }) => {
	const items = [
		{
			key: '1',
			label: 'Theo ngày',
			children: <VerticalChart allOrder={allOrder} />
		},
		{
			key: '2',
			label: 'Theo tháng',
			children: 'Content of Tab Pane 3'
		},
		{
			key: '3',
			label: 'Theo năm',
			children: 'Content of Tab Pane 3'
		}
	];
	const date = new Date();
	const [dailyOrders, setDailyOrders] = useState([]);
	const [sumOrders, setSumOrders] = useState(0);

	const orders = allOrder.filter(
		item =>
			item.createdAt.split('T')[0] === date.toISOString().split('T')[0]
	);

	useEffect(() => {
		setDailyOrders(orders);
	}, [allOrder]);

	useEffect(() => {
		const totalPrice = dailyOrders.reduce(
			(acc, order) => acc + order.totalPrice,
			0
		);
		setSumOrders(totalPrice);
	}, [dailyOrders]);

	return (
		<div className='max-w-7xl mx-auto pt-5'>
			<div className='bg-white w-full p-4 rounded-xl'>
				<h1 className='uppercase text-base font-semibold'>
					kết quả bán hôm nay
				</h1>

				<div className='flex gap-3 items-center justify-between mt-4'>
					<div className='flex items-center gap-2'>
						<Icon
							icon='material-symbols:monetization-on'
							height={42}
							className='text-primary'
						/>
						<div className='flex flex-col gap-2 ml-4'>
							<span className='text-[#28b44f] font-semibold text-base'>
								Số đơn đã hoàn thành
							</span>
							<span className='text-slate-700 text-base font-semibold'>
								{dailyOrders.length} đơn đã xong
							</span>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<div className='rounded-full bg-primary flex items-center justify-center w-12 h-12'>
							<Icon
								icon='carbon:product'
								height={42}
								className='text-white'
							/>
						</div>
						<div className='flex flex-col gap-2 ml-4'>
							<span className='text-[#28b44f] font-semibold text-base'>
								Tổng tiền đơn hôm nay
							</span>
							<span className='text-primary text-2xl font-semibold'>
								{convertPrice(sumOrders)}
								<sup>đ</sup>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-white w-full p-4 rounded-xl mt-5'>
				<h1 className='uppercase text-base font-semibold'>Doanh số</h1>

				<Tabs items={items} />
			</div>

			<div className='bg-white w-full p-4 rounded-xl mt-5'>
				<h1 className='uppercase text-base font-semibold'>
					Top sản phẩm bán chạy
				</h1>

				<HorizontalChart allOrder={allOrder} />
			</div>
		</div>
	);
};

export default ChartAdmin;
