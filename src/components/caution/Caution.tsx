import BG from "@/assets/reiwa_12.png";
import type { CautionProps } from "@/types";

const BackGroundImage = BG;
const Caution = ({
  badgeText = "CAUTION",
  CautionText = [
    "※チケットの振替詳細は6/7(土) 10:00からとなります。お席につきましてはチケット券面にてご確認ください。",
    "※お申込み多数の場合、複数公演へお申込みの方は当選回数に上限を設ける場合がございます。",
    "※「ULTRA SWEET GALAXY」および「SWEET GALAXY」「GALAXY」は各抽選先行で予定枚数に達した場合、その後の抽選先行および一般発売での取り扱いはございません。",
    "※本公演はチケット購入申込者ご本人とその同行者の方のみご入場いただけます。チケット券面には、購入申込者の氏名が印字され、その氏名のご本人とその同行者の方以外はご入場いただけません。あらかじめご了承ください。",
    "※本公演は、FANYチケット利用規約の定めにかかわらず、チケットおよび公演内の全客席または一部の座席権利の購入、譲渡・転売行為は、営利・非営利の目的を問わず、いかなる場合も一切禁止とさせていただきます。これに該当すると主催者が判断したチケットは無効となり、入場をお断りさせていただく場合もございますので、ご注意ください。",
    "※当日、お名前が確認のできる顔写真付きの本人確認証（運転免許証、パスポート等）をご提示いただく場合がございますので、必ず本人確認証をご持参ください。ご提示いただく本人確認証とご登録の情報が一致しない場合、ご入場いただけない可能性がございます。",
    "※ご自身のチケットに記載されたお席での観劇をお願いします。万が一、チケットに記載された席以外で観劇およびチケットを複数人で使用する等の不正行為が確認された場合、退場いただく可能性がございます。退場になった際のチケット代金は返金いたしませんので、あらかじめご了承ください。",
    "※チケットは正規販売ルート（主催者より正式に販売許可を得たプレイガイド）でご購入いただきますようお願いいたします。",
    "※チケットを紛失・忘れてしまった場合、発行済みチケットの再発行は行いません。なお、チケットをお持ちでない方はご入場いただけませんので、大切に保管していただきますようご注意ください。",
    "※5歳以上は有料。4歳以下はひざ上のみ無料、但し、お席が必要な場合は有料。",
    "※本公演はDay2（8/21(木)）のオンライン配信がございます。お客様の映り込みの可能性がございますので、あらかじめご了承ください。但し、【第2部】CHOCO FES 2025に関してはオンライン配信対象外のアーティストや楽曲がございます。",
    "※ビデオ・カメラ、または携帯電話等での録音・録画・撮影・配信禁止。",
    "※出演者は変更になる場合がありますので、あらかじめご了承ください。尚、変更にともなう払戻は行いません。",
    "※車椅子席をご利用の方は、チケットご購入前に FANYチケット問合せダイヤル",
    "[TEL]0570(550)100 (10時~19時/年中無休) までお問合せください。"
  ]
}: CautionProps) => {
  return (
    <section className="relative w-full isolate">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-black -z-20"
        aria-hidden="true"
        style = {{ backgroundImage:`url(${BackGroundImage})`}}
      />

      {/* 半透明赤のオーバーレイ */}
      <div className="absolute inset-0 bg-[#e12027]/50 -z-18" aria-hidden="true" />

      {/* コンテンツ */}
      <div className="max-w-6xl mx-auto py-20 px-4 flex flex-col items-center">
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
        {/* 注意事項 */}
        <div className="flex flex-col w-[70%] mb-10">
          {CautionText.map((text, index) => (
            <div key={index}>
              <p
                className="mt-3 text-sm text-white/90"
                style={{ fontFamily: 'momochidori, sans-serif' ,fontWeight: 500 }}
              >{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Caution;