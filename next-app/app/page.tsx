import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main >

      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">

        <div className="bg-transparent py-3 px-6 fixed top-0 w-full drop-shadow-md">
          <div className="navbar bg-base-100 border-2 rounded-3xl shadow-md">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl text-sky-500">Travel</Link>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
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
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/img/bg1.jpg"
          width={7932}
          height={5291}
          className="hidden md:block absolute inset-0 -z-10 h-full w-full object-cover md:object-center"
          alt="Background"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 my-20 caret-transparent">
          <div className="mx-auto max-w-2xl lg:mx-0 drop-shadow-md">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Work with us</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Đây là nơi tuyệt vời để khám phá những điểm đến mới, tìm kiếm thông tin về địa điểm du lịch
              và lập kế hoạch cho những chuyến phiêu lưu sắp tới của bạn.
            </p>
          </div>
        </div>
      </div>



    </main>
  );
}
