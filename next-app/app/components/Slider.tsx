import React from 'react'

const Slider = () => {
    return (
        <div className="carousel w-full h-full hidden md:block absolute inset-0 -z-10 object-cover md:object-bottom">
            <div className="carousel-item w-full">
                <img src="/img/bg1.jpg" className="w-full" />
            </div>
            <div className="carousel-item w-full">
                <img src="/img/bg2.jpg" className="w-full" />
            </div>
            <div className="carousel-item w-full">
                <img src="/img/bg3.jpg" className="w-full" />
            </div>
        </div>
    )
}

export default Slider