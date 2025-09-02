import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
type TicketPlan = {
  name: string;
  price: string;
  note?: string;
  perks?: string[];
};

const PLANS: TicketPlan[] = [
  {
    name: "SSロマン",
    price: "¥100,000",
    note: "※アリーナ前方確約",
    perks: [
      "リハーサル観覧パス",
      "お見送り＆写真撮影",
      "撮りおろし限定アクスタ",
      "プレミアムステッカー",
      "ロマンフィギュア",
      "ロマンデザインTシャツ",
      "RE:IWAROMANオリジナルタオル",
      "RE:IWAROMANオリジナルキーホルダー",
    ],
  },
  {
    name: "Sロマン",
    price: "¥30,000",
    note: "※アリーナ確約",
    perks: ["リハーサル観覧パス", "撮りおろし限定アクスタ", "プレミアムステッカー", "ロマンデザインTシャツ"],
  },
  { name: "Aロマン", price: "¥15,000", note: "※ロアーミドルスタンド", perks: [] },
  { name: "ロマン", price: "¥10,000", note: "※アッパースタンド", perks: [] },
];

const TicketSection: React.FC = () => {
  return (
    <section id="ticket" className="relative w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        {/* TICKET 見出し */}
        <div className="w-full flex justify-center mb-6 md:mb-8">
            <p className="relative inline-block uppercase after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0 after:h-[1.5px] after:bg-current">
              TICKET
            </p>
        </div>

        {/* ======= SP（md未満）: 添付図どおりの2カラム表風 ======= */}
        <div className="md:hidden">
          {/* ヘッダー行 */}
          <div className="border border-white/40">
            <div className="grid grid-cols-12 border-b border-white/40">
              <div
                className="col-span-5 p-4 text-base font-semibold"
                style={{ fontFamily: '"momochidori", serif', fontWeight: 600 }}
              >
                チケット種類
                <div className="text-xs text-white/80 mt-1">※全席指定（税込）</div>
              </div>
              <div
                className="col-span-7 p-4 text-base font-semibold"
                style={{ fontFamily: '"momochidori", serif', fontWeight: 600 }}
              >
                特典
              </div>
            </div>

            {/* 各プラン行 */}
            {PLANS.map((p, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 border-b border-white/40 last:border-b-0"
              >
                {/* 左セル：券種・価格・注記 */}
                <div className="col-span-5 p-4 border-r border-white/40">
                  <div className="space-y-1" style={{ fontFamily: '"momochidori", serif' }}>
                    <div className="text-lg font-semibold">
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
                          className='before:content-["-"] before:mr-2 before:opacity-90'
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
        <div className="hidden md:block">
          <table className="w-full border-collapse border border-white/40">
            <thead>
              <tr>
                <th
                  className="w-[36%] border border-white/40 p-5 text-left align-middle"
                  style={{ fontFamily: '"momochidori", serif', fontWeight: 600 }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-lg">チケット種類</span>
                    <span className="text-sm text-white/80">※全席指定（税込）</span>
                  </div>
                </th>
                <th
                  className="w-[64%] border border-white/40 p-5 text-left align-middle"
                  style={{ fontFamily: '"momochidori", serif', fontWeight: 600 }}
                >
                  特典
                </th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p, idx) => (
                <tr key={idx}>
                  <td className="border border-white/40 p-5 align-top">
                    <div className="space-y-1" style={{ fontFamily: '"momochidori", serif' }}>
                      <div className="text-xl font-semibold">
                        {p.name} <span className="ml-2 text-white/90">{p.price}</span>
                      </div>
                      {p.note && <div className="text-sm text-white/80">{p.note}</div>}
                    </div>
                  </td>
                  <td className="border border-white/40 p-5 align-top">
                    {p.perks && p.perks.length > 0 ? (
                      <ul className="space-y-1">
                        {p.perks.map((perk, i) => (
                          <li
                            key={i}
                            className='before:content-["-"] before:mr-2 before:opacity-90'
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

export default TicketSection;