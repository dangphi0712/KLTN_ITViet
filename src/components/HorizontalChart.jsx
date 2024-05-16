/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const HorizontalChart = ({ allOrder }) => {
	const productSales = {};
	allOrder?.forEach(item => {
		item.orderItems.forEach(orderItem => {
			if (!productSales[orderItem.name]) {
				productSales[orderItem.name] = 0;
			}
			productSales[orderItem.name] += orderItem.amount * orderItem.price; // Tính tổng tiền bán được cho từng sản phẩm
		});
	});

	const sortProducts = Object.keys(productSales).sort(
		(a, b) => productSales[b] - productSales[a]
	);

	const productLabels = sortProducts.slice(0, 10);
	const productTotalPrices = productLabels.map(
		product => productSales[product]
	);

	return (
		<Bar
			data={{
				labels: productLabels,
				datasets: [
					{
						label: 'Top sản phẩm bán chạy',
						data: productTotalPrices,
						fill: false,
						backgroundColor: '#064FF0',
						borderColor: '#064FF0',
						barThickness: 30
					}
				]
			}}
			options={{
				indexAxis: 'y', // Chỉ định trục y là trục chính
				plugins: {
					legend: {
						display: false
					}
				}
			}}
		/>
	);
};

export default HorizontalChart;
