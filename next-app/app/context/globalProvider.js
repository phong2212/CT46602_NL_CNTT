'use client';

import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useClerk } from '@clerk/nextjs';



export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
    const { user } = useClerk();
    const [isAdmin, setIsAdmin] = useState(false);

    React.useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user) {
                try {
                    const response = await axios.get(`/api/webhooks/clerk/${user.id}`);
                    setIsAdmin(response.data.user.role === 'ADMIN');
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchAdminStatus();
    }, [user]);

    const [isLoading, setIsLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [Asiadestinations, setAsiaDestinations] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [currentPageDest, setCurrentPageDest] = useState(1);
    const [currentPageAsia, setCurrentPageAsia] = useState(1);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [currentPageBlog, setCurrentPageBlog] = useState(1);
    const [totalPagesDest, setTotalPagesDest] = useState(0);
    const [totalPagesAsia, setTotalPagesAsia] = useState(0);
    const [totalPagesUser, setTotalPagesUser] = useState(0);
    const [totalPagesBlog, setTotalPagesBlog] = useState(0);
    const [searchTermDest, setSearchTermDest] = useState('');
    const [searchTermUser, setSearchTermUser] = useState('');
    const [searchTermBlog, setSearchTermBlog] = useState('');

    const [modal, setModal] = useState(false);



    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const allDests = async (page = currentPageDest, search = searchTermDest) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/destinations?page=${page}&limit=4&search=${search}`);
            setDestinations(res.data.destinations || []);
            setCurrentPageDest(page);
            setTotalPagesDest(Math.ceil(res.data.total / 4));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const allAsia = async (page = currentPageAsia) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/destinations?page=${page}&limit=4`);
            setAsiaDestinations(res.data.asia || []);
            setCurrentPageAsia(page);
            setTotalPagesAsia(Math.ceil(res.data.totalAsia / 4));
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

    const allUsers = async (page = currentPageUser, search = searchTermUser) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/webhooks/clerk?page=${page}&limit=4&search=${search}`);
            setUsers(res.data.users || []);
            setCurrentPageUser(page);
            setTotalPagesUser(Math.ceil(res.data.total / 4));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }


    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`/api/webhooks/clerk/${id}`);
            toast.success("Xóa tài khoản thành công");

            allUsers();
        } catch (err) {
            console.log(err);
            toast.error("Xóa tài khoản thất bại");
        }
    }

    const allBlogs = async (page = currentPageBlog, search = searchTermBlog) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/blogs?page=${page}&limit=4&search=${search}`);

            setBlogs(res.data.blogs || []);
            setCurrentPageBlog(page);
            setTotalPagesBlog(Math.ceil(res.data.total / 4));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteBlog = async (id) => {
        try {
            const res = await axios.delete(`/api/blogs/${id}`);
            toast.success("Xóa blog thành công");

            allBlogs();
        } catch (err) {
            console.log(err);
            toast.error("Xóa blog thất bại");
        }
    }


    React.useEffect(() => {
        allDests();
    }, [currentPageDest, searchTermDest]);

    React.useEffect(() => {
        allUsers();
    }, [currentPageUser, searchTermUser]);

    React.useEffect(() => {
        allBlogs();
    }, [currentPageBlog, searchTermBlog]);

    React.useEffect(() => {
        allAsia();
    }, [currentPageAsia]);


    return (
        <GlobalContext.Provider value={{
            destinations,
            Asiadestinations,
            users,
            blogs,
            currentPageDest,
            currentPageAsia,
            currentPageUser,
            currentPageBlog,
            totalPagesDest,
            totalPagesAsia,
            totalPagesUser,
            totalPagesBlog,
            setSearchTermDest,
            setSearchTermUser,
            setSearchTermBlog,
            setCurrentPageDest,
            setCurrentPageAsia,
            setCurrentPageUser,
            setCurrentPageBlog,
            isLoading,
            deleteDest,
            deleteUser,
            deleteBlog,
            modal,
            openModal,
            closeModal,
            isAdmin,
        }}>
            <GlobalUpdateContext.Provider value={{ allDests, allUsers, allBlogs, }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
