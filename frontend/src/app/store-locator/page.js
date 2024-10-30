"use client";

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Map from '@/components/Map';

export default function About() {
    return (
        <>
        <Navbar />
        <div className='flex flex-row mt-[10vh]'>
            <div className='w-[50%] h-[80vh]'>Accordion window</div>
            <div className='w-[50%] h-[80vh] border-l-2 border-gray-500'><Map /></div>

        </div>
        <Footer />
        </>
        
    );
}
