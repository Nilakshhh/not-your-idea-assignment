"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';

export default function About() {
    const [center, setCenter] = useState([20.59, 78.96]);
    const [zoom, setZoom] = useState(5);

    const coordinates = {
        East: [20.59, 85.82],
        West: [20.59, 72.82],
        North: [28.70, 77.10],
        South: [8.08, 77.55],
    };

    const getDirectionName = (coords) => {
        return Object.keys(coordinates).find(
            (key) => coordinates[key][0] === coords[0] && coordinates[key][1] === coords[1]
        );
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-row mt-[10vh] bg-[#ffffff]">
                <div className="w-[35%] h-[80vh] border-r-2 border-gray-500">
                    <h1 className='px-[15px] py-[15px] text-[24px] text-[#020611]'>Branch Locator</h1>
                    <div className="flex flex-row justify-between mx-[15px] border-b-2 border-gray">
                        {Object.keys(coordinates).map((direction) => (
                            <div
                                key={direction}
                                className="p-4 bg-black-100 cursor-pointer text-[#020611] hover:border-b-2"
                                onClick={() => setCenter(coordinates[direction])}
                            >
                                {direction}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map component */}
                <div className="w-[65%] h-[80vh] border-l-2 border-gray-500">
                    <Map
                        center={center}
                        zoom={zoom}
                        popupCoords={center}
                        popupText={`Focused on ${getDirectionName(center)} region`}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}
