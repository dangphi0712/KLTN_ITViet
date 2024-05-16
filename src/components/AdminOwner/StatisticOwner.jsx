/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react/dist/iconify.js';
import { Legend, Tooltip } from 'chart.js';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { convertPrice } from '../../utils';
import * as OrderService from '../../services/order';
import { useEffect, useState } from 'react';

const StatisticOwner = ({ allStore }) => {
	const [monthlyData, setMonthlyData] = useState([]);

	const [allOrderByStore, setAllOrderByStore] = useState([]);
	const [valueOption, setValueOption] = useState(
		allStore.length > 0 ? allStore[0].user : ''
	);

	const handleOnChange = e => {
		setValueOption(e.target.value);
	};

	const getAllOrderByStore = async () => {
		const res = await OrderService.getAllOrder(valueOption);
		setAllOrderByStore(res?.data);
	};

	const totalPrice = allOrderByStore.reduce(
		(acc, total) => acc + total.totalPrice,
		0
	);
	useEffect(() => {
		getAllOrderByStore();
	}, [valueOption]);
	useEffect(() => {
		// Tính tổng số tiền đơn hàng cho mỗi tháng
		const calculateMonthlyData = () => {
			const monthlyData = {};

			for (let i = 1; i <= 12; i++) {
				monthlyData[i.toString()] = 0;
			}

			allOrderByStore.forEach(order => {
				const createdAt = new Date(order.createdAt);
				const month = createdAt.getMonth() + 1; // Tháng tính từ 0 đến 11

				monthlyData[month.toString()] += order.totalPrice;
			});

			// Chuyển dữ liệu thành mảng để dễ dàng render
			const monthlyArray = Object.keys(monthlyData).map(key => ({
				month: key,
				totalSales: monthlyData[key]
			}));

			setMonthlyData(monthlyArray);
		};

		calculateMonthlyData();
	}, [allOrderByStore]);

	return (
		<>
			<div className='flex justify-between items-center gap-2 p-4'>
				<h1 className='text-xl font-semibold'>
					Thống kê chi tiết theo từng cửa hàng
				</h1>
				<div className='flex items-center gap-2'>
					<span className='font-semibold'>Chọn mã cửa hàng:</span>
					<select
						value={valueOption}
						onChange={handleOnChange}
						id='store'
						className='border border-black rounded-xl p-2'
					>
						{allStore.map(item => (
							<option
								value={item.user}
								key={item.user}
							>
								{item.user}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className='p-4 flex justify-around gap-3 w-fullbg-[#f0f2f5]'>
				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white border-2 border-black'>
					<Icon
						icon='mdi:human-male-male'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Tổng hóa đơn của cửa hàng</h1>
						<h1 className='font-bold'>{allOrderByStore.length}</h1>
					</div>
				</div>
				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white border-2 border-black'>
					<Icon
						icon='carbon:sales-ops'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Tổng doanh thu của cửa hàng</h1>
						<h1 className='font-bold'>
							{convertPrice(totalPrice)}
						</h1>
					</div>
				</div>

				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white border-2 border-black'>
					<Icon
						icon='lets-icons:ticket-fill'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Số tháng đăng ký từ cửa hàng</h1>
						<h1 className='font-bold'>3</h1>
					</div>
				</div>
			</div>
			<div className='p-4 '>
				<div className='w-full'>
					<BarChart
						width={1024}
						height={550}
						data={monthlyData}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='month' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar
							dataKey='totalSales'
							fill='#8884d8'
						/>
						<Bar
							dataKey='uv'
							fill='#82ca9d'
						/>
					</BarChart>
				</div>
			</div>
		</>
	);
};

export default StatisticOwner;
