/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React from 'react';

export const PrintOrder = React.forwardRef(({ allProduct }, ref) => {
	return (
		<div
			className='flex-col gap-2 '
			ref={ref}
		>
			<h1>Hệ thống ITViet</h1>
			<h3>Hóa đơn thanh toán</h3>
			<div>
				{allProduct?.map(item => (
					<div key={item.key}>
						<div>
							<span>Tên món:</span>
							<span>{item.name}</span>
						</div>
						<div>
							<span>Số lượng:</span>
							<span>{item.amount}</span>
						</div>
						<div>
							<span>Đơn giá:</span>
							<span>{item.price}</span>
						</div>
						<div>
							<span>Thành tiền:</span>
							<span>{item.price * item.amount}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
});
