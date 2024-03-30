'use client';

import React, { createContext, useState, useContext } from 'react'
import axios from 'axios';

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const allDests = async (page = currentPage, search = searchTerm) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/destinations?page=${page}&limit=4&search=${search}`);
            setDestinations(res.data.destinations || []);
            setCurrentPage(page);
            setTotalPages(Math.ceil(res.data.total / 10));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        allDests();
    }, [currentPage, searchTerm]);

    return (
        <GlobalContext.Provider value={{
            destinations,
            currentPage,
            totalPages,
            setSearchTerm,
            setCurrentPage,
        }}>
            <GlobalUpdateContext.Provider value={{ allDests }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
