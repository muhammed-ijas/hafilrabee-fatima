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
  </svg>
);

const ArchOrnament = () => (
  <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
    <path d="M20 80 Q20 20 150 10 Q280 20 280 80" stroke="#b8963c" strokeWidth="0.8" fill="none" opacity={0.35} />
    <path d="M40 80 Q40 30 150 22 Q260 30 260 80" stroke="#1a3d2b" strokeWidth="0.5" fill="none" opacity={0.2} />
    {[0.1, 0.3, 0.5, 0.7, 0.9].map((t, i) => {
      const x = 20 + (280 - 20) * t;
      const cy = 10 + Math.sin(Math.PI * t) * 70;
      return <circle key={i} cx={x} cy={80 - cy + 10} r="2" fill="#b8963c" opacity={0.4} />;
    })}
    <circle cx="150" cy="10" r="4" fill="#b8963c" opacity={0.5} />
    <circle cx="150" cy="10" r="8" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.3} />
  </svg>
);

const CornerMandala = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none" style={{ opacity: 0.18 }}>
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

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("hero-parallax");
      if (el) el.style.transform = `translateY(${window.scrollY * 0.25}px)`;
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
      <div className="geo-bg" />

      <div id="hero-parallax" className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
        <div className="absolute -top-10 -left-10"><IslamicStar size={220} opacity={0.06} spin /></div>
        <div className="absolute -bottom-10 -right-10"><IslamicStar size={200} opacity={0.05} spin /></div>
        <div className="absolute top-1/4 right-8"><IslamicStar size={80} opacity={0.08} /></div>
        <div className="absolute bottom-1/3 left-8"><IslamicStar size={60} opacity={0.07} spin /></div>
      </div>

      <div className="absolute top-4 left-4"><CornerMandala /></div>
      <div className="absolute top-4 right-4" style={{ transform: "scaleX(-1)" }}><CornerMandala /></div>
      <div className="absolute bottom-4 left-4" style={{ transform: "scaleY(-1)" }}><CornerMandala /></div>
      <div className="absolute bottom-4 right-4" style={{ transform: "scale(-1,-1)" }}><CornerMandala /></div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-16 text-center">

        {/* Bismillah — Amiri */}
        <div style={fadeIn(0)}>
          <p
            className="font-arabic"
            style={{ color: "#1a3d2b", fontSize: "clamp(1.8rem, 6vw, 2.6rem)", lineHeight: 1.6, marginBottom: "6px" }}
          >
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </p>
        </div>

        {/* Translation — Lexend Giga */}
        <div style={fadeIn(150)}>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            color: "#7a9a6a",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "28px",
          }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Arch ornament */}
        <div style={fadeIn(250)}><ArchOrnament /></div>

        {/* Wedding Invitation — Lexend Giga */}
        <div style={fadeIn(300)}>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            color: "#b8963c",
            fontSize: "11px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginTop: "18px",
            marginBottom: "30px",
          }}>
            ✦ &nbsp;Wedding Invitation&nbsp; ✦
          </p>
        </div>

        {/* Bride name — Great Vibes */}
        <div style={fadeIn(400)}>
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(3rem, 12vw, 5rem)",
            fontWeight: 400,
            color: "#1a3d2b",
            lineHeight: 1.15,
            margin: "0 0 4px",
          }}>
            Fathima Afnan
          </h1>
        </div>

        {/* & separator — Great Vibes */}
        <div style={fadeIn(500)} className="flex items-center justify-center gap-5 my-1">
          <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.4))" }} />
          <p style={{
            fontFamily: "'Great Vibes', cursive",
            color: "#b8963c",
            fontSize: "clamp(2rem, 7vw, 3rem)",
            lineHeight: 1,
            margin: 0,
          }}>
            &amp;
          </p>
          <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, rgba(184,150,60,0.4))" }} />
        </div>

        {/* Groom name — Great Vibes, two lines, Rabee' in gold */}
        <div style={fadeIn(600)}>
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.6rem, 10vw, 4.4rem)",
            fontWeight: 400,
            color: "#1a3d2b",
            lineHeight: 1.2,
            margin: "4px 0 0",
          }}>
            Hafil Muhammad
          </h1>
          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.6rem, 10vw, 4.4rem)",
            fontWeight: 400,
            color: "#1a3d2b",
            lineHeight: 1.15,
            margin: "0",
          }}>
            Rabee&apos;
          </h1>
        </div>

        {/* Are Getting Married — Lexend Giga */}
        <div style={fadeIn(660)}>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            color: "#7a9a6a",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "22px",
            marginBottom: "4px",
          }}>
            Are Getting Married
          </p>
        </div>

        <div style={fadeIn(700)}><GoldDivider /></div>

        {/* In sha Allah — Amiri + Lexend Giga */}
        <div style={fadeIn(800)}>
          <p className="font-arabic" style={{ color: "#1a3d2b", fontSize: "2rem", marginTop: "18px", marginBottom: "4px" }}>
            إِنْ شَاءَ اللَّهُ
          </p>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            color: "#9aaa7a",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "22px",
          }}>
            In Sha Allah
          </p>
        </div>

        {/* Date pill — Lexend Giga */}
        <div style={fadeIn(900)}>
          <div
            className="inline-flex items-center gap-3 px-7 py-3 rounded-full"
            style={{ border: "1px solid rgba(184,150,60,0.35)", background: "rgba(184,150,60,0.06)" }}
          >
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="3" width="18" height="16" rx="3" stroke="#b8963c" strokeWidth="1.2" />
              <path d="M1 8h18" stroke="#b8963c" strokeWidth="1.2" />
              <path d="M6 1v4M14 1v4" stroke="#b8963c" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span style={{
              fontFamily: "'Questrial', sans-serif",
              fontWeight: 300,
              color: "#1a3d2b",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              Sunday, April 26, 2026
            </span>
          </div>
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Questrial&display=swap');
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;