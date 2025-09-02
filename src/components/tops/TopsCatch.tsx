import { TOPS_CATCH_TITLE,TOPS_CATCH_SUBTITLE } from "@/constants";
import styles from "./TopsCatch.module.css";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center flex-col justify-center items-center">
      {/* テキストブロック */}
      <div className="w-[90vw] flex flex-col items-center justify-center">
        <div>
          <h1
            className={`${styles.forceWritingMode}
                       mx-auto text-3xl font-extrabold leading-[1.1] tracking-tighter scale-y-125 mb-2 md:mb-5
                       md:text-5xl lg:text-6xl`}
            style={{
              fontFamily: '"dnp-shuei-shogomincho-std", serif',
            }}
          >
            {TOPS_CATCH_TITLE}
          </h1>
          <h3 className = "text-sm md:text-xl mt-4 scale-x-150" style={{ fontFamily: "Prompt, sans-serif", fontWeight: 700 }}>{TOPS_CATCH_SUBTITLE}</h3>
        </div>
      </div>
    </div>
  );
};

export default TopsCatch;