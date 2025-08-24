import { ArrowRight } from "lucide-react";

import { formatY_MM_DD } from "@/utils";
import type { NewsItem } from "@/types";

const NewsRow = ({ item }: { item: NewsItem }) => {
  const { year, md } = formatY_MM_DD(item.date);
  const Wrapper: any = item.href ? "a" : "div";

  return (
    <Wrapper
      href={item.href}
      className="group relative grid w-full items-center grid-cols-[auto_1fr_auto] gap-x-6 md:gap-x-8 rounded-lg px-2 md:px-4 py-2 md:py-3 transition-colors hover:bg-white/5"
    >
      {/* 日付 */}
      <div className="flex items-center gap-6 md:gap-8 min-w-[200px] md:min-w-[240px]">
        <div className="leading-none">
          <div
            className="text-lg md:text-base font-extrabold scale-x-130"
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            {year}
          </div>
          <div
            className="text-4xl md:text-5xl font-extrabold -mt-1 scale-x-130"
            style={{ fontFamily: "Prompt, sans-serif" }}
          >
            {md}
          </div>
        </div>
        <div className="h-8 md:h-10 w-0.5 bg-white/70" aria-hidden />
      </div>

      {/* タイトル */}
      <div className="text-sm md:text-base font-semibold text-white/95">
        {item.title}
      </div>

      {/* 矢印 */}
      <div className="justify-self-end pr-1 md:pr-2 text-white" aria-hidden>
        <ArrowRight
          size={28}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Wrapper>
  );
};

export default NewsRow;
