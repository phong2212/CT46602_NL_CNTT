import React, { useState } from 'react';
import { edit, trash } from '@/app/utils/Icons';

interface Props {
  name: string;
  description: string;
  continent: string;
  country: string;
  city: string;
  imageURL: string;
}

function DestItem({ name, description, continent, country, city, imageURL }: Props) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{description}</td>
        <td>{continent}</td>
        <td>{country}</td>
        <td>{city}</td>
        <td className="avatar cursor-pointer">
          <div className="w-24 rounded">
            <img
              src={imageURL}
              alt={'Ảnh' + name}
              onClick={handleImageClick}
            />
          </div>
        </td>
        <td>
          <button className="btn glass m-1 text-yellow">{edit}</button>
          <button className="btn glass m-1 text-red-500">{trash}</button>
        </td>
      </tr>
      {isZoomed && (
        <div className="modal modal-open">
          <div className="modal-box">
            <img src={imageURL} alt={'Zoomed image of ' + name} className="max-w-full h-auto" />
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleCloseZoom}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DestItem;