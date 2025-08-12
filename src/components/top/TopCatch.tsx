import PageLayout from "@/components/layouts/PageLayout";

const TopCatch = () => {
  return (
    <PageLayout>
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] w-full bg-black text-center">
        <div className="px-6">
          <h1 className="text-[clamp(40px,7vw,72px)] font-extrabold leading-tight tracking-[-0.05em] font-serif">
            日本一の漫才師、限界突破へ。
          </h1>
          <p className="mt-4 text-[13px] sm:text-sm font-extrabold uppercase tracking-widest">
            JAPAN&apos;S TOP MANZAI COMEDIANS, BREAKING ALL LIMITS.
          </p>
        </div>

        {/* 下部センターロゴ */}
        <div className="absolute bottom-8 flex justify-center w-full">
          <img
            src="/assets/logo-reiwaroman.svg"
            alt="REIWAROMAN"
            className="w-40 h-auto"
          />
        </div>
      </section>
    </PageLayout>
  );
};

export default TopCatch;
