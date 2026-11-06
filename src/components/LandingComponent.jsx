
import { useEffect, useState } from "react";

export default function Preloader({ loaded = false }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setHide(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#080a0d] transition-opacity duration-700 ${
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#28200c_0%,#111318_40%,#080a0d_100%)]" />

      {/* Animated light beams */}
      <div className="light-beam absolute inset-0" />

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:65px_65px]" />

      {/* Background circles */}
      <div className="absolute h-[500px] w-[500px] rounded-full border border-yellow-400/10 animate-spin-slow" />
      <div className="absolute h-[380px] w-[380px] rounded-full border border-dashed border-yellow-400/20 animate-reverse-spin" />
      <div className="absolute h-[260px] w-[260px] rounded-full border border-yellow-400/10 animate-pulse" />

      {/* Floating particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="particle absolute h-1 w-1 rounded-full bg-yellow-400"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 8) * 0.35}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col items-center px-5 text-center">

        {/* Brand logo */}
        <div className="mb-5 overflow-hidden">
          <h1 className="dewus-logo text-6xl font-black tracking-[-0.02em] text-white sm:text-8xl ">
            {"Dewas Truck".split("").map((letter, i) => (
              <span
                key={i}
                className="logo-letter inline-block"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {letter}
              </span>
            ))}
            <span className="text-yellow-400">.</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="tagline text-[10px] font-bold uppercase tracking-[0.65em] text-yellow-400 sm:text-xs">
          Built To Move The World
        </p>

        {/* Animated line */}
        <div className="mt-12 h-[3px] w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
          <div className="loading-line h-full w-[35%] bg-yellow-400 shadow-[0_0_20px_#facc15]" />
        </div>

        {/* Loading text */}
        <div className="mt-5 flex items-center gap-3">
          <span className="h-2 w-2 animate-ping rounded-full bg-yellow-400" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-400">
            Preparing Your Experience
          </p>
        </div>

        {/* Bottom text */}
        <div className="absolute top-[calc(100vh/2+210px)] flex w-full max-w-sm justify-between text-[9px] font-bold tracking-[0.3em] text-white/30">
          <span>DEWUS INDUSTRIES</span>
          <span>POWER • PERFORMANCE</span>
        </div>
      </div>

      <style>{`
        .logo-letter {
          opacity: 0;
          transform: translateY(70px) rotateX(-80deg);
          animation: logoReveal 0.8s cubic-bezier(.2,.8,.2,1) forwards;
        }

        @keyframes logoReveal {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            text-shadow: 0 0 30px rgba(250,204,21,.25);
          }
        }

        .tagline {
          animation: taglineReveal 1s ease 0.8s both;
        }

        @keyframes taglineReveal {
          from { opacity: 0; letter-spacing: 1em; }
          to { opacity: 1; letter-spacing: .65em; }
        }

        .loading-line {
          animation: loadingMove 1.3s ease-in-out infinite;
        }

        @keyframes loadingMove {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(350%); }
        }

        .light-beam {
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(250,204,21,.05) 48%,
            rgba(250,204,21,.16) 50%,
            transparent 65%
          );
          background-size: 250% 250%;
          animation: beamMove 6s linear infinite;
        }

        @keyframes beamMove {
          from { background-position: 100% 100%; }
          to { background-position: -100% -100%; }
        }

        .particle {
          box-shadow: 0 0 10px #facc15;
          animation: floatParticle 4s ease-in-out infinite;
        }

        @keyframes floatParticle {
          0%, 100% { opacity: .1; transform: translateY(20px); }
          50% { opacity: .9; transform: translateY(-30px); }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-reverse-spin {
          animation: reverseSpin 15s linear infinite;
        }

        @keyframes reverseSpin {
          to { transform: rotate(-360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
