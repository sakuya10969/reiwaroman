import { TOPS_CATCH_TITLE } from "@/constants";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center flex-col justify-center items-center">
      {/* テキストブロック */}
      <div className="w-[90vw] flex flex-col items-center justify-center">
        <div>
          <h1
            className="mx-auto text-3xl md:text-5xl lg:text-6xl
                       font-extrabold leading-[1.1] tracking-tighter whitespace-nowrap
                       writing-mode-vertical-rl text-orientation-upright"
            style={{ 
              fontFamily: '"dnp-shuei-shogomincho-std", serif',
              writingMode: 'vertical-rl',
              textOrientation: 'upright'
            }}
          >
            {TOPS_CATCH_TITLE}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TopsCatch;
