import { Icon } from '@iconify/react';
import Banner from '../components/Banner';
import { useParams } from 'react-router-dom';
const SolutionPage = () => {
	const { id } = useParams();
	return (
		<>
			<Banner
				title={`Phần mềm quản lý ${id}`}
				isSolutionPage={true}
			/>

			<div className='max-w-6xl mx-auto px-4 py-[3.2rem]'>
				<div className='items-center flex-col lg:flex-row justify-between '>
					<div className='w-full h-auto rounded-2xl items-center flex bg-[#F2F8FE] mb-10 flex-col lg:flex-row'>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100217/pub1.png'
							alt=''
							width={400}
							height={400}
							className='py-8 p-12'
						/>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Quản lý quy trình Phục vụ - Thu ngân - Bếp chuẩn
								xác, thuận lợi
							</h1>
							<h2 className='text-lg text-gray-700'>
								Theo dõi hoạt động, thao tác thông báo giữa các
								bên phục vụ, thu ngân, quầy bar/bếp thuận tiện
								và kịp thời.
							</h2>
						</div>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#F7F8F9] mb-10 flex-col lg:flex-row'>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Tiết kiệm tối đa thời gian phục vụ
							</h1>
							<h2 className='text-lg text-gray-700'>
								Phục vụ khách gọi món thông qua Mobile, Tablet
								chuyên nghiệp, dễ dàng thêm/bớt topping... đáp
								ứng mọi nhu cầu trong giờ cao điểm.
							</h2>
						</div>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100228/pub2.png'
							alt=''
							width={400}
							height={400}
							className='py-8 p-12'
						/>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#FFF2F2] mb-10 flex-col lg:flex-row'>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100240/pub3.png'
							alt=''
							width={400}
							height={400}
							className='py-8 p-12'
						/>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Thanh toán nhanh, giảm thiểu thất thoát
							</h1>
							<h2 className='text-lg text-gray-700'>
								Hỗ trợ thu ngân thanh toán nhanh trong giờ cao
								điểm, giảm thiểu nhầm lẫn. Tất cả thao tác của
								nhân viên đều được lưu trữ rõ ràng, dễ dàng tra
								cứu khi cần thiết.
							</h2>
						</div>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#F2FBF5] mb-10 flex-col lg:flex-row'>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Hỗ trợ quầy Bar/Bếp điều phối chế biến
							</h1>
							<h2 className='text-lg text-gray-700'>
								Tích hợp máy in bếp thông báo gọi món. Màn hình
								in bếp hiển thị tức thời tất cả món ăn được yêu
								cầu chế biến từ bồi bàn hoặc khách hàng.
							</h2>
						</div>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100252/pub4.png'
							alt=''
							width={400}
							height={400}
							className='py-8 p-12'
						/>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#F7F8F9] mb-10 flex-col lg:flex-row'>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100304/pub5.png'
							alt=''
							width={400}
							height={400}
							className='py-8 p-12'
						/>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Đặt bàn, đặt chỗ từ xa một cách dễ dàng
							</h1>
							<h2 className='text-lg text-gray-700'>
								Phần mềm hỗ trợ quản lý phòng bàn chuyên nghiệp,
								kiểm tra nhanh bàn nào còn trống, bàn nào đã có
								khách... hoặc đặt bàn sẵn theo nhu cầu của
								khách.
							</h2>
						</div>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#F2F8FE] mb-10 flex-col lg:flex-row'>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Quản lý chấm công và tính lương nhân viên
							</h1>
							<h2 className='text-lg text-gray-700'>
								KiotViet kết nối và đồng bộ tự động với máy chấm
								công, lưu trữ toàn bộ dữ liệu như giờ đến, giờ
								về, ngày nghỉ... và tự động tính toán lương,
								thưởng cho từng nhân viên.
							</h2>
						</div>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100321/pub6.png'
							alt=''
							width={400}
							height={400}
							className='py-8 pr-12'
						/>
					</div>

					<div className='w-full h-auto rounded-2xl items-center flex bg-[#FFF2F2] mb-10 flex-col lg:flex-row'>
						<img
							loading='lazy'
							src='https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08100336/pub7.png'
							alt=''
							width={400}
							height={400}
							className='py-8 pl-12'
						/>
						<div className='p-12'>
							<h1 className='text-2xl font-bold mb-4'>
								Bứt tốc doanh thu vượt trội với Menu điện tử
							</h1>
							<h2 className='text-lg text-gray-700'>
								Dễ dàng khởi tạo, tùy chỉnh Menu điện tử dễ dàng
								trong vòng 30 giây, không chịu chi phí hoa hồng.
								Đơn hàng đồng bộ tức thời về KiotViet POS, tối
								ưu chi phí, nhân sự cho người bán.
							</h2>
						</div>
					</div>
				</div>
			</div>
			<div className='max-w-7xl mx-auto px-4 pb-[6.4rem]'>
				<div className='flex items-center flex-col lg:flex-row gap-5'>
					<div className='w-full h-[320px] p-6 rounded-2xl flex flex-col gap-3 bg-[#F2FBF5]'>
						<Icon
							icon='tabler:router'
							height={50}
							className='bg-green-100 text-green-500 p-3 rounded-2xl text-left'
						></Icon>
						<h1 className='font-semibold text-xl'>
							Bán hàng mượt mà ngay cả khi Internet mất kết nối
						</h1>
						<h2 className='text-gray-700'>
							Khi cửa hàng gặp sự cố mất mạng Internet, hoạt động
							bán hàng vẫn diễn ra bình thường. Nhờ công nghệ điện
							toán đám mây, dữ liệu được lưu giữ và đồng bộ khi
							kết nối Internet hoạt động trở lại.
						</h2>
					</div>

					<div className='w-full h-[320px] p-6 rounded-2xl flex flex-col gap-3 bg-[#FFF9F2]'>
						<Icon
							icon='material-symbols:print-outline'
							height={50}
							className='bg-orange-100 text-orange-500 p-3 rounded-2xl text-left'
						></Icon>
						<h1 className='font-semibold text-xl'>
							Xuất hóa đơn điện tử ngay trên máy bán hàng
						</h1>
						<h2 className='text-gray-700'>
							Sử dụng máy quét hoặc điện thoại thông minh tìm kiếm
							hàng hóa có mã vạch giúp kiểm kho nhanh chóng, chính
							xác, hạn chế tối đa thất thoát sản phẩm.
						</h2>
					</div>

					<div className='w-full h-[320px] p-6 rounded-2xl flex flex-col gap-3 bg-[#F2F8FE]'>
						<Icon
							icon='iconamoon:scanner-bold'
							height={50}
							className='bg-blue-100 text-blue-500 p-3 rounded-2xl text-left'
						></Icon>
						<h1 className='font-semibold text-xl'>
							Tích hợp mọi thiết bị phần cứng hiện đại nhất
						</h1>
						<h2 className='text-gray-700'>
							Phần mềm chạy mượt mà trên mọi nền tảng thiết bị như
							Mobile, Tablet, Windows, IOS hay Android, đáp ứng
							trọn vẹn nhu cầu của mọi quy mô quán.
						</h2>
					</div>
				</div>
			</div>

			<section className='bg-[#f0f2f5] w-full '>
				<div className='max-w-7xl mx-auto px-4 py-[3.2rem] '>
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

export default SolutionPage;
