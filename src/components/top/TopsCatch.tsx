import { TOPS_CATCH_TITLE_LINES, TOPS_CATCH_SUBTITLE } from "@/constants";
import logo_5 from "@/assets/logo_5.png";

const TopsCatch = () => {
  return (
    <div className="relative grid w-full min-h-[80vh] place-items-center bg-black text-white text-center">
      {/* テキストブロック */}
      <div className="px-4 sm:px-6 w-[70vw] max-w-[70vw] flex flex-col items-center">
        {TOPS_CATCH_TITLE_LINES.map((line, index) => (
          <p
            key={index}
            className="mx-auto text-3xl sm:text-5xl md:text-6xl lg:text-7xl
                       font-extrabold leading-[1.1] tracking-tight whitespace-nowrap"
            style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
          >
            {line}
          </p>
        ))}

        {TOPS_CATCH_SUBTITLE.map((line, index) => (
        <p
          key={index}
          className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-extrabold
                     uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
            {line}
          </p>
        ))}
      </div>

      {/* 下部画像 */}
      <div className="pointer-events-none select-none absolute inset-x-0
                      flex justify-center bottom-20 md:bottom-10">
        <img
          src={logo_5}
          alt="REIWAROMAN"
          className="h-auto object-contain w-[35vw]"
        />
      </div>
    </div>
  );
};

export default TopsCatch;
