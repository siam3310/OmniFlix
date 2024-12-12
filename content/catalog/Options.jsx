"use client"
import CatalogSelect from "@/components/ui/CatalogSelect";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaFilter, FaSearch } from "react-icons/fa";

const Options = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeData = [
    { key: "all", value: "All" },
    { key: "tv", value: "TV" },
    { key: "movie", value: "Movies" },
  ]

  const [type, setType] = useState(typeData.find(item => item?.key === (searchParams.get("type") || "all")));
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isAdult, setIsAdult] = useState(searchParams.get("isAdult") === "true" || false);

  const applyFilters = useCallback(() => {
    const queryParams = new URLSearchParams({
      ...(search && { q: search }),
      ...(type && { type: type.key }),
      ...(isAdult && { isAdult: String(isAdult) }),
    });

    router.push(`/catalog${queryParams.toString() ? `?${queryParams}` : ""}`);
  }, [search, type, isAdult, router]);

  return (
    <div className="w-full flex items-center gap-4 mb-8 relative">
      {/* Refined Search Input with Blade-Like Design */}
      <div className="relative flex-grow max-w-[350px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-[#8B0000] opacity-70" />
        </div>
        <input
          type="text"
          placeholder="Search cinematic universe..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyUp={e => e.key === "Enter" && applyFilters()}
          className="
            w-full 
            pl-10 
            pr-4 
            py-2.5 
            bg-[#0d0d0d] 
            border-2 
            border-[#8B0000]/30 
            rounded-xl 
            text-white 
            placeholder-[#8B0000]/50 
            focus:outline-none 
            focus:ring-2 
            focus:ring-[#8B0000]/50 
            transition-all 
            duration-300 
            hover:border-[#8B0000]/60
            text-sm
            shadow-[0_0_10px_rgba(139,0,0,0.1)]
          "
        />
        {/* Blade-like Accent */}
        <div className="absolute -top-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-50"></div>
      </div>

      {/* Type Select with Expanded Width and Premium Styling */}
      <div className="w-[220px]">
        <CatalogSelect
          data={typeData}
          active={type}
          setActive={setType}
          className="
            border-2 
            border-[#8B0000]/30 
            rounded-xl 
            shadow-[0_0_10px_rgba(139,0,0,0.1)]
          "
        />
      </div>

      {/* Adult Content Select with Enhanced Styling */}
      <div className="w-[220px]">
        <CatalogSelect
          data={[
            { key: true, value: "Mature Realms" },
            { key: false, value: "Safe Passage" },
          ]}
          active={isAdult}
          setActive={setIsAdult}
          ShouldBeKey={true}
          className="
            border-2 
            border-[#8B0000]/30 
            rounded-xl 
            shadow-[0_0_10px_rgba(139,0,0,0.1)]
          "
        />
      </div>

      {/* Filter Button with Blade-Like Design */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 20px rgba(139,0,0,0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={applyFilters}
        className="
          group
          bg-[#8B0000] 
          text-white 
          px-6 
          py-2.5 
          rounded-xl 
          flex 
          items-center 
          gap-2 
          transition-all 
          duration-300 
          hover:bg-[#6B0000] 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#8B0000]/50
          text-sm
          relative
          overflow-hidden
        "
      >
        {/* Blade Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
        
        <FaFilter className="group-hover:rotate-45 transition-transform duration-300" />
        Filter
      </motion.button>

      {/* Subtle Blade-Like Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        {[...Array(5)].map((_, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              x: [0, 50, 100],
              transition: {
                duration: 5,
                repeat: Infinity,
                delay: index * 0.5
              }
            }}
            className="absolute w-[1px] h-full bg-gradient-to-b from-[#8B0000] to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Options;