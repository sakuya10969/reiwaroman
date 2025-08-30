import { TOPS_CATCH_TITLE } from "@/constants";
import styles from "./TopsCatch.module.css";

const TopsCatch = () => {
  return (
    <div className="flex relative w-full h-full bg-black text-white text-center flex-col justify-center items-center">
      {/* テキストブロック */}
      <div className="w-[90vw] flex flex-col items-center justify-center">
        <div>
          <h1
            className={`${styles.forceWritingMode}
                       mx-auto text-3xl font-extrabold leading-[1.1] tracking-tighter
                       md:text-5xl lg:text-6xl`} // テンプレートリテラルでクラスを結合
            style={{
              fontFamily: '"dnp-shuei-shogomincho-std", serif',
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