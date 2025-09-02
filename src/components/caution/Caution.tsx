import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAUTION_CONTENTS } from "@/constants";
import reiwa12 from "@/assets/Caution.jpg";
import type { CautionProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// const Caution = ({
//   badgeText = "CAUTION",
// }: CautionProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const badgeRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLUListElement>(null);

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const badge = badgeRef.current;
//     const list = listRef.current;

//     if (!container || !badge || !list) return;

//     // ★★★ 変更点①：リストの各行（li）を取得 ★★★
//     const listItems = list.querySelectorAll('li');

//     const ctx = gsap.context(() => {
//       // 初期状態のセットアップ
//       gsap.set(badge, { y: -50, opacity: 0 });
//       // ★★★ 変更点②：リスト全体ではなく、各行を非表示に ★★★
//       gsap.set(listItems, {
//         y: -50,
//         opacity: 0,
//       });

//       // スクロールトリガーでアニメーション実行
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: container,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // バッジ全体を塊としてアニメーション
//       tl.to(badge, {
//         y: 0,
//         opacity: 1,
//         duration: 0.8,
//         ease: "power2.out",
//       });

//       // ★★★ 変更点③：リストの各行を順番にアニメーション ★★★
//       tl.to(listItems, {
//         y: 0,
//         opacity: 1,
//         duration: 0.8, // 各行のアニメーション時間
//         ease: "power2.out",
//         stagger: 0.15, // 0.15秒ずつずらして開始
//       }, "-=0.5");

//     }, container);

//     return () => ctx.revert();
//   }, []);

//   return (
//     // JSX部分は変更なし
//     <div ref={containerRef} id="caution" className="relative w-full isolate lg:min-h-screen">
//       {/* 背景 */}
//       <div
//         className="absolute inset-0 bg-red-900 -z-20 bg-cover bg-center"
//         aria-hidden="true"
//         style = {{ backgroundImage:`url(${reiwa12})`}}
//       />

//       {/* 半透明赤のオーバーレイ */}
//       <div className="absolute inset-0 bg-red-900/50 -z-18" aria-hidden="true" />

//       {/* コンテンツ */}
//       <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
//         {/* 上部のバッジ */}
//         <div ref={badgeRef} className="flex justify-center mb-6">
//           <div
//             className="text-sm text-white md:text-base font-bold transform scale-x-150"
//             style={{ fontFamily: 'Prompt, sans-serif' }}
//           >
//             <p className="inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0
//               after:-bottom-0 after:h-[1.5px] after:bg-current">
//               {badgeText}
//             </p>
//           </div>
//         </div>
//         {/* 注意事項リスト */}
//         <ul ref={listRef} className="mt-4 text-xs md:text-sm leading-relaxed scale-y-100 text-white w-[70vw] max-w-2xl md:max-w-4xl lg:max-w-5xl">
//           {CAUTION_CONTENTS.map((line, i) => (
//             <li key={i} className="relative pl-5 mb-1" style={{ fontFamily: '"momochidori", serif' ,fontWeight: 500}}>
//               <span className="absolute left-0">※</span>
//               {line}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Caution;

const Caution = ({ badgeText = "CAUTION" }: CautionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    const list = listRef.current;
    if (!container || !badge || !list) return;

    // li（トップレベル＋ネスト）をすべて対象にフェード
    const listItems = list.querySelectorAll('li');

    const ctx = gsap.context(() => {
      gsap.set(badge, { y: -50, opacity: 0 });
      gsap.set(listItems, { y: -50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(badge, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
        .to(listItems, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        }, "-=0.5");
    }, container);

    return () => ctx.revert();
  }, []);

  // ★ 追加：行データを「表示用ブロック」に変換
  type Block =
    | { kind: "note"; text: string }                     // 先頭「※」系
    | { kind: "separator" }                              // 罫線
    | { kind: "link"; label: string; href: string }      // ＜ラベル＞ URL
    | { kind: "subheading"; text: string }               // ＜車椅子スペースについて＞
    | { kind: "sublist"; items: string[] };              // 直後の「・」箇条書き

  const toBlocks = (lines: string[]): Block[] => {
    const out: Block[] = [];
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i].trim();

      // 区切り線
      if (/^-{3,}|^[-ー—]{5,}/.test(raw) || raw.includes("----")) {
        out.push({ kind: "separator" });
        continue;
      }

      // ＜ラベル＞ URL
      const linkMatch = raw.match(/^＜(.+?)＞\s*(https?:\/\/\S+)/);
      if (linkMatch) {
        out.push({ kind: "link", label: linkMatch[1], href: linkMatch[2] });
        continue;
      }

      // 小見出し → 直後の「・」を束ねて sublist に
      const headMatch = raw.match(/^＜(.+?)＞$/);
      if (headMatch) {
        out.push({ kind: "subheading", text: headMatch[1] });
        const items: string[] = [];
        let j = i + 1;
        while (j < lines.length && lines[j].trim().startsWith("・")) {
          items.push(lines[j].trim().replace(/^・\s*/, ""));
          j++;
        }
        if (items.length) out.push({ kind: "sublist", items });
        i = j - 1; // 消費した分をスキップ
        continue;
      }

      // 通常の注意行（先頭の ※ は描画側で付けるため除去）
      // out.push({ kind: "note", text: raw });

      out.push({ kind: "note", text: raw.replace(/^※\s*/, "") });
    }
    return out;
  };

  const blocks = toBlocks(CAUTION_CONTENTS);

  return (
    <div ref={containerRef} id="caution" className="relative w-full isolate lg:min-h-screen">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-red-900 -z-20 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage: `url(${reiwa12})` }}
      />
      <div className="absolute inset-0 bg-red-900/50 -z-18" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        {/* バッジ */}
        <div ref={badgeRef} className="flex justify-center mb-6">
          <div
            className="text-sm text-white md:text-base font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <p className="relative inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current">
              {badgeText}
            </p>
          </div>
        </div>

        {/* 注意事項（拡張描画） */}
        <ul
          ref={listRef}
          className="mt-4 text-xs md:text-sm leading-relaxed scale-y-100 text-white w-[70vw] max-w-2xl md:max-w-4xl lg:max-w-5xl"
        >
          {blocks.map((b, i) => {
            if (b.kind === "note") {
              return (
                <li key={i} className="relative pl-5 mb-1" style={{ fontFamily: '"momochidori", serif', fontWeight: 500 }}>
                  {/* <span className="absolute left-0">※</span> */}
                  <span className="absolute left-0">※</span>
                  {b.text}
                </li>
              );
            }
            if (b.kind === "separator") {
              return (
                <li key={i} className="list-none my-4" aria-hidden>
                  <hr className="border-t border-white/30" />
                </li>
              );
            }
            if (b.kind === "link") {
              return (
                <li key={i} className="list-none mb-2" style={{ fontFamily: '"momochidori", serif', fontWeight: 500 }}>
                  <p>
                    ＜{b.label}＞{" "}
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline break-all"
                    >
                      {b.href}
                    </a>
                  </p>
                </li>
              );
            }
            if (b.kind === "subheading") {
              return (
                <li key={i} className="list-none mt-4 mb-2 font-bold" style={{ fontFamily: '"momochidori", serif' }}>
                  ＜{b.text}＞
                </li>
              );
            }
            // sublist
            return (
              <li key={i} className="list-none mb-2">
                <ul className="list-disc pl-5 space-y-1">
                  {b.items.map((t, j) => (
                    <li key={j} className="marker:text-white/70" style={{ fontFamily: '"momochidori", serif', fontWeight: 500 }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Caution;