import { Icon } from '@iconify/react';

const Footer = () => {
	return (
		<footer>
			<div className='bg-black/85'>
				<div className='max-w-7xl pt-10 mx-auto w-full flex flex-col px-4 text-white'>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-x-7 mb-6 cursor-pointer'>
						<div className=' pb-2'>
							<ul className='mb-0 list-none'>
								<li>
									<div className='cursor-pointer flex items-center gap-1'>
										<img
											src='../src/assets/images/logo.png'
											alt='logo'
											width={35}
											height={35}
											loading='lazy'
										/>
										<span className='text-xl font-bold text-white'>
											Viet
										</span>
									</div>
								</li>
								<li className='font-medium'>
									Công ty Cổ phần Công nghệ ITVIET
								</li>
								<li>Hotline: 0243 990 4991</li>
								<li>
									Trụ sở chính: 254 Nguyễn Văn Linh, Quận
									Thanh Khê, Thành phố Đà Nẵng, Việt Nam
								</li>
							</ul>
						</div>
						<div className='pb-2'>
							<ul className='mb-0 list-none'>
								<li>
									<h1 className='text-green-500 font-semibold'>
										DOANH NGHIỆP
									</h1>
								</li>
								<li>
									<p className='hover:underline'>Về ITVIET</p>
								</li>
								<li>
									<p className='hover:underline'>
										Khách Hàng
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Điều khoản & Chính sách sử dụng
									</p>
								</li>
								<li>
									<p className='hover:underline'>Liên hệ</p>
								</li>
								<li>
									<p className='hover:underline flex gap-2'>
										Email:
										<h4 className='text-primary'>
											hotro@itviet.com
										</h4>
									</p>
								</li>
							</ul>
						</div>
						<div className=' pb-2'>
							<ul className='mb-0 list-none'>
								<li>
									<h1 className='text-green-500 font-semibold'>
										HỖ TRỢ
									</h1>
								</li>
								<li>
									<p className='hover:underline'>
										Video hướng dẫn sử dụng
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Câu hỏi thường gặp
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Wiki ITVIET
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Hướng dẫn sử dụng
									</p>
								</li>
								<li>
									<p className='hover:underline'>Blog</p>
								</li>
								<li>
									<p className='hover:underline'>
										Thông tin cập nhật ITVIET
									</p>
								</li>
							</ul>
						</div>
						<div className=' pb-2'>
							<ul className='mb-0 list-none'>
								<li>
									<h2 className='text-green-500'>
										Tư vấn bán hàng
									</h2>
								</li>
								<li>
									<p className='hover:underline font-semibold text-2xl'>
										1800 1111
									</p>
								</li>
								<li>
									<h2 className='text-green-500'>
										Chăm sóc khách hàng
									</h2>
								</li>
								<li>
									<p className='hover:underline font-semibold text-2xl'>
										1900 2222
									</p>
								</li>
							</ul>
						</div>
					</div>

					<div className='text-left'>
						<h1 className='text-green-500 font-semibold'>
							NGÀNH HÀNG
						</h1>
					</div>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-7'>
						<div className='mb-6 pr-6'>
							<ul className='mb-0 list-none'>
								<li>
									<p className='hover:underline'>
										Thời trang
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Điện thoại & Điện máy
									</p>
								</li>
								<li>
									<p className='hover:underline'>Mẹ & Bé</p>
								</li>
								<li>
									<p className='hover:underline'>
										Sách & Văn phòng phẩm
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Tạp hóa & Siêu thị
									</p>
								</li>
							</ul>
						</div>
						<div className='mb-6'>
							<ul className='mb-0 list-none'>
								<li>
									<p className='hover:underline'>Mỹ phẩm</p>
								</li>
								<li>
									<p className='hover:underline'>Sản xuất</p>
								</li>
								<li>
									<p className='hover:underline'>
										Nông sản & Thực phẩm
									</p>
								</li>
								<li>
									<p className='hover:underline'>Khác</p>
								</li>
							</ul>
						</div>
						<div className='mb-6'>
							<ul className='mb-0 list-none'>
								<li>
									<p className='hover:underline'>Nhà hàng</p>
								</li>
								<li>
									<p className='hover:underline'>Quán ăn</p>
								</li>
								<li>
									<p className='hover:underline'>
										Cafe, Trà sữa
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Karaoke, Bida
									</p>
								</li>
								<li>
									<p className='hover:underline'>
										Bar, Pub & Club
									</p>
								</li>
							</ul>
						</div>
						<div className='mb-6'>
							<ul className='mb-0 list-none'>
								<li>
									<p className='hover:underline'>Căng tin</p>
								</li>
								<li>
									<p className='hover:underline'>
										Trạm dừng nghỉ
									</p>
								</li>
								<li>
									<p className='hover:underline'>Khác</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center text-white font-semibold bg-primary/75 p-2 text-center w-full'>
					<div className='flex items-center gap-2 '>
						<h1 className='mx-5'>2024 ITVIET</h1>
						<Icon
							icon='ph:copyright-bold'
							height={27}
						></Icon>
						<h1 className='pr-5'>
							Copyright 2024 ITVIET Corporation. All Right
							Reserved
						</h1>
						<div className='flex gap-2 items-center'>
							<Icon
								icon='cib:facebook'
								className='hover:cursor-pointer'
							></Icon>
							<Icon
								icon='mdi:gmail'
								className='hover:cursor-pointer'
								height={21}
							></Icon>
							<Icon
								icon='cib:youtube'
								className='hover:cursor-pointer'
								height={21}
							></Icon>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
