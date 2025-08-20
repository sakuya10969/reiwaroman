const BG = ""; // 例: "/assets/arena.jpg"（空文字のままなら黒背景）
const TINT = 0.65; // 赤ティントの濃さ（0〜1）

const IntroductionLive = () => {
  return (
    <div
      className="relative w-full overflow-hidden text-white"
      style={{ minHeight: "70vh" }}
    >
      {/* 背景（画像 or 黒） */}
      <div
        className="absolute inset-0 bg-black bg-center bg-cover"
        style={{ backgroundImage: BG ? `url(${BG})` : "none" }}
        aria-hidden="true"
      />

      {/* 赤ティント＋暗幕 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), rgba(200,0,0,${TINT})`,
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左：説明カラム群（lgで縦書き） */}
          <div className="lg:col-span-6 flex gap-6 justify-start lg:justify-end">
            {[
              "国内お笑い史上、最大キャパシティ2万人の単独ライブ。",
              "漫才だけでなく、演出・映像・体験・記録まで含めた複合プロジェクト。",
              "ポッドキャストでも活躍する令和ロマンならではの「音・声」にこだわった構成。",
              "だれもお笑いをやったことのないステージで、誰もやったことの無い舞台に挑戦する。",
            ].reverse().map((text, i) => (
              <p
                key={i}
                className="
                  text-sm sm:text-base leading-relaxed text-white/90
                  lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]
                  lg:leading-7 lg:tracking-widest
                "
              >
                {text}
              </p>
            ))}
          </div>

          {/* 右：大見出し（lgで縦書き・強調） */}
          <div className="lg:col-span-6 flex lg:justify-end">
            <div className="flex gap-4 lg:gap-6">
              {["2万人が体感する", "未だかつてない", "お笑いライブ"].reverse().map((line, i) => (
                <span
                  key={i}
                  className="
                    font-extrabold
                    text-[clamp(28px,8vw,72px)]
                    lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]
                    lg:leading-[1.15] tracking-tight
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]
                  "
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 余白（SPで詰まり防止） */}
        <div className="mt-8 lg:mt-0" />
      </div>
    </div>
  );
};

export default IntroductionLive;
