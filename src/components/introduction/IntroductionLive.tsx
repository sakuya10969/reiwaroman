import reiwa6 from "@/assets/reiwa_6.png";

// 背景とティント濃度
const BG = reiwa6; // 例: "/assets/arena.jpg"
const TINT = 0.65; // 赤ティントの濃さ（0〜1）

const IntroductionLive = () => {
  return (
    <div
      className="relative w-full overflow-hidden text-white"
      style={{ minHeight: "100vh" }}
    >
      {/* 背景（画像 or 黒） */}
      <div
        className="absolute inset-0 bg-black bg-center bg-cover"
        style={{ backgroundImage: BG ? `url(${BG})` : "none" }}
        aria-hidden="true"
      />

      {/* 暗幕（黒） */}
      <div
        className="absolute inset-0 bg-black/45"
        aria-hidden="true"
      />

      {/* 赤ティント（multiply） */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(200,0,0,${TINT})`, mixBlendMode: "multiply" }}
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 左：説明カラム（lgで縦書き） */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <p
              className="text-sm sm:text-base leading-relaxed text-white/90 lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] lg:leading-7 lg:tracking-widest"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              国内お笑い史上、最大キャパシティ2万人の単独ライブ。<br />
              漫才だけでなく、演出・映像・体験・記録まで含めた複合プロジェクト。<br />
              ポッドキャストでも活躍する令和ロマンならではの、<br />
              「音・声」にこだわった構成。<br />
              だれもお笑いをやったことのないステージで、<br />
              誰もやったことの無い舞台に挑戦する。
            </p>
          </div>

          {/* 右：大見出し（lgで縦書き・強調） */}
          <div className="lg:col-span-6 flex lg:justify-end">
            <h2
              className="font-extrabold text-[clamp(28px,8vw,72px)] lg:[writing-mode:vertical-rl] lg:[text-orientation:upright] lg:leading-[1.15] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              2万人が体感する<br />
              未だかつてない<br />
              お笑いライブ
            </h2>
          </div>
        </div>

        {/* 余白（SPで詰まり防止） */}
        <div className="mt-8 lg:mt-0" />
      </div>
    </div>
  );
};

export default IntroductionLive;
