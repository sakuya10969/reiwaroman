import reiwa6_blackwhite from "@/assets/reiwa_6_blackwhite.png";
import type { NewsCatchProps } from "@/types";

const NewsCatch = ({
  backgroundImageUrl = reiwa6_blackwhite,
  badgeText = "NEWS",
  titleLines = ["REIWA", "REPORT"],
}: NewsCatchProps) => {
  return (
    <section
      className="relative w-full min-h-[100vh] flex items-center"
      aria-label={`${badgeText} ${titleLines.join(" ")}`}
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          filter: "grayscale(100%)",
        }}
        aria-hidden="true"
      />

      {/* 暗幕オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/70"
        aria-hidden="true"
      />

      {/* コンテンツラッパー */}
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 円形パネル */}
        <div
          className="relative aspect-square w-[70vw] max-w-[400px] min-w-[400px] rounded-full shadow-2xl bg-[#a1252b]"
          role="img"
          aria-label={`${titleLines.join(" ")}`}
        >
          {/* 内側レイアウト */}
          <div className="absolute inset-0 flex flex-col items-center justify-between text-center px-6 py-16">
            {/* BADGE - 上部 */}
            <div className="text-xs tracking-[0.25em] text-white/90 md:text-sm flex-shrink-0 relative top-2" style={{ fontFamily: 'Prompt, sans-serif' }}>
              <span className="inline-block border-b-2 border-white/80 pb-0.5 font-semibold">
                {badgeText}
              </span>
            </div>

            {/* タイトル行 - 真ん中 */}
            <h1 className="leading-none flex-grow flex flex-col items-center justify-center">
              {titleLines.map((line, idx) => (
                <span
                  key={idx}
                  className="block font-extrabold uppercase text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide"
                  style={{ fontFamily: 'Prompt, sans-serif' }}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* 下部スペース */}
            <div className="flex-shrink-0"></div>
          </div>

          {/* 装飾: 外周の微妙なハイライト */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

export default NewsCatch;
