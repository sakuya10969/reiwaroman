import { CAUTION_CONTENTS } from "@/constants";
import BG from "@/assets/reiwa_12.png";
import type { CautionProps } from "@/types";

const BackGroundImage = BG;
const Caution = ({
  badgeText = "CAUTION",
}: CautionProps) => {
  return (
    <div className="relative w-full isolate">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-20"
        aria-hidden="true"
        style = {{ backgroundImage:`url(${BackGroundImage})`}}
      />

      {/* 半透明赤のオーバーレイ */}
      <div className="absolute inset-0 bg-[#e12027]/50 -z-18" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col items-center">
        {/* 上部のバッジ */}
        <div className="flex justify-center mb-6">
          <div
            className="text-sm text-white/90 md:text-sm font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <span className="inline-block font-bold uppercase underline underline-offset-5">
              {badgeText}
            </span>
          </div>
        </div>
        {/* 注意事項リスト */}
        <ul className="mt-4 text-xs md:text-sm leading-relaxed wm-[85%]">
          {CAUTION_CONTENTS.map((line, i) => (
            <li key={i} className="relative pl-5" style={{ fontFamily: '"momochidori", serif' ,fontWeight: 500}}>
              <span className="absolute left-0">※</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Caution;