import { Icon } from '@iconify/react';
import Section from '../components/Section';
import { sectionCardItems } from '../constants';
import Banner from '../components/Banner';

const HomePage = () => {
	return (
		<>
			<Banner
				title={'Phần mềm quản lý bán hàng phổ biến nhất'}
				isHomeBanner={true}
			/>
			<Section
				title={'Giúp bạn quản lý dễ dàng, bán hàng hiệu quả'}
				sectionCardItems={sectionCardItems}
			/>


			<section className='bg-white w-full'>
				<div className='max-w-7xl mx-auto px-4 p-[3.2rem]'>
					<h1 className='text-center font-bold text-2xl mb-10'>
						Chúng tôi thiết kế phần mềm chuyên biệt cho từng ngành
						hàng
					</h1>
					<div className='flex items-center flex-col lg:flex-row justify-between gap-3'>
						<div className='w-full h-fit p-6 rounded-2xl flex items-center flex-col gap-2'>
							<p className='font-extrabold items-center flex gap-4 text-xl pb-4'>
								<div className='bg-slate-300 w-[50px] h-[50px] flex justify-center items-center rounded-xl'>
									<Icon
										icon='fa6-solid:store'
										className='text-primary '
										height={30}
									></Icon>
								</div>
								<h1 className='text-blue-900'>
									Bán buôn, bán lẻ
								</h1>
							</p>
							<div className='flex-col flex w-full'>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='game-icons:clothes'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Thời trang
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='ic:twotone-local-grocery-store'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Tạp hóa & Siêu thị
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='gridicons:phone'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Điện thoại & Điện máy
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='icon-park-outline:boy-stroller'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Mẹ & Bé
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='mi:book'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Sách & Văn phòng phẩm
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='solar:cosmetic-linear'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Mỹ phẩm
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='jam:tools'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Sản xuất
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='fluent:food-grains-20-regular'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Nông sản & Thực phẩm
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='fa-regular:plus-square'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Khác
									</h4>
								</div>
							</div>
						</div>
						<div className='w-full h-fit p-6 rounded-2xl flex items-center flex-col gap-2'>
							<p className='font-extrabold items-center flex gap-4 text-xl pb-4 '>
								<div className='bg-slate-300 w-[50px] h-[50px] flex justify-center items-center rounded-xl'>
									<Icon
										icon='fluent-emoji-high-contrast:cup-with-straw'
										className='text-primary'
										height={30}
									></Icon>
								</div>
								<h1 className='text-blue-900'>
									Ăn uống, giải trí
								</h1>
							</p>
							<div className='flex-col flex w-full'>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='uil:restaurant'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Nhà hàng
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='maki:restaurant-noodle'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Quán ăn
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='ep:milk-tea'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Cà phê, Trà sữa
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='f7:music-mic'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Karaoke
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='mdi:billiards'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Bida
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='carbon:bar'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Bar, Pub & Club
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='ic:outline-fastfood'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Căng tin
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='icon-park-outline:resting'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Trạm dừng chân
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='fa-regular:plus-square'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Khác
									</h4>
								</div>
							</div>
						</div>
						<div className='w-full h-fit p-6 rounded-2xl flex items-center flex-col gap-2'>
							<p className='font-extrabold items-center flex gap-4 text-xl pb-4'>
								<div className='bg-slate-300 w-[50px] h-[50px] flex justify-center items-center rounded-xl'>
									<Icon
										icon='mdi:human-male-male'
										className='text-primary'
										height={30}
									></Icon>
								</div>
								<h1 className='text-blue-900'>
									Lưu trú,làm đẹp
								</h1>
							</p>
							<div className='flex-col flex w-full'>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='solar:star-fall-outline'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Beauty Spa
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='tabler:massage'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Massage
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='mingcute:hair-2-line'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Hair Salon & Nail
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='icon-park-outline:hotel'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Khách sạn & Nhà nghỉ
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='icon-park-outline:homestay'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Homestay
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='material-symbols:holiday-village-outline'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Villa, Resort
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='ion:fitness-outline'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Fitness & Yoga
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='mingcute:hospital-line'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Phòng khám
									</h4>
								</div>
								<div className='flex items-center gap-2 border-t-2 p-3 hover:bg-primary/10'>
									<Icon
										icon='fa-regular:plus-square'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Khác
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-[#f0f2f5] w-full'>
				<div className='max-w-7xl mx-auto px-4 p-[3.2rem]'>
					<h1 className='text-center font-bold text-2xl mb-10'>
						<span className='text-primary'>ITViet </span>
						- Giải pháp kinh doanh toàn diện
					</h1>
					<div className='flex items-center flex-col lg:flex-row justify-between gap-3'>
						<div className='w-full h-[256px] p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<h4 className='text-lg font-semibold'>
								Phần mềm quản lý bán hàng phổ biến nhất với 20+
								ngành hàng
							</h4>
							<div className='flex-col flex '>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Đơn giản quản lý hàng hóa, nhân sự
									</h4>
								</span>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Dễ dàng truy cập báo cáo, theo dõi tăng
										trưởng doanh thu
									</h4>
								</span>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Tối ưu quản lý bán hàng đa kênh
									</h4>
								</span>
								<span className='flex items-center gap-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Nâng cao chất lượng vận hành
									</h4>
								</span>
							</div>
						</div>
						<div className='w-full h-[256px] p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<h4 className='text-lg font-semibold'>
								Sàn kết nối nguồn hàng giá tốt dành cho nhà bán
								hàng
							</h4>
							<div className='flex-col flex '>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										40.000+ mặt hàng đa dạng
									</h4>
								</span>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Nguồn hàng giá tốt từ 1.000+ nhà bán sỉ
										trên toàn quốc
									</h4>
								</span>
								<span className='flex items-baseline gap-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Có ngay khách hàng tiềm năng khi lên sàn
										giúp tăng trưởng doanh số
									</h4>
								</span>
							</div>
						</div>
						<div className='w-full h-[256px] p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<h4 className='text-lg font-semibold'>
								Giải pháp thanh toán - Vay vốn uy tín dành cho
								chủ shop
							</h4>
							<div className='flex-col flex'>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Tích hợp thanh toán QR
									</h4>
								</span>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>
										Hỗ trợ vay vốn từ các đối tác tài chính
										uy tín (KBank, Easy Credit...)
									</h4>
								</span>
								<span className='flex items-center gap-2 mb-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='flex-1'>Nhanh chóng</h4>
								</span>
								<div className='flex items-center gap-2'>
									<Icon
										icon='teenyicons:tick-circle-outline'
										className='text-primary'
									/>
									<h4 className='text-base text-left'>
										Tiện lợi
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-white w-full'>
				<div className='max-w-6xl mx-auto px-4 p-[3.2rem]'>
					<h1 className='text-center font-bold text-2xl mb-10'>
						<span className='text-primary'>Giải pháp </span>
						bán hàng online hiệu quả
					</h1>
					<div className='items-center flex-col lg:flex-row justify-between '>
						<div className='w-full h-auto rounded-2xl items-center flex bg-[#F2FBF5] mb-10 flex-col lg:flex-row'>
							<img
								loading='lazy'
								src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/06034247/Ban-hang-Online-1.png'
								alt=''
								width={400}
								height={400}
								className='py-8 p-12'
							/>
							<div className='p-12'>
								<h1 className='text-xl font-bold mb-4'>
									Đồng bộ với các sàn thương mại điện tử
								</h1>
								<h2 className='text-base text-gray-700'>
									ITViet đem đến giải pháp quản lý bán hàng dễ dàng & hiệu quả trên các sàn TMĐT phổ biến nhất hiện nay như Tiki,
									Shopee, Lazada, TikTok Shop, Sendo... Quản lý tập trung nhiều gian hàng trên một giao diện,
									tự động đồng bộ tồn kho - giá bán, tiết kiệm thời gian, đơn đi bạt ngàn.
								</h2>
							</div>
						</div>

						<div className='w-full h-auto rounded-2xl items-center flex bg-[#F2F8FE] mb-10 flex-col lg:flex-row'>
							<div className='p-12'>
								<h1 className='text-xl font-bold mb-4'>
									Có ngay một website cho riêng cửa hàng của bạn chỉ với 1 lần chạm
								</h1>
								<h2 className='text-base text-gray-700'>
									Bạn có thể tạo ra một website cho riêng cửa hàng của bạn với giao diện đa dạng và phù hợp với nhiều ngành hàng.
									ITViet giúp cửa hàng của bạn có thể bán hàng online thật dễ dàng, đơn giản và không chịu chi phí hoa hồng.
								</h2>
							</div>
							<img
								loading='lazy'
								src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/06034315/Image-5.png'
								alt=''
								width={400}
								height={400}
								className='py-8 p-12'
							/>
						</div>

						<div className='w-full h-auto rounded-2xl items-center flex bg-[#FFF2F2] mb-10 flex-col lg:flex-row'>
							<img
								loading='lazy'
								src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/06034238/Image-1-1.png'
								alt=''
								width={400}
								height={400}
								className='py-8 p-12'
							/>
							<div className='p-12'>
								<h1 className='text-xl font-bold mb-4'>
									Liên kết quản lý bán hàng trên Facebook
								</h1>
								<h2 className='text-base text-gray-700'>
									ITViet cung cấp giải pháp quản lý & bán hàng trên Fanpage Facebook tiện lợi và nhanh chóng,
									đáp ứng đầy đủ nhu cầu của hàng triệu chủ shop kinh doanh online thuộc tất cả mọi ngành hàng.
								</h2>
							</div>
						</div>

						<div className='w-full h-auto rounded-2xl items-center flex bg-[#FFF9F2] mb-10 flex-col lg:flex-row'>
							<div className='p-12'>
								<h1 className='text-xl font-bold mb-4'>
									Giải pháp giao hàng dễ dàng
								</h1>
								<h2 className='text-base text-gray-700'>
									Tích hợp với hầu hết các hãng vận chuyển trên thị trường như Giaohangnhanh, ViettelPost, VNPT Post, J&T…
									KiotViet mang lại cho khách hàng một dịch vụ thuận tiện và chi phí vô cùng tiết kiệm với nhiều chính sách ưu đãi của các hãng vận chuyển.
								</h2>
							</div>
							<img
								loading='lazy'
								src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/06034256/Image-2-1.png'
								alt=''
								width={400}
								height={400}
								className='py-8 p-12'
							/>
						</div>
					</div>
				</div>
			</section>


			<section className='bg-[#f0f2f5] w-full '>
				<div className='max-w-7xl mx-auto px-4 p-[3.2rem] '>
					<h1 className='text-center font-bold text-2xl mb-10'>
						Hãy để ITViet đồng hành kinh doanh cùng bạn
					</h1>
					<div className='flex items-center flex-col lg:flex-row justify-between gap-3'>
						<div className='w-full h-44 p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<div className='flex-col flex'>
								<div className='flex items-center gap-2'>
									<Icon
										icon='ic:baseline-phone'
										className='text-primary'
									/>
									<h4 className='text-base text-left font-bold'>
										Hotline
									</h4>
								</div>
								<div className='flex items-center gap-2'>
									<h4 className='text-base text-left'>
										Tư vấn khách hàng:
									</h4>
									<h4 className='text-base text-primary'>
										1800 1111
									</h4>
								</div>
								<div className='flex items-center gap-2'>
									<h4 className='text-base text-left'>
										Chăm sóc khách hàng:
									</h4>
									<h4 className='text-base text-primary'>
										1900 2222
									</h4>
								</div>
								<div className='flex items-center gap-2'>
									<h4 className='text-base text-left'>
										Hoạt động 365 ngày/năm từ 7:00 đến 22:00
										kể cả ngày nghỉ lễ, tết.
									</h4>
								</div>
							</div>
						</div>
						<div className='w-full h-44 p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<div className='flex-col flex'>
								<div className='flex items-center gap-2'>
									<Icon
										icon='bi:chat-text-fill'
										className='text-primary'
									/>
									<h4 className='text-base font-bold'>
										ITViet Fanpage
									</h4>
								</div>
								<div className='flex items-center gap-2 mt-4'>
									<h4 className='text-base text-left'>
										Luôn trả lời các thông tin nhanh nhất
										thông qua các phản hồi trên Facebook.
									</h4>
								</div>
							</div>
						</div>
						<div className='w-full h-44 p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<div className='flex-col flex'>
								<div className='flex items-center gap-2 *:'>
									<Icon
										icon='mingcute:youtube-fill'
										className='text-primary'
									/>
									<h4 className='text-base text-left font-bold'>
										Kênh hỗ trợ Youtube
									</h4>
								</div>
								<div className='flex items-center gap-2'>
									<h4 className='text-base text-left'>
										Luôn cập nhật các kiến thức sử dụng phần
										mềm tức thời, trực quan giúp người dùng
										sử dụng được KiotViet dễ dàng và hiệu
										quả nhất.
									</h4>
								</div>
							</div>
						</div>
						<div className='w-full h-44 p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'>
							<div className='flex-col flex'>
								<div className='flex items-center gap-2 *:'>
									<Icon
										icon='wpf:chat'
										className='text-primary'
									/>
									<h4 className='text-base text-left font-bold'>
										Chat trên web & mobile
									</h4>
								</div>
								<div className='flex items-center gap-2'>
									<h4 className='text-base text-left mt-4'>
										Luôn có người trực chat để trả lời câu
										hỏi của các bạn nhanh và hiệu quả nhất
										suốt 365 ngày/năm.
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
