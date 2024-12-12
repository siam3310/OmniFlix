"use client";
import useScreenDimensions from "@/hook/useScreenDimensions";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import SearchResults from "./SearchResults";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const router = useRouter()

  const { width } = useScreenDimensions();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // or a loader/spinner
  }

  if (width <= 590) {
    return (
      isSearchBoxOpen ? (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-[86%] top-1/2 left-0 -translate-y-1/2"
        >
          <div className="relative w-full">
            <div className="h-12 flex items-center justify-between bg-[#1a0000] border border-[#8B0000]/30 rounded-md">
              <div className="flex items-center text-white px-4 py-1 gap-2 rounded-md h-12 w-full">
                <div className="text-xl text-[#8B0000]">
                  <IoIosSearch />
                </div>

                <input
                  type="text"
                  placeholder="Search movies, TV shows..."
                  className="bg-transparent outline-none w-full text-white placeholder-[#8B0000]/70"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onKeyUp={e => {
                    if (e.key === "Enter") {
                      router.push(`/catalog?q=${searchValue}`);
                    }
                  }}
                />
              </div>

              <motion.div 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-3xl text-[#8B0000] cursor-pointer mr-2" 
                onClick={() => {
                  setIsSearchBoxOpen(false)
                  setSearchValue("")
                }}
              >
                <IoCloseOutline />
              </motion.div>
            </div>

            {searchValue !== "" && <SearchResults
              searchValue={searchValue}
              setIsSearchBoxOpen={setIsSearchBoxOpen}
              setSearchValue={setSearchValue}
            />}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl text-[#8B0000] cursor-pointer" 
          onClick={() => setIsSearchBoxOpen(true)}
        >
          <IoIosSearch />
        </motion.div>
      )
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center text-white bg-[#1a0000] border border-[#8B0000]/30 px-4 py-1 gap-2 rounded-md h-10">
        <div className="text-xl text-[#8B0000]">
          <IoIosSearch />
        </div>

        <input
          type="text"
          placeholder="Search movies, TV shows..."
          className="bg-[#1a0000] outline-none w-full text-white placeholder-[#8B0000]/70"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyUp={e => {
            if (e.key === "Enter") {
              router.push(`/catalog?q=${searchValue}`);
            }
          }}
        />
      </div>

      <AnimatePresence>
        {searchValue !== "" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SearchResults 
              searchValue={searchValue} 
              setIsSearchBoxOpen={setIsSearchBoxOpen}
              setSearchValue={setSearchValue}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Search;