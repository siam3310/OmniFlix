"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(pageInfo?.currentPage);

  useEffect(() => {
    const updateSortInUrl = (sortKey) => {
      const updatedParams = new URLSearchParams(searchParams);
      if (sortKey) {
        updatedParams.set("page", sortKey);
      } else {
        updatedParams.delete("page");
      }

      const newQuery = updatedParams.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}`;
      router.push(newUrl);
    };

    if (
      (searchParams.get("page") && page !== Number(searchParams.get("page"))) ||
      (!searchParams.get("page") && page !== 1)
    ) {
      updateSortInUrl(page);
    }
  }, [page, searchParams, router]);

  // Ultra-Premium Pagination Styles
  const baseItemClass = "h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out";
  const itemClass = `
    ${baseItemClass} 
    bg-[#1a1a1a] 
    text-[#8B0000]/70 
    border 
    border-[#8B0000]/20 
    hover:bg-[#8B0000]/10 
    hover:text-[#8B0000] 
    hover:border-[#8B0000]/40 
    focus:outline-none 
    focus:ring-2 
    focus:ring-[#8B0000]/50
    font-['poppins'] 
    text-[15px] 
    cursor-pointer 
    group
  `;

  const activeItemClass = `
    ${baseItemClass} 
    bg-[#8B0000] 
    text-white 
    shadow-lg 
    shadow-[#8B0000]/30 
    scale-105
  `;

  return (
    <div className="w-full flex items-center justify-center relative">
      {/* Blade-Like Background Effect */}
      <div className="absolute -top-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-50"></div>
      
      <ReactPaginate
        breakLabel={
          <span className={`${itemClass} opacity-50`}>
            ...
          </span>
        }
        nextLabel={
          <div className={`${itemClass} group`}>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        }
        onPageChange={(selectedPage) => setPage(selectedPage.selected + 1)}
        pageRangeDisplayed={5}
        containerClassName="flex items-center gap-3 flex-wrap relative z-10"
        pageClassName="page-item"
        pageLinkClassName={itemClass}
        activeClassName="page-active"
        activeLinkClassName={activeItemClass}
        previousLabel={
          <div className={`${itemClass} group`}>
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </div>
        }
        pageCount={pageInfo?.lastPage}
        renderOnZeroPageCount={null}
        // Custom Breakpoints
        marginPagesDisplayed={2}
      />

      {/* Subtle Blade Drip Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        {[...Array(3)].map((_, index) => (
          <div 
            key={index}
            className="absolute w-[2px] bg-gradient-to-b from-[#8B0000] to-transparent opacity-20 animate-blood-drip"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Pagination;