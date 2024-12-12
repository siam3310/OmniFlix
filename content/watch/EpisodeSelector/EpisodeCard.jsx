import { useCallback, useEffect, useState } from "react";
import { useWatchContext } from "@/context/Watch";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const EpisodeCard = ({ info, currentEp, loading, watchedEP, posterImg }) => {
  const { setEpisode, season } = useWatchContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorLoadingImage, setErrorLoadingImage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setErrorLoadingImage(false);
  }, [season]);

  const handleClick = useCallback(() => {
    const updateSortInUrl = (episodeNumber) => {
      const updatedParams = new URLSearchParams(searchParams);
      if (episodeNumber) {
        updatedParams.set("ep", episodeNumber);
      } else {
        updatedParams.delete("ep");
      }

      const newUrl = `${window.location.pathname}${updatedParams.toString() ? `?${updatedParams}` : ""}`;
      router.push(newUrl, { scroll: false });
    };

    if (info?.episode_number) {
      setEpisode(info.episode_number);
      updateSortInUrl(info.episode_number);
    }
  }, [info?.episode_number, setEpisode, searchParams, router]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex py-2 h-[96px] my-[3px] border-2 border-[#21232e] rounded-md bg-[#242430] cursor-pointer group relative"
      >
        <div className="absolute bottom-1/2 translate-y-1/2 flex gap-3 w-full">
          <div className="h-[80px] min-w-[150px] bg-[#48455f] rounded-md animate-pulse"></div>
          <div className="w-full flex flex-col gap-3">
            <div className="h-4 w-full bg-[#48465e] rounded-sm animate-pulse"></div>
            <div className="h-6 w-full bg-[#48465e] rounded-sm animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  const isCurrentEpisode = currentEp === info?.episode_number;
  const isWatched = watchedEP?.includes(info?.episode_number);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={clsx(
        "flex gap-3 py-2 border-2 rounded-md cursor-pointer group relative overflow-hidden",
        {
          "border-[#8B0000]/70": isCurrentEpisode,
          "border-[#420000]/30": !isCurrentEpisode,
          "bg-[#1a0000]/30": isCurrentEpisode,
          "bg-[#0d0d0d]": !isCurrentEpisode && !isWatched,
          "bg-[#1a0000]/20 hover:bg-[#0d0d0d]": isWatched,
          "hover:bg-[#1a0000]/20": !isCurrentEpisode,
        }
      )}
      onClick={handleClick}
    >
      {/* Hover Accent */}
      {isHovered && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-[2px] bg-[#8B0000] z-10"
        />
      )}

      <div className="w-full max-w-[150px] relative">
        <Image
          src={`https://image.tmdb.org/t/p/w250_and_h141_bestv2${!errorLoadingImage ? info?.still_path : posterImg}`}
          alt={`Episode ${info?.episode_number}`}
          width={150}
          height={100}
          onError={() => setErrorLoadingImage(true)}
          className="object-cover w-full h-[82px] rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="text-[#ffffffe0] absolute bottom-1 right-1 bg-[#262233d4] px-1 rounded-lg text-[15px]">
          {info?.runtime || 24}m
        </div>
      </div>
      <div className="w-full pr-1 flex flex-col justify-center">
        <div 
          className={clsx(
            "text-slate-200 break-words overflow-hidden text-ellipsis line-clamp-2 font-['Poppins'] text-sm transition-colors duration-300",
            {
              "text-[#8B0000]": isCurrentEpisode,
            }
          )}
        >
          {info?.name || "No title available"}
        </div>
        <div className="text-[#ffffffa3] font-['Poppins'] text-[14px] flex items-center gap-2">
          <span>Episode {info?.episode_number}</span>
          {isWatched && (
            <span className="text-[#8B0000] text-xs bg-[#8B0000]/10 px-2 rounded-full">
              Watched
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EpisodeCard;