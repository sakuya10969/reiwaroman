import NewsRow from "@/components/news/NewsRow";
import type { NewsListProps } from "@/types";
import { NEWS } from "@/constants";

const NewsList = ({
  bgColorClass = "bg-[#8f242b]",
  pyClass = "py-16 md:py-24",
}: NewsListProps) => {
  return (
    <div className={`relative text-white w-full max-h-screen flex items-center justify-center ${bgColorClass}`}>
      <div className={`mx-auto max-w-[80vw] px-4 ${pyClass}`}>
        {/* 見出し */}
        <h2
          className="w-full text-center text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "Prompt, sans-serif" }}
        >
          <span className="inline-block underline underline-offset-8 decoration-2 scale-x-130 scale-y-80">
            NEWS
          </span>
        </h2>

        {/* リスト */}
        <div className="mt-4 md:mt-8 space-y-1 md:space-y-2">
          {NEWS.map((item, i) => (
            <NewsRow key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
