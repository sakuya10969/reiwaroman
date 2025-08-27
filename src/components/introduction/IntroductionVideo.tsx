import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { IntroductionVideoProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

// YouTube Iframe API の型定義
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// YouTube Iframe API を読み込む関数
const loadYouTubeAPI = () =>
  new Promise<void>((resolve) => {
    // 既に読み込まれている場合は即座にresolve
    if (window.YT && window.YT.Player) return resolve();
    const scriptId = "youtube-iframe-api";
    // スクリプトが既に存在する場合は読み込み完了を待つ
    if (document.getElementById(scriptId)) {
      const check = () => (window.YT && window.YT.Player) ? resolve() : setTimeout(check, 50);
      return check();
    }
    // スクリプトタグを動的に追加
    const tag = document.createElement("script");
    tag.id = scriptId;
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    // API読み込み完了時のコールバック設定
    window.onYouTubeIframeAPIReady = () => resolve();
  });

const IntroductionVideo = ({ videoId = "S6hol1r6xSc" }: IntroductionVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoShellRef = useRef<HTMLDivElement>(null); // YouTube iframe を差し込むコンテナ
  const [player, setPlayer] = useState<any>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const shell = videoShellRef.current;
    if (!container || !shell) return;

    let scrollTrigger: ScrollTrigger | null = null;
    let ctx: gsap.Context | null = null;

    (async () => {
      // YouTube API を読み込み
      await loadYouTubeAPI();

      // 既存の iframe があれば削除
      shell.innerHTML = "";

      // YouTube Player を生成
      const p = new window.YT.Player(shell, {
        width: "100%",
        height: "100%",
        videoId,
        playerVars: {
          rel: 0, // 関連動画を非表示
          modestbranding: 1, // YouTube ロゴを最小化
          playsinline: 1, // iOS でインライン再生
        },
        events: {
          onReady: (e: any) => {
            // プレイヤー準備完了時にミュート（自動再生ポリシー対応）
            try { e.target.mute(); } catch {}
          },
        },
      });
      setPlayer(p);

      // GSAP でアニメーション設定
      ctx = gsap.context(() => {
        // 初期状態：下から上にスライドイン + フェードイン + 縮小
        gsap.set(shell, { y: 100, opacity: 0, scale: 0.9 });

        // スクロールトリガーでアニメーション実行
        scrollTrigger = ScrollTrigger.create({
          trigger: container,
          start: "top 80%", // ビューポートの80%位置で開始
          end: "bottom 20%", // ビューポートの20%位置で終了
          animation: gsap.to(shell, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
          }),
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true, // リサイズ時にScrollTriggerを再計算
          refreshPriority: -1, // 他のScrollTriggerが処理された後に実行
          // 画面に入ったら動画再生、外れたら一時停止
          onEnter: () => { try { p.playVideo(); } catch {} },
          onEnterBack: () => { try { p.playVideo(); } catch {} },
          onLeave: () => { try { p.pauseVideo(); } catch {} },
          onLeaveBack: () => { try { p.pauseVideo(); } catch {} },
        });
      }, container);
    })();

    // クリーンアップ関数
    return () => {
      ctx?.revert(); // GSAP アニメーションを破棄
      scrollTrigger?.kill(); // ScrollTrigger を破棄
      try {
        // YouTube Player を破棄
        player?.destroy?.();
      } catch {}
      // ScrollTriggerの再計算を促す
      ScrollTrigger.refresh();
    };
  }, [videoId]); // videoId が変わったらエフェクトを再実行

  return (
    <div ref={containerRef} className="relative w-full isolate flex items-center justify-center min-h-[50vh] lg:h-screen pt-16 md:pt-24">
      {/* 黒背景 */}
      <div className="absolute inset-0 bg-black -z-10" aria-hidden="true" />

      {/* 動画コンテンツ */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          {/* YouTube Iframe API が iframe を差し込むコンテナ */}
          <div
            ref={videoShellRef}
            className="absolute inset-0 w-full h-full"
            role="region"
            aria-label="YouTube video player"
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionVideo;
