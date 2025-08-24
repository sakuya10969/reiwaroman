import cast_reiwa from "@/assets/cast_reiwa_edit.png";
import cast_mayurika from "@/assets/cast_mayurika_edit.png";
import cast_nanamagari from "@/assets/cast_nanamagari_edit.png";
import cast_mitorizu from "@/assets/cast_mitori_edit.png";
import type { CastProps } from "@/types";

const CastReiwa = cast_reiwa;
const CastMayurika = cast_mayurika;
const CastNanamagari = cast_nanamagari;
const CastMitorizu = cast_mitorizu;

const Cast = ({
  badgeText = "CAST",
  castName = ["令和ロマン", "マユリカ", "ななまがり", "見取り図×星夏＆愛花"],
  castImageUrl = [CastReiwa, CastMayurika, CastNanamagari, CastMitorizu],
}: CastProps) => {
  return (
    <div className="relative w-full isolate">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-10"
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        {/* 上部のバッジ */}
        <div className="flex justify-center mb-10">
          <div
            className="text-xs text-white/90 md:text-sm font-bold transform scale-x-180"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <span className="inline-block border-b-2 border-white/80 pb-0.5 font-semibold">
              {badgeText}
            </span>
          </div>
        </div>
        {/* キャスト一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {castImageUrl.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo}
                alt={`Cast Photo ${index + 1}: ${castName[index]}`}
                className="w-full h-auto"
              />
              <p
                className="mt-3 text-sm text-white/90"
                style={{ fontFamily: 'momochidori, sans-serif' ,fontWeight: 500 }}
              >{castName[index]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cast;