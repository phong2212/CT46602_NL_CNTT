'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useClerk, useUser } from '@clerk/nextjs';
import { useGlobalState } from '@/app/context/globalProvider';
import Image from 'next/image';


const NavBar = () => {
    const { isAdmin } = useGlobalState();
    const pathname = usePathname();
    const isManagerPath = /^\/manager(\/|$)/.test(pathname);
    const isSignInPath = /^\/sign-in(\/|$)/.test(pathname);
    const isSignOutPath = /^\/sign-up(\/|$)/.test(pathname);
    const { user } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    const { fullName, imageUrl } = user || {
        fullName: "Người dùng ẩn danh",
        imageUrl: "https://cdn3.iconfinder.com/data/icons/avatar-165/536/NORMAL_HAIR-512.png"
    };

    return (
        <nav className={clsx(
            'bg-transparent py-3 px-6 fixed top-0 w-full drop-shadow-md z-10 caret-transparent',
            {
                'invisible': isManagerPath || isSignOutPath || isSignInPath,
            },
        )}>
            <div className="navbar bg-base-300 rounded-3xl shadow-md">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl text-sky-500">Wanderlust</Link>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href={"/"}>Trang chủ</Link></li>
                            <li>
                                <details>
                                    <summary>Khám phá</summary>
                                    <ul>
                                        <li><Link href={"/destinations"}>Địa điểm</Link></li>
                                        <li><Link href={"/blogs"}>Blog</Link></li>
                                        <li><Link href={"/favorite"}>Yêu thích</Link></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <button
                        onClick={() => {
                            const theme = document.documentElement.getAttribute('data-theme');
                            if (theme === 'dark') {
                                document.documentElement.setAttribute('data-theme', 'cupcake');
                            } else {
                                document.documentElement.setAttribute('data-theme', 'dark');
                            }
                        }}
                        className="btn btn-ghost btn-circle"
                    >
                        <i className="fas fa-moon"></i>
                    </button>
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost rounded-full">
                                <div className=' avatar'>
                                    <div className="w-10 rounded-full">
                                        <Image
                                            width={800}
                                            height={800}
                                            alt={"Ảnh của " + fullName}
                                            src={imageUrl} />
                                    </div>
                                </div>
                                {fullName}
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44">
                                <li>
                                    <Link className="justify-between" href={"/profile"}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                {isAdmin && <li><a href={"/manager"}>Quản lý</a></li>}
                                <li><button onClick={() => signOut(() => router.push("/"))}>Đăng xuất</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link href={"/sign-in"}>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        width={800}
                                        height={800}
                                        alt={"Ảnh của " + fullName}
                                        src={imageUrl} />
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar