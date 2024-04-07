'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useClerk, useUser} from '@clerk/nextjs';

const NavBar = () => {
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
            <div className="navbar bg-base-100 border-2 rounded-3xl shadow-md">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl text-sky-500">Wanderlust</Link>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href={"/"}>Trang chủ</Link></li>
                            <li>
                                <details>
                                    <summary>Khám phá</summary>
                                    <ul className="p-2">
                                        <li><Link href={"/destinations"}>Địa điểm</Link></li>
                                        <li><Link href={"/favorite"}>Yêu thích</Link></li>
                                    </ul>
                                </details>
                            </li>
                            <li><Link href={"/blogs"}>Blog</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 focus:caret-black md:w-auto" />
                    </div>
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt={"Ảnh của " + fullName} src={imageUrl} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link className="justify-between" href={"/profile"}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li><a href={"/manager"}>Quản lý</a></li>
                                <li><Link href={"/settings"}>Cài đặt</Link></li>
                                <li><button onClick={() => signOut(() => router.push("/"))}>Đăng xuất</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link href={"/sign-in"}>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt={"Ảnh của " + fullName} src={imageUrl} />
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