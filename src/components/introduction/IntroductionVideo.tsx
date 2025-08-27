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
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);

  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const hideControlsTimeoutRef = useRef<number | null>(null);

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) player.unMute();
    else player.mute();
    setIsMuted(!isMuted);
  };

  const showControls = () => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    setIsControlsVisible(true);
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

  const hideControls = () => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    setIsControlsVisible(false);
  };

  const handleTap = () => {
    if (isControlsVisible) {
      hideControls();
    } else {
      showControls();
    }
  };


  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    let destroyed = false;
    (async () => {
      await loadYouTubeAPI();
      if (destroyed) return;
      shell.innerHTML = "";
      const p = new window.YT.Player(shell, {
        width: "100%", height: "100%",
        host: "https://www.youtube-nocookie.com", videoId,
        playerVars: { autoplay: 1, controls: 0, rel: 0, modestbranding: 1, playsinline: 1, loop: 1, playlist: videoId, fs: 0, disablekb: 1, iv_load_policy: 3, },
        events: {
          onReady: (e: any) => {
            try { if (isMuted) e.target.mute(); e.target.playVideo(); const iframe: HTMLIFrameElement = e.target.getIframe(); iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture"); iframe.setAttribute("tabindex", "-1"); iframe.setAttribute("title", ""); } catch {}
          },
          onStateChange: (e: any) => { if (e.data === window.YT.PlayerState.ENDED) { try { e.target.seekTo(0); e.target.playVideo(); } catch {} } }
        }
      });
      playerRef.current = p;
    })();
    return () => {
      destroyed = true;
      try { playerRef.current?.destroy?.(); } catch {}
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="relative w-full isolate min-h-[50vh] lg:h-screen landscape:h-screen pt-16 md:pt-24 overflow-hidden"
      aria-hidden
      onMouseMove={showControls}
      onMouseLeave={hideControls}
      onClick={handleTap}
    >
      <button
        onClick={toggleMute}
        className={`absolute bottom-4 right-5 md:bottom-6 md:right-10 z-10 p-2 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label={isMuted ? "音声オンにする" : "音声オフにする"}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-10 sm:w-10 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="#A0A0A0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-10 sm:w-10 md:w-16 md:h-16" fill="none" viewBox="0 0 24 24" stroke="#A0A0A0">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      <div className="absolute inset-0 -z-10">
        <div ref={shellRef} className="absolute inset-0 pointer-events-none w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default IntroductionVideo;