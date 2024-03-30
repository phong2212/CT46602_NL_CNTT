'use client'

import React, { useState } from 'react'
import DestItem from '../DestItem/DestItem';
import { plus } from '@/app/utils/Icons';
import { useGlobalState, useGlobalUpdate } from '../../context/globalProvider';


interface Props {
    title: string;
}

interface Destinations {
    id: string;
    name: string;
    description: string;
    continent: string;
    country: string;
    city: string;
    imageURL: string;
}

function Dest({ title }: Props) {
    const { destinations, currentPage, totalPages, setCurrentPage } = useGlobalState();
    const { allDests } = useGlobalUpdate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        allDests(1, searchTerm);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='p-2 w-full bg-gray-800 border-2 border-solid border-gray-600 rounded-2xl overflow-hidden caret-transparent'>
            <div className='flex flex-row justify-between my-5 mx-5'>
                <h1 className='relative text-2xl font-extrabold'>{title}</h1>
                <form onSubmit={handleSearchSubmit}>
                    <div className='form-control flex flex-row'>
                        <input
                            type="text"
                            value={searchTerm}
                            className='input input-bordered w-24 md:w-auto'
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm..."
                        />
                        <button type='submit' className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </form>

                <button className='btn btn-accent'>{plus} Thêm địa điểm</button>
            </div>
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th className='w-32'>Name</th>
                        <th className='w-52'>Description</th>
                        <th className='w-8'>Continent</th>
                        <th className='w-8'>Country</th>
                        <th className='w-8'>City</th>
                        <th className='w-8'>ImageURL</th>
                        <th className='w-20'>Sửa/Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {destinations.map((destination: Destinations) => (
                        <DestItem key={destination.id}
                            name={destination.name}
                            description={destination.description}
                            continent={destination.continent}
                            country={destination.country}
                            city={destination.city}
                            imageURL={destination.imageURL}
                        />
                    ))}
                </tbody>
            </table>
            <div className='join flex justify-center'>
                <button className='join-item btn' onClick={goToPreviousPage} disabled={currentPage <= 1}>Trước</button>
                <span className='join-item btn'>{currentPage} </span>
                <button className='join-item btn' onClick={goToNextPage} disabled={currentPage >= totalPages}>Sau</button>
            </div>
        </div>
    );
}

export default Dest