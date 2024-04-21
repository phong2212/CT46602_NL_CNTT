'use client'

import SideBar from "../components/SideBar/SideBar";
import { useGlobalState } from "../context/globalProvider";
import NotFound from "../not-found";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isAdmin } = useGlobalState();

    return (
        <>
            {isAdmin ? (
                <div data-theme="dark" className='p-10 flex gap-10 h-screen'>
                    <SideBar />
                    {children}
                </div>
            ) : (
                <NotFound />
            )
            }
        </>
    );
}