import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// (import部分は変更なし)
import reiwa6_blackwhite from "@/assets/IntroductionVenue_NewsCatch.jpg";
import NewsRow from "@/components/news/NewsRow";
import { NEWS } from "@/constants";
import type { NewsCatchProps, NewsListProps } from "@/types";
// ★★★ ステップ2-1：CSSモジュールをインポート ★★★
import styles from "./NewsCatch.module.css";

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

    const computeCoverScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const diag = Math.hypot(vw, vh);
      const r = circle.getBoundingClientRect();
      const d = Math.max(r.width, r.height);
      return (diag / d) * 1.1;
    };

    const ctx = gsap.context(() => {
      gsap.set(circle, { transformOrigin: "50% 50%", willChange: "transform", force3D: true });
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
      scrubTl.to(circle, { scale: computeCoverScale, ease: "none" })
             .to(catchContent, { autoAlpha: 0, ease: "none" }, "<");

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom-=1",
        pin: container,
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
          <div ref={circleRef} className="absolute top-1/2 left-1/2 w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900 origin-center" style={{ zIndex: 1 }} />
        </div>
        <div ref={catchContentRef} className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ zIndex: 2 }}>
          <div className="w-70 h-70 md:w-80 md:h-80 lg:w-96 lg:h-96 flex flex-col items-center justify-between text-center px-6 py-16">
            <div ref={badgeRef} className="text-sm md:text-lg lg:text-xl text-white/90 flex-shrink-0 relative -top-2">
              <p className="inline-block font-bold scale-x-150 origin-center after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current" style={{ fontFamily: 'Prompt, sans-serif' }}>
                {badgeText}
              </p>
            </div>
            <div ref={titleRef} className="leading-none flex-grow flex flex-col items-center justify-center">
              {titleLines.map((line, idx) => (
                <h1 key={idx} className="block font-bold uppercase text-white text-4xl md:text-5xl scale-x-150 origin-center" style={{ fontFamily: 'Prompt, sans-serif' }}>
                  {line}
                </h1>
              ))}
            </div>
          </div>
        </div>
        <div ref={listContentRef} className={`absolute inset-0 w-full h-full flex items-center justify-center text-white pointer-events-none ${bgColorClass}`} style={{ zIndex: 3 }}>
          <div className={`relative mx-auto max-w-[80vw] w-full h-full flex flex-col justify-center px-4 pointer-events-auto ${pyClass}`}>
            <div className="w-full text-center">
              <h1 ref={listHeadingRef} className="text-sm md:text-base font-bold inline-block relative scale-x-150 origin-center after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current" style={{ fontFamily: "Prompt, sans-serif" }}>
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
            {/* ★★★ ステップ2-2：クラス名を修正 ★★★ */}
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