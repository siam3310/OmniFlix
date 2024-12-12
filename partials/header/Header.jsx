import { nightTokyo } from "@/utils/fonts"
import styles from "./header.module.css"
import Link from "next/link"
import Image from "next/image"
import Links from "./Links"
import Search from "./Search"
import Responsive from "./Responsive"


const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        <div className={styles.left}>

          <Responsive />

          <Link href={"/"} className={`${nightTokyo.className} text-white flex items-center gap-2`}>
            
       {/**   <span className="text-3xl font-bold 
  text-transparent 
  bg-clip-text 
  bg-gradient-to-r 
  from-[#8B0000] 
  to-[#FF4500] 
  drop-shadow-[0_2px_4px_rgba(139,0,0,0.4)]
  relative
  after:content-['OmniFlix']
  after:absolute
  after:top-0
  after:left-0
  after:text-transparent
  after:bg-clip-text
  after:bg-gradient-to-r
  after:from-[#FFFFFF]/20
  after:to-[#FFFFFF]/10
  after:blur-sm">
    OmniFlix
</span>    */}  
<span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] drop-shadow-[0_2px_4px_rgba(139,0,0,0.3)]">
OmniFlix
  <span className="text-xs ml-2 bg-[#8B0000] text-white px-2 py-1 rounded-full align-top">
    Beta
  </span>
</span>
 </Link>

          {/* links */}
          <Links />

        </div>

        <div className={`${styles.right} min-[1390px]:w-[24%]`}>
          <Search />
          {/* notification */}
          {/* <div className="text-2xl text-slate-200">
            <Bell />
          </div> */}


        </div>

      </div>
    </div>
  )
}

export default Header