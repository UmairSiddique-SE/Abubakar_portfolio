import { useEffect, useState } from "react";
import { HANDLE, PROFILE, SOCIALS } from "../data";
import { XIcon } from "./Icons";

export default function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Listen for standard PWA install event
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // If on mobile browser, show app install pill after short delay if not dismissed
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem("ma-pwa-dismiss");
      if (!dismissed) setVisible(true);
    }, 2500);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS or already installed: open TikTok profile
      window.open(SOCIALS.tiktok, "_blank");
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem("ma-pwa-dismiss", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed top-20 inset-x-3 z-50 mx-auto max-w-md animate-card-in">
      <div className="flex items-center gap-3 rounded-2xl border border-tik/40 bg-ink/95 p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(254,44,85,0.25)] backdrop-blur-xl">
        <div className="relative shrink-0">
          <img
            src="/images/abubakar-hero.jpg"
            alt="Mahar Abubakar App Icon"
            className="h-11 w-11 rounded-xl object-cover border border-white/20 shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-ink animate-pulse" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-xs font-bold text-cream truncate">Mahar Abubakar App</span>
            <span className="text-[9px] font-bold text-mint bg-mint/15 px-1.5 py-0.2 rounded">LIVE</span>
          </div>
          <p className="font-mono text-[11px] text-fog truncate">
            <span className="text-cream font-bold">{PROFILE.followers}</span> Followers • {HANDLE}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleInstall}
            className="flex items-center gap-1.5 rounded-xl bg-tik px-3 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(254,44,85,0.5)] transition-transform active:scale-95"
          >
            <span>Install</span>
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Close banner"
            className="grid h-8 w-8 place-items-center rounded-xl text-fog hover:text-cream"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
