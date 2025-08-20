const BG = ""; // 例: "/assets/arena-venue.jpg"。空文字なら黒背景
const TINT = 0.55; // 黒の暗幕（0〜1）

const IntroductionVenue = () => {
  return (
    <div
      className="relative w-full flex items-center justify-center text-white overflow-hidden"
      style={{ minHeight: "70vh" }}
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black bg-center bg-cover"
        style={{ backgroundImage: BG ? `url(${BG})` : "none" }}
        aria-hidden="true"
      />
      {/* 黒幕 */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${TINT})` }}
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="relative z-10 text-center">
        <h1
          className="
            font-extrabold 
            text-[clamp(40px,10vw,120px)] 
            leading-[1.1] 
            tracking-wide
          "
        >
          <span className="block text-red-700 text-[clamp(48px,12vw,140px)]">
            横
          </span>
          K ARENA
          <br />
          YOKOHAMA
          <span className="block text-red-700 text-[clamp(48px,12vw,140px)]">
            浜
          </span>
        </h1>
      </div>
    </div>
  );
};

export default IntroductionVenue;
