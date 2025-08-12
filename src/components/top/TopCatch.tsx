import PageLayout from "@/components/layouts/PageLayout";

const TopCatch = () => {
  return (
    <PageLayout>
      <section className="relative grid place-items-center min-h-[70vh] bg-black">
        <div className="text-center px-6">
          <h1 className="text-[clamp(40px,7vw,72px)] font-black leading-tight tracking-tight">
            日本一の漫才師、限界突破へ。
          </h1>
          <p className="mt-4 text-[13px] sm:text-sm font-extrabold uppercase tracking-[0.2em] opacity-90">
            JAPAN&apos;S TOP MANZAI COMEDIANS, BREAKING ALL LIMITS.
          </p>
        </div>

        {/* 下部センターロゴ */}
        <div className="absolute bottom-8 w-full grid place-items-center">
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
