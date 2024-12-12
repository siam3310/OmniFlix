import Movies from "@/content/catalog/Movies"
import { Fragment } from "react"

const Page = () => {
  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">
          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent top-[1px]"></div>

          <div className="mt-[15px] flex justify-between items-center">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins'] drop-shadow-[0_2px_4px_rgba(139,0,0,0.3)]">Catalog</h1>
          </div>

          <div className="flex gap-4 mt-4 mb-32 max-[780px]:flex-col">
            <Movies />
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div 
        className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] 
        bg-[#8B0000]/20 blur-[200px] 
        animate-pulse duration-[4s] ease-in-out"
      ></div>
      <div 
        className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] 
        bg-[#420000]/30 blur-[215.03px] 
        translate-x-[70%] z-0 rounded-b-[30%] 
        animate-pulse duration-[6s] ease-in-out"
      ></div>
      
      {/* Sophisticated background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0 
        bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
        [background-size:16px_16px]
        before:content-[''] before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-[#0d0d0d] before:via-[#1a0000]/20 before:to-[#0d0d0d] 
        before:opacity-50"
      />
    </Fragment>
  )
}

export default Page