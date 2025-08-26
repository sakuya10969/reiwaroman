import { TOPS_CATCH_TITLE_LINES, TOPS_CATCH_SUBTITLE } from "@/constants";
import logo_5 from "@/assets/logo_5.png";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center pt-4 flex-col justify-center">
      {/* テキストブロック */}
      <div className="pb-4 sm:px-6 w-[90vw] mx-auto flex flex-col items-center">
        <div>
          {TOPS_CATCH_TITLE_LINES.map((line, index) => (
            <p
              key={index}
              className="mx-auto text-2xl md:text-5xl lg:text-6xl
                         font-extrabold leading-[1.1] tracking-tight whitespace-nowrap scale-x-70"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-2">
          {TOPS_CATCH_SUBTITLE.map((line, index) => (
          <p
            key={index}
            className="text-xs md:text-sm font-extrabold
                       uppercase whitespace-nowrap scale-y-80"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* 下部画像 */}
      <div className="pointer-events-none select-none flex justify-center">
        <img
          src={logo_5}
          alt="REIWAROMAN"
          className="h-24 md:h-28 object-contain w-36 md:w-40"
        />
      </div>
    </div>
  );
};

export default TopsCatch;
