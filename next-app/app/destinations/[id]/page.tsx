'use client'

import { useGlobalState, useGlobalUpdate } from '@/app/context/globalProvider';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import anime from 'animejs';
import SearchDest from '../../components/Search/SearchDest';
import { location, plane, idCard, email, phone, address } from '@/app/utils/Icons';
import Link from 'next/link';

interface Destinations {
    id: string;
    name: string;
    imageURL: string;
}


const DetailDestPage = ({ params }: { params: { id: string } }) => {
    const { Randomdestinations, destination, getOneDest, isLoadingOneDest, isLoadingRandom } = useGlobalState();
    React.useEffect(() => {
        getOneDest(params.id);
    }, []);

    const { searchDest } = useGlobalUpdate();
    const [searchTerm, setSearchTerm] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        if (searchTerm.trim() === '') {
            toast.error('Vui lòng nhập từ khóa tìm kiếm.');
            return;
        }

        const searchElement = document.getElementById('search');
        if (searchElement) {
            searchElement.classList.remove('invisible');
        }
        searchDest(searchTerm);
        setSubmitted(true);
    };

    const handleButtonClick = (buttonText: string) => {
        setSearchTerm(buttonText);
        searchDest(buttonText);
        setSubmitted(true);
    };


    const textRef = React.useRef(null);


    React.useEffect(() => {
        anime({
            targets: textRef.current,
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 2000,
            delay: 800
        });
    }, []);


    return (
        <>
            <div className="bg-gray-900 caret-transparent relative">
                <Image
                    width="1980"
                    height="800"
                    src="/img/bg1.jpg"
                    alt="background3"
                    className="object-none object-right-center h-96 w-full"
                    priority={true}
                />
                <div className='absolute inset-0 bg-black opacity-20 w-full h-full'></div>
                <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center mt-20">
                    <p className="text-white text-3xl font-bold">Tìm kiếm địa điểm</p>
                    <form onSubmit={handleSearchSubmit}>
                        <label className="input input-bordered flex items-center gap-2 caret-black mt-10 w-full">
                            <input
                                type="text"
                                value={searchTerm}
                                className='grow w-24 md:w-auto'
                                onChange={handleSearchChange}
                                placeholder="Tìm kiếm địa điểm..."
                            />
                            <button type='submit' className='btn btn-sm btn-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </button>
                        </label>
                        <div className='flex flex-row justify-between items-center mt-10'>
                            <span className='text-white text-2xl font-bold'>Gợi ý:</span>
                            <button onClick={() => handleButtonClick('Châu Á')} className='btn btn-primary text-lg text-white font-bold ml-5'>Châu Á</button>
                            <button onClick={() => handleButtonClick('Châu Phi')} className='btn btn-primary text-lg text-white font-bold ml-5'>Châu Phi</button>
                            <button onClick={() => handleButtonClick('Châu Mỹ')} className='btn btn-primary text-lg text-white font-bold ml-5'>Châu Mỹ</button>
                            <button onClick={() => handleButtonClick('Châu Đại Dương')} className='btn btn-primary text-lg text-white font-bold ml-5'>Châu Đại Dương</button>
                            <button onClick={() => handleButtonClick('Việt Nam')} className='btn btn-primary text-lg text-white font-bold ml-5'>Việt Nam</button>
                        </div>
                    </form>
                </div>
            </div>

            {submitted && (
                <div id='search' className='caret-transparent'>
                    <SearchDest />
                </div>
            )}

            <div className='h-full caret-transparent'>
                <div className='grid grid-cols-3 gap-12 m-16'>
                    <div className='col-span-2 bg-base-200 px-16 py-12 rounded-badge drop-shadow-lg'>
                        <div className='flex flex-row justify-between items-center'>

                            {isLoadingOneDest ? (
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <span className='skeleton w-8 h-8 rounded-full shrink-0 mr-5'></span>
                                        <h1 className='skeleton h-8 w-52'> </h1>
                                    </div>
                                    <div className="skeleton h-52 w-96 mt-6"></div>
                                    <div className='mt-5'>
                                        <div className="skeleton h-7 w-52 mt-4"></div>
                                        <div className="skeleton h-7 w-96 mt-4"></div>
                                        <div className="skeleton h-7 w-96 mt-4"></div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='flex flex-row items-center'>
                                        <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{location}</span>
                                        <h1 className='text-3xl font-bold text-start text-sky-400'>
                                            {destination.name}
                                        </h1>
                                    </div>
                                    <div className='flex justify-center items-center mt-6'>
                                        <div className='relative rounded-2xl '>
                                            <div className='rounded-2xl overflow-hidden'>
                                                <img src={destination.imageURL} alt={destination.name} className='w-full h-full' />
                                            </div>
                                            <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-tr-lg rounded-bl-2xl text-white text-sm py-1 px-2'>
                                                {destination.city + ', ' + destination.country + ' thuộc ' + destination.continent}
                                            </div>
                                        </div>
                                    </div>
                                    <p className='mt-5 text-justify'>
                                        {destination.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div >
                    <div className='bg-base-200 px-8 py-12 rounded-badge drop-shadow-lg'>
                        <div className='flex flex-row justify-between items-center'>
                            <div>
                                <div className='flex flex-row items-center'>
                                    <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{idCard}</span>
                                    <h1 className='text-3xl font-bold text-start text-sky-400'>
                                        Liên hệ
                                    </h1>
                                </div>
                                <div className='flex flex-col mt-6 '>
                                    <div className='flex flex-row items-center'>
                                        <span className='text-lg text-bold'>{email}</span>
                                        <p className='ml-5 text-md '> wanderlust@gmail.com</p>
                                    </div >
                                    <div className='flex flex-row items-center mt-2'>
                                        <span className='text-lg text-bold'> {phone}</span>
                                        <p className='ml-5 text-md '>+84 999999999</p>
                                    </div>

                                    <div className='flex flex-row  mt-2'>
                                        <span className='text-lg text-bold'>  {address}</span>
                                        <p className='ml-5 text-md '>Khu II, Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</p>
                                    </div>
                                    <iframe className='rounded-2xl mt-5' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184420396!2d105.76804037469974!3d10.029933690077012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1714280254257!5m2!1svi!2s" width="370" height="250" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

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
            </div >

        </>
    )
}

export default DetailDestPage