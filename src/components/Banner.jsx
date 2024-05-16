/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import logoNoBg from '../assets/images/logo_nobg.png';
import config from '../config';
const Banner = props => {
	const { title, isHomeBanner = false, isSolutionPage = false } = props;
	const navigate = useNavigate();
	return (
		<>
			{isHomeBanner && (
				<div className='bg-gradient-to-r from-zinc-300 to-primary/55 w-full min-h-[80vh]'>
					<div className='max-w-7xl mx-auto'>
						<div className='flex h-screen flex-nowrap flex-col lg:flex-row gap-10 items-center'>
							<div className='flex flex-col items-center justify-center mt-36 lg:mt-0 gap-8 lg:w-[35%] w-full'>
								<h1 className='font-bold text-5xl leading-tight text-left'>
									Phần mềm
									<br />
									quản lý bán hàng
									<br />
									phổ biến nhất
								</h1>

								<div className='flex items-center gap-2 '>
									<button
										onClick={() =>
											navigate(config.routes.register)
										}
										className='px-5 py-3 text-base bg-primary text-white rounded-3xl font-semibold'
									>
										Dùng thử miễn phí
									</button>

									<button className='px-5 py-3 text-base bg-[#cce2fd] text-primary rounded-3xl font-semibold '>
										Khám phá
									</button>
								</div>
							</div>

							<div
								className='hidden lg:flex flex-1 items-center justify-center relative z-10'
								style={{
									backgroundImage: `url(${logoNoBg})`,
									backgroundPosition: 'center',
									backgroundSize: 'contain',
									backgroundRepeat: 'no-repeat',
									height: '280px',
									marginBottom: '40px'
								}}
							>
								<div className='absolute left-0 top-[-18%] w-fit'>
									<div
										className='flex items-center bg-white rounded-3xl px-4 py-2'
										style={{
											boxShadow:
												' 0 8px 24px 0 rgba(0,48,104,.04)'
										}}
									>
										<span className='w-14 h-14 flex items-center justify-center'>
											<img
												src={logo}
												alt='logo'
												width={45}
												height={45}
											/>
										</span>
										<span className='text-base font-semibold text-[#002249]'>
											Phần mềm quản lý bán hàng
										</span>
									</div>
								</div>

								<div className='absolute right-[-5%] top-[45%] w-fit'>
									<div
										className='flex items-center bg-white rounded-3xl px-4 py-2'
										style={{
											boxShadow:
												' 0 8px 24px 0 rgba(0,48,104,.04)'
										}}
									>
										<span className='w-14 h-14 flex items-center justify-center'>
											<img
												src={logo}
												alt='logo'
												width={45}
												height={45}
											/>
										</span>
										<span className='text-base font-semibold text-[#002249]'>
											Sàn kết nối nguồn hàng giá tốt
										</span>
									</div>
								</div>

								<div className='absolute left-[2%] bottom-[-50%] w-fit'>
									<div
										className='flex items-center bg-white rounded-3xl px-4 py-2'
										style={{
											boxShadow:
												' 0 8px 24px 0 rgba(0,48,104,.04)'
										}}
									>
										<span className='w-14 h-14 flex items-center justify-center'>
											<img
												src={logo}
												alt='logo'
												width={45}
												height={45}
											/>
										</span>
										<span className='text-base font-semibold text-[#002249]'>
											Giải pháp thanh toán và vay vốn
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{isSolutionPage && (
				<div className='pt-[65px]'>
					<div
						className='bg-cover h-[432px]'
						style={{
							backgroundImage:
								'url(https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2023/10/08114624/nha_bg.png)',
							backgroundRepeat: 'no-repeat'
						}}
					>
						<div className='h-[432px] flex items-center justify-center'>
							<div className='flex items-center flex-col gap-10 '>
								<h1 className='text-center text-6xl font-bold text-white'>
									{title}
								</h1>
								<div className='flex items-center gap-2 '>
									<button className='px-5 py-3 text-base bg-primary text-white rounded-3xl font-semibold'>
										Dùng thử miễn phí
									</button>

									<button className='px-5 py-3 text-base bg-[#cce2fd] text-primary rounded-3xl font-semibold '>
										Khám phá
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Banner;
