import TopsRotator from "@/components/tops/TopsRotator";
import IntroductionCatch from "@/components/introduction/IntroductionCatch";
import IntroductionLive from "@/components/introduction/IntroductionLive";
// import IntroductionVenue from "@/components/introduction/IntroductionVenue";
import IntroductionVideo from "@/components/introduction/IntroductionVideo";
import NewsCatch from "@/components/news/NewsCatch";
// import Cast from "@/components/cast/Cast"
// import Goods from "@/components/goods/Goods"
import Ticket from "@/components/ticket/Ticket"
import Stage from "@/assets/Stage.png"
import Contact from "@/components/contact/Contact"
import Caution from "@/components/caution/Caution"
import Last from "@/components/last/Last"


export default function Main() {
  return (
    <main className="w-screen">
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

      {/* INTRODUCTION - VIDEO */}
      <section id="introduction-video" className="scroll-mt-[64px]">
        <IntroductionVideo />
      </section>

      {/* INTRODUCTION - VENUE */}
      {/* <section id="introduction-venue" className="scroll-mt-[64px]">
        <IntroductionVenue />
      </section> */}

      {/* NEWS - CATCH */}
      <section id="news-catch" className="scroll-mt-[64px]">
        <NewsCatch />
      </section>


      {/* Cast */}
      {/* <section id="cast" className="scroll-mt-[64px]">
        <Cast />
      </section> */}

      {/* Goods */}
      {/* <section id="goods" className="scroll-mt-[64px]">
        <Goods />
      </section>*/}

      {/* Ticket */}
      <section id="ticket" className="scroll-mt-[64px]">
        <Ticket />
      </section>

      {/* Stage */}
      <section id="stage" className="scroll-mt-[64px]">
        <img src={Stage} alt="Stage" className="w-full h-auto max-h-screen object-contain bg-red-900" />
      </section>

      {/* Caution */}
      <section id="caution" className="scroll-mt-[64px]">
        <Caution />
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-[64px]">
        <Contact />
      </section>

      {/* Last */}
      <section id="last" className="scroll-mt-[64px]">
        <Last />
      </section>
    </main>

  );
}
