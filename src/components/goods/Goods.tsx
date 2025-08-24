import goods_1 from "@/assets/goods_1.png";
import goods_2 from "@/assets/goods_2.png";
import goods_3 from "@/assets/goods_3.png";
import goods_4 from "@/assets/goods_4.png";
import goods_5 from "@/assets/goods_5.png";
import goods_6 from "@/assets/goods_6.png";
import goods_7 from "@/assets/goods_7.png";
import goods_8 from "@/assets/goods_8.png";

import type { GoodsProps } from "@/types";

const Goods1 = goods_1;
const Goods2 = goods_2;
const Goods3 = goods_3;
const Goods4 = goods_4;
const Goods5 = goods_5;
const Goods6 = goods_6;
const Goods7 = goods_7;
const Goods8 = goods_8;


const Goods = ({
  badgeText = "GOODS",
  goodsName = ["フェスTシャツ : 各4000円","オリジナルステッカーセット : 1000円","松尾のお薬ケース～復刻版～ : 1200円","オリジナルペンライト : 2500円","マフラータオル[全2種] : 2000円","チョコプラヘアバンド : セット 4200円 / 単品 各2200円","オリジナルエコバッグ : 1000円","チョコスタ[全2種] : 各1000円"],
  goodsImageUrl = [Goods1,Goods2,Goods3,Goods4,Goods5,Goods6,Goods7,Goods8],
  goodsPurchaseUrl = "https://example.com",
}: GoodsProps) => {
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
        {/* グッズ一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {goodsImageUrl.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo}
                alt={`Goods Photo ${index + 1}: ${goodsName[index]}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto mt-12 px-4 flex justify-center  ">
          <a href={goodsPurchaseUrl} target="_blank" rel="noopener noreferrer">
            <button
              className="text-white px-4 py-2 rounded tracking-wide transition-colors duration-200"
              style={{
                backgroundColor: "#a01e22",
                fontFamily: 'momochidori, sans-serif',
                fontWeight: 500,
                borderRadius: "30px",
                fontSize: "1.2em",
                border: "2px solid transparent",
                outline: "none"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
            >
              オンラインでの購入はこちら ＞
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Goods;