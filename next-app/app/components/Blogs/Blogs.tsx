'use client'

import React, { useState } from 'react'
import BlogItem from '../BlogItem/BlogItem';
import { plus } from '@/app/utils/Icons';
import { useGlobalState, useGlobalUpdate } from '../../context/globalProvider';
import CreateContent from '../Modals/CreateContent';
import Modal from '../Modals/Modal';


interface Props {
    title: string;
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

function Blog({ title }: Props) {
    const { blogs, currentPageBlog, totalPagesBlog, setCurrentPageBlog, isLoading } = useGlobalState();
    const { allBlogs } = useGlobalUpdate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        allBlogs(1, searchTerm);
    };

    const goToNextPage = () => {
        if (currentPageBlog < totalPagesBlog) {
            setCurrentPageBlog(currentPageBlog + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPageBlog > 1) {
            setCurrentPageBlog(currentPageBlog - 1);
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
            </div>
            {!isLoading ? (
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Tác giả</th>
                            <th >Tiêu đề</th>
                            <th className='w-80'>Nội dung</th>
                            <th>Ngày tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Ảnh địa điểm</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((destination: Blogs) => (
                            <BlogItem
                                key={destination.id}
                                id={destination.id}
                                authorId={destination.authorId}
                                title={destination.title}
                                content={destination.content}
                                createdAt={destination.createdAt}
                                updatedAt={destination.updatedAt}
                                imageURL={destination.imageURL}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <div className='flex flex-row justify-center items-center h-[27.7rem]'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            )}
            <div className='join flex justify-center mt-2'>
                <button className='join-item btn' onClick={goToPreviousPage} disabled={currentPageBlog <= 1}>Trước</button>
                <span className='join-item btn'>{currentPageBlog} </span>
                <button className='join-item btn' onClick={goToNextPage} disabled={currentPageBlog >= totalPagesBlog}>Sau</button>
            </div>
        </div>
    );
}

export default Blog