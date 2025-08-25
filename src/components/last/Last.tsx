import reiwa_13 from "@/assets/reiwa_13.png";
import reiwa_13_mobile from "@/assets/reiwa_13_mobile.png";
import type { LastProps } from "@/types";

const Last = ({
  backgroundImageUrl = reiwa_13,
  FooterText= "RE:IWAROMAN作成委員会",
}: LastProps) => {
  return (
    <div
      className="relative w-full h-screen md:h-[180vh] flex items-center"
    >
      {/* 背景 */}
      <picture className="absolute inset-0 -z-10">
        <source media="(max-width: 400px)" srcSet={reiwa_13_mobile} />
        <img
          src={backgroundImageUrl}
          alt=""
          className="w-full h-full object-cover sm:object-cover max-sm:object-contain max-sm:object-center bg-black"
          aria-hidden="true"
        />
      </picture>
      <div className="w-full flex justify-center  absolute bottom-3">
        <p className="text-[#a3a1a1] tracking-wider" style={{fontFamily: 'momochidori, sans-serif', fontWeight: 700, fontSize:"1em"}}>&copy;{FooterText}</p>
      </div>
    </div>
  );
}

export default Last;
