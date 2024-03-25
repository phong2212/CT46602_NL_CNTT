'use client'

import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function CreateContent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [continent, setContinent] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'continent':
                setContinent(e.target.value);
                break;
            case 'country':
                setCountry(e.target.value);
                break;
            case 'city':
                setCity(e.target.value);
                break;
            case 'imageURL':
                setImageURL(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const destinations = {
            name,
            description,
            continent,
            country,
            city,
            imageURL
        };

        try {
            const res = await axios.post("/api/destinations", destinations);

            if (res.data.error) {
                toast.error(res.data.error);
            }
            toast.success("Tạo địa điểm thành công!");
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    }

    return (
        <form className='container mx-auto py-10 px-24 caret-transparent' onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <div className='mt-10 w-60'>
                        <label htmlFor="name" className="input input-bordered flex items-center gap-2">
                            Name
                            <input
                                type="text"
                                id="tittle"
                                value={name}
                                name="name"
                                onChange={handleChange("name")}
                                className="grow"
                                placeholder="Daisy"
                            />
                        </label>
                    </div>

                    <div className='mt-10 w-60'>
                        <label htmlFor="description" className="input input-bordered flex items-center gap-2">
                            Description
                            <textarea
                                id="tittle"
                                value={description}
                                name="description"
                                onChange={handleChange("description")}
                                className="textarea textarea-bordered"
                                placeholder="Bio"
                                rows={4}
                            />
                        </label>
                    </div>

                    <div className='mt-10 w-60'>
                        <label htmlFor="continent" className="input input-bordered flex items-center gap-2">
                            Continent
                            <input
                                type="text"
                                id="continent"
                                value={continent}
                                name="continent"
                                onChange={handleChange("continent")}
                                className="grow"
                                placeholder="Continent"
                            />
                        </label>
                    </div>

                    <div className='mt-10 w-60'>
                        <label htmlFor="country" className="input input-bordered flex items-center gap-2">
                            Country
                            <input
                                type="text"
                                id="country"
                                value={country}
                                name="country"
                                onChange={handleChange("country")}
                                className="grow"
                                placeholder="Country"
                            />
                        </label>
                    </div>

                    <div className='mt-10 w-60'>
                        <label htmlFor="city" className="input input-bordered flex items-center gap-2">
                            City
                            <input
                                type="text"
                                id="city"
                                value={city}
                                name="city"
                                onChange={handleChange("city")}
                                className="grow"
                                placeholder="City"
                            />
                        </label>
                    </div>

                    <div className='mt-10 w-60'>
                        <label htmlFor="imageURL" className="input input-bordered flex items-center gap-2">
                            ImageURL
                            <input
                                type="text"
                                id="imageURL"
                                value={imageURL}
                                name="imageURL"
                                onChange={handleChange("imageURL")}
                                className="grow"
                                placeholder="ImageURL"
                            />
                        </label>
                    </div>

                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default CreateContent;