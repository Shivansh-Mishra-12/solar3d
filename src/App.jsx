import { Canvas } from '@react-three/fiber'
import './index.css'
import { OrbitControls, Text3D, Center } from '@react-three/drei'
import Sun from './components/Sun'
import Planets from './components/Planets'
import CosmicBubble from './components/CosmicBubble'
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Info from './components/Info'

function App() {

  const [camPos, setCamPos] = useState([0, 4, 25])
  const [target, setTarget] = useState("TARGET")
  const [isOpen, setIsOpen] = useState(true)
  const [showInfo, setshowInfo] = useState(false)
  const isPlanetSelected = target !== "TARGET"

  // ✅ UPDATED: handler with screen width condition
  const handleSelectPlanet = (planet) => {
    setTarget(planet)

    if (window.innerWidth < 768) {
      setIsOpen(false)
    }

    if (planet !== "TARGET") {
      setshowInfo(true)
    }
  }

  return (
    <div className='h-screen w-screen relative overflow-hidden'>

      {/* 🌌 3D Canvas */}
      <Canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        camera={{ position: camPos, near: 0.01, far: 5000 }}
      >
        <CosmicBubble />

        <group>
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            enabled={!isPlanetSelected}
          />

          <Planets target={target} />
          <Sun />
        </group>
      </Canvas>

      {/* 🔷 Sliding Tech Panel Wrapper */}
      <div
        className={`absolute top-4 left-4 sm:top-6 sm:left-6 
        transition-all duration-500 ease-in-out z-10
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-[110%] opacity-70 scale-95"}`}
      >

        {/* 🔘 Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-8 top-6 
                     bg-[#020617]/90 border border-cyan-400/30 
                     text-cyan-300 p-1 rounded-md
                     hover:bg-cyan-400/10 transition z-50"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* 🔷 Panel */}
        <div className="w-[85%] sm:w-72 md:w-80 
                        max-w-sm 
                        bg-gradient-to-br from-[#020617]/90 to-[#001f3f]/90 
                        backdrop-blur-md 
                        border border-cyan-400/30 
                        text-cyan-200 font-mono 
                        rounded-xl shadow-[0_0_25px_#00eaff33] 
                        p-4 space-y-4 overflow-hidden">

          {/* 🔍 Scan Line */}
          <div className="scan-line"></div>

          {/* Header */}
          <div className="flex justify-between items-center border-b border-cyan-400/20 pb-2">
            <h1 className="text-sm sm:text-base tracking-wider">SYSTEM PANEL</h1>
            <span className="text-[10px] text-cyan-400 animate-pulse">● ONLINE</span>
          </div>

          {/* 🌀 Circular HUD */}
          <div className="flex justify-center items-center py-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32">

              <div className="absolute inset-0 border border-cyan-400/40 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-3 border border-cyan-300/30 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-6 border border-cyan-200/20 rounded-full"></div>

              <div className="absolute inset-0 flex items-center justify-center text-white">
                <span key={target} className="target-text text-[10px] sm:text-xs">
                  {target}
                </span>
              </div>

            </div>
          </div>

          {/* Planet Selector */}
          <div className="space-y-2">
            <p className="text-xs opacity-70">SELECT PLANET</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"].map((planet) => (
                <button
                  key={planet}
                  onClick={() => handleSelectPlanet(planet)}
                  className="border border-cyan-400/20 rounded-md py-1 
                             hover:bg-cyan-400/10 hover:border-cyan-300 
                             active:scale-95 transition">
                  {planet}
                </button>
              ))}
            </div>
          </div>

          {/* Free Cam */}
          <button
            onClick={() => handleSelectPlanet("TARGET")}
            className="mt-2 w-full border border-cyan-400/20 rounded-md py-1 text-xs
                       hover:bg-cyan-400/10 hover:border-cyan-300 active:scale-95 transition">
            FREE CAM
          </button>

          {/* Status Bar */}
          <div>
            <p className="text-xs opacity-70">ENERGY</p>
            <div className="h-1 bg-cyan-900 mt-1 rounded">
              <div className="h-full w-3/4 bg-cyan-400 animate-pulse rounded"></div>
            </div>
          </div>

        </div>
      </div>

      <div className='w-full h-full md:w-1/2  absolute top-0 right-0  pointer-events-none z-0'>
        <Info target={target} showInfo={showInfo} />
      </div>

    </div>
  )
}

export default App