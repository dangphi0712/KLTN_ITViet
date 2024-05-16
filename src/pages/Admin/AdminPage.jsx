import { useEffect, useState } from 'react';
import ChartAdmin from '../../components/Admin/ChartAdmin';
import * as OrderService from '../../services/order';
import { useSelector } from 'react-redux';

const AdminPage = () => {
	const [allOrder, setAllOrder] = useState([]);
	const user = useSelector(state => state?.user);
	const getAllOrder = async () => {
		const res = await OrderService.getAllOrder(user?.id);
		setAllOrder(res.data);
	};
	useEffect(() => {
		getAllOrder();
	}, [user?.id]);
	return (
		<>
			<ChartAdmin allOrder={allOrder} />
		</>
	);
};

export default AdminPage;
