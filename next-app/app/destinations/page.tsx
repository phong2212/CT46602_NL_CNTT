'use client'

import { useGlobalUpdate } from '@/app/context/globalProvider';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import DestinationsPage from '../components/Destinations/Destinations';
import anime from 'animejs';
import SearchDest from '../components/Search/SearchDest';



const destinations = () => {
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
                    src="/img/bg3.jpg"
                    alt="background3"
                    className="object-none object-bottom h-96 w-full"
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

            <DestinationsPage />
        </>
    );
}

export default destinations