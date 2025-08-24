import reiwa_13 from "@/assets/reiwa_13.png";
import type { LastProps } from "@/types";

const Last = ({
  backgroundImageUrl = reiwa_13,
  FooterText= "RE:IWAROMAN作成委員会",
}: LastProps) => {
  return (
    <div
      className="relative w-full h-[160vh] flex items-center"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black bg-center h-full  -z-10"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
        aria-hidden="true"
      />
      <div className="w-full flex justify-center  absolute bottom-3">
        <p className="text-[#a3a1a1] tracking-wider" style={{fontFamily: 'momochidori, sans-serif', fontWeight: 700, fontSize:"1em"}}>&copy;{FooterText}</p>
      </div>
    </div>
  );
}

export default Last;
