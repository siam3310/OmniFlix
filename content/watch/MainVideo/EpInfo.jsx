const EpInfo = ({ episode }) => {
  return (
    <div className="h-full flex items-center justify-center flex-col w-96 px-14 text-center text-sm max-[880px]:p-4 max-[880px]:w-full bg-[#1a0000]/80 border-r border-[#420000]/30">
      <p className="text-[#ffffff8a] mb-2">
        You are watching <span className="text-[#8B0000] font-semibold">Episode {episode}</span>
      </p>
      <p className="text-[#ffffff6a] text-xs italic">
        If this server won't work, switch to another
      </p>
      <div className="absolute bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-50"></div>
    </div>
  )
}

export default EpInfo