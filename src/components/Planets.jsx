import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from "three"

const Planets = ({ target }) => {
  const { camera } = useThree()

  const textures = useTexture([
    '/mercuryMaterial.jpg',
    '/venusMaterial.jpg',
    '/earthMaterial.jpg',
    '/marsMaterial.jpg',
    '/jupiterMaterial.jpg',
    '/saturnMaterial.jpg',
    '/uranusMaterial.jpg',
    '/neptuneMaterial.jpg',
  ])

  const ringTexture = useTexture('/saturn_rings.png')

  const Planetary_array = [
    { id:1, name:'Mercury', radius:0.38, orbitRadius:10, orbitSpeed:1.6, rotationSpeed:0.002, material:textures[0], initialAngle:Math.random()*Math.PI*2 },
    { id:2, name:'Venus',   radius:0.95, orbitRadius:15, orbitSpeed:1.2, rotationSpeed:-0.001, material:textures[1], initialAngle:Math.random()*Math.PI*2 },
    { id:3, name:'Earth',   radius:1,    orbitRadius:20, orbitSpeed:1.0, rotationSpeed:0.01,  material:textures[2], initialAngle:Math.random()*Math.PI*2 },
    { id:4, name:'Mars',    radius:0.53, orbitRadius:25, orbitSpeed:0.8, rotationSpeed:0.008, material:textures[3], initialAngle:Math.random()*Math.PI*2 },
    { id:5, name:'Jupiter', radius:11.2, orbitRadius:40, orbitSpeed:0.4, rotationSpeed:0.02,  material:textures[4], initialAngle:Math.random()*Math.PI*2 },
    { id:6, name:'Saturn',  radius:9.45, orbitRadius:55, orbitSpeed:0.3, rotationSpeed:0.018, material:textures[5], rings:true, initialAngle:Math.random()*Math.PI*2 },
    { id:7, name:'Uranus',  radius:4,    orbitRadius:70, orbitSpeed:0.2, rotationSpeed:0.012, material:textures[6], initialAngle:Math.random()*Math.PI*2 },
    { id:8, name:'Neptune', radius:3.88, orbitRadius:85, orbitSpeed:0.15, rotationSpeed:0.011, material:textures[7], initialAngle:Math.random()*Math.PI*2 }
  ]

  const planetRefs     = useRef([])
  const planetMeshRefs = useRef([])
  const orbitAngles    = useRef([])

  useFrame((state, delta) => {
    // ── 1. Advance orbits & self-rotation ──────────────────────────────────
    planetRefs.current.forEach((group, index) => {
      if (!group) return
      const i = Planetary_array[index]

      if (orbitAngles.current[index] === undefined) {
        orbitAngles.current[index] = i.initialAngle
      }

      orbitAngles.current[index] += i.orbitSpeed * delta
      const t = orbitAngles.current[index]

      group.position.x = Math.sin(t) * i.orbitRadius * 5
      group.position.z = Math.cos(t) * i.orbitRadius * 5

      if (planetMeshRefs.current[index]) {
        planetMeshRefs.current[index].rotation.y += i.rotationSpeed * delta
      }
    })

    // ── 2. Camera tracking ─────────────────────────────────────────────────
    if (!target || target === "TARGET") return

    const selectedGroup = planetRefs.current.find(
      (p) => p?.userData?.name === target
    )
    if (!selectedGroup) return

    const planetData = Planetary_array.find(p => p.name === target)
    if (!planetData) return

    // World position of the planet this frame
    const planetPos = new THREE.Vector3()
    selectedGroup.getWorldPosition(planetPos)

    // Direction from sun (origin) → planet, kept flat on XZ plane
    const toPlanet = new THREE.Vector3(planetPos.x, 0, planetPos.z).normalize()

    // Safe viewing distance based on planet radius
    // Saturn gets extra room for its rings
    // Tighter distance: 2× radius + small padding, rings get a bit extra
const ringExtra    = planetData.rings ? 6 : 0
const safeDistance = planetData.radius * 2.5 + 4 + ringExtra

const desiredPos = planetPos.clone()
  .add(toPlanet.multiplyScalar(safeDistance))
  .add(new THREE.Vector3(0, planetData.radius * 0.6 + 2, 0))

    camera.position.lerp(desiredPos, 0.06)

    // Always look directly at the planet center
    const lookTarget = planetPos.clone()
    camera.lookAt(lookTarget)
  })

  return (
    <>
      {Planetary_array.map((item, index) => (
        <group
          key={item.id}
          ref={(el) => (planetRefs.current[index] = el)}
          userData={{ name: item.name }}
        >
          <mesh ref={(el) => (planetMeshRefs.current[index] = el)}>
            <sphereGeometry args={[item.radius, 32, 32]} />
            <meshStandardMaterial map={item.material} />
          </mesh>

          {item.rings && (
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <ringGeometry args={[item.radius + 4, item.radius + 9, 64]} />
              <meshStandardMaterial
                map={ringTexture}
                side={THREE.DoubleSide}
                transparent
              />
            </mesh>
          )}
        </group>
      ))}
    </>
  )
}

export default Planets