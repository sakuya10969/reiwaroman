import { useLayoutEffect, useRef, useState } from "react";
import type { IntroductionVideoProps } from "@/types";

declare global {
  interface Window { YT?: any; onYouTubeIframeAPIReady?: () => void; }
}

const loadYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    if (window.YT?.Player) return resolve();
    const id = "youtube-iframe-api";
    if (document.getElementById(id)) {
      const check = () => (window.YT?.Player ? resolve() : setTimeout(check, 50));
      return check();
    }
    const tag = document.createElement("script");
    tag.id = id;
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });

const IntroductionVideo = ({ videoId = "S6hol1r6xSc" }: IntroductionVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let destroyed = false;

    (async () => {
      await loadYouTubeAPI();
      if (destroyed) return;

      shell.innerHTML = ""; // 既存iframe掃除

      const p = new window.YT.Player(shell, {
        width: "100%", height: "100%",
        host: "https://www.youtube-nocookie.com",         // 任意：プライバシー配慮
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: videoId,   // ← loopを効かせる必須セット
          fs: 0,
          disablekb: 1,
          iv_load_policy: 3,
          // mute は playerVars ではなく onReady で実行
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.mute();
              e.target.playVideo();
              // 自動再生を確実にするため iframe に allow 付与
              const iframe: HTMLIFrameElement = e.target.getIframe();
              iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
              iframe.setAttribute("tabindex", "-1");
              iframe.setAttribute("title", "");
            } catch {}
          },
          onStateChange: (e: any) => {
            // 念のため。終了したら巻き戻し（ループ設定で通常は不要）
            if (e.data === window.YT.PlayerState.ENDED) {
              try { e.target.seekTo(0); e.target.playVideo(); } catch {}
            }
          }
        }
      });

      setPlayer(p);
    })();

    return () => {
      destroyed = true;
      try { player?.destroy?.(); } catch {}
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="relative w-full isolate min-h-[50vh] lg:h-screen pt-16 md:pt-24 overflow-hidden"
      aria-hidden // 背景演出なら支援技術から隠す
    >
      {/* 背景レイヤ（全面） */}
      <div className="absolute inset-0 -z-10">
        <div
          ref={shellRef}
          className="absolute inset-0 pointer-events-none scale-110" // 少し拡大してトリミング
        />
      </div>

      {/* 必要なら上に文言やUIを重ねる */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* ...前景コンテンツ... */}
      </div>
    </div>
  );
}

export default IntroductionVideo;
