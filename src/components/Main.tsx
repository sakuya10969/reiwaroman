import TopsRotator from "@/components/top/TopsRotator";
import IntroductionCatch from "@/components/introduction/IntroductionCatch";
import IntroductionLive from "@/components/introduction/IntroductionLive";
import IntroductionVenue from "@/components/introduction/IntroductionVenue";
import IntroductionVideo from "@/components/introduction/IntroductionVideo";
import NewsCatch from "@/components/news/NewsCatch";
// import Cast from "@/components/cast/Cast"
import Goods from "@/components/goods/Goods"
import Caution from "@/components/caution/Caution"
// import Last from "@/components/last/Last"
import NewsList from "@/components/news/NewsList";

export default function Main() {
  return (
    <main className="w-full">
      {/* TOP */}
      <section id="tops" className="scroll-mt-[64px] h-auto">
        <TopsRotator />
      </section>

      {/* INTRODUCTION - CATCH */}
      <section id="introduction-catch" className="scroll-mt-[64px]">
        <IntroductionCatch />
      </section>

      {/* INTRODUCTION - LIVE */}
      <section id="introduction-live" className="scroll-mt-[64px]">
        <IntroductionLive />
      </section>

      {/* INTRODUCTION - VENUE */}
      <section id="introduction-venue" className="scroll-mt-[64px]">
        <IntroductionVenue />
      </section>

      {/* INTRODUCTION - VIDEO */}
      <section id="introduction-video" className="scroll-mt-[64px]">
        <IntroductionVideo />
      </section>

      {/* NEWS - CATCH */}
      <section id="news-catch" className="scroll-mt-[64px]">
        <NewsCatch />
      </section>

      {/* NEWS - LIST */}
      <section id="news-list" className="scroll-mt-[64px]">
        <NewsList />
      </section>

      {/* Cast */}
      {/* <section id="cast" className="scroll-mt-[64px]">
        <Cast />
      </section> */}

      {/* Goods */}
      <section id="goods" className="scroll-mt-[64px]">
        <Goods />
      </section>

      {/* Caution */}
      <section id="caution" className="scroll-mt-[64px]">
        <Caution />
      </section>

      {/* Last */}
      {/* <section id="last" className="scroll-mt-[64px]">
        <Last />
      </section> */}

    </main>

  );
}
