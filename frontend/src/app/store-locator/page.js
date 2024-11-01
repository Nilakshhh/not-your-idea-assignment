"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';

export default function About() {
    const [center, setCenter] = useState([28.70, 77.10]);
    const [selectedDirection, setSelectedDirection] = useState("North");
    const [zoom, setZoom] = useState(5);
    const [text, setText] = useState("default");
    const [selectedCity, setSelectedCity] = useState('');
    const CityData = {
        VikasPuri: {
            coordinates: [28.70, 77.10],
            popup: "This is vikas Puri"
        },
        JanakPuri: {
            coordinates: [28.70, 77.10],
            popup: "This is janak Puri"
        },
        Sonepat: {
            coordinates: [28.70, 77.10],
            popup: "This is sonepat"
        },
        Chandigarh: {
            coordinates: [28.70, 77.10],
            popup: "This is chandigarh"
        }
    }
    const stateCityData = {
        North: {
            Delhi: ["VikasPuri", "Janak Puri"],
            Punjab: ["Chandigarh"],
            Haryana: ["Sonepat"],
        },

        East: {
            Delhi: ["Vikas Puri", "Janak Puri"],
            Punjab: ["Chandigarh"],
            Haryana: ["Sonepat"],
        },
        West: {
            Delhi: ["Vikas Puri", "Janak Puri"],
            Punjab: ["Chandigarh"],
            Haryana: ["Sonepat"],
        },
        South: {
            Delhi: ["Vikas Puri", "Janak Puri"],
            Punjab: ["Chandigarh"],
            Haryana: ["Sonepat"],
        },
    };

    const coordinates = {
        East: [20.59, 85.82],
        West: [20.59, 72.82],
        North: [28.70, 77.10],
        South: [9.08, 77.55],
    };

    const getDirectionName = (coords) => {
        return Object.keys(coordinates).find(
            (key) => coordinates[key][0] === coords[0] && coordinates[key][1] === coords[1]
        );
    };
    
    const handleCityChange = (event) => {
        setText(CityData[event.target.value].popup);
        setCenter(CityData[event.target.value].coordinates);
        setSelectedCity(event.target.value);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-row mt-[10vh] bg-[#ffffff]">
                <div className="w-[35%] h-[80vh] border-r-2 border-gray-500 overflow-y-auto">
                    <h1 className='px-[15px] py-[15px] text-[24px] text-[#020611]'>Branch Locator</h1>
                    <div className="flex flex-row justify-between mx-[15px] border-b-2 border-gray">
                        {Object.keys(coordinates).map((direction) => (
                            <div
                                key={direction}
                                className="p-4 bg-black-100 cursor-pointer text-[#020611] hover:border-b-2"
                                onClick={() => {
                                    setSelectedDirection(direction);
                                    setCenter(coordinates[direction]);
                                    setText("default")
                                    setSelectedCity('')
                                    setZoom(6);
                                }}
                            >
                                {direction}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 text-[#020611] overflow-y-auto">
                        {Object.entries(stateCityData[selectedDirection]).map(([state, cities]) => (
                            <div key={state} className="mb-4">
                                <label htmlFor={state} className="block text-lg font-semibold mb-2">
                                    {state}:
                                </label>
                                <select
                                    id={state}
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                >
                                    <option className="text-[#020611]" value="">--Select a City--</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
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
                        popupText={text}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}
