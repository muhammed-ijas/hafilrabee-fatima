import { useEffect, useState, useRef } from "react";

const IslamicStar = ({ size = 120, opacity = 0.12, spin = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    style={{
      opacity,
      animation: spin ? "rotate-slow 40s linear infinite" : "none",
      transformOrigin: "center",
    }}
  >
    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
      <polygon
        key={i}
        points="60,10 65,50 60,55 55,50"
        fill="#b8963c"
        transform={`rotate(${angle}, 60, 60)`}
        opacity={0.7}
      />
    ))}
    {[15, 45, 75, 105, 135, 165].map((angle, i) => (
      <polygon
        key={`b${i}`}
        points="60,18 64,50 60,54 56,50"
        fill="#1a3d2b"
        transform={`rotate(${angle}, 60, 60)`}
        opacity={0.5}
      />
    ))}
    <circle cx="60" cy="60" r="14" fill="none" stroke="#b8963c" strokeWidth="0.8" opacity={0.6} />
    <circle cx="60" cy="60" r="8" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.4} />
    <polygon
      points="60,20 67,47 60,53 53,47"
      fill="none"
      stroke="#b8963c"
      strokeWidth="0.5"
      opacity={0.3}
      transform="rotate(0, 60, 60)"
    />
  </svg>
);

const ArchOrnament = () => (
  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
    <path
      d="M20 80 Q20 20 150 10 Q280 20 280 80"
      stroke="#b8963c"
      strokeWidth="0.8"
      fill="none"
      opacity={0.35}
    />
    <path
      d="M40 80 Q40 30 150 22 Q260 30 260 80"
      stroke="#1a3d2b"
      strokeWidth="0.5"
      fill="none"
      opacity={0.2}
    />
    {[0.1, 0.3, 0.5, 0.7, 0.9].map((t, i) => {
      const x = 20 + (280 - 20) * t;
      const y = 80 - Math.sin(Math.PI * t) * 70 + (t === 0.5 ? -70 : 0);
      const cy = 10 + (Math.sin(Math.PI * t) * 70);
      return (
        <circle
          key={i}
          cx={x}
          cy={80 - cy + 10}
          r="2"
          fill="#b8963c"
          opacity={0.4}
        />
      );
    })}
    <circle cx="150" cy="10" r="4" fill="#b8963c" opacity={0.5} />
    <circle cx="150" cy="10" r="8" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.3} />
  </svg>
);

const CornerMandala = ({ flip = false }) => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    style={{
      transform: flip ? "scaleX(-1)" : "none",
      opacity: 0.18,
    }}
  >
    <path d="M5 5 L5 30 M5 5 L30 5" stroke="#1a3d2b" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 5 Q35 5 35 35" stroke="#b8963c" strokeWidth="0.6" strokeDasharray="3 4" />
    <path d="M5 5 Q50 5 50 50" stroke="#1a3d2b" strokeWidth="0.4" strokeDasharray="2 5" />
    <circle cx="5" cy="5" r="3" fill="#b8963c" opacity={0.7} />
    <circle cx="5" cy="5" r="7" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.4} />
    {[22, 30, 38].map((r, i) => (
      <circle key={i} cx="5" cy="5" r={r} fill="none" stroke="#1a3d2b" strokeWidth="0.3" opacity={0.15} />
    ))}
    <path d="M18 5 L5 18" stroke="#b8963c" strokeWidth="0.4" opacity={0.3} />
  </svg>
);

const GoldDivider = () => (
  <div className="flex items-center justify-center gap-4 my-2">
    <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, #b8963c)", opacity: 0.5 }} />
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2L16 10L24 12L16 14L14 22L12 14L4 12L12 10Z" fill="#b8963c" fillOpacity={0.6} />
      <path d="M14 2L16 10L24 12L16 14L14 22L12 14L4 12L12 10Z" stroke="#b8963c" strokeWidth="0.5" opacity={0.5} />
    </svg>
    <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, #b8963c)", opacity: 0.5 }} />
  </div>
);

const Hero = () => {
  const [phase, setPhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("hero-parallax");
      if (el) {
        const y = window.scrollY * 0.25;
        el.style.transform = `translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: phase >= 1 ? 1 : 0,
    transform: phase >= 1 ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Geometric background */}
      <div className="geo-bg" />

      {/* Parallax decorative layer */}
      <div id="hero-parallax" className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
        {/* Large background star — top left */}
        <div className="absolute -top-10 -left-10">
          <IslamicStar size={220} opacity={0.06} spin />
        </div>
        {/* Large background star — bottom right */}
        <div className="absolute -bottom-10 -right-10">
          <IslamicStar size={200} opacity={0.05} spin />
        </div>
        {/* Medium stars scattered */}
        <div className="absolute top-1/4 right-8">
          <IslamicStar size={80} opacity={0.08} />
        </div>
        <div className="absolute bottom-1/3 left-8">
          <IslamicStar size={60} opacity={0.07} spin />
        </div>
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-4 left-4">
        <CornerMandala />
      </div>
      <div className="absolute top-4 right-4" style={{ transform: "scaleX(-1)" }}>
        <CornerMandala />
      </div>
      <div className="absolute bottom-4 left-4" style={{ transform: "scaleY(-1)" }}>
        <CornerMandala />
      </div>
      <div className="absolute bottom-4 right-4" style={{ transform: "scale(-1,-1)" }}>
        <CornerMandala />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-16 text-center">

        {/* Bismillah */}
        <div style={fadeIn(0)}>
          <p
            className="font-arabic"
            style={{
              color: "#1a3d2b",
              fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
              lineHeight: 1.6,
              marginBottom: "6px",
            }}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </p>
        </div>

        {/* Translation */}
        <div style={fadeIn(150)}>
          <p
            className="font-display"
            style={{
              color: "#7a9a6a",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "28px",
            }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Arch ornament */}
        <div style={fadeIn(250)}>
          <ArchOrnament />
        </div>

        {/* Wedding invitation label */}
        <div style={fadeIn(300)}>
          <p
            className="font-display"
            style={{
              color: "#b8963c",
              fontSize: "10px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              marginTop: "16px",
              marginBottom: "24px",
            }}
          >
            ✦ Wedding Invitation ✦
          </p>
        </div>

        {/* Bride name */}
        <div style={fadeIn(400)}>
          <h1
            className="font-body"
            style={{
              fontSize: "clamp(2.6rem, 10vw, 4rem)",
              fontWeight: 200,
              color: "#1a3d2b",
              lineHeight: 1.1,
              letterSpacing: "0.04em",
            }}
          >
            Fathima Afnan
          </h1>
        </div>

        {/* & separator with star */}
        <div style={fadeIn(500)} className="flex items-center justify-center gap-4 my-3">
          <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, rgba(26,61,43,0.25))" }} />
          <div>
            <IslamicStar size={36} opacity={0.7} />
          </div>
          <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, rgba(26,61,43,0.25))" }} />
        </div>

        {/* Groom name */}
        <div style={fadeIn(600)}>
          <h1
            className="font-body"
            style={{
              fontSize: "clamp(2rem, 7.5vw, 3.4rem)",
              fontWeight: 200,
              color: "#1a3d2b",
              lineHeight: 1.2,
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            Hafil Muhammad Rabee&apos;
           
          </h1>
        </div>

        <div style={fadeIn(650)}>
          <p
            className="font-body"
            style={{
              color: "#7a9a6a",
              fontSize: "15px",
              fontStyle: "italic",
              marginTop: "14px",
              marginBottom: "6px",
            }}
          >
            Are Getting Married
          </p>
        </div>

        <div style={fadeIn(700)}>
          <GoldDivider />
        </div>

        {/* In sha Allah */}
        <div style={fadeIn(800)}>
          <p
            className="font-arabic"
            style={{
              color: "#1a3d2b",
              fontSize: "2rem",
              marginTop: "18px",
              marginBottom: "2px",
            }}
          >
            إِنْ شَاءَ اللَّهُ
          </p>
          <p
            className="font-display"
            style={{
              color: "#9aaa7a",
              fontSize: "9px",
              letterSpacing: "0.3em",
              marginBottom: "22px",
            }}
          >
            In Sha Allah
          </p>
        </div>

        {/* Date pill */}
        <div style={fadeIn(900)}>
          <div
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full"
            style={{
              border: "1px solid rgba(184,150,60,0.35)",
              background: "rgba(184,150,60,0.06)",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="3" width="18" height="16" rx="3" stroke="#b8963c" strokeWidth="1.2" />
              <path d="M1 8h18" stroke="#b8963c" strokeWidth="1.2" />
              <path d="M6 1v4M14 1v4" stroke="#b8963c" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span
              className="font-display"
              style={{ color: "#1a3d2b", fontSize: "11px", letterSpacing: "0.18em" }}
            >
              Sunday, April 26, 2026
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;