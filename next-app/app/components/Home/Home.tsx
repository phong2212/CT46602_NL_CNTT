'use client'


import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image'
import React from 'react'

interface Destinations {
    id: string;
    name: string;
    description: string;
    continent: string;
    country: string;
    city: string;
    imageURL: string;
}

function HomePage() {
    const { Asiadestinations, currentPageAsia, totalPagesAsia, setCurrentPageAsia, isLoading } = useGlobalState();

    const goToNextPage = () => {
        if (currentPageAsia < totalPagesAsia) {
            setCurrentPageAsia(currentPageAsia + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageAsia > 1) {
            setCurrentPageAsia(currentPageAsia - 1);
        }
    };

    return (
        <div className='h-full'>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-sky-400'>
                    Khám phá địa điểm nổi bật tại châu Á
                </h1>
                {!isLoading ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-10">
                        {Asiadestinations.map((asia: Destinations) => (
                            <div key={asia.id} className="flex justify-center items-center">
                                <img src={asia.imageURL} alt={asia.name} className="w-full max-w-full h-[15rem]" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-row justify-center items-center h-[17.5rem]'>
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    </div>
                )}
                <div className='join flex justify-center mt-5 '>
                    <button className='join-item btn' onClick={goToPreviousPage} disabled={currentPageAsia <= 1}>Trước</button>
                    <span className='join-item btn'>{currentPageAsia} </span>
                    <button className='join-item btn' onClick={goToNextPage} disabled={currentPageAsia >= totalPagesAsia}>Sau</button>
                </div>
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