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
    const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

    React.useEffect(() => {
        const fetchAdminStatus = async () => {
            setIsLoadingAdmin(true);
            if (user) {
                try {
                    const res = await axios.get(`/api/webhooks/clerk`);
                    setIsAdmin(res.data.admin.some(admin => admin.clerkId === user.id));
                    setIsLoadingAdmin(false);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchAdminStatus();
    }, [user]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingBlog, setIsLoadingBlog] = useState(false);
    const [isLoadingRecent, setIsLoadingRecent] = useState(false);
    const [isLoadingAsia, setIsLoadingAsia] = useState(false);
    const [isLoadingEuro, setIsLoadingEuro] = useState(false);
    const [isLoadingRandom, setIsLoadingRandom] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [isLoadingSearchBlog, setIsLoadingSearchBlog] = useState(false);
    const [isLoadingOneDest, setIsLoadingOneDest] = useState(false);
    const [isLoadingOneBlog, setIsLoadingOneBlog] = useState(false);
    const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const [allDest, setAllDest] = useState([]);
    const [destination, setDestination] = useState([]);
    const [Asiadestinations, setAsiaDestinations] = useState([]);
    const [Eurodestinations, setEuroDestinations] = useState([]);
    const [Randomdestinations, setRandomDestinations] = useState([]);
    const [Searchdestinations, setSearchDestinations] = useState([]);
    const [SearchBlogs, setSearchBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [blog, setBlog] = useState([]);
    const [listblogs, setListBlogs] = useState([]);
    const [recentblogs, setRecentBlogs] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [currentPageDest, setCurrentPageDest] = useState(1);
    const [currentPageUser, setCurrentPageUser] = useState(1);
    const [currentPageBlog, setCurrentPageBlog] = useState(1);
    const [totalPagesDest, setTotalPagesDest] = useState(0);
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

    const all = async () => {
        setIsLoadingAll(true);
        try {
            const res = await axios.get(`/api/destinations`);
            setAllDest(res.data.all || []);
            setIsLoadingAll(false);
        } catch (err) {
            console.log(err);
        }
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

    const allAsia = async () => {
        setIsLoadingAsia(true);
        try {
            const res = await axios.get(`/api/destinations`);
            setAsiaDestinations(res.data.asia || []);
            setIsLoadingAsia(false);
        } catch (err) {
            console.log(err);
        }
    };

    const allEuro = async () => {
        setIsLoadingEuro(true);
        try {
            const res = await axios.get(`/api/destinations`);
            setEuroDestinations(res.data.euro || []);
            setIsLoadingEuro(false);
        } catch (err) {
            console.log(err);
        }
    };

    const randomDest = async () => {
        setIsLoadingRandom(true);
        try {
            const res = await axios.get(`/api/destinations`);
            setRandomDestinations(res.data.random || []);
            setIsLoadingRandom(false);
        } catch (err) {
            console.log(err);
        }
    };

    const searchDest = async (search) => {
        setIsLoadingSearch(true);
        try {
            const res = await axios.get(`/api/destinations?search=${search}`);
            setSearchDestinations(res.data.searching || []);
            setIsLoadingSearch(false);
        } catch (err) {
            console.log(err);
        }
    };

    const getOneDest = async (id) => {
        setIsLoadingOneDest(true);
        try {
            const res = await axios.get(`/api/destinations/${id}`);
            setDestination(res.data.destination || []);
            setIsLoadingOneDest(false);
        } catch (err) {
            console.log(err);
        }
    }

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

    const allListBlogs = async () => {
        setIsLoadingBlog(true);
        try {
            const res = await axios.get(`/api/blogs`);
            setListBlogs(res.data.listblogs || []);
            setIsLoadingBlog(false);
        } catch (err) {
            console.log(err);
        }
    };

    const recentBlogs = async () => {
        setIsLoadingRecent(true);
        try {
            const res = await axios.get(`/api/blogs`);
            setRecentBlogs(res.data.recent || []);
            setIsLoadingRecent(false);
        } catch (err) {
            console.log(err);
        }
    };

    const searchBlog = async (search) => {
        setIsLoadingSearchBlog(true);
        try {
            const res = await axios.get(`/api/blogs?search=${search}`);
            setSearchBlogs(res.data.searching || []);
            setIsLoadingSearchBlog(false);
        } catch (err) {
            console.log(err);
        }
    };

    const getOneBlog = async (id) => {
        setIsLoadingOneBlog(true);
        try {
            const res = await axios.get(`/api/blogs/${id}`);
            setBlog(res.data.blog || []);
            setIsLoadingOneBlog(false);
        } catch (err) {
            console.log(err);
        }
    }

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

    const allFavorite = async () => {
        setIsLoadingFavorite(true);
        try {
            const res = await axios.get(`/api/favorite`);
            setFavorite(res.data.favorite || []);
            setIsLoadingFavorite(false);
        } catch (err) {
            console.log(err);
        }
    };

    const addFavorite = async (favorite) => {
        try {
            const res = await axios.post(`/api/favorite`, favorite);

            if (res.data.error) {
                toast.error(res.data.error);
            }

            if (!res.data.error) {
                toast.success("Thêm yêu thích thành công!");
                allFavorite();
                closeModal();
            }
        } catch (error) {
            toast.error("Thêm yêu thích thất bại!");
            console.error(error);
        }
    }

    const deleteFavorite = async (id) => {
        try {
            const res = await axios.delete(`/api/favorite/${id}`);
            toast.success("Xóa yêu thích thành công");

            allFavorite();
        } catch (err) {
            console.log(err);
            toast.error("Xóa yêu thích thất bại");
        }
    }

    React.useEffect(() => {
        allListBlogs();
        recentBlogs();
        allEuro();
        allAsia();
        randomDest();
        searchDest();
        searchBlog();
        allFavorite();
        all();
    }, []);

    React.useEffect(() => {
        allDests();
    }, [currentPageDest, searchTermDest]);

    React.useEffect(() => {
        allUsers();
    }, [currentPageUser, searchTermUser]);

    React.useEffect(() => {
        allBlogs();
    }, [currentPageBlog, searchTermBlog]);



    return (
        <GlobalContext.Provider value={{
            destinations,
            destination,
            allDest,
            Asiadestinations,
            Randomdestinations,
            Eurodestinations,
            Searchdestinations,
            SearchBlogs,
            users,
            blogs,
            blog,
            listblogs,
            recentblogs,
            favorite,
            allDests,
            allListBlogs,
            currentPageDest,
            currentPageUser,
            currentPageBlog,
            totalPagesDest,
            totalPagesUser,
            totalPagesBlog,
            setSearchTermDest,
            setSearchTermUser,
            setSearchTermBlog,
            setCurrentPageDest,
            setCurrentPageUser,
            setCurrentPageBlog,
            isLoading,
            isLoadingAdmin,
            isLoadingOneDest,
            isLoadingAsia,
            isLoadingRandom,
            isLoadingEuro,
            isLoadingSearch,
            isLoadingBlog,
            isLoadingRecent,
            isLoadingSearchBlog,
            isLoadingOneBlog,
            isLoadingFavorite,
            isLoadingAll,
            addFavorite,
            deleteDest,
            deleteUser,
            deleteBlog,
            deleteFavorite,
            modal,
            openModal,
            closeModal,
            isAdmin,
            getOneDest,
            getOneBlog,
        }}>
            <GlobalUpdateContext.Provider value={{ allDests, allUsers, allBlogs, searchDest, searchBlog }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
