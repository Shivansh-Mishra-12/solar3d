import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react'

const Info = ({target,showInfo}) => {
    console.log(target,showInfo)
    const planetInfo = [
        {
            name: "Mercury",
            type: "Terrestrial Planet",
            knownFor: "Closest planet to the Sun",
            temperature: "-173°C - 427°C",
            distanceFromSun: "57.9 million km",
            gravity: "3.7 m/s²",
            dayLength: "58.6 Earth days",
            yearLength: "88 Earth days",
            atmosphere: "Almost none",
            moons: 0,
        },
        {
            name: "Venus",
            type: "Terrestrial Planet",
            knownFor: "Hottest planet due to greenhouse effect",
            temperature: "≈ 464°C",
            distanceFromSun: "108.2 million km",
            gravity: "8.87 m/s²",
            dayLength: "243 Earth days (retrograde)",
            yearLength: "225 Earth days",
            atmosphere: "Thick CO₂, sulfuric acid clouds",
            moons: 0,
        },
        {
            name: "Earth",
            type: "Terrestrial Planet",
            knownFor: "Only known planet with life",
            temperature: "≈ 15°C",
            distanceFromSun: "149.6 million km",
            gravity: "9.8 m/s²",
            dayLength: "24 hours",
            yearLength: "365 days",
            atmosphere: "Nitrogen, Oxygen",
            moons: 1,
        },
        {
            name: "Mars",
            type: "Terrestrial Planet",
            knownFor: "The Red Planet",
            temperature: "≈ -65°C",
            distanceFromSun: "227.9 million km",
            gravity: "3.71 m/s²",
            dayLength: "24.6 hours",
            yearLength: "687 days",
            atmosphere: "Thin CO₂",
            moons: 2,
        },
        {
            name: "Jupiter",
            type: "Gas Giant",
            knownFor: "Largest planet & Great Red Spot",
            temperature: "≈ -110°C",
            distanceFromSun: "778.5 million km",
            gravity: "24.79 m/s²",
            dayLength: "9.9 hours",
            yearLength: "11.86 years",
            atmosphere: "Hydrogen, Helium",
            moons: 95,
        },
        {
            name: "Saturn",
            type: "Gas Giant",
            knownFor: "Famous ring system",
            temperature: "≈ -140°C",
            distanceFromSun: "1.43 billion km",
            gravity: "10.44 m/s²",
            dayLength: "10.7 hours",
            yearLength: "29.4 years",
            atmosphere: "Hydrogen, Helium",
            moons: 146,
        },
        {
            name: "Uranus",
            type: "Ice Giant",
            knownFor: "Rotates on its side",
            temperature: "≈ -195°C",
            distanceFromSun: "2.87 billion km",
            gravity: "8.69 m/s²",
            dayLength: "17 hours (retrograde)",
            yearLength: "84 years",
            atmosphere: "Hydrogen, Helium, Methane",
            moons: 27,
        },
        {
            name: "Neptune",
            type: "Ice Giant",
            knownFor: "Strongest winds in solar system",
            temperature: "≈ -200°C",
            distanceFromSun: "4.5 billion km",
            gravity: "11.15 m/s²",
            dayLength: "16 hours",
            yearLength: "165 years",
            atmosphere: "Hydrogen, Helium, Methane",
            moons: 14,
        }
    ];
    const planet=planetInfo.find((p)=>(p.name==target))
    if(target=="TARGET" ){
        return null
    }
    else{
        return (
            <div className='flex flex-col w-full h-full'>
                <div className='w-full h-fit pt-7'>
                    <h1 className='text-5xl lg:text-7xl w-fit font-mono font-bold font-pixelated mx-auto'>{planet.name}</h1>
                    <h4 className='font-mono w-fit mx-auto pt-1 lg:text-lg'>({planet.type})</h4>
                </div>
    
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className='min-w-70 lg:min-w-[24.5rem] mx-auto flex flex-col justify-center items-start tracking-tight leading-relaxed text-[1.1rem] lg:text-2xl font-semibold gap-2  h-1/4 '>
                        <h3>Average Temperature: {planet.temperature} </h3>
                        <h3>Distance from Sun: {planet.distanceFromSun} C</h3>
                        <h3>Gravity: {planet.gravity}</h3>
                    </div>
                    <div className='min-w-[17.5rem] lg:min-w-[24.5rem] mx-auto flex flex-col justify-center items-start tracking-tight leading-relaxed text-[1.1rem] lg:text-2xl font-semibold gap-2 mb-7 lg:mb-12 h-1/4 '>
                        <h3>Day Lenth: {planet.dayLength}</h3>
                        <h3>Year Lenth: {planet.yearLength}</h3>
                        <h3>Atmosphere: {planet.atmosphere}</h3>
                        <h3>Moons: {planet.moons}</h3>
    
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Info
