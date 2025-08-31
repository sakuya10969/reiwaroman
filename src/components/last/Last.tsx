import last from "@/assets/last.jpg";
import last_mobile from "@/assets/last_mobile.jpg";
import type { LastProps } from "@/types";

const Last = ({
  backgroundImageUrl = last,
  FooterText = "RE:IWAROMAN作成委員会",
}: LastProps) => {
  return (
    <div className="relative w-full min-h-screen md:min-h-[180vh] flex items-center">
      {/* 背景 */}
      <picture className="absolute inset-0 -z-10">
        <source media="(max-width: 430px)" srcSet={last_mobile} />
        <img
          src={backgroundImageUrl}
          alt=""
          className="w-full h-full object-cover bg-black"
          aria-hidden="true"
        />
      </picture>
      <div className="w-full flex justify-center absolute bottom-3">
        <p
          className="text-[#a3a1a1] tracking-wider"
          style={{
            fontFamily: "momochidori, sans-serif",
            fontWeight: 700,
            fontSize: "0.8em",
          }}
        >
          &copy;{FooterText}
        </p>
      </div>
    </div>
  );
};

export default Last;
