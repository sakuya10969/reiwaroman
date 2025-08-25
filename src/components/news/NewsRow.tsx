import { ArrowRight } from "lucide-react";

import { formatY_MM_DD } from "@/utils";
import type { NewsItem } from "@/types";

const NewsRow = ({ item }: { item: NewsItem }) => {
  const { year, md } = formatY_MM_DD(item.date);
  const Wrapper: any = item.href ? "a" : "div";

  return (
    <Wrapper
      href={item.href}
      className="group relative grid w-full items-center grid-cols-[auto_1fr_auto] gap-x-2 sm:gap-x-4 md:gap-x-8 rounded-lg px-2 sm:px-4 md:px-4 py-3 sm:py-3 md:py-3 transition-colors hover:bg-white/5"
    >
      {/* 日付 */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-8 min-w-[50px] sm:min-w-[70px] md:min-w-[80px]">
        <div className="leading-none">
          <div
            className="text-xs sm:text-sm md:text-base font-extrabold scale-x-130"
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            {year}
          </div>
          <div
            className="text-lg sm:text-xl md:text-3xl font-extrabold -mt-0.5 sm:-mt-0.5 md:-mt-1 scale-x-130"
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            {md}
          </div>
        </div>
        <div className="h-8 sm:h-8 md:h-10 w-0.5 ml-2 bg-white/70" aria-hidden />
      </div>

      {/* タイトル */}
      <div className="text-xs sm:text-sm md:text-base font-semibold text-white/95 leading-relaxed">
        {item.title}
      </div>

      {/* 矢印 */}
      <div className="justify-self-end pr-0.5 sm:pr-1 md:pr-2 text-white" aria-hidden>
        <ArrowRight
          size={16}
          className="sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Wrapper>
  );
};

export default NewsRow;
