import Link from "next/link";
import Slider from "./components/Slider/Slider";
import YouTubeEmbed from "./components/YoutubeEmbed/YoutubeEmbed";
import HomePage from "./components/Home/Home";

export default function Home() {
  return (
    <main >

      <div className="relative isolate overflow-hidden bg-gray-900 caret-transparent  rounded-b-badge drop-shadow-lg">

        <Slider />

        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="hero min-h-screen px-6 caret-transparent">
          <div className="hero-content flex-col lg:flex-row-reverse drop-shadow-md">
            <YouTubeEmbed videoId="sr284c-q8oY" />
            <div>
              <h2 className="text-6xl font-bold tracking-tight text-white">Trải nghiệm cùng với <b>Wanderlust</b></h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Đây là nơi tuyệt vời để khám phá những điểm đến mới, tìm kiếm thông tin về địa điểm du lịch
                và lập kế hoạch cho những chuyến phiêu lưu sắp tới của bạn.
              </p>
              <Link role="button" className="mt-6 btn  glass text-white" href={"/destinations"}>Bắt đầu ngay!</Link>
            </div>
          </div>
        </div>
      </div>

      <HomePage />

    </main>
  );
}
