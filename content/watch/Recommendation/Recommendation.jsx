import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard"
import { getRecommendation } from "@/lib/MoviesFunctions"
import { Fragment } from "react"

const Recommendation = async ({ MovieId, type }) => {
  const { results: recommendation = [] } = await getRecommendation(MovieId, type) || {};

  return (
    <div className="w-full min-[1125px]:max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4 text-[#8B0000]">
        Recommendation
      </div>

      <div className="w-full flex flex-col gap-3 max-[1125px]:grid max-[1125px]:grid-cols-[repeat(auto-fit,minmax(306px,1fr))]">
        {recommendation?.slice(0, 5)?.map((item, index) => (
          <Fragment key={index}>
            <RecommendationCard 
              data={item} 
              type={!recommendation?.results?.length <= 5 ? item?.media_type : type} 
            />
          </Fragment>
        ))}

        {/* Fallback for Empty Recommendations */}
        {recommendation?.length === 0 && (
          <div className="text-[#ffffff8a] text-center py-4 bg-[#1a1a1a] rounded-md">
            No recommendations found. 
            <span className="text-[#8B0000] ml-1 cursor-pointer hover:underline">
              Explore similar content
            </span>
          </div>
        )}
      </div>

      {/* Subtle Blade-like Accent */}
      <div className="mt-4 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-50"></div>
    </div>
  )
}

export default Recommendation