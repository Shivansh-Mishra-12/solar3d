import { useEffect, useState } from "react"


const Loader=({ onComplete })=>{
  const STATUS_MESSAGES = [
    "INITIALIZING...",
    "LOADING ASSETS...",
    "MAPPING ORBITS...",
    "CALIBRATING...",
  ]
  
  const [statusIndex, setStatusIndex] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length)
    }, 700)

    // Show loader for at least 3s, then fade out
    const hideTimer = setTimeout(() => {
      setHiding(true)
      setTimeout(() => onComplete(), 800) // wait for fade-out
    }, 3000)

    return () => {
      clearInterval(msgInterval)
      clearTimeout(hideTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-[#020617] transition-opacity duration-700
        ${hiding ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Spinning rings */}
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44">
        <div className="absolute inset-0 rounded-full border border-transparent
          border-t-cyan-400 border-r-cyan-400/20 animate-spin"
          style={{ animationDuration: "1.6s" }} />
        <div className="absolute inset-3 rounded-full border border-transparent
          border-b-cyan-300 border-l-cyan-300/20 animate-spin"
          style={{ animationDuration: "2.2s", animationDirection: "reverse" }} />
        <div className="absolute inset-6 rounded-full border border-transparent
          border-t-cyan-200/30 border-r-cyan-200 animate-spin"
          style={{ animationDuration: "3s" }} />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-6 sm:mt-8 text-center font-mono">
        <p className="text-cyan-300 text-xs sm:text-sm tracking-[0.3em] mb-2">
          SOLAR SYSTEM
        </p>
        <p className="text-cyan-400/60 text-[10px] sm:text-xs tracking-[0.2em] animate-pulse">
          {STATUS_MESSAGES[statusIndex]}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-5 sm:mt-6 w-36 sm:w-48 md:w-56 h-[2px] bg-cyan-400/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 rounded-full"
          style={{ animation: "loaderProgress 2.5s ease-in-out forwards" }}
        />
      </div>

      <style>{`
        @keyframes loaderProgress {
          0%   { width: 0%; }
          60%  { width: 75%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}
export default Loader