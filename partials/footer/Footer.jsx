"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { SiNextdotjs, SiTailwindcss, SiVercel } from "react-icons/si";
import Link from "next/link";
import { FaCode, FaFilm, FaGlobeAmericas } from "react-icons/fa";
import { useRef } from "react";
import { nightTokyo } from "@/utils/fonts"

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax and scroll-based transformations
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

  // Stagger animation for quick links and features
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer 
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ y, opacity }}
      className="relative bg-[#0d0d0d] text-white border-t border-[#8B0000]/20 overflow-hidden"
    >
      {/* Bleeding Edge Accent Line with Animation */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50"
      ></motion.div>
      
      <div className="max-w-[96rem] mx-auto px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section with Hover Effect */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="space-y-6"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={` ${nightTokyo.className} flex items-center space-x-3`}
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]">
                OmniFlix
              </div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1
                }}
                className={`${nightTokyo.className} px-2 py-1 bg-[#8B0000] text-white text-xs rounded-full`}
              >
                Beta
              </motion.div>
            </motion.div>
            <p className="text-gray-400">
              Immerse yourself in a cinematic universe where every frame tells a story.
            </p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex space-x-4 text-2xl"
            >
              {[
                { Icon: FaGithub, href: "https://github.com" },
                { Icon: FaLinkedin, href: "https://linkedin.com" },
                { Icon: FaTwitter, href: "https://twitter.com" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, color: "#8B0000" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-[#8B0000] transition"
                >
                  <social.Icon />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links with Stagger Animation */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h4 
              variants={itemVariants}
              className="text-xl font-semibold text-[#8B0000]"
            >
              Quick Links
            </motion.h4>
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 text-gray-400"
            >
              {[
                { href: "/", label: "Home" },
                { href: "/movies", label: "Movies" },
                { href: "/tv", label: "TV Shows" },
                { href: "/trending", label: "Trending" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link 
                    href={link.href} 
                    className="hover:text-[#FF4500] transition"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Features Highlight with Interactive Animations */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="space-y-6"
          >
            <h4 className="text-xl font-semibold text-[#8B0000]">Why <span className={`${nightTokyo.className}`}>OmniFlix</span></h4>
            <div className="space-y-4">
              {[
                { Icon: FaFilm, text: "Extensive Movie & TV Show Library" },
                { Icon: FaCode, text: "Seamless Streaming Experience" },
                { Icon: FaGlobeAmericas, text: "Global Content Accessibility" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition"
                >
                  <feature.Icon className="text-[#8B0000] text-xl" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>
            <motion.div 
              
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="mt-4 bg-[#1a1a1a] border border-[#8B0000]/30 rounded-full p-3 text-center text-gray-400 hover:bg-[#8B0000]/10 transition"
            >
              Discover Cinematic Wonders
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section with Animated Gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-8 border-t border-[#8B0000]/20 flex flex-col md:flex-row justify-between items-center"
        >
          {/* Copyright */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-gray-400 text-sm flex items-center space-x-2"
          >
            <span> {new Date().getFullYear()} <span className={`${nightTokyo.className} text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500]`}>OmniFlix</span>. All Rights Reserved.</span>
            <span className="text-[#8B0000]">•</span>
            <span>Crafted with</span>
            <FaHeart className="text-[#8B0000] animate-pulse" />
          </motion.div>

          {/* Tech Stack with Animated Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center space-x-4 text-gray-400 text-xl"
          >
            <span className="text-sm">Powered by</span>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="hover:text-[#8B0000] transition"
            >
              <SiNextdotjs />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="hover:text-[#8B0000] transition"
            >
              <SiTailwindcss />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="hover:text-[#8B0000] transition"
            >
              <SiVercel />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Background Texture with Animated Gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        className="fixed inset-0 pointer-events-none z-0 
        bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
        [background-size:16px_16px]"
      />
    </motion.footer>
  )
}

export default Footer;