"use client"
import { DiscussionEmbed } from 'disqus-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaComment } from "react-icons/fa6";

const Comments = ({ MovieId, title }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const disqusNode = document.querySelector('#disqus_thread');
      if (disqusNode && disqusNode.innerHTML.trim() !== "") {
        setLoading(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="comment" 
      className="text-white bg-[#1a0000] border-2 border-[#8B0000]/30 relative rounded-md pb-4 w-full h-max 
      shadow-lg shadow-[#8B0000]/20"
    >
      <div className="py-2 px-3 flex justify-between items-center border-b border-[#8B0000]/20">
        <div className="text-[#ffffff] text-[18px] font-medium font-['poppins'] flex items-center gap-2">
          <FaComment className="text-[#8B0000]" /> Comments
        </div>
      </div>

      {loading && (
        <div className='px-3 py-4 h-[14rem] grid place-content-center text-6xl text-[#8B0000]/50'>
          <FaComment />
        </div>
      )}

      <div 
        className='px-3 pt-4' 
        style={{ display: loading ? 'none' : 'block' }}
      >
        <DiscussionEmbed
          shortname='movieverse-1'
          config={{
            url: `${process.env.NEXT_PUBLIC_URL}${pathname}`,
            identifier: MovieId,
            title: `${title} Movie - Watch online`,
            language: 'en',
            // Custom Disqus styling
            color: '#8B0000', // Primary color
            // You can add more custom Disqus configurations here
          }}
        />
      </div>

      {/* Subtle Blade-like Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] 
        bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
        opacity-50"
      ></div>
    </div>
  )
}

export default Comments