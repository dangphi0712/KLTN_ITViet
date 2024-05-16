/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react/dist/iconify.js';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { convertPrice } from '../../utils';

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip
);

const ChartOwner = ({ allStore }) => {
	let tolal = 0;
	const options = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	const monthlyCounts = new Array(12).fill(0);
	allStore.forEach(item => {
		// Tạo một đối tượng ngày từ chuỗi createdAt của mỗi mục
		const createdAtDate = new Date(item.createdAt);
		// Lấy tháng từ ngày tạo
		const month = createdAtDate.getMonth();
		// Tăng số lượng mục cho tháng tương ứng
		monthlyCounts[month]++;
	});
	const labels = monthlyCounts.map((count, index) => {
		// Chuyển đổi index thành tên tháng (index bắt đầu từ 0)
		const monthName = new Date(2000, index).toLocaleString('en-US', {
			month: 'long'
		});
		return monthName;
	});

	const monthlyEarnings = new Array(12).fill(0);

	// Lặp qua mỗi mục trong mảng allStore
	allStore.forEach(item => {
		// Tạo một đối tượng ngày từ chuỗi createdAt của mỗi mục
		const createdAtDate = new Date(item.createdAt);
		// Tính toán ngày end bằng cách cộng thêm 3 tháng
		const endDate = new Date(createdAtDate);
		endDate.setMonth(endDate.getMonth() + 3);

		// Lấy tháng từ ngày tạo
		const month = createdAtDate.getMonth();
		// Tăng số lượng mục cho tháng tương ứng
		monthlyCounts[month]++;

		// Tính toán tiền dựa trên tiêu chí nhân với 720000
		const earning =
			270000 * (endDate.getMonth() - createdAtDate.getMonth());
		// Cộng vào tổng tiền của tháng
		monthlyEarnings[month] += earning;
		// tolal = monthlyEarnings[month] += earning;
		tolal += earning;
	});
	const currentDate = new Date();

	// Lọc ra các mục được tạo trong tháng mới nhất trong năm
	const newestMonth = currentDate.getMonth();
	const newestYear = currentDate.getFullYear();

	const newestMembers = allStore.filter(item => {
		const createdAtDate = new Date(item.createdAt);
		const itemMonth = createdAtDate.getMonth();
		const itemYear = createdAtDate.getFullYear();

		return itemMonth === newestMonth && itemYear === newestYear;
	});

	const data = {
		labels,
		datasets: [
			{
				type: 'bar',
				label: 'Tổng doanh thu theo tháng',
				Color: 'rgb(255, 99, 132)',
				fill: false,
				data: monthlyEarnings
			}
		]
	};

	return (
		<>
			<div className='p-4 flex gap-3 w-fullbg-[#f0f2f5]'>
				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white'>
					<Icon
						icon='mdi:human-male-male'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Tổng số người đăng ký</h1>
						<h1 className='font-bold'>{allStore.length}</h1>
					</div>
				</div>
				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white'>
					<Icon
						icon='carbon:sales-ops'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Tổng doanh thu</h1>
						<h1 className='font-bold'>{convertPrice(tolal)}</h1>
					</div>
				</div>
				<div className='w-[33%] h-fit flex p-4 shadow-lg rounded-lg bg-white'>
					<Icon
						icon='lets-icons:user-add'
						height={50}
						className='text-primary m-2'
					></Icon>
					<div className='px-4 text-lg'>
						<h1>Thành viên mới</h1>
						<h1 className='font-bold'>{newestMembers.length}</h1>
					</div>
				</div>
			</div>
			<div className='flex-1 p-4'>
				{/* Doanh thu */}
				<div className='w-full h-auto'>
					<Line
						options={options}
						data={data}
					/>
				</div>
			</div>
		</>
	);
};

export default ChartOwner;
