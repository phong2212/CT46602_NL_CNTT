'use client'

import { useState, useEffect } from 'react';
import SideBar from "../components/SideBar/SideBar";
import { useGlobalState } from "../context/globalProvider";
import NotFound from "../not-found";
import NextTopLoader from 'nextjs-toploader';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isAdmin } = useGlobalState();
    const [loading, setLoading] = useState(true); // Thêm state để kiểm soát quá trình tải dữ liệu

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [isAdmin]);

    if (loading) {
        return <div className=' overflow-hidden'>
            <div className='flex flex-row justify-center items-end h-[24rem]'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        </div>
    }

    if (!isAdmin) {
        return <NotFound />;
    }
    return (
        <div data-theme="dark" className='p-10 flex gap-10 h-screen'>
            <SideBar />
            {children}
        </div>
    );
}
