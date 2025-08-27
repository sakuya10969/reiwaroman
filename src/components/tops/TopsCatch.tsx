import { TOPS_CATCH_TITLE_LINES, TOPS_CATCH_SUBTITLE } from "@/constants";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center pt-0 flex-col justify-center">
      {/* テキストブロック */}
      <div className="pb-4 sm:px-6 w-[90vw] mx-auto flex flex-col items-center justify-center">
        <div>
          {TOPS_CATCH_TITLE_LINES.map((line, index) => (
            <p
              key={index}
              className="mx-auto text-3xl md:text-5xl lg:text-6xl
                         font-extrabold leading-[1.1] tracking-tighter whitespace-nowrap scale-x-90"
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
            className="text-sm md:text-base font-extrabold
                       uppercase whitespace-nowrap scale-y-80"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopsCatch;
