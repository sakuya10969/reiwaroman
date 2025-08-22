import { CAUTION_CONTENTS } from "@/constants";

const Caution = () => {
  return (
    <div className="relative w-full min-h-[100vh] bg-[#7b0f14] text-white py-10 sm:py-16">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* タイトル */}
        <h2
          className="w-full text-center text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "Prompt, sans-serif" }}
        >
          <span className="inline-block underline underline-offset-8 decoration-2 scale-x-[1.3] scale-y-[0.8]">
            CAUTION
          </span>
        </h2>

        {/* 注意事項リスト */}
        <ul className="mt-6 text-[13px] leading-relaxed">
          {CAUTION_CONTENTS.map((line, i) => (
            <li key={i} className="relative pl-5" style={{ fontFamily: '"a-otf-futo-min-a101-pr6n", serif' }}>
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
