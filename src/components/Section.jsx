/* eslint-disable react/prop-types */
const Section = props => {
	const { title, sectionCardItems } = props;
	return (
		<section className='bg-[#f0f2f5] w-full'>
			<div className='py-[3.2rem] max-w-7xl mx-auto px-4'>
				<h1 className='text-center font-bold text-2xl mb-10'>
					{title}
				</h1>

				<div className='flex items-center flex-col lg:flex-row justify-between gap-3'>
					{sectionCardItems?.map(item => (
						<div
							className='w-full h-fit p-6 rounded-2xl flex items-center flex-col gap-2 bg-white'
							key={item?.cardTitle}
						>
							{item?.cardImage && (
								<img
									src={item?.cardImage}
									alt='card-image'
									width={72}
									height={72}
									loading='lazy'
									className='mb-6'
								/>
							)}
							<h4 className='text-lg font-semibold'>
								{item?.cardTitle}
							</h4>
							<div className='flex flex-col'>
								<h4 className='text-base text-center'>
									{item?.cardSubtitle}
								</h4>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Section;
