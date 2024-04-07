import { Toaster } from "react-hot-toast";
import SideBar from "../components/SideBar/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div data-theme="dark" className='p-10 flex gap-10 h-screen'>
            <SideBar />
            {children}
        </div>
    );
}