import { TOPS_CATCH_TITLE_LINES, TOPS_CATCH_SUBTITLE } from "@/constants";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center flex-col justify-center items-center">
      {/* テキストブロック */}
      <div className="w-[90vw] flex flex-col items-center justify-center">
        <div>
          {TOPS_CATCH_TITLE_LINES.map((line, index) => (
            <p
              key={index}
              className="mx-auto text-3xl md:text-5xl lg:text-6xl
                         font-extrabold leading-[1.1] tracking-tighter whitespace-nowrap scale-x-80"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="my-2">
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
