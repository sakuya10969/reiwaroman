import NewsRow from "@/components/news/NewsRow";
import type { NewsListProps } from "@/types";

const NewsList = ({
  items,
  bgColorClass = "bg-[#8f242b]",
  pyClass = "py-16 md:py-24",
}: NewsListProps) => {
  return (
    <div className={`relative text-white min-h-[100vh] flex items-center justify-center ${bgColorClass}`}>
      <div className={`mx-auto w-[80%] px-4 ${pyClass}`}>
        {/* 見出し */}
        <h2
          className="w-full text-center text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "Prompt, sans-serif" }}
        >
          <span className="inline-block underline underline-offset-8 decoration-2 scale-x-[1.3] scale-y-[0.8]">
            NEWS
          </span>
        </h2>

        {/* リスト */}
        <div className="mt-4 md:mt-8 space-y-1 md:space-y-2">
          {items.map((item, i) => (
            <NewsRow key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
