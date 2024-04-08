'use client';

import React, { createContext, useState, useContext } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';


export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const allDests = async (page = currentPage, search = searchTerm) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/destinations?page=${page}&limit=4&search=${search}`);
           
            setDestinations(res.data.destinations || []);
            setCurrentPage(page);
            setTotalPages(Math.ceil(res.data.total / 4));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteDest = async (id) => {
        try {
            const res = await axios.delete(`/api/destinations/${id}`);
            toast.success("Xóa địa điểm thành công");

            allDests();
        } catch (err) {
            console.log(err);
            toast.error("Xóa địa điểm thất bại");
        }
    }

    const checkAdmin = async (id) => {
        try {
            const res = await axios.get(`/api/webhooks/clerk/${id}`);
            
            setIsAdmin(res.data.role === 'ADMIN');
            console.log(setIsAdmin(res.data.role === 'ADMIN'));
        } catch (err) {
            console.log(err);
        }
    }


    React.useEffect(() => {
        allDests();
    }, [currentPage, searchTerm]);


    return (
        <GlobalContext.Provider value={{
            destinations,
            allDests,
            currentPage,
            totalPages,
            setSearchTerm,
            setCurrentPage,
            isLoading,
            deleteDest,
            modal,
            openModal,
            closeModal,
            checkAdmin,
        }}>
            <GlobalUpdateContext.Provider value={{ allDests }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
