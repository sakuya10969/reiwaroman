import TopsRotator from "@/components/top/TopsRotator";
import IntroductionCatch from "@/components/introduction/IntroductionCatch";
import IntroductionLive from "@/components/introduction/IntroductionLive";
import IntroductionVenue from "@/components/introduction/IntroductionVenue";
import NewsCatch from "@/components/news/NewsCatch";
import NewsList from "@/components/news/NewsList";
import Caution from "@/components/caution/Caution";

export default function Main() {
  return (
    <main className="w-full">
      {/* TOP */}
      <section id="tops" className="scroll-mt-[64px]">
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

      {/* NEWS - CATCH */}
      <section id="news-catch" className="scroll-mt-[64px]">
        <NewsCatch />
      </section>

      {/* NEWS - LIST */}
      <section id="news-list" className="scroll-mt-[64px]">
        <NewsList />
      </section>

      {/* CAUTION */}
      <section id="caution" className="scroll-mt-[64px]">
        <Caution />
      </section>
    </main>
  );
}
