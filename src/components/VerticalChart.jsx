/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';

const VerticalChart = ({ allOrder }) => {
	const groupedData = {};
	allOrder?.forEach(item => {
		const date = item.createdAt.split('T')[0];
		if (!groupedData[date]) {
			groupedData[date] = 0;
		}
		groupedData[date] += item.totalPrice;
	});
	const today = new Date();
	const labels = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		const formattDate = date.toISOString().split('T')[0];
		labels.unshift(formattDate);
	}
	const totalPriceData = labels.map(date => groupedData[date] || 0);

	return (
		<>
			<Bar
				data={{
					labels: labels,
					datasets: [
						{
							label: 'Thống kê theo ngày',
							data: totalPriceData,
							fill: false,
							backgroundColor: '#064FF0',
							borderColor: '#064FF0',
							barThickness: '50'
						}
					]
				}}
				options={{
					elements: {
						line: {
							tension: 0.1
						}
					},
					plugins: {
						title: {
							text: 'Thống kê theo ngày'
						}
					}
				}}
			/>
		</>
	);
};

export default VerticalChart;
