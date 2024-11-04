"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';

export default function About() {
    const [center, setCenter] = useState([28.70, 77.10]);
    const [selectedDirection, setSelectedDirection] = useState("North");
    const [zoom, setZoom] = useState(5);
    const [text, setText] = useState("default");
    const [selectedCity, setSelectedCity] = useState('');
    const [directionsData, setDirectionsData] = useState([]);

    useEffect(() => {
        fetch('https://not-your-idea-assignment-backend.onrender.com/api/directions/')  // Adjust URL based on your FastAPI endpoint
            .then((response) => response.json())
            .then((data) => setDirectionsData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const coordinates = {
        North: [29.40, 76.98],  // Replace with actual default coordinates for North
        South: [14.07, 77.21],  // Replace with actual default coordinates for South
        East: [25.59, 85.35],   // Replace with actual default coordinates for East
        West: [24.44, 75.20]    // Replace with actual default coordinates for West
    };

    const stateCityData = directionsData.reduce((acc, direction) => {
        acc[direction.direction_name] = direction.states.reduce((stateAcc, state) => {
            stateAcc[state.state_name] = state.cities.map(city => city.city_name);
            return stateAcc;
        }, {});
        return acc;
    }, {});

    const parseCoordinates = (coordinateString) => {
        const [latStr, lonStr] = coordinateString.split(', ');
        const parsePart = (part) => {
            const [value, direction] = part.split(' ');
            const decimalValue = parseFloat(value);
            return direction === 'S' || direction === 'W' ? -decimalValue : decimalValue;
        };
        return [parsePart(latStr), parsePart(lonStr)];
    };

    const CityData = directionsData.reduce((acc, direction) => {
        direction.states.forEach(state => {
            state.cities.forEach(city => {
                acc[city.city_name] = {
                    coordinates: parseCoordinates(city.coordinates), // Parse coordinates here
                    popup: city.additional_info
                };
            });
        });
        return acc;
    }, {});

    const handleCityChange = (event) => {
        const cityData = CityData[event.target.value];
        if (cityData) {
            setText(cityData.popup);
            setCenter(cityData.coordinates);
            setSelectedCity(event.target.value);
        }
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
                                className={`p-4 cursor-pointer ${selectedDirection === direction
                                        ? "text-green-500 border-b-2 border-green-500"
                                        : "text-[#020611]"}`
                                }
                                onClick={() => {
                                    setSelectedDirection(direction);
                                    setCenter(coordinates[direction]);  // Set the center to the default coordinates for the selected direction
                                    setText("default");
                                    setSelectedCity('');
                                    setZoom(6);
                                }}
                            >
                                {direction}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 text-[#020611] overflow-y-auto">
                        {Object.entries(stateCityData[selectedDirection] || {}).map(([state, cities]) => (
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
