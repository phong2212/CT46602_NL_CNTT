'use client'

import { useGlobalState } from '@/app/context/globalProvider';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';



function CreateBlog() {
    const { allListBlogs, closeModal } = useGlobalState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleChange = (title: string) => (e: any) => {
        switch (title) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'content':
                setContent(e.target.value);
                break;
            case 'imageURL':
                setImageURL(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const blogs = {
            title,
            content,
            imageURL
        };

        try {
            const res = await axios.post("/api/blogs", blogs);

            if (res.data.error) {
                toast.error(res.data.error);
            }

            if (!res.data.error) {
                toast.success("Tạo blog thành công!");
                allListBlogs();
                closeModal();
            }
        } catch (error) {
            toast.error("Tạo blog thất bại!");
            console.error(error);
        }
    }

    return (
        <form className='container px-20' onSubmit={handleSubmit}>
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
                            value={title}
                            title="title"
                            onChange={handleChange("title")}
                            className={`input input-bordered w-full max-w-xs `}
                            placeholder="Nhập tiêu đề..."
                        />
                    </label>
                    <label className=' form-control w-full max-w-xs mt-2'>
                        <div className="label">
                            <span className="label-text ">Nội dung</span>
                        </div>
                        <textarea
                            id="tittle"
                            value={content}
                            title="content"
                            onChange={handleChange("content")}
                            className="textarea textarea-bordered flex items-center "
                            placeholder="Nhập nội dung..."
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
                            value={imageURL}
                            title="imageURL"
                            onChange={handleChange("imageURL")}
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Nhập link ảnh..."
                        />
                    </label>


                </div>
            </div>
            <div className="flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-red-500" onClick={closeModal}>
                    Hủy
                </button>
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

export default CreateBlog;