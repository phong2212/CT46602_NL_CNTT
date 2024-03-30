import React from 'react'
import Image from 'next/image';

const destinations = () => {
    return (
        <>
            <div className=" bg-gray-900 caret-transparent">

                <Image
                    width="1980"
                    height="800"
                    src="/img/bg3.jpg"
                    alt=""
                    className="object-none object-bottom h-96 w-full"
                />

            </div>

            <div className="h-screen bg-base">
            </div>
        </>
    );
}

export default destinations