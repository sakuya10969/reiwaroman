import reiwa6 from "@/assets/reiwa_6.png";
import { INTRODUCTION_LIVE_CONTENTS, INTRODUCTION_LIVE_TITLE_LINES } from "@/constants";

const IntroductionLive = () => {
  return (
    <div className="relative w-full min-h-[100vh] text-white overflow-hidden">
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

      {/* コンテンツ（← 右寄せ） */}
      <div className="relative z-10 ml-auto w-full max-w-[1280px] px-6 lg:px-10 lg:pr-16 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* 左のダミー余白は削除 */}

          {/* 縦書き本文（左側） */}
          <div className="col-span-12 lg:col-span-5 flex lg:justify-end">
            <p
              className="
                max-w-[22ch]
                text-base md:text-lg text-white/92
                lg:[writing-mode:vertical-rl] lg:[text-orientation:upright]
                lg:leading-7 lg:tracking-wider
                lg:pr-10
                scale-y-80 origin-center
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

          {/* 特大縦組み見出し（右側） */}
          <div className="col-span-12 lg:col-span-7 flex lg:justify-end">
            <h2
              className="
                font-extrabold
                text-[clamp(28px,7.2vw,80px)]
                text-white
                lg:[writing-mode:vertical-rl] lg:[text-orientation:upright]
                lg:leading-[1.08]
                drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)]
                tracking-[0.04em]
                scale-y-[0.7] origin-center
              "
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              {INTRODUCTION_LIVE_TITLE_LINES.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < INTRODUCTION_LIVE_TITLE_LINES.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="mt-10 lg:mt-0" />
      </div>
    </div>
  );
};

export default IntroductionLive;
