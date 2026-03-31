import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from "three"
const CosmicBubble = () => {
  const texture=useTexture('/bg.jpg')
  return (
    <>
    <mesh position={[0,0,0]}>
      <sphereGeometry args={[1800,40,40]} />        
      <meshBasicMaterial side={2} map={texture} color={0xffffff} />
    </mesh>
    </>
  )
}

export default CosmicBubble
