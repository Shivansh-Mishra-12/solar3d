import { useHelper, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, {  useRef } from 'react'
import {  PointLight, PointLightHelper } from 'three';
import * as THREE from 'three'
const Sun = () => {
    const  sunMaterial  = useTexture('/8k_sun.jpg')
    const Sun = {
        name: 'Sun',
        radius: 8,            // scaled down from 109
        distance: 0,
        rotationSpeed: 0.003,
        material: sunMaterial,
        moons: []
    };

    const sunRef = useRef(null)
    const pointLightRef1 = useRef()
    const pointLightRef2 = useRef()
    const pointLightRef3 = useRef()
    const pointLightRef4 = useRef()
    useHelper(pointLightRef1, PointLightHelper , 1 , 'red')
    useHelper(pointLightRef2, PointLightHelper , 1 , 'red')
    useHelper(pointLightRef3, PointLightHelper , 1 , 'red')
    useHelper(pointLightRef4, PointLightHelper , 1 , 'red')


    useFrame(()=>{
        if(sunRef.current){
            sunRef.current.rotation.y+=Sun.rotationSpeed
        }
    })

    return (
        <>
            <mesh ref={sunRef}>
                {/* <axesHelper args={[Sun.radius + 2, 3, 3]} /> */}
                <sphereGeometry args={[Sun.radius, 32, 32]} position={[Sun.distance, 0, 0]} />
                <meshBasicMaterial map={sunMaterial} />
                <ambientLight />
                {/* <pointLight ref={pointLightRef1} intensity={1000} color={0xFFFDFD} position={[Sun.radius+0.5,0,0]} />
                <pointLight ref={pointLightRef2} intensity={100} position={[-Sun.radius-0.5,0,0]} />
                <pointLight ref={pointLightRef3} intensity={100} position={[0,Sun.radius+0.5,0]} />
                <pointLight ref={pointLightRef4} intensity={100} position={[0,-Sun.radius-0.5,0]} /> */}
            </mesh>
        </>
    )
}

export default Sun
