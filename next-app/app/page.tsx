import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Slider from "./components/Slider";
import YouTubeEmbed from "./components/YoutubeEmbed";

export default function Home() {
  return (
    <main >

      <div className="relative isolate overflow-hidden bg-gray-900 caret-transparent">

        <NavBar />

        <Slider />

        <div className="hero min-h-screen px-6 caret-transparent">
          <div className="hero-content flex-col lg:flex-row-reverse drop-shadow-md">
            <YouTubeEmbed videoId="sr284c-q8oY" />
            <div>
              <h2 className="text-6xl font-bold tracking-tight text-white">Trải nghiệm cùng với <b>Wanderlust</b></h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Đây là nơi tuyệt vời để khám phá những điểm đến mới, tìm kiếm thông tin về địa điểm du lịch
                và lập kế hoạch cho những chuyến phiêu lưu sắp tới của bạn.
              </p>
              <button className="mt-6 btn btn-primary">Bắt đầu ngay!</button>
            </div>
          </div>
        </div>
      </div>



    </main>
  );
}
