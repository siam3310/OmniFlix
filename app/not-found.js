"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Custom404() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleRedirect = () => {
    router.push("/");
  };

  const backgroundStyle = {
    transform: `translate(
      ${-mousePosition.x / 50}px, 
      ${-mousePosition.y / 50}px
    )`,
    transition: 'transform 0.1s ease'
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center 
    bg-[#0d0d0d] text-white">
      {/* Blood Red Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a0000]/60 to-[#330000]/40 
        blur-[200px] opacity-50"
        style={backgroundStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      {/* Bleeding Effect Elements */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 
      bg-[#8B0000]/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-[10%] right-[5%] w-48 h-48 
      bg-[#420000]/30 rounded-full blur-2xl animate-float-slow"></div>

      <motion.div 
        className="relative z-10 text-center max-w-2xl px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Bloody 404 Effect */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-[#8B0000] to-[#420000] 
          opacity-20 absolute top-0 left-0 z-0 blur-sm">404</h1>
          <h1 className="text-9xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-[#8B0000] to-[#420000] 
          relative z-10 animate-glitch">404</h1>
        </div>

        {/* Blood Drip Effect */}
        <div className="absolute left-1/2 transform -translate-x-1/2 
        w-[2px] h-20 bg-gradient-to-b from-[#8B0000] to-transparent 
        animate-blood-drip"></div>

        <motion.p 
          className="text-xl text-gray-300 mt-6 mb-8 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The page you seek has been consumed by the digital shadows. 
          Dare to return to the realm of the living?
        </motion.p>

        <motion.button 
          onClick={handleRedirect}
          className="group relative px-8 py-4 overflow-hidden rounded-full 
          bg-[#8B0000] text-white font-bold
          hover:bg-[#420000] transition-all duration-300 ease-in-out
          flex items-center justify-center mx-auto gap-3 
          border-2 border-[#420000] shadow-lg shadow-[#420000]/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Return from the Void</span>
          <FaArrowRight className="transition-transform group-hover:translate-x-2" />
        </motion.button>
      </motion.div>

      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-20 
      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2WkwtMSAxTDEgLTFaIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4yIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
    </div>
  );
}