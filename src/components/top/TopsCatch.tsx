const TopsCatch = () => {
  return (
    <div className="relative grid min-h-svh w-full place-items-center bg-black text-white text-center">
      {/* テキストブロック */}
      <div className="px-4 sm:px-6 pt-16 pb-36 sm:pb-44 md:pb-52">
        <h1
          className="mx-auto max-w-[92vw] sm:max-w-3xl [text-wrap:balance]
                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                     font-extrabold leading-[1.1] tracking-tight"
          style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
        >
          日本一の漫才師、限界突破へ。
        </h1>

        <p
          className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-extrabold
                     uppercase tracking-[0.2em]"
          style={{ fontFamily: 'Prompt, sans-serif' }}
        >
          JAPAN&apos;S TOP MANZAI COMEDIANS, BREAKING ALL LIMITS.
        </p>
      </div>

      {/* 下部画像 */}
      <div className="pointer-events-none select-none absolute inset-x-0
                      flex justify-center bottom-10">
        <img
          src="src/assets/5.png"
          alt="REIWAROMAN"
          className="h-auto object-contain w-[35vw]"
        />
      </div>
    </div>
  );
};

export default TopsCatch;
