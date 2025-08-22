import type { HeaderTheme } from "@/types";
import type { NavItem } from "@/types";
import type { NewsItem } from "@/types";

export const NAV: NavItem[] = [
  { label: "TOPS",          href: "#tops",         sectionIds: ["tops"] },
  { label: "INTRODUCTION",  href: "#introduction-catch", sectionIds: ["introduction-catch", "introduction-live", "introduction-venue"] },
  { label: "NEWS",          href: "#news-catch",        sectionIds: ["news-catch", "news-list"] },
  { label: "CAST",          href: "#cast",              sectionIds: ["cast"] },
  { label: "GOODS",         href: "#goods",             sectionIds: ["goods"] },
];

export const NEWS: NewsItem[] = [
  { date: "2025-09-13", title: "応援グッズに関して", href: "/news/20250913" },
  { date: "2025-09-01", title: "「RE:IWAROMAN」プレミアムチケット特典引換・特典会の詳細が決定！", href: "/news/20250901" },
  { date: "2025-08-28", title: "「RE:IWAROMAN」オフィシャルグッズ販売決定！", href: "/news/20250828" },
];

export const SECTION_THEMES: Record<string, HeaderTheme> = {
  "tops": "dark",
  "introduction-catch": "dark",
  "introduction-live": "dark",
  "introduction-venue": "dark",
  "news-catch": "dark",
  "news-list": "red",
  "cast": "dark",
  "goods": "dark",
  "caution": "red",
  "footer": "dark",
};

export const CAUTION_CONTENTS: string[] = [
  "チケットの発券開始は6/7(土)10:00からとなります。お席につきましてはチケット券面にてご確認ください。",
  "お申込み多数の場合、複数公演へお申込みの方は当選回数に上限を設ける場合がございます。",
  "「ULTRA SWEET GALAXY席」および「SWEET GALAXY席/GALAXY席」は各抽選先行で予定枚数に達した場合、その後の抽選先行および一般発売での取扱いはございません。",
  "本公演はチケット購入申込者ご本人とその同行者のみご入場いただけます。チケット券面には、購入申込者の氏名が印字され、そのご本人とその同行者の方以外はご入場いただけません。あらかじめご了承ください。",
  "本公演は、FANYチケット利用規約の定めにかかわらず、チケットおよび公演内の全部または一部の座席権利の購入・譲渡・転売行為は、営利・非営利の目的を問わず、いかなる場合も一切禁止とさせていただきます。これに該当すると主催者が判断したチケットは無効となり、入場をお断りさせていただく場合もございますので、ご注意ください。",
  "当日、お名前が確認のできる顔写真付きの本人確認証(運転免許証、パスポート等)をご提示いただく場合がございますので、必ず本人確認証をご持参ください。ご提示いただいた本人確認証と登録の情報が一致しない場合、ご入場いただけない可能性がございます。",
  "ご自身のチケットに記載されたお席での観劇をお願いします。万一、チケットに記載された席所以外で観劇およびチケットを複数人で使用する等の不正行為が確認された場合、退場いただく可能性がございます。退場になった際のチケット代金は返金いたしかねますので あらかじめご了承ください。",
  "チケットは正規販売ルート(主催者および正式に販売許可を得たプレイガイド)でご購入いただきますようお願いいたします。",
  "チケットを紛失・忘れてしまった場合、発行済みチケットの再発行は行いません。なお、チケットをお持ちでない方はご入場いただけませんので、大切に保管していただきますようご注意ください。",
  "満員以上は有料。4歳以下はひざ上での無料、但し、お席が必要な場合は有料。",
  "本公演はDay2(8/21(木))のみオンライン配信がございます。お客様が映り込みの可能性がございますので、あらかじめご了承ください。但し、第2部はCHOCOfes2025に関してはオンライン配信対象外のアーティストや楽曲がございます。",
  "ビデオ・カメラ、または携帯電話等での録音・録画・撮影・配信は禁止。",
  "出演者は変更になる場合がございます。予めご了承ください。尚、変更による払戻は行いません。",
  "車椅子でご観覧の方は、チケット購入後FANYチケットへ要申請。車椅子席をご利用の方は、チケット購入時にFANYチケット(0570-550-100)までお問合せください。",
];

