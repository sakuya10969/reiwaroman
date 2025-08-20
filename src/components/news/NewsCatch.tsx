export type NewsCatchProps = {
  backgroundImageUrl?: string;
  badgeText?: string;
  titleLines?: string[];
  circleClassName?: string;
  minHeightClassName?: string;
  overlayOpacity?: number;
  className?: string;
};

const defaultBg =
  "https://images.unsplash.com/photo-1519315901367-c6c6b236f12a?q=80&w=1920&auto=format&fit=crop";

const NewsCatch = ({
  backgroundImageUrl = defaultBg,
  badgeText = "NEWS",
  titleLines = ["REIWA", "REPORT"],
  circleClassName = "bg-[#a1252b]",
  minHeightClassName = "min-h-[86vh]",
  overlayOpacity = 70,
  className = "",
}: NewsCatchProps) => {
  const clamped = Math.max(0, Math.min(100, overlayOpacity));

  return (
    <section
      className={[
        "relative isolate w-full",
        minHeightClassName,
        className,
      ].join(" ")}
      aria-label={`${badgeText} ${titleLines.join(" ")}`}
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 -z-10 bg-black"
        aria-hidden
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%)",
        }}
      />

      {/* 暗幕オーバーレイ */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{ backgroundColor: `rgba(0,0,0,${clamped / 100})` }}
      />

      {/* コンテンツラッパー */}
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 円形パネル */}
        <div
          className={[
            "relative aspect-square w-[70vw] max-w-[400px] min-w-[400px]",
            "rounded-full shadow-2xl",
            circleClassName,
          ].join(" ")}
          role="img"
          aria-label={`${titleLines.join(" ")}`}
        >
          {/* 内側レイアウト */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {/* BADGE */}
            <div className="text-xs tracking-[0.25em] text-white/90 md:text-sm" style={{ fontFamily: 'Prompt, sans-serif' }}>
              <span className="inline-block border-b-2 border-white/80 pb-0.5 font-semibold">
                {badgeText}
              </span>
            </div>

            {/* タイトル行 */}
            <h1 className="leading-none mt-10">
              {titleLines.map((line, idx) => (
                <span
                  key={idx}
                  className={[
                    "block font-extrabold uppercase text-white",
                    // レスポンシブなフォントサイズ（全行統一）
                    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                    "tracking-wide",
                  ].join(" ")}
                  style={{ fontFamily: 'Prompt, sans-serif' }}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>

          {/* 装飾: 外周の微妙なハイライト */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10"
          />
        </div>
      </div>

      {/* 画面端の薄い影（スクロール時の深み） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_40px_60px_rgba(0,0,0,0.6),inset_0_-40px_80px_rgba(0,0,0,0.6)]"
      />
    </section>
  );
}

export default NewsCatch;
