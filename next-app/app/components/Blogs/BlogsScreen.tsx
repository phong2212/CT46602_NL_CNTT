'use client'

import { useGlobalState } from '@/app/context/globalProvider';
import React, { useState, useRef } from 'react'
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css'
import { useInView } from 'react-intersection-observer';
import anime from "animejs/lib/anime.es.js";
import { arrowLeft, arrowRight, newspaper, pencil } from '@/app/utils/Icons';
import Card from '../Card/Card';
import CreateBlog from '../Modals/CreateBlog';
import Modal from '../Modals/Modal';
import { useAuth } from '@clerk/nextjs';

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


function BlogsScreen() {
    const { isSignedIn } = useAuth();
    const { listblogs, users, isLoadingBlog, openModal, modal } = useGlobalState();
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
    }, [listblogs]);

    const textRef = useRef(null);
    const [triggered, setTriggered] = useState(false);

    const animateText = () => {
        anime({
            targets: textRef.current,
            translateY: [100, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: 200
        });
    };

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5
    });

    React.useEffect(() => {
        if (inView && !triggered) {
            animateText();
            setTriggered(true);
        }
    }, [inView]);

    return (
        <div className='h-full caret-transparent'>
            {modal && <Modal content={<CreateBlog />} />}
            <div ref={ref} className='bg-base-200 px-16 py-12 m-16 rounded-badge drop-shadow-lg'>
                <div ref={textRef} className='flex flex-row justify-between items-center opacity-0'>
                    <div className='w-2/3'>
                        <div className='flex flex-row items-center'>
                            <span className='btn btn-sm btn-info rounded-full text-white no-animation mr-5 hover:bg-info cursor-default'>{newspaper}</span>
                            <h1 className='text-3xl font-bold text-start text-sky-400'>
                                Khám phá các blog
                            </h1>
                        </div>
                    </div>
                    {isSignedIn && (
                        <button onClick={openModal} className='btn btn-info'>
                            {pencil} Đăng bài
                        </button>
                    )}
                </div>
                {isLoadingBlog ? (
                    <div ref={sliderRef} className="keen-slider mt-8">
                        <div className='keen-slider__slide number-slide1 skeleton w-32 h-96'></div>
                        <div className='keen-slider__slide number-slide2 skeleton w-32 h-96 ml-5'></div>
                        <div className='keen-slider__slide number-slide3 skeleton w-32 h-96 ml-5'></div>
                        <div className='keen-slider__slide number-slide4 skeleton w-32 h-96 ml-5'></div>
                    </div>
                ) : (
                    <div ref={sliderRef} className="keen-slider mt-8">
                        {listblogs.map((blog: Blogs, index: number) => {
                            const authorUser = users.find((user: Users) => user.clerkId === blog.authorId);
                            return (
                                <div key={index} className={`keen-slider__slide number-slide${index + 1}`}>
                                    <Card
                                        key={blog.id}
                                        id={blog.id}
                                        author={authorUser ? `${authorUser.firstName} ${authorUser.lastName}` : 'Unknown'}
                                        title={blog.title}
                                        content={blog.content}
                                        createdAt={blog.createdAt}
                                        imageURL={blog.imageURL}
                                    />
                                </div>

                            );
                        })}
                        {loaded && instanceRef.current && (
                            <>
                                <button
                                    onClick={(e: any) =>
                                        instanceRef.current?.prev()
                                    }
                                    className='join-item btn btn-base-200 absolute top-40 z-10 left-2'>
                                    {arrowLeft}
                                </button>
                                <button
                                    onClick={(e: any) =>
                                        instanceRef.current?.next()
                                    }
                                    className='join-item btn btn-base-200 absolute top-40 z-10 right-2'>
                                    {arrowRight}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogsScreen