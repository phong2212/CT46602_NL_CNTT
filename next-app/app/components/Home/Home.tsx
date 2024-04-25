'use client'


import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image'
import React, { useState } from 'react'
import Carousel from '../Carousel/Carousel';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { arrowLeft, arrowRight, plane, people, star } from '@/app/utils/Icons';
import Link from 'next/link';

interface Destinations {
    id: string;
    name: string;
    imageURL: string;
}

function HomePage() {
    const { Asiadestinations, Randomdestinations, isLoading } = useGlobalState();
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        mode: "free-snap",
        slides: {
            perView: 4,
            spacing: 15,
        },
        created() {
            setLoaded(true);
        },
    });
    return (
        <div className='h-full caret-transparent'>

            <div className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{plane}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Khám phá địa điểm nổi bật tại châu Á
                            </h1>
                        </div>
                        <p className='mt-5 pr-20 text-justify'>
                            Trải nghiệm hấp dẫn tại các điểm đến đặc sắc ở châu Á, khám phá văn hóa, phong cảnh và ẩm thực độc đáo trên toàn lục địa này.
                        </p>
                    </div>
                    <Image
                        width={500}
                        height={100}
                        src={'/home/landscape.png'}
                        alt={'landscape'} />
                </div>
                {!isLoading ? (
                    <div ref={sliderRef} className="keen-slider mt-8">
                        {Asiadestinations.map((asia: Destinations, index: number) => (
                            <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>
                                <Carousel
                                    key={asia.id}
                                    id={asia.id}
                                    name={asia.name}
                                    imageURL={asia.imageURL}
                                />
                            </div>
                        ))}
                        {loaded && instanceRef.current && (
                            <>
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    className='join-item btn btn-base-200 absolute top-[5.2rem] z-10 left-2'>
                                    {arrowLeft}
                                </button>
                                <button
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    className='join-item btn btn-base-200 absolute top-[5.2rem] z-10 right-2'>
                                    {arrowRight}
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div>
                        <div className='flex flex-row justify-center items-center h-[18.75rem]'>
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div className=' w-2/3'>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{plane}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Một vài địa điểm khác bạn có thể thích
                            </h1>
                        </div>
                        <p className='mt-5 pr-40 text-justify'>
                            Khám phá những điểm đến độc đáo, từ bờ biển tới ngọn núi, mang đến trải nghiệm du lịch đa dạng và thú vị cho mọi người.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                    {Randomdestinations.map((random: Destinations) => (
                        <Link href={'/'} key={random.id} className="relative hover:bg-black duration-300 hover:rounded-lg">
                            <img src={random.imageURL} alt={random.name} className="w-full h-52 object-cover rounded-lg transition  hover:opacity-70" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-4 py-2 rounded-b-lg">
                                <p className="text-xl font-semibold">{random.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row items-start'>
                    <div className=' w-3/5'>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{people}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Về chúng tôi
                            </h1>
                        </div>
                        <p className='mt-5 pr-20 text-justify'>
                            Chúng tôi là một cộng đồng đam mê du lịch, cam kết nâng suất và phát triển bản thân thông qua việc khám phá thế giới. Với tinh thần đoàn kết, chúng tôi tạo nên một môi trường chia sẻ và hỗ trợ, thu hút thành viên từ khắp nơi trên thế giới. Bằng cách kết nối những người yêu thích du lịch, chúng tôi không chỉ mang lại trải nghiệm tuyệt vời mà còn tạo ra cơ hội học hỏi và giao lưu. Với mục tiêu khám phá và trải nghiệm những điểm đến mới, chúng tôi không ngừng mở rộng và phát triển cộng đồng của mình. Hãy cùng tham gia vào chúng tôi để khám phá thế giới và tạo ra những kỷ niệm đáng nhớ cùng nhau.
                        </p>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='flex flex-row items-center'>
                            <Image
                                width={100}
                                height={100}
                                src={'/home/productivity.png'}
                                alt={'landscape'} />
                            <p className='ml-8 text-xl text-sky-500 font-extrabold'>NÂNG SUẤT</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <Image
                                width={100}
                                height={100}
                                src={'/home/development.png'}
                                alt={'landscape'} />
                            <p className='ml-8 text-xl text-sky-500 font-extrabold'>PHÁT TRIỂN</p>
                        </div>
                        <div className='flex flex-row items-center mt-5'>
                            <Image
                                width={100}
                                height={100}
                                src={'/home/teamwork.png'}
                                alt={'landscape'} />
                            <p className='ml-8 text-xl text-sky-500 font-extrabold'>ĐOÀN KẾT</p>
                        </div>
                        <div className='flex flex-row items-center mt-5'>
                            <Image
                                width={100}
                                height={100}
                                src={'/home/around-the-world.png'}
                                alt={'landscape'} />
                            <p className='ml-8 text-xl text-sky-500 font-extrabold'>KHẮP THẾ GIỚI</p>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">

                </div>
            </div>

            <div className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row items-start'>
                    <div className=' w-3/5'>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{star}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Quyền lợi khi tham gia
                            </h1>
                        </div>
                        <p className='mt-5 pr-20 text-justify'>
                            Khám phá những quyền lợi đặc biệt khi tham gia cùng chúng tôi, từ ưu đãi đặc biệt đến trải nghiệm du lịch độc đáo và sự hỗ trợ toàn diện.
                        </p>
                    </div>
                </div>
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