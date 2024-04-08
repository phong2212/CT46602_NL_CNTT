"use client"

import React, { useEffect, useState } from 'react';
import { useGlobalState } from '@/app/context/globalProvider';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';


function CheckAdmin() {
    const { checkAdmin } = useGlobalState();
    const { user } = useUser();
    const { id } = user || {};
    const [User, setUser] = useState({
        cleckId: '',
        email: '',
        photo: '',
        firstName: '',
        lastName: '',
        role: '',
    });

    useEffect(() => {
        const fetchUser = async ( id: any) => {
            try {
                const response = await axios.get(`/api/webhooks/clerk/${id}`);
                setUser(response.data.user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser(id);
    }, [ id ]);
    return User.role === 'ADMIN' ? <li><a href={"/manager"}>Quản lý</a></li> : null;;
}

export default CheckAdmin