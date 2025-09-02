import type { Block } from "@/types";

export const formatY_MM_DD = (input: Date | string) => {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return { year: "", md: "" };

  const year = d.getFullYear().toString();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return { year, md: `${m}.${day}` };
};

export const toBlocks = (lines: string[]): Block[] => {
  const out: Block[] = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();

    // 区切り線
    if (/^-{3,}|^[-ー—]{5,}/.test(raw) || raw.includes("----")) {
      out.push({ kind: "separator" });
      continue;
    }

    // httpsが含まれていればリンクとして処理
    if (raw.includes("https://")) {
      const urlMatch = raw.match(/(https?:\/\/\S+)/);
      if (urlMatch) {
        const url = urlMatch[1];
        const label = raw.replace(url, "").trim();
        out.push({ kind: "link", label: label || url, href: url });
        continue;
      }
    }

    // 小見出し → 直後の「・」を束ねて sublist に
    const headMatch = raw.match(/^＜(.+?)＞$/);
    if (headMatch) {
      out.push({ kind: "subheading", text: headMatch[1] });
      const items: string[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith("・")) {
        items.push(lines[j].trim().replace(/^・\s*/, ""));
        j++;
      }
      if (items.length) out.push({ kind: "sublist", items });
      i = j - 1; // 消費した分をスキップ
      continue;
    }

    // 通常の注意行（先頭の ※ は描画側で付けるため除去）
    out.push({ kind: "note", text: raw.replace(/^※\s*/, "") });
  }
  return out;
};
