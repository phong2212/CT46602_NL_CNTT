'use client'

import { useGlobalState, useGlobalUpdate } from '@/app/context/globalProvider';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import anime from 'animejs';
import { newspaper, idCard, email, phone, address, menu } from '@/app/utils/Icons';
import SearchBlog from '@/app/components/Search/SearchBlog';
import Card from '@/app/components/Card/Card';
import { useAuth } from '@clerk/nextjs';
import UpdateBlog from '@/app/components/Modals/UpdateBlog';
import { useRouter } from 'next/navigation';

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

function DetailBlogPage({ params }: { params: { id: string } }) {
    const { blog, recentblogs, users, getOneBlog, isLoadingRecent, isLoadingOneBlog, deleteBlog, allListBlogs } = useGlobalState();
    const author = users.find((user: Users) => user.clerkId === blog.authorId);
    const { userId } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    React.useEffect(() => {
        getOneBlog(params.id);
    }, []);

    const { searchBlog } = useGlobalUpdate();
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
        searchBlog(searchTerm);
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

    const [timeAgo, setTimeAgo] = useState('');

    React.useEffect(() => {
        const calculateTimeAgo = () => {
            const now = new Date().getTime();
            const formattedCreatedAt = new Date(blog.createdAt).getTime();
            const interval = Math.floor((now - formattedCreatedAt) / 1000);

            let timeAgoStr = '';

            if (interval >= 31536000) {
                const years = Math.floor(interval / 31536000);
                timeAgoStr = `${years} năm trước`;
            } else if (interval >= 2592000) {
                const months = Math.floor(interval / 2592000);
                timeAgoStr = `${months} tháng trước`;
            } else if (interval >= 86400) {
                const days = Math.floor(interval / 86400);
                timeAgoStr = `${days} ngày trước`;
            } else if (interval >= 3600) {
                const hours = Math.floor(interval / 3600);
                timeAgoStr = `${hours} giờ trước`;
            } else if (interval >= 60) {
                const minutes = Math.floor(interval / 60);
                timeAgoStr = `${minutes} phút trước`;
            } else {
                timeAgoStr = 'Vừa xong';
            }

            setTimeAgo(timeAgoStr);
        };

        calculateTimeAgo();

        const intervalId = setInterval(calculateTimeAgo, 60000);

        return () => clearInterval(intervalId);
    }, [blog.createdAt]);

    const OpenEdit = () => {
        setIsEdit(true);
    };

    const CloseEdit = () => {
        setIsEdit(false);
    };

    const OpenDelete = () => {
        setIsDelete(true);
    };

    const CloseDelete = () => {
        setIsDelete(false);
    };

    const router = useRouter();

    const handleDeleteBlog = async (blogId: string) => {
        try {
            await deleteBlog(blogId);
            router.push('/blogs');
            allListBlogs();
        } catch (error) {
            console.error('Failed to delete blog:', error);
        }
    };

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
                    <p className="text-white text-3xl font-bold">Tìm kiếm Blog</p>
                    <form onSubmit={handleSearchSubmit}>
                        <label className="input input-bordered flex items-center gap-2 caret-black mt-10 w-full">
                            <input
                                type="text"
                                value={searchTerm}
                                className='grow w-24 md:w-auto'
                                onChange={handleSearchChange}
                                placeholder="Tìm kiếm blog..."
                            />
                            <button type='submit' className='btn btn-sm btn-circle'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                            </button>
                        </label>
                    </form>
                </div>
            </div>

            {submitted && (
                <div id='search' className='caret-transparent'>
                    <SearchBlog />
                </div>
            )}

            {isEdit && (
                <div className="modal modal-open">
                    <div className='absolute top-0 left-0 w-full h-screen blur' onClick={CloseEdit}></div>
                    <div className="modal-box  overflow-hidden">
                        <UpdateBlog blogId={blog.id} />
                        <div className='absolute top-[30.5rem] left-[19rem]'>
                            <button className="text-sm font-semibold leading-6 text-red-500" onClick={CloseEdit}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDelete && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">CẢNH BÁO!</h3>
                        <p className="py-4">Bạn có chắc là xóa blog này không ?</p>
                        <div className="modal-action">
                            <button className="btn btn-md btn-success" onClick={() => {
                                handleDeleteBlog(blog.id);
                            }}>Đồng ý</button>
                            <button className="btn btn-md btn-error" onClick={CloseDelete}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='h-full caret-transparent'>
                <div className='grid grid-cols-3 gap-12 m-16'>
                    <div className='col-span-2 bg-base-200 px-16 py-12 rounded-badge drop-shadow-lg'>
                        <div className='flex flex-row justify-between items-center'>

                            {isLoadingOneBlog ? (
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
                                    <div className='flex flex-row items-center justify-between w-[48rem]'>
                                        <div className='flex flex-row items-center '>
                                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{newspaper}</span>
                                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                                BLOG
                                            </h1>
                                        </div>
                                        {author && author.clerkId === userId && (
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn btn-info m-1">{menu}</div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                                                    <li ><button onClick={OpenEdit}>Chỉnh sửa</button></li>
                                                    <li><button onClick={OpenDelete}>Xóa</button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className='mt-5'>
                                        <h1 className='text-4xl font-bold'>
                                            {blog.title}
                                        </h1>
                                        <div className='flex flex-row items-center mt-2'>
                                            <p className='mr-1'>{author ? `${author.firstName} ${author.lastName}` : 'Unknown'} </p>&middot;
                                            <p className='ml-1'> {timeAgo}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center mt-4'>
                                        <div className='relative rounded-2xl '>
                                            <div className='rounded-2xl overflow-hidden'>
                                                <img src={blog.imageURL} alt={blog.title} className='w-full h-full' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5 text-justify'>
                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                    </div>
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

                <div className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className=' w-2/3'>
                            <div className='flex flex-row items-center'>
                                <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{newspaper}</span>
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

            </div >
        </>
    )
}

export default DetailBlogPage