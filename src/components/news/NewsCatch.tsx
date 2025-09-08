import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reiwa6_blackwhite from "@/assets/IntroductionVenue_NewsCatch.jpg";
import NewsRow from "@/components/news/NewsRow";
import { NEWS } from "@/constants";
import type { NewsCatchProps, NewsListProps } from "@/types";
import styles from "@/components/news/NewsCatch.module.css";

gsap.registerPlugin(ScrollTrigger);

type CombinedNewsProps = NewsCatchProps & NewsListProps;

const NewsCatch = ({
  backgroundImageUrl = reiwa6_blackwhite,
  badgeText = "NEWS",
  titleLines = ["REIWA", "REPORT"],
  bgColorClass = "bg-red-900",
  pyClass = "py-16 md:py-24",
}: CombinedNewsProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const catchContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listContentRef = useRef<HTMLDivElement>(null);
  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const listItemsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current!;
    const container = containerRef.current!;
    const circle = circleRef.current!;
    const catchContent = catchContentRef.current!;
    const badge = badgeRef.current!;
    const title = titleRef.current!;
    const listContent = listContentRef.current!;
    const listHeading = listHeadingRef.current!;
    const listItems = listItemsRef.current!;

    // ▼▼▼▼▼ 変更点：computeCoverScale関数は不要になったため削除 ▼▼▼▼▼
    // const computeCoverScale = () => { ... };
    // ▲▲▲▲▲ 変更点 ▲▲▲▲▲

    const ctx = gsap.context(() => {
      // ▼▼▼▼▼ 変更点：willChangeの対象をclip-pathに変更 ▼▼▼▼▼
      gsap.set(circle, { willChange: "clip-path" });
      // ▲▲▲▲▲ 変更点 ▲▲▲▲▲

      gsap.set(badge, { y: -50, opacity: 0 });
      gsap.set(title.children, { y: -50, opacity: 0 });
      gsap.set(listContent, { autoAlpha: 0 });
      gsap.set(listHeading, { y: -50, opacity: 0 });
      gsap.set(listItems.children, { y: -50, opacity: 0 });

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      textTl.to(badge, { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 });
      textTl.to(title.children, { y: 0, opacity: 1, stagger: 0.2, ease: "power2.out", duration: 0.8 }, "-=0.6");

      const playHoldAnimation = () => {
        document.body.style.overflow = 'hidden';
        const holdTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
          }
        });
        holdTl
          .to(listContent, { autoAlpha: 1, duration: 0.5 })
          .to(listHeading, { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 })
          .to(listItems.children, { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", duration: 1 }, "-=0.4");
      };

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // ▼▼▼▼▼ 変更点：scaleの代わりにclipPathをアニメーション ▼▼▼▼▼
      scrubTl.to(circle, {
        clipPath: "circle(75% at 50% 50%)",
        ease: "none"
      })
      .to(catchContent, { autoAlpha: 0, ease: "none" }, "<");


      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        pin: container,

        snap: {
          snapTo: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },

        onLeave: () => playHoldAnimation(),
        onEnterBack: () => {
          gsap.set(listContent, { autoAlpha: 0 });
          gsap.set(listHeading, { y: -50, opacity: 0 });
          gsap.set(listItems.children, { y: -50, opacity: 0 });
        },
      });

    }, wrapper);

    return () => {
      document.body.style.overflow = '';
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-[330vh] relative">
      <div ref={containerRef} className="w-full h-screen relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black bg-center bg-cover -z-10" style={{ backgroundImage: `url(${backgroundImageUrl})`, filter: "grayscale(100%)" }} />
          <div className="absolute inset-0 bg-black/70 -z-10" />

          {/* ▼▼▼▼▼ 変更点：このdivを全画面表示＋clip-pathに変更 ▼▼▼▼▼ */}
          <div
            ref={circleRef}
            className={`absolute inset-0 w-full h-full ${bgColorClass}`}
            style={{
              zIndex: 1,
              clipPath: "circle(15% at 50% 50%)"
            }}
          />

        </div>
        <div ref={catchContentRef} className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96 flex flex-col items-center justify-between text-center px-6 py-16">
            <div ref={badgeRef} className="text-sm md:text-lg lg:text-xl text-white/90 flex-shrink-0 relative -top-2">
              <p className="inline-block font-bold scale-x-140 origin-center after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current" style={{ fontFamily: 'Prompt, sans-serif' }}>
                {badgeText}
              </p>
            </div>
            <div ref={titleRef} className="leading-none flex-grow flex flex-col items-center justify-center">
              {titleLines.map((line, idx) => (
                <h1 key={idx} className="block font-bold uppercase text-white text-4xl md:text-5xl scale-x-140 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>
                  {line}
                </h1>
              ))}
            </div>
          </div>
        </div>
        <div ref={listContentRef} className={`absolute inset-0 w-full h-full flex items-center justify-center text-white pointer-events-none ${bgColorClass}`} style={{ zIndex: 3 }}>
          <div className={`relative mx-auto max-w-[80vw] w-full h-full flex flex-col justify-center px-4 pointer-events-auto ${pyClass}`}>
            <div className="w-full text-center">
              <h1 ref={listHeadingRef} className="text-sm md:text-base font-bold inline-block relative scale-x-140 origin-center after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current" style={{ fontFamily: "Prompt, sans-serif" }}>
                NEWS
              </h1>
            </div>
            <div ref={listItemsRef} className="mt-4 md:mt-8 space-y-1 md:space-y-2">
              {NEWS.map((item, i) => (
                <NewsRow key={`${item.title}-${i}`} item={item}/>
              ))}
            </div>
          </div>

          <div className="absolute bottom-2 left-0 w-full overflow-hidden sm:hidden">
            <p ref={marqueeRef} className={`${styles.marqueeContent} text-xs text-white`}>
              <span className="inline-block mr-12">
                NEW NEWS WILL BE UPDATED AS IT BECOMES AVAILABLE.
              </span>
              <span className="inline-block mr-12">
                NEW NEWS WILL BE UPDATED AS IT BECOMES AVAILABLE.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCatch;