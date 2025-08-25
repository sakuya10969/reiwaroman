// import { ChevronRight } from "lucide-react";

// import goods_1 from "@/assets/goods_1.png";
// import goods_2 from "@/assets/goods_2.png";
// import goods_3 from "@/assets/goods_3.png";
// import goods_4 from "@/assets/goods_4.png";
// import goods_5 from "@/assets/goods_5.png";
// import goods_6 from "@/assets/goods_6.png";
// import goods_7 from "@/assets/goods_7.png";
// import goods_8 from "@/assets/goods_8.png";

import type { GoodsProps } from "@/types";

// const Goods1 = goods_1;
// const Goods2 = goods_2;
// const Goods3 = goods_3;
// const Goods4 = goods_4;
// const Goods5 = goods_5;
// const Goods6 = goods_6;
// const Goods7 = goods_7;
// const Goods8 = goods_8;


const Goods = ({
  badgeText = "GOODS",
  // goodsName = ["フェスTシャツ : 各4000円","オリジナルステッカーセット : 1000円","松尾のお薬ケース～復刻版～ : 1200円","オリジナルペンライト : 2500円","マフラータオル[全2種] : 2000円","チョコプラヘアバンド : セット 4200円 / 単品 各2200円","オリジナルエコバッグ : 1000円","チョコスタ[全2種] : 各1000円"],
  // goodsImageUrl = [],
  // goodsPurchaseUrl = "https://example.com",
}: GoodsProps) => {
  return (
    <div className="relative w-full isolate">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-10"
        aria-hidden="true"
      />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto pt-10 pb-6 px-4">
        {/* 上部のバッジ */}
        <div className="flex justify-center mb-8">
          <div
            className="text-sm text-white/90 md:text-base font-bold transform scale-x-150"
            style={{ fontFamily: 'Prompt, sans-serif' }}
          >
            <span className="inline-block font-bold uppercase underline underline-offset-5">
              {badgeText}
            </span>
          </div>
        </div>

        {/* 準備中メッセージ */}
        <div className="flex flex-col items-center justify-center pb-8">
          <div className="text-center max-w-2xl">
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              グッズ詳細準備中
            </h2>
            <p
              className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed"
              style={{ fontFamily: '"dnp-shuei-shogomincho-std", serif' }}
            >
              令和ロマン関連グッズの詳細情報は現在準備中です。<br />
              オリジナルTシャツ、ステッカー、タオル、ペンライトなど、<br />
              様々なアイテムをご用意予定です。<br />
              販売開始時期や価格、デザインなどの詳細が決まり次第、<br />
              こちらのページでお知らせいたします。
            </p>
          </div>
        </div>

        {/* グッズ一覧（コメントアウト） */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {goodsImageUrl.map((photo, index) => (
            <div key={index} className="text-center">
              <img
                src={photo}
                alt={`Goods Photo ${index + 1}: ${goodsName[index]}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div> */}

        {/* 購入ボタン（コメントアウト） */}
        {/* <div className="max-w-xl mx-auto mt-12 px-4 flex justify-center">
          <a 
            href={goodsPurchaseUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between text-white rounded tracking-wide transition-colors duration-200 leading-none py-2 px-6 whitespace-nowrap"
            style={{
              backgroundColor: "#a01e22",
              fontFamily: 'momochidori, sans-serif',
              fontWeight: 500,
              borderRadius: "30px",
              fontSize: "1.1em",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#b3272b"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#a01e22"}
          >
            オンラインでの購入はこちら
            <ChevronRight size={24} />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Goods;