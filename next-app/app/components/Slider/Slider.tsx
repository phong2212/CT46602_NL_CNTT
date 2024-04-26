'use client'

import React from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';

const backgrounds = [
  "/img/bg1.jpg",
  "/img/bg2.jpg",
  "/img/bg3.jpg",
];

function Slider() {
  const [opacities, setOpacities] = React.useState<number[]>([])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: backgrounds.length,
    loop: true,
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 10000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <div ref={sliderRef} className="fader relative">
      {backgrounds.map((background, index) => (
        <div
          key={index}
          className="fader__slide absolute top-0 left-0"
          style={{ opacity: opacities[index] }}
        >
          <Image
            width={1600}
            height={1600}
            src={background}
            className="w-full"
            alt={`background${index + 1}`}
            priority={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
