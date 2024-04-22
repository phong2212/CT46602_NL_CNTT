'use client'

import React, { useEffect, useState } from 'react';
import { edit, trash } from '@/app/utils/Icons';
import { useGlobalState } from '@/app/context/globalProvider';
import axios from 'axios';
import toast from 'react-hot-toast';


interface Props {
    id: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    imageURL: string;
}

function DestItem({ id, authorId, title, content, createdAt, updatedAt, imageURL }: Props) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);


    const ImageClick = () => {
        setIsZoomed(true);
    };

    const CloseZoom = () => {
        setIsZoomed(false);
    };

    const OpenDelete = () => {
        setIsDelete(true);
    };

    const CloseDelete = () => {
        setIsDelete(false);
    };

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const formattedCreatedAt = new Date(createdAt).toLocaleDateString();
    const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/webhooks/clerk/${authorId}`);
                setUser(response.data.user);
            } catch (error) {
                toast.error("Lỗi khi lấy thông tin tài khoản");
                console.error(error);
            }
        };

        fetchUser();
    }, [authorId]);


    return (
        <>
            <tr>
                <td>{user.firstName + ' ' + user.lastName}</td>
                <td>{title}</td>
                <td>
                    {showFullContent || content.length <= 100 ? content : `${content.substring(0, 100)}`}
                    {content.length > 100 && (
                        <button className='btn-link pl-1' onClick={toggleContent}>
                            {showFullContent ? '[Thu gọn]' : '[Mở rộng]'}
                        </button>
                    )}
                </td>
                <td>{formattedCreatedAt}</td>
                <td>{formattedUpdatedAt}</td>
                <td className="avatar cursor-pointer">
                    <div className="w-24 rounded">
                        <img
                            src={imageURL}
                            alt={'Ảnh của ' + title}
                            onClick={ImageClick}
                        />
                    </div>
                </td>
                <td>
                    <button className="btn glass m-1 text-yellow-500" >{edit}</button>
                    <button className="btn glass m-1 text-red-500" onClick={OpenDelete}>{trash}</button>
                </td>
            </tr>
            {isZoomed && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <img src={imageURL} alt={'Phóng to ảnh của ' + title} className="max-w-full h-auto" />
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={CloseZoom}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
            {isDelete && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">CẢNH BÁO!</h3>
                        <p className="py-4">Bạn có chắc là xóa blog này không ?</p>
                        <div className="modal-action">
                            <button className="btn btn-md btn-success" onClick={() => {
                                // deleteDest(id);
                            }}>Đồng ý</button>
                            <button className="btn btn-md btn-error" onClick={CloseDelete}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DestItem;