import type { HeaderTheme } from "@/types";
import type { NavItem } from "@/types";
import type { NewsItem } from "@/types";

export const NAV: NavItem[] = [
  { label: "TOPS",          href: "#tops",         sectionIds: ["tops"] },
  { label: "INTRODUCTION",  href: "#introduction-catch", sectionIds: ["introduction-catch", "introduction-live", "introduction-venue"] },
  { label: "NEWS",          href: "#news-catch",        sectionIds: ["news-catch", "news-list"] },
  // { label: "CAST",          href: "#cast",              sectionIds: ["cast"] },
  // { label: "GOODS",         href: "#goods",             sectionIds: ["goods"] },
];

export const TOPS_CATCH_TITLE: string = "日本一の漫才、再び。";

export const TOPS_CATCH_SUBTITLE: string[] = [
  "JAPAN'S TOP MANZAI COMEDIANS,", "BREAKING ALL LIMITS.",
];

export const NEWS: NewsItem[] = [
  { date: "2025-09-01", title: "「RE:IWAROMAN」チケット発売開始​", href: "https://eplus.jp/reiwaroman/" },
];

export const SECTION_THEMES: Record<string, HeaderTheme> = {
  "tops": "dark",
  "introduction-catch": "dark",
  "introduction-live": "dark",
  "introduction-venue": "dark",
  "news-catch": "red",
  "news-list": "red",
  "cast": "dark",
  "goods": "dark",
  "caution": "dark",
  "last": "dark",
};

export const INTRODUCTION_CATCH_CONTENTS: string[] = [
  "あああああああああああああああああああああああああああああああああああああああああああああああああああああ",
  "あああああああああああああああああああああああああああああああああああああああああああああああああああああ",
  "あああああああああああああああああああああああああああああああああああああああああああああああああああああ",
  "あああああああああああああああああああああああああああああああああああああああああああああああああああああ",
];

export const INTRODUCTION_LIVE_CONTENTS: string[] = [
  "国内お笑い史上、最大キャパシティ2万人の単独ライブ。",
  "漫才だけでなく、演出・映像・体験・記録まで含めた複合プロジェクト。",
  "ポッドキャストでも活躍する令和ロマンならではの、",
  "「音・声」にこだわった構成。",
  "だれもお笑いをやったことのないステージで、",
  "誰もやったことの無い舞台に挑戦する。",
];

export const INTRODUCTION_LIVE_TITLE_LINES: string[] = [
  "2万人が体感する、",
  "未だかつてない",
  "お笑いライブ",
];

export const CAUTION_CONTENTS: string[] = [
  "※チケット購⼊後のキャンセル・変更は⼀切出来ません。",
  "いかなる理由でも払い戻しはいたしませんので、注意事項をよく読みご購⼊ください。",
  "※「SSロマン席」「Sロマン席」「Aロマン席」は各抽選先行で予定枚数に達した場合、その後の抽選先行および一般発売での取扱いはございません。",
  "※ 本公演はチケット購入申込者ご本人とその同行者のみご入場いただけます。 ",
  "※ 本公演は、チケットおよび公演内の全部または一部の座席権利の購入・譲渡・転売行為は、営利/非営利の目的を問わず、いかなる場合も一切禁止とさせていただきます。これに該当すると主催者が判断したチケットは無効となり、入場をお断りさせていただく場合もございますので、ご注意ください。",
  "※当日、お名前が確認のできる顔写真付きの本人確認認証(運転免許証、パスポート等)をご提示いただく場合がございますので、必ず本人確認証をご持参ください。ご提示いただいた本人確認証と登録の情報が一致しない場合、ご入場いただけない可能性がございます。",
  "※ ご自身のチケットに記載されたお席での観劇をお願いします。万一、チケットに記載された席所以外で観劇およびチケットを複数人で使用する等の不正行為が確認された場合、退場いただく可能性がございます。退場になった際のチケット代金は返金いたしかねます。",
  "※ チケットは正規販売ルート(主催者および正式に販売許可を得たプレイガイド)でご購入いただきますようお願いいたします。",
  "※ チケットを紛失・忘れてしまった場合、発行済みチケットの再発行は行いません。なお、チケットをお持ちでない方はご入場いただけませんので、大切に保管していただきますようご注意ください。",
  "※未就学児の入場は不可とさせていただきます。6歳以上はチケット必要です。",
  "※本公演では、DVD制作やオンライン配信を行う可能性がございます。そのため、会場内では撮影機材が入ることがあり、お客様が映像に映り込む場合がございますので、あらかじめご理解・ご了承ください。",
  "※ 出演者は変更になる場合がございます。予めご了承ください。尚、変更による払戻は行いません。",
  "※ 車椅子でご観覧の方は、⾞椅⼦でのご来場の場合は、チケット購⼊後、事前に公演のお問い合わせ先へまでご連絡をお願いいたします。"
];

export const TICKET_URL: string = "https://eplus.jp/reiwaroman/";
