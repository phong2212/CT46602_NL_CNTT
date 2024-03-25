'use client'

import React from 'react'
import Image from 'next/image';
import CreateContent from '../../models/CreateContent'
import Slider from '../Slider/Slider';

function Dest() {
    return (
        <div>
            <div className=" bg-gray-900 caret-transparent">

                <Image
                    width="1980"
                    height="800"
                    src="/img/bg3.jpg"
                    alt=""
                    className="object-none object-bottom bg-yellow-300 h-96 w-full"
                />

            </div>

            <div className="h-screen bg-base">
                <CreateContent />
            </div>
        </div>

    );
}

export default Dest