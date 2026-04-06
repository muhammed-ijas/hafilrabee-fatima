import { useEffect, useRef } from "react";

const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
};

/* ── 3D tilt card wrapper ── */
const TiltCard = ({ children, className, style }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 40px rgba(26,61,43,0.18), 0 20px 60px rgba(26,61,43,0.12)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.boxShadow = "0 8px 32px rgba(26,61,43,0.10)";
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        boxShadow: "0 8px 32px rgba(26,61,43,0.10)",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const IslamicArch = ({ children, label }) => (
  <div className="relative flex flex-col items-center text-center">
    <svg viewBox="0 0 180 60" fill="none" className="w-44 mb-4" aria-hidden>
      <path d="M10 60 Q10 10 90 5 Q170 10 170 60" stroke="#b8963c" strokeWidth="0.8" fill="none" opacity={0.4} />
      <path d="M25 60 Q25 18 90 14 Q155 18 155 60" stroke="#1a3d2b" strokeWidth="0.4" fill="none" opacity={0.2} />
      <circle cx="90" cy="5" r="3.5" fill="#b8963c" opacity={0.5} />
      <circle cx="90" cy="5" r="7" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.25} />
    </svg>
    <div className="w-16 h-16 relative flex items-center justify-center mb-4">{children}</div>
    <p style={{
      fontFamily: "'Questrial', sans-serif",
      fontWeight: 400,
      color: "#b8963c",
      fontSize: "12px",
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      marginBottom: "10px",
    }}>
      {label}
    </p>
  </div>
);

const GroomIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="18" r="9" stroke="#1a3d2b" strokeWidth="1.2" />
    <path d="M8 46c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#1a3d2b" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M20 11h12M26 7v4" stroke="#b8963c" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M18 13 Q26 8 34 13" stroke="#b8963c" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

const BrideIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="18" r="9" stroke="#1a3d2b" strokeWidth="1.2" />
    <path d="M8 46c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#1a3d2b" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M14 16 Q14 4 26 6 Q38 4 38 16" stroke="#b8963c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M14 16 Q12 26 8 30" stroke="#b8963c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M38 16 Q40 26 44 30" stroke="#b8963c" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <circle cx="26" cy="6" r="2" fill="#b8963c" opacity={0.6} />
  </svg>
);

const StarDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.4))" }} />
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 1L13 8L20 10L13 12L11 19L9 12L2 10L9 8Z" fill="#b8963c" opacity={0.55} />
    </svg>
    <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(184,150,60,0.4))" }} />
  </div>
);

const OrbitRing = ({ size, duration, delay, color, reverse }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top: "50%",
      left: "50%",
      marginTop: -size / 2,
      marginLeft: -size / 2,
      border: `1px solid ${color}`,
      opacity: 0.12,
      animation: `${reverse ? "orbit-reverse" : "orbit"} ${duration}s linear ${delay}s infinite`,
    }}
  >
    <div
      className="absolute rounded-full"
      style={{
        width: 5, height: 5,
        background: color, opacity: 0.7,
        top: -2.5, left: "50%", marginLeft: -2.5,
      }}
    />
  </div>
);

/* ── Always-on floating petals ── */
const FloatingPetal = ({ style }) => (
  <div className="absolute pointer-events-none" style={style}>
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
      <ellipse cx="5" cy="7" rx="4" ry="6.5" fill="#b8963c" opacity="0.18" />
    </svg>
  </div>
);

/* ── Sparkling dot that pulses ── */
const SparkDot = ({ x, y, delay, size = 4, color = "#b8963c" }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x, top: y,
      width: size, height: size,
      background: color,
      animation: `sparkPulse 2.8s ease-in-out ${delay}s infinite`,
    }}
  />
);

/* ── Drifting star ── */
const DriftStar = ({ x, y, delay, duration }) => (
  <svg
    className="absolute pointer-events-none"
    style={{
      left: x, top: y,
      animation: `drift ${duration}s ease-in-out ${delay}s infinite`,
      opacity: 0,
    }}
    width="12" height="12" viewBox="0 0 12 12" fill="none"
  >
    <path d="M6 0L7 4.5L11.5 5.5L7 6.5L6 11L5 6.5L0.5 5.5L5 4.5Z" fill="#b8963c" opacity="0.6" />
  </svg>
);

const Details = () => {
  useReveal();

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: "var(--cream, #f7f4ec)" }}>
      {/* ── always-on background: floating petals ── */}
      {[
        { top: "8%",  left: "3%",  animationDelay: "0s",   animationDuration: "7s"  },
        { top: "22%", left: "92%", animationDelay: "1.2s", animationDuration: "9s"  },
        { top: "55%", left: "6%",  animationDelay: "2.5s", animationDuration: "8s"  },
        { top: "70%", left: "88%", animationDelay: "0.8s", animationDuration: "11s" },
        { top: "40%", left: "95%", animationDelay: "3.5s", animationDuration: "6s"  },
        { top: "85%", left: "4%",  animationDelay: "1.8s", animationDuration: "10s" },
        { top: "15%", left: "50%", animationDelay: "4s",   animationDuration: "8s"  },
        { top: "60%", left: "45%", animationDelay: "2s",   animationDuration: "12s" },
      ].map((s, i) => (
        <FloatingPetal
          key={i}
          style={{
            ...s,
            animation: `petalFloat ${s.animationDuration} ease-in-out ${s.animationDelay} infinite`,
          }}
        />
      ))}

      {/* ── always-on: sparkling dots scattered around ── */}
      <SparkDot x="8%"  y="12%" delay={0}   size={3} color="#b8963c" />
      <SparkDot x="91%" y="18%" delay={0.7} size={4} color="#1a3d2b" />
      <SparkDot x="5%"  y="60%" delay={1.4} size={3} color="#b8963c" />
      <SparkDot x="94%" y="70%" delay={0.3} size={5} color="#b8963c" />
      <SparkDot x="48%" y="5%"  delay={2}   size={3} color="#1a3d2b" />
      <SparkDot x="52%" y="95%" delay={1.1} size={4} color="#b8963c" />
      <SparkDot x="20%" y="88%" delay={0.5} size={3} color="#b8963c" />
      <SparkDot x="78%" y="8%"  delay={1.8} size={3} color="#1a3d2b" />
      <SparkDot x="35%" y="50%" delay={2.5} size={2} color="#b8963c" />
      <SparkDot x="65%" y="42%" delay={0.9} size={2} color="#b8963c" />

      {/* ── always-on: drifting stars that appear and float up ── */}
      <DriftStar x="12%"  y="30%" delay={0}   duration={5}  />
      <DriftStar x="80%"  y="25%" delay={1.5} duration={6}  />
      <DriftStar x="25%"  y="65%" delay={3}   duration={7}  />
      <DriftStar x="70%"  y="75%" delay={0.8} duration={5}  />
      <DriftStar x="50%"  y="40%" delay={2.2} duration={8}  />
      <DriftStar x="90%"  y="50%" delay={4}   duration={6}  />

      {/* ── always-on: slow golden wave lines across the section ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#b8963c" strokeWidth="0.6"
          style={{ animation: "waveLine 8s ease-in-out 0s infinite" }} />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#1a3d2b" strokeWidth="0.4"
          style={{ animation: "waveLine 10s ease-in-out 2s infinite" }} />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#b8963c" strokeWidth="0.3"
          style={{ animation: "waveLine 12s ease-in-out 4s infinite" }} />
      </svg>

      {/* geo background */}
      <div className="geo-bg absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(#2d6a3f 1px, transparent 1px), linear-gradient(90deg, #2d6a3f 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        backgroundPosition: "14px 14px",
      }} />

      {/* Corner decorations */}
      <svg className="absolute top-0 left-0 opacity-5" width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="0" cy="0" r="60" fill="none" stroke="#b8963c" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#1a3d2b" strokeWidth="0.3" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#b8963c" strokeWidth="0.2" />
      </svg>
      <svg className="absolute bottom-0 right-0 opacity-5" width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ transform: "rotate(180deg)" }}>
        <circle cx="0" cy="0" r="60" fill="none" stroke="#b8963c" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#1a3d2b" strokeWidth="0.3" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#b8963c" strokeWidth="0.2" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-14 reveal">
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            color: "#b8963c",
            fontSize: "12px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}>
            ✦ With Allah's Blessings ✦
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #b8963c)", opacity: 0.45 }} />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
              style={{ animation: "spinStar 12s linear infinite" }}>
              <path d="M9 0L10.5 6.5L17 8L10.5 9.5L9 16L7.5 9.5L1 8L7.5 6.5Z" fill="#b8963c" opacity={0.6} />
            </svg>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #b8963c)", opacity: 0.45 }} />
          </div>
        </div>

        {/* Quran verse card */}
        <TiltCard
          className="reveal reveal-scale rounded-2xl px-8 md:px-12 py-10 mb-10 text-center relative overflow-hidden"
          style={{ background: "var(--ivory, #fffef8)", border: "1px solid rgba(184,150,60,0.3)" }}
        >
          {/* always-on: breathing glow behind the card */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ animation: "cardGlow 4s ease-in-out infinite", background: "transparent" }} />

          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231a3d2b' stroke-width='0.6'%3E%3Cpolygon points='30,4 38,12 38,24 30,32 22,24 22,12'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }} />

          {/* animated gold rule */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #b8963c, transparent)",
            marginBottom: "24px",
            animation: "ruleExpand 3s ease-in-out infinite",
          }} />

          <p className="font-arabic text-center mb-3" style={{ color: "#1a3d2b", fontSize: "1.5rem", lineHeight: 2,
            fontFamily: "'Amiri', serif", animation: "subtleFloat 6s ease-in-out infinite" }}>
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </p>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            color: "#1a3d2b",
            fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
            fontStyle: "italic",
            lineHeight: 2,
            marginBottom: "10px",
            letterSpacing: "0.04em",
          }}>
            "And among His signs is that He created for you mates from among yourselves,
            that you may dwell in tranquility with them; and He put love and mercy between your hearts."
          </p>
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            color: "#b8963c",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            animation: "fadeInOut 5s ease-in-out infinite",
          }}>
            Surah Ar-Rum, 30:21
          </p>

          {/* animated gold rule */}
          <div style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #b8963c, transparent)",
            marginTop: "24px",
            animation: "ruleExpand 3s ease-in-out 1.5s infinite",
          }} />
        </TiltCard>

        {/* Invitation text */}
        <div className="text-center mb-12 reveal delay-100">
          <p style={{
            fontFamily: "'Questrial', sans-serif",
            fontWeight: 400,
            color: "#1a3d2b",
            fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
            lineHeight: 2.2,
            letterSpacing: "0.06em",
            maxWidth: "520px",
            margin: "0 auto",
          }}>
            With joyous hearts and seeking the blessings of Allah (SWT), we cordially invite
            you and your family to witness and celebrate the Nikah ceremony of our beloved children.
          </p>
        </div>

        <StarDivider />

        {/* Bride & Groom cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">

          {/* Groom card */}
          <div className="reveal-left relative" style={{ isolation: "isolate" }}>
            <OrbitRing size={340} duration={18} delay={0}  color="#b8963c" reverse={false} />
            <OrbitRing size={290} duration={14} delay={-4} color="#1a3d2b" reverse={true}  />
            <OrbitRing size={240} duration={22} delay={-8} color="#b8963c" reverse={false} />

            <TiltCard
              className="relative z-10 rounded-2xl px-8 py-10 text-center overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #fffef8, #f5f0e8)",
                border: "1px solid rgba(26,61,43,0.12)",
              }}
            >
              {/* always-on: animated border glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ animation: "borderPulse 3s ease-in-out infinite",
                  boxShadow: "inset 0 0 0 1px rgba(184,150,60,0)" }} />

              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(184,150,60,0.06) 50%, transparent 70%)",
                animation: "shimmer 4s ease-in-out infinite",
              }} />

              <div className="absolute top-3 right-3 opacity-[0.07]"
                style={{ animation: "spinStar 20s linear infinite" }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  {[0,60,120,180,240,300].map((a,i) => (
                    <path key={i} d="M30 3L33 20L30 23L27 20Z" fill="#1a3d2b" transform={`rotate(${a},30,30)`} />
                  ))}
                  <circle cx="30" cy="30" r="6" fill="none" stroke="#1a3d2b" strokeWidth="0.5" />
                </svg>
              </div>

              {/* floating sparks inside card */}
              <SparkDot x="10%" y="15%" delay={0}   size={3} color="#b8963c" />
              <SparkDot x="85%" y="20%" delay={1}   size={2} color="#1a3d2b" />
              <SparkDot x="15%" y="80%" delay={1.5} size={2} color="#b8963c" />
              <SparkDot x="80%" y="75%" delay={0.5} size={3} color="#b8963c" />

              <IslamicArch label="The Groom">
                <GroomIcon />
              </IslamicArch>

              <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 400,
                color: "#1a3d2b",
                lineHeight: 1.2,
                marginBottom: "2px",
                animation: "subtleFloat 7s ease-in-out infinite",
              }}>
                Hafil Muhammad
              </h2>
              <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 400,
                color: "#b8963c",
                lineHeight: 1.2,
                marginBottom: "8px",
                animation: "subtleFloat 7s ease-in-out 0.5s infinite",
              }}>
                Rabee&apos;
              </h2>

              <div style={{
                height: "1px",
                background: "linear-gradient(to right, transparent, #b8963c, transparent)",
                margin: "16px 0",
                animation: "ruleExpand 4s ease-in-out infinite",
              }} />

              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#4a7a5a", fontSize: "11px",
                letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px",
              }}>Son of</p>
              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#2d5a3f", fontSize: "13px", lineHeight: 1.9, letterSpacing: "0.05em",
              }}>
                Usman Musliyar &amp; Shihaanath
              </p>
              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#5a7a5a", fontSize: "11px", letterSpacing: "0.06em", marginTop: "6px",
              }}>
                Vennakkode House, Pachiri, Vettathoor
              </p>
            </TiltCard>
          </div>

          {/* Bride card */}
          <div className="reveal-right relative" style={{ isolation: "isolate" }}>
            <OrbitRing size={340} duration={20} delay={-6}  color="#b8963c" reverse={true}  />
            <OrbitRing size={285} duration={15} delay={-2}  color="#1a3d2b" reverse={false} />
            <OrbitRing size={230} duration={25} delay={-10} color="#b8963c" reverse={true}  />

            <TiltCard
              className="relative z-10 rounded-2xl px-8 py-10 text-center overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #fffef8, #f5f0e8)",
                border: "1px solid rgba(184,150,60,0.2)",
              }}
            >
              {/* always-on: animated border glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ animation: "borderPulse 3s ease-in-out 1.5s infinite",
                  boxShadow: "inset 0 0 0 1px rgba(184,150,60,0)" }} />

              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(184,150,60,0.06) 50%, transparent 70%)",
                animation: "shimmer 4s ease-in-out 2s infinite",
              }} />

              <div className="absolute top-3 left-3 opacity-[0.07]"
                style={{ animation: "spinStar 25s linear reverse infinite" }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  {[0,60,120,180,240,300].map((a,i) => (
                    <path key={i} d="M30 3L33 20L30 23L27 20Z" fill="#b8963c" transform={`rotate(${a},30,30)`} />
                  ))}
                  <circle cx="30" cy="30" r="6" fill="none" stroke="#b8963c" strokeWidth="0.5" />
                </svg>
              </div>

              {/* floating sparks inside card */}
              <SparkDot x="12%" y="18%" delay={0.3} size={3} color="#b8963c" />
              <SparkDot x="82%" y="22%" delay={1.3} size={2} color="#1a3d2b" />
              <SparkDot x="18%" y="78%" delay={0.8} size={2} color="#b8963c" />
              <SparkDot x="78%" y="72%" delay={1.8} size={3} color="#b8963c" />

              <IslamicArch label="The Bride">
                <BrideIcon />
              </IslamicArch>

              <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 400,
                color: "#1a3d2b",
                lineHeight: 1.2,
                marginBottom: "2px",
                animation: "subtleFloat 8s ease-in-out 1s infinite",
              }}>
                Fathima
              </h2>
              <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 400,
                color: "#b8963c",
                lineHeight: 1.2,
                marginBottom: "8px",
                animation: "subtleFloat 8s ease-in-out 1.5s infinite",
              }}>
                Afnan
              </h2>

              <div style={{
                height: "1px",
                background: "linear-gradient(to right, transparent, #b8963c, transparent)",
                margin: "16px 0",
                animation: "ruleExpand 4s ease-in-out 2s infinite",
              }} />

              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#4a7a5a", fontSize: "11px",
                letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px",
              }}>Daughter of</p>
              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#2d5a3f", fontSize: "13px", lineHeight: 1.9, letterSpacing: "0.05em",
              }}>
                K. Rasheed Faisi &amp; Rahmath
              </p>
              <p style={{
                fontFamily: "'Questrial', sans-serif", fontWeight: 400,
                color: "#5a7a5a", fontSize: "11px", letterSpacing: "0.06em", marginTop: "6px",
              }}>
                Pallikkuunn, Mannarkkad
              </p>
            </TiltCard>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Questrial&family=Amiri:wght@400;700&display=swap');

        /* orbit rings */
        @keyframes orbit         { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes orbit-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }

        /* shimmer sweep across cards */
        @keyframes shimmer {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.55; }
        }

        /* watermark stars spin slowly */
        @keyframes spinStar {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* names float up and down gently */
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }

        /* gold rules expand/contract */
        @keyframes ruleExpand {
          0%, 100% { opacity: 0.4; transform: scaleX(0.7); }
          50%       { opacity: 1;   transform: scaleX(1); }
        }

        /* sparks pulse in and out */
        @keyframes sparkPulse {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          40%, 60% { opacity: 0.8; transform: scale(1.4); }
        }

        /* drifting stars float up and fade */
        @keyframes drift {
          0%   { opacity: 0; transform: translateY(0px) scale(0.5); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.4; }
          100% { opacity: 0; transform: translateY(-60px) scale(1.1); }
        }

        /* petals float side to side */
        @keyframes petalFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg);    opacity: 0.12; }
          33%       { transform: translateY(-18px) rotate(15deg); opacity: 0.22; }
          66%       { transform: translateY(8px) rotate(-10deg);  opacity: 0.08; }
        }

        /* card border glow pulse */
        @keyframes borderPulse {
          0%, 100% { box-shadow: inset 0 0 0 1px rgba(184,150,60,0); }
          50%       { box-shadow: inset 0 0 0 1px rgba(184,150,60,0.25); }
        }

        /* surah ref fades gently */
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* wave lines move across */
        @keyframes waveLine {
          0%, 100% { transform: translateX(-5%); opacity: 0.04; }
          50%       { transform: translateX(5%);  opacity: 0.09; }
        }

        /* card glow breathing */
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 0px rgba(184,150,60,0); }
          50%       { box-shadow: 0 0 30px rgba(184,150,60,0.08); }
        }

        /* reveal animations */
        .reveal, .reveal-left, .reveal-right, .reveal-scale {
          opacity: 0; transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal        { transform: translateY(24px); }
        .reveal-left   { transform: translateX(-40px); }
        .reveal-right  { transform: translateX(40px); }
        .reveal-scale  { transform: scale(0.95); }
        .reveal.visible, .reveal-left.visible, .reveal-right.visible, .reveal-scale.visible {
          opacity: 1; transform: none;
        }
        .delay-100 { transition-delay: 0.1s; }
      `}</style>
    </section>
  );
};

export default Details;