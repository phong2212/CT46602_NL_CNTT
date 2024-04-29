'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { heart, trash } from '../utils/Icons'
import { useGlobalState } from '../context/globalProvider'
import Link from 'next/link'

interface Favorite {
    id: string;
    userId: string;
    destinationId: string;
}


interface Destinations {
    id: string;
    name: string;
}


const FavoritePage = () => {
    const { favorite, allDest, isLoadingFavorite, isLoadingAll, deleteFavorite } = useGlobalState();
    const [isDelete, setIsDelete] = useState(false);

    const OpenDelete = () => {
        setIsDelete(true);
    };

    const CloseDelete = () => {
        setIsDelete(false);
    };

    return (
        <>
            <div className="bg-gray-900 caret-transparent relative">
                <Image
                    width="1980"
                    height="800"
                    src="/img/bg2.jpg"
                    alt="background2"
                    className="object-none object-center h-96 w-full"
                    priority={true}
                />
                <div className='absolute inset-0 bg-black opacity-20 w-full h-full'></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-20">
                    <p className="text-white text-3xl font-bold">Danh sách yêu thích </p>
                </div>
            </div>
            <div className='h-full caret-transparent'>
                <div className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                    <div className='flex flex-row justify-between items-center'>
                        <div>
                            <div className='flex flex-row items-center'>
                                <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{heart}</span>
                                <h1 className='text-3xl font-bold text-start text-sky-400'>
                                    Danh sách các địa điểm yêu thích
                                </h1>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                    <div className="overflow-x-auto mt-5">
                        <table className="table">
                            <thead>
                                <tr className='text-2xl'>
                                    <th>
                                        Tên địa điểm
                                    </th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody >
                                {isLoadingFavorite ? (
                                    <div>
                                        <div className='flex flex-row justify-end pr-96 h-32'>
                                            <span className="loading loading-spinner loading-lg"></span>
                                        </div>
                                    </div>
                                ) : isLoadingAll ? (
                                    <div>
                                        <div className='flex flex-row justify-end pr-96 h-32'>
                                            <span className="loading loading-spinner loading-lg"></span>
                                        </div>
                                    </div>
                                ) : favorite.map((favo: Favorite) => {
                                    const DestName = allDest.find((dest: Destinations) => dest.id === favo.destinationId);

                                    return (
                                        <tr className='text-xl'>
                                            <th className='hover:opacity-40'>
                                                <Link href={"/destinations/" + favo.destinationId}>{DestName ? `${DestName.name}` : 'Unknown'}</Link>
                                            </th>
                                            <th>
                                                <button onClick={() => {
                                                    deleteFavorite(favo.destinationId);
                                                }}
                                                    className='btn btn-sm btn-error'>{trash}</button>
                                            </th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div >
        </>

    )
}

export default FavoritePage