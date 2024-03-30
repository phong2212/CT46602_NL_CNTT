'use client'

import Dest from '@/app/components/Destinations/dest'
import { useGlobalState } from '@/app/context/globalProvider'
import React from 'react'

const DestinationsPage = () => {
    const { destinations } = useGlobalState();

    return <Dest title="Quản lý danh sách địa điểm" destinations={destinations} />;
};

export default DestinationsPage