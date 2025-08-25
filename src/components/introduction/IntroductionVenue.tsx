import reiwa6_blackwhite from "@/assets/reiwa_6_blackwhite.png";

const TINT = 0.55; // 黒の暗幕（0〜1）

const IntroductionVenue = () => {
  return (
    <div
      className="relative w-full max-h-screen flex items-center justify-center text-white overflow-hidden py-12"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 w-full h-full bg-black bg-center bg-cover"
        style={{ backgroundImage: `url(${reiwa6_blackwhite})` }}
        aria-hidden="true"
      />
      {/* 黒幕 */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ background: `rgba(0,0,0,${TINT})` }}
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="relative z-10 text-center max-w-[70vw]">
        <h1 className="font-extrabold leading-[1.1] tracking-wide">
          <span className="block text-red-700 text-[clamp(48px,10vw,110px)] opacity-70 relative top-8 z-10 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
            横
          </span>
          <span className="inline-block text-[clamp(36px,10vw,100px)] relative z-0 leading-none scale-x-130 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>K ARENA</span>
          <br />
          <span className="inline-block text-[clamp(36px,10vw,100px)] leading-none scale-x-130 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>YOKOHAMA</span>
          <span className="block text-red-700 text-[clamp(48px,10vw,110px)] opacity-70 relative -top-6 md:-top-12 scale-x-130 origin-center" style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}>
            浜
          </span>
        </h1>
      </div>
    </div>
  );
};

export default IntroductionVenue;
