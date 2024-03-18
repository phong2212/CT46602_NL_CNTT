import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className="bg-transparent py-3 px-6 fixed top-0 w-full drop-shadow-md">
            <div className="navbar bg-base-100 border-2 rounded-3xl shadow-md">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl text-sky-500">Wanderlust</Link>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link href="/">Trang chủ</Link></li>
                            <li>
                                <details>
                                    <summary>Khám phá</summary>
                                    <ul className="p-2">
                                        <li><Link href="/destinations">Địa điểm</Link></li>
                                        <li><a>Yêu thích</a></li>
                                    </ul>
                                </details>
                            </li>
                            <li><Link href="/blogs">Blog</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 focus:caret-black md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Trang cá nhân
                                    <span className="badge">Mới</span>
                                </a>
                            </li>
                            <li><a>Cài đặt</a></li>
                            <li><a>Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar