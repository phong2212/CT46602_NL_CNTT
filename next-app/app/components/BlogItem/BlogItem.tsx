import React, { useState } from 'react';
import { trash } from '@/app/utils/Icons';
import { useGlobalState } from '@/app/context/globalProvider';


interface Props {
    id: string;
    author: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    imageURL: string;
}

function BlogItem({ id, author, title, content, createdAt, updatedAt, imageURL }: Props) {
    const { deleteBlog } = useGlobalState();
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


    return (
        <>
            <tr>
                <td>{author}</td>
                <td>{title}</td>
                <td>
                    {showFullContent || content.length <= 80 ? content : `${content.substring(0, 80)}...`}
                    {content.length > 80 && (
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
                                deleteBlog(id);
                            }}>Đồng ý</button>
                            <button className="btn btn-md btn-error" onClick={CloseDelete}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BlogItem;