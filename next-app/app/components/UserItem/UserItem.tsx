import React, { useState } from 'react';

interface Props {
    email: string;
    firstname: string;
    lastname: string;
    createdAt: Date;
    photo: string;
}

function DestItem({ email, firstname, lastname, createdAt, photo }: Props) {
    const [isZoomed, setIsZoomed] = useState(false);

    const ImageClick = () => {
        setIsZoomed(true);
    };

    const CloseZoom = () => {
        setIsZoomed(false);
    };

    const formattedCreatedAt = createdAt.toLocaleString();

    return (
        <>
            <tr>
                <td>{email}</td>
                <td>{firstname || "chưa thêm"}</td>
                <td>{lastname || "chưa thêm"}</td>
                <td>{formattedCreatedAt}</td>
                <td className="avatar cursor-pointer">
                    <div className="w-24 rounded">
                        <img
                            src={photo}
                            alt={'Ảnh của ' + firstname + ' ' + lastname}
                            onClick={ImageClick}
                        />
                    </div>
                </td>
            </tr>
            {isZoomed && (
                <div className="modal modal-open">
                    <div className="modal-box text-center">
                        <img src={photo} alt={'Phóng to ảnh của ' + firstname + ' ' + lastname} className="max-w-full h-auto" />
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={CloseZoom}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DestItem;