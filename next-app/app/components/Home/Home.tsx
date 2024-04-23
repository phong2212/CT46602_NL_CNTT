import Image from 'next/image'
import React from 'react'

const HomePage = () => {
    return (
        <div className='h-full'>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-sky-400'>
                    Khám phá địa điểm nổi bật tại Châu Á
                </h1>

            </div>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-sky-400'>
                    Về chúng tôi
                </h1>

            </div>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-sky-400'>
                    Quyền lợi khi tham gia
                </h1>
                <ul className='flex flex-row justify-between mt-10'>
                    <li className='flex flex-col items-center'>
                        <Image width={800} height={800} src={'/home/places.png'} alt={'places'} className='w-28 drop-shadow-md' />
                        <p className='mt-5 text-xl text-gray-500'>Giải pháp du lịch hoàn thiện</p>
                    </li>
                    <li className='flex flex-col items-center'>
                        <Image width={800} height={800} src={'/home/price.png'} alt={'price'} className='w-28 drop-shadow-md' />
                        <p className='mt-5 text-xl text-gray-500'>Giá rẻ mỗi ngày</p>
                    </li>
                    <li className='flex flex-col items-center'>
                        <Image width={800} height={800} src={'/home/transaction.png'} alt={'transaction'} className='w-28 drop-shadow-md' />
                        <p className='mt-5 text-xl text-gray-500'>Thanh toán an toàn và linh hoạt</p>
                    </li>
                    <li className='flex flex-col items-center'>
                        <Image width={800} height={800} src={'/home/customer-service.png'} alt={'customer-service'} className='w-28 drop-shadow-md' />
                        <p className='mt-5 text-xl text-gray-500'>Hỗ trợ khách hàng 24/7</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default HomePage