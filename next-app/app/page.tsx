'use client'

import { useEffect, useRef } from "react";
import anime from 'animejs/lib/anime.es.js';

import Link from "next/link";
import Slider from "./components/Slider/Slider";
import YouTubeEmbed from "./components/YoutubeEmbed/YoutubeEmbed";
import HomePage from "./components/Home/Home";

export default function Home() {

  const textRef = useRef(null);
  const videoRef = useRef(null);


  useEffect(() => {
    anime({
      targets: textRef.current,
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: 800
    });
    anime({
      targets: videoRef.current,
      translateX: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: 800
    });
  }, []);

  return (
    <main >

      <div className="relative isolate overflow-hidden bg-gray-900 caret-transparent  rounded-b-badge drop-shadow-lg">

        <Slider />

        <div className="absolute inset-0 bg-black bg-opacity-20"></div>

        <div className="hero min-h-screen px-6 caret-transparent">
          <div className="hero-content flex-col lg:flex-row-reverse drop-shadow-md">
            <div ref={videoRef}>
              <YouTubeEmbed videoId="sr284c-q8oY" />
            </div>
            <div ref={textRef}>
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
