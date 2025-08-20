import TopCatch from "@/components/top/TopCatch";
import IntroductionCatch from "@/components/introduction/IntroductionCatch";
import IntroductionLive from "@/components/introduction/IntroductionLive";
import IntroductionVenue from "@/components/introduction/IntroductionVenue";

export default function Main() {
  return (
    <main className="w-full">
      {/* TOP */}
      <section id="top" className="scroll-mt-[72px]">
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
    </main>
  );
}
