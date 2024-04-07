'use client'

import Link from 'next/link'
import React from 'react'
import socialmedia from "@/app/utils/socialmedia"
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Footer = () => {
    const pathname = usePathname();
    const isManagerPath = /^\/manager(\/|$)/.test(pathname);
    const isSignInPath = /^\/sign-in(\/|$)/.test(pathname);
    const isSignOutPath = /^\/sign-up(\/|$)/.test(pathname);

    return <div className={clsx('', {
        'invisible absolute top-0': isManagerPath || isSignOutPath || isSignInPath,
    },
    )}>
        <div className="footer p-10 bg-base-100 text-base-content">
            <aside>
                <Link href={"/"} className="btn btn-ghost text-4xl text-sky-500">Wanderlust</Link>
                <p className='pl-5 text-lg text-semibold'>The important thing about the journey is <br /> the experience!</p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </div>
        <div className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
            <aside className="items-center grid-flow-col">

                <p>Copyright © 2024 - All right reserved</p>
            </aside>
            <nav className="md:place-self-center md:justify-self-end">
                <div className="grid grid-flow-col gap-2">
                    {socialmedia.map((item) => {
                        return (
                            <a className="text-2xl hover:text-sky-500" href={item.link} key={item.id}>{item.icon}</a>
                        );
                    })}
                </div>
            </nav>
        </div>
    </div>
}

export default Footer