'use client'


import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import Carousel from '../Carousel/Carousel';
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import { useInView } from 'react-intersection-observer';
import anime from "animejs/lib/anime.es.js";
import { arrowLeft, arrowRight, plane, people, star } from '@/app/utils/Icons';
import Link from 'next/link';
import Card from '../Card/Card';

interface Destinations {
    id: string;
    name: string;
    imageURL: string;
}

interface Blogs {
    id: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    imageURL: string;
}

interface Users {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
}


function HomePage() {
    const { users, Asiadestinations, Randomdestinations, recentblogs, isLoadingRecent, isLoadingAsia, isLoadingRandom } = useGlobalState();
    const [loaded, setLoaded] = useState(false);
    const ksOptions: KeenSliderOptions = {
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
    }
    const [sliderRef, instanceRef] = useKeenSlider(ksOptions);

    React.useEffect(() => {
        instanceRef.current?.update(ksOptions);
    }, [Asiadestinations]);

    const textRefs = useRef(Array.from({ length: 5 }).map(() => useRef(null)));
    const [triggered, setTriggered] = useState(Array.from({ length: 5 }).fill(false));

    const animateText = (index: any) => {
        anime({
            targets: textRefs.current[index].current,
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: 200
        });
    };

    const [ref1, inView1] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const [ref2, inView2] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const [ref3, inView3] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const [ref4, inView4] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    const [ref5, inView5] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    React.useEffect(() => {
        if (inView1 && !triggered[0]) {
            animateText(0);
            setTriggered((prev) => [...prev.slice(0, 0), true, ...prev.slice(0)]);
        }
    }, [inView1, triggered]);

    React.useEffect(() => {
        if (inView2 && !triggered[1]) {
            animateText(1);
            setTriggered((prev) => [...prev.slice(0, 1), true, ...prev.slice(1)]);
        }
    }, [inView2, triggered]);

    React.useEffect(() => {
        if (inView3 && !triggered[2]) {
            animateText(2);
            setTriggered((prev) => [...prev.slice(0, 2), true]);
        }
    }, [inView3, triggered]);

    React.useEffect(() => {
        if (inView4 && !triggered[3]) {
            animateText(3);
            setTriggered((prev) => [...prev.slice(0, 3), true]);
        }
    }, [inView4, triggered]);

    React.useEffect(() => {
        if (inView4 && !triggered[4]) {
            animateText(4);
            setTriggered((prev) => [...prev.slice(0, 4), true]);
        }
    }, [inView5, triggered]);

    return (
        <div className='h-full caret-transparent'>

            <div ref={ref1} className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                <div ref={textRefs.current[0]} className='flex flex-row justify-between items-center opacity-0'>
                    <div>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{plane}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Khám phá các địa điểm nổi bật tại châu Á
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
                {isLoadingAsia ? (
                    <div ref={sliderRef} className="keen-slider mt-8">
                        <div className='keen-slider__slide number-slide1 skeleton w-32 h-52 '></div>
                        <div className='keen-slider__slide number-slide2 skeleton w-32 h-52 ml-5'></div>
                        <div className='keen-slider__slide number-slide3 skeleton w-32 h-52 ml-5'></div>
                        <div className='keen-slider__slide number-slide4 skeleton w-32 h-52 ml-5'></div>
                    </div>
                ) : (
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
                                        instanceRef.current?.prev()
                                    }
                                    className='join-item btn btn-base-200 absolute top-[5.2rem] z-10 left-2'>
                                    {arrowLeft}
                                </button>
                                <button
                                    onClick={(e: any) =>
                                        instanceRef.current?.next()
                                    }
                                    className='join-item btn btn-base-200 absolute top-[5.2rem] z-10 right-2'>
                                    {arrowRight}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div ref={ref2} className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div ref={textRefs.current[1]} className=' w-2/3 opacity-0'>
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
                {isLoadingRandom ? (
                    < div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="skeleton w-full h-52"></div>
                        <div className="skeleton w-full h-52"></div>
                        <div className="skeleton w-full h-52"></div>
                        <div className="skeleton w-full h-52"></div>
                        <div className="skeleton w-full h-52"></div>
                        <div className="skeleton w-full h-52"></div>
                    </div>
                ) : (
                    < div className="grid grid-cols-3 gap-4 mt-8">
                        {Randomdestinations.map((random: Destinations) => (
                            <Link href={'/destinations/' + random.id} key={random.id} className="relative hover:bg-black duration-300 hover:rounded-lg">
                                <img src={random.imageURL} alt={random.name} className="w-full h-52 object-cover rounded-lg transition  hover:opacity-70" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-4 py-2 rounded-b-lg">
                                    <p className="text-xl font-semibold">{random.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div ref={ref3} className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                <div className='flex flex-row justify-between items-center'>
                    <div ref={textRefs.current[2]} className=' w-2/3  opacity-0'>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{plane}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Khám phá các bài viết gần đây
                            </h1>
                        </div>
                        <p className='mt-5 pr-20 text-justify'>
                            Khám phá cộng đồng du lịch: Những hành trình, lời khuyên và trải nghiệm đáng chú ý.
                        </p>
                    </div>
                </div>
                {isLoadingRecent ? (
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        <div className='skeleton w-68 h-96 '></div>
                        <div className='skeleton w-68 h-96'></div>
                        <div className='skeleton w-68 h-96'></div>
                        <div className='skeleton w-68 h-96'></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {recentblogs.map((recent: Blogs) => {
                            const authorUser = users.find((user: Users) => user.clerkId === recent.authorId);
                            return (
                                <Card
                                    key={recent.id}
                                    id={recent.id}
                                    author={authorUser ? `${authorUser.firstName} ${authorUser.lastName}` : 'Unknown'}
                                    title={recent.title}
                                    content={recent.content}
                                    createdAt={recent.createdAt}
                                    imageURL={recent.imageURL}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            <div ref={ref4} className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div ref={textRefs.current[3]} className='flex flex-row items-start opacity-0'>
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
            </div>

            <div ref={ref5} className='bg-base-200 p-16 m-16 rounded-badge drop-shadow-lg'>
                <div ref={textRefs.current[4]} className='opacity-0'>
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
        </div >
    )
}

export default HomePage