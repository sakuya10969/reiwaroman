import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { TICKET_PLANS } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const Ticket = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const table = tableRef.current;

    if (!container || !title || !table) return;

    // 各行（tr要素またはgrid行）を取得してアニメーション対象に
    const tableRows = table.querySelectorAll('tr, .grid.grid-cols-12');

    const ctx = gsap.context(() => {
      gsap.set(title, { y: -50, opacity: 0 });
      gsap.set(tableRows, { y: -50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(title, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(tableRows, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        }, "-=0.5");
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="ticket" className="relative w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* TICKET 見出し */}
        <div ref={titleRef} className="flex justify-center mb-6">
          <div
            className="text-sm text-white md:text-base font-bold transform scale-x-140"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <p className="relative inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current">
              TICKET
            </p>
          </div>
        </div>

        {/* ======= SP（md未満）: 添付図どおりの2カラム表風 ======= */}
        <div ref={tableRef} className="md:hidden">
          <div className="border border-white/40">
            <div className="grid grid-cols-12 border-b border-white/40">
              <div
                className="col-span-5 p-4 text-xs font-medium"
                style={{ fontFamily: '"momochidori", serif' }}
              >
                チケット種類
                <div className="text-xs text-white/80 mt-1">※全席指定（税込）</div>
              </div>
              <div
                className="col-span-7 p-4 text-xs font-medium"
                style={{ fontFamily: '"momochidori", serif' }}
              >
                特典
              </div>
            </div>

            {/* 各プラン行 */}
            {TICKET_PLANS.map((p, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 border-b border-white/40 last:border-b-0"
              >
                {/* 左セル：券種・価格・注記 */}
                <div className="col-span-5 p-4 border-r border-white/40">
                  <div className="space-y-1" style={{ fontFamily: '"momochidori", serif' }}>
                    <div className="text-xs">
                      {p.name} <span className="ml-2 text-white/90">{p.price}</span>
                    </div>
                    {p.note && <div className="text-xs text-white/80">{p.note}</div>}
                  </div>
                </div>

                {/* 右セル：特典 */}
                <div className="col-span-7 p-4">
                  {p.perks && p.perks.length > 0 ? (
                    <ul className="space-y-1">
                      {p.perks.map((perk, i) => (
                        <li
                          key={i}
                          className='before:content-["-"] before:mr-2 before:opacity-90 text-xs'
                          style={{ fontFamily: '"momochidori", serif' }}
                        >
                          {perk}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="min-h-[2.25rem]" aria-hidden />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======= PC（md以上）: 既存のテーブルデザイン ======= */}
        <div ref={tableRef} className="hidden md:block">
          <table className="w-full border-collapse border border-white/40">
            <thead>
              <tr>
                <th
                  className="w-[36%] border border-white/40 p-5 text-left align-middle"
                  style={{ fontFamily: '"momochidori", serif' }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">チケット種類</span>
                    <span className="text-xs text-white/80">※全席指定（税込）</span>
                  </div>
                </th>
                <th
                  className="w-[64%] border border-white/40 p-5 text-left align-middle"
                  style={{ fontFamily: '"momochidori", serif' }}
                >
                  <span className="text-sm">特典</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {TICKET_PLANS.map((p, idx) => (
                <tr key={idx}>
                  <td className="border border-white/40 p-5 align-top">
                    <div className="space-y-1" style={{ fontFamily: '"momochidori", serif' }}>
                      <div className="text-sm">
                        {p.name} <span className="ml-2 text-white/90">{p.price}</span>
                      </div>
                      {p.note && <div className="text-xs text-white/80">{p.note}</div>}
                    </div>
                  </td>
                  <td className="border border-white/40 p-5 align-top">
                    {p.perks && p.perks.length > 0 ? (
                      <ul className="space-y-1">
                        {p.perks.map((perk, i) => (
                          <li
                            key={i}
                            className='before:content-["-"] before:mr-2 before:opacity-90 text-sm'
                            style={{ fontFamily: '"momochidori", serif' }}
                          >
                            {perk}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="min-h-[2.5rem]" aria-hidden />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Caution との間に少しだけスペース */}
      <div className="h-6 md:h-10 bg-black" />
    </section>
  );
};

export default Ticket;