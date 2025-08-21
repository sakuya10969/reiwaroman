import TopCatch from "@/components/top/TopCatch";
import IntroductionCatch from "@/components/introduction/IntroductionCatch";
import IntroductionLive from "@/components/introduction/IntroductionLive";
import IntroductionVenue from "@/components/introduction/IntroductionVenue";
import NewsCatch from "@/components/news/NewsCatch";
import Cast from "@/components/cast/Cast"
import Goods from "@/components/goods/Goods"
import Caution from "@/components/caution/Caution"

export default function Main() {
  return (
    <main className="w-full">
      {/* TOP */}
      <section id="top-catch" className="scroll-mt-[72px]">
        <TopCatch />
      </section>

      {/* INTRODUCTION - CATCH */}
      <section id="introduction-catch" className="scroll-mt-[72px]">
        <IntroductionCatch />
      </section>

      {/* INTRODUCTION - LIVE */}
      <section id="introduction-live" className="scroll-mt-[72px]">
        <IntroductionLive />
      </section>

      {/* INTRODUCTION - VENUE */}
      <section id="introduction-venue" className="scroll-mt-[72px]">
        <IntroductionVenue />
      </section>

      {/* NEWS - CATCH */}
      <section id="news-catch" className="scroll-mt-[72px]">
        <NewsCatch />
      </section>

      {/* Cast */}
      <section id="cast" className="scroll-mt-[72px]">
        <Cast />
      </section>

      {/* Goods */}
      <section id="goods" className="scroll-mt-[72px]">
        <Goods />
      </section>

      {/* Caution */}
      <section id="caution" className="scroll-mt-[72px]">
        <Caution />
      </section>

    </main>

  );
}
