import reiwa6 from "@/assets/reiwa_6.png";
import { INTRODUCTION_LIVE_CONTENTS, INTRODUCTION_LIVE_TITLE_LINES } from "@/constants";

const IntroductionLive = () => {
  return (
    <div className="relative w-full text-white overflow-hidden py-4 md:py-8">
      {/* BG */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${reiwa6})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "rgba(185,0,0,0.65)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* コンテンツ */}
      <div className="relative z-10 w-full md:h-screen px-6 lg:px-10 lg:pr-16 py-4 md:py-16 lg:py-24 flex items-center md:items-start md:justify-end">
        {/* PC: 横並び [本文][タイトル]、SP: 左寄せで縦並び（タイトルが上）、中央配置 */}
        <div className="flex md:flex-row flex-col items-start md:justify-end gap-4 md:gap-6 lg:gap-10 text-left w-full md:w-auto">
          
          {/* 本文（左隣） */}
          <div className="order-2 md:order-1 flex-shrink-0 self-start">
            <p
              className="
                min-w-[40vw] md:max-w-none
                text-base md:text-lg text-white/92
                md:[writing-mode:vertical-rl] md:[text-orientation:upright]
                lg:leading-10 lg:tracking-wider
                scale-y-80 origin-top
              "
              style={{ fontFamily: '"a-otf-futo-min-a101-pr6n", serif' }}
            >
              {INTRODUCTION_LIVE_CONTENTS.map((content, i) => (
                <span key={i}>
                  {content}
                  {i < INTRODUCTION_LIVE_CONTENTS.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* タイトル（最右）— 各列を独立させて上端揃え */}
          <div className="order-1 md:order-2 flex-shrink-0 self-start">
            <div className="flex flex-col md:flex-row-reverse items-start gap-1 md:gap-3 lg:gap-4">
              {INTRODUCTION_LIVE_TITLE_LINES.map((line, i) => (
                <span
                  key={i}
                  className="
                    font-extrabold text-white
                    text-[clamp(28px,7.2vw,70px)]
                    drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]
                    md:[writing-mode:vertical-rl] md:[text-orientation:upright]
                    leading-[1.08]
                    scale-y-80 origin-top
                    whitespace-nowrap
                  "
                  style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionLive;
