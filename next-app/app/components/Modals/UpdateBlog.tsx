'use client'

import { useGlobalState } from '@/app/context/globalProvider';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
    blogId: string;
}

function UpdateBlog({ blogId }: Props) {
    const { closeModal, allListBlogs } = useGlobalState();
    const [blog, setBlog] = useState({
        title: '',
        content: '',
        imageURL: '',
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blogs/${blogId}`);
                setBlog(response.data.blog);
            } catch (error) {
                toast.error("Lỗi khi lấy thông tin blog");
                console.error(error);
            }
        };

        fetchBlog();
    }, [blogId]);


    const handleChange = (e: any) => {
        const { title, value } = e.target;
        setBlog(prevState => ({
            ...prevState,
            [title]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await axios.put(`/api/blogs/${blogId}`, blog);

            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Cập nhật blog thành công!");
                allListBlogs();
                closeModal();
            }
        } catch (error) {
            toast.error("Cập nhật blog thất bại!");
            console.error(error);
        }
    };

    return (
        <form className='container px-20 caret-black' onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl mb-8 text-center font-semibold leading-7">Tạo Blog mới</h2>
                    <label className="form-control w-full max-w-xs mt-2">
                        <div className="label">
                            <span className="label-text">Tiêu đề</span>
                        </div>
                        <input
                            type="text"
                            id="tittle"
                            value={blog.title}
                            title="title"
                            onChange={handleChange}
                            className={`input input-bordered w-full max-w-xs `}
                            placeholder={blog.title || "Nhập tiêu đề..."}
                        />
                    </label>
                    <label className=' form-control w-full max-w-xs mt-2'>
                        <div className="label">
                            <span className="label-text ">Nội dung</span>
                        </div>
                        <textarea
                            id="content"
                            value={blog.content}
                            title="content"
                            onChange={handleChange}
                            className="textarea textarea-bordered flex items-center "
                            placeholder={blog.content || "Nhập nội dung..."}
                            rows={4}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs mt-2">
                        <div className="label">
                            <span className="label-text">Link ảnh</span>
                        </div>
                        <input
                            type="text"
                            id="imageURL"
                            value={blog.imageURL}
                            title="imageURL"
                            onChange={handleChange}
                            className="input input-bordered w-full max-w-xs"
                            placeholder={blog.imageURL || "Nhập link ảnh..."}
                        />
                    </label>


                </div>
            </div>
            <div className="flex items-center justify-end gap-x-6">
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Lưu
                </button>
            </div>
        </form>
    )
}

export default UpdateBlog;