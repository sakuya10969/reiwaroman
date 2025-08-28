import { useLayoutEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(false);
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
        width: "100%", 
        height: "100%",
        videoId,
        playerVars: { 
          autoplay: 1, 
          controls: 0, 
          rel: 0, 
          modestbranding: 1, 
          playsinline: 1, 
          loop: 1, 
          playlist: videoId, 
          fs: 0, 
          disablekb: 1, 
          iv_load_policy: 3,
          mute: 1,
          start: 0,
          enablejsapi: 1,
          origin: window.location.origin,
          showinfo: 0,
          cc_load_policy: 0,
          end: 999999,
          hl: 'ja'
        },
        events: {
          onReady: (e: any) => {
            try { 
              if (isMuted) e.target.mute(); 
              e.target.playVideo(); 
              const iframe: HTMLIFrameElement = e.target.getIframe(); 
              iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture"); 
              iframe.setAttribute("tabindex", "-1"); 
              iframe.setAttribute("title", ""); 
              iframe.style.pointerEvents = "none";
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              iframe.style.position = "absolute";
              iframe.style.top = "0";
              iframe.style.left = "0";
              // YouTube UIを完全に隠すためのCSS追加
              iframe.style.filter = "contrast(1.1) saturate(1.1)";
              iframe.style.overflow = "hidden";
            } catch (error) {
              console.error("Error in onReady:", error);
            }
          },
          onStateChange: (e: any) => { 
            if (e.data === window.YT.PlayerState.ENDED) { 
              try { 
                e.target.seekTo(0); 
                e.target.playVideo(); 
              } catch {} 
            } 
          },
          onError: (e: any) => {
            console.error("YouTube Player Error:", e);
          }
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
      className="relative w-full isolate min-h-[50vh] lg:h-screen landscape:h-screen pt-16 md:pt-24 overflow-hidden bg-black"
      aria-hidden
      onMouseMove={showControls}
      onMouseLeave={hideControls}
      onClick={handleTap}
    >
      <button
        onClick={toggleMute}
        className={`absolute bottom-12 right-0 lg:bottom-4 lg:right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity duration-300 cursor-pointer ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label={isMuted ? "音声オンにする" : "音声オフにする"}
      >
        {isMuted ? (
          <VolumeX size={48} className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" color="#A0A0A0" />
        ) : (
          <Volume2 size={48} className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" color="#A0A0A0" />
        )}
      </button>

      <div className="absolute inset-0 w-full h-full">
        <div ref={shellRef} className="w-full h-full" />
      </div>
    </div>
  );
}

export default IntroductionVideo;