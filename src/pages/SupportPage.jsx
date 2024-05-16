import { menuSupport, sectionSupport, sectionSupport2 } from "../constants";
import { Icon } from '@iconify/react';


const SupportPage = () => {
    return (
        <>
            <div className="pt-[58px]"></div>
            <div className="bg-[#f0f2f5]">
                <div className="bg-primary  mt-2">
                    <div className="max-w-7xl mx-auto py-[3.2rem]">
                        <h1 className="text-3xl font-bold text-white text-center pb-8">Chào mừng bạn đến với trang hỗ trợ của KiotViet</h1>
                        <div class='max-w-2xl mx-auto'>
                            <div class="relative flex items-center w-full h-12 rounded-3xl focus-within:shadow-lg bg-white overflow-hidden">
                                <div class="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                    type="text"
                                    id="search"
                                    placeholder="Chúng tôi có thể giúp bạn như thế nào?" />
                            </div>
                        </div>
                        <h1 className="text-white text-center font-semibold pt-8">Gọi tổng đài chăm sóc khách hàng 1900 6522 để được phục vụ 365 ngày/năm từ 7:00 đến 22:00</h1>
                    </div>
                </div >

                <div className="bg-primary/5 rounded-b-[120px]">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl mx-auto py-[3.2rem] gap-2">
                        {menuSupport.map((item, idx) => (
                            <div
                                key={idx}
                                className="text-center p-3 cursor-pointer hover:bg-white hover:rounded-2xl mb-2 hover:boxShadowSupport"

                            >
                                <Icon
                                    icon={item.icon}
                                    className='text-primary bg-primary/10 p-5 rounded-3xl mx-auto mb-[10px]'
                                    height={70}
                                />

                                <h1 className="">
                                    {item.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-[3.2rem] max-w-6xl mx-auto">
                    <h1 className="font-bold text-3xl text-center pb-[3.2rem]">Hướng dẫn theo chủ đề</h1>
                    <div className="flex gap-6 flex-col lg:flex-row">
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport.first.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="text-orange-500"
                                        height={60}
                                    />
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport.second.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="text-primary"
                                        height={60}
                                    />
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport.third.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className="text-green-500"
                                        height={60}
                                    />
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-[3.2rem] max-w-7xl mx-auto">
                    <h1 className="font-bold text-3xl text-center pb-[3.2rem]">Wiki ITViet - Khái niệm trong kinh doanh bán lẻ</h1>
                    <div className="flex gap-6 flex-col lg:flex-row">
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport2.first.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport2.second.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport2.third.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-white rounded-xl p-6">
                            {sectionSupport2.fourth.map((item, idx) => (
                                <div
                                    key={idx}
                                >
                                    <div className="font-bold text-xl py-2">{item.title}</div>
                                    {item.subtitle.map((item, idx) => (
                                        <div
                                            key={idx}
                                        >
                                            <div className="py-2 cursor-pointer hover:text-primary">{item.sub}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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
            </div>

        </>
    );
}

export default SupportPage;
