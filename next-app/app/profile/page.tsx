'use client'

import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import Image from 'next/image'

const page = () => {
    return (
        <div className='relative'>
            <div className='absolute top-80 h-screen w-full flex items-center justify-center'>
                <UserProfile />

            </div>
            <Image
                width={2000}
                height={2000}
                src={"/img/bgprofile.jpg"} alt={'Ảnh nền profile'}
                className='-z-10 w-full h-full'
            />
        </div>
    )
}

export default page