const TopsCatch = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] w-full bg-black text-center">
      <div className="px-6">
        <h1 
          className="text-[clamp(40px,7vw,72px)] font-extrabold leading-tight tracking-[-0.05em]"
          style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
        >
          日本一の漫才師、限界突破へ。
        </h1>
        <p className="mt-4 text-[13px] sm:text-sm font-extrabold uppercase tracking-widest" style={{ fontFamily: 'Prompt, sans-serif' }}>
          JAPAN&apos;S TOP MANZAI COMEDIANS, BREAKING ALL LIMITS.
        </p>
      </div>
      <div className="absolute bottom-10 flex justify-center w-full">
        <img src="src/assets/5.png" alt="REIWAROMAN" className="w-100 h-auto" />
      </div>
    </div>
  );
};

export default TopsCatch;
