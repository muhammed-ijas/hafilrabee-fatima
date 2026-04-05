import { useEffect, useRef } from "react";

// Reusable scroll-reveal hook
const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const OctagonFrame = () => (
  <svg viewBox="0 0 200 200" fill="none" className="w-full h-full absolute inset-0">
    <polygon
      points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60"
      stroke="#b8963c"
      strokeWidth="0.8"
      fill="none"
      opacity={0.35}
    />
    <polygon
      points="68,20 132,20 180,68 180,132 132,180 68,180 20,132 20,68"
      stroke="#1a3d2b"
      strokeWidth="0.4"
      fill="none"
      opacity={0.2}
    />
    <polygon
      points="76,30 124,30 170,76 170,124 124,170 76,170 30,124 30,76"
      stroke="#b8963c"
      strokeWidth="0.3"
      fill="none"
      opacity={0.1}
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const r = 90;
      const cx = 100 + r * Math.cos(rad);
      const cy = 100 + r * Math.sin(rad);
      return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#b8963c" opacity={0.3} />;
    })}
  </svg>
);

const IslamicArch = ({ children, label, sublabel }) => (
  <div className="relative flex flex-col items-center text-center">
    {/* Arch SVG above */}
    <svg viewBox="0 0 180 60" fill="none" className="w-44 mb-4" aria-hidden>
      <path
        d="M10 60 Q10 10 90 5 Q170 10 170 60"
        stroke="#b8963c"
        strokeWidth="0.8"
        fill="none"
        opacity={0.4}
      />
      <path
        d="M25 60 Q25 18 90 14 Q155 18 155 60"
        stroke="#1a3d2b"
        strokeWidth="0.4"
        fill="none"
        opacity={0.2}
      />
      <circle cx="90" cy="5" r="3.5" fill="#b8963c" opacity={0.5} />
      <circle cx="90" cy="5" r="7" fill="none" stroke="#b8963c" strokeWidth="0.5" opacity={0.25} />
    </svg>

    <div className="w-16 h-16 relative flex items-center justify-center mb-4">
      {children}
    </div>

    <p
      className="font-display"
      style={{
        color: "#b8963c",
        fontSize: "9px",
        letterSpacing: "0.38em",
        textTransform: "uppercase",
        marginBottom: "10px",
      }}
    >
      {label}
    </p>
  </div>
);

const GroomIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="18" r="9" stroke="#1a3d2b" strokeWidth="1.2" />
    <path d="M8 46c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#1a3d2b" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M20 11h12M26 7v4" stroke="#b8963c" strokeWidth="1.2" strokeLinecap="round" />
    {/* Kufi/taqiyah */}
    <path d="M18 13 Q26 8 34 13" stroke="#b8963c" strokeWidth="1" strokeLinecap="round" fill="none" />
  </svg>
);

const BrideIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="18" r="9" stroke="#1a3d2b" strokeWidth="1.2" />
    <path d="M8 46c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#1a3d2b" strokeWidth="1.2" strokeLinecap="round" />
    {/* Hijab arch */}
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

const Details = () => {
  useReveal();

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div className="geo-bg" />

      {/* Decorative corner stars */}
      <svg
        className="absolute top-0 left-0 opacity-5"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
      >
        <path d="M0 0 Q90 0 90 90 Q90 0 180 0" stroke="#1a3d2b" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="#b8963c" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#1a3d2b" strokeWidth="0.3" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#b8963c" strokeWidth="0.2" />
      </svg>

      <svg
        className="absolute bottom-0 right-0 opacity-5"
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        style={{ transform: "rotate(180deg)" }}
      >
        <circle cx="0" cy="0" r="60" fill="none" stroke="#b8963c" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="90" fill="none" stroke="#1a3d2b" strokeWidth="0.3" />
        <circle cx="0" cy="0" r="120" fill="none" stroke="#b8963c" strokeWidth="0.2" />
      </svg>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-14 reveal">
          <p
            className="font-display"
            style={{ color: "#b8963c", fontSize: "9px", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "10px" }}
          >
            ✦ With Allah's Blessings ✦
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #b8963c)", opacity: 0.45 }} />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 0L10.5 6.5L17 8L10.5 9.5L9 16L7.5 9.5L1 8L7.5 6.5Z" fill="#b8963c" opacity={0.6} />
            </svg>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #b8963c)", opacity: 0.45 }} />
          </div>
        </div>

        {/* Quran verse card */}
        <div
          className="reveal reveal-scale rounded-2xl px-8 md:px-12 py-10 mb-10 text-center relative overflow-hidden"
          style={{
            background: "var(--ivory)",
            border: "1px solid rgba(184,150,60,0.3)",
          }}
        >
          {/* Background pattern inside card */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231a3d2b' stroke-width='0.6'%3E%3Cpolygon points='30,4 38,12 38,24 30,32 22,24 22,12'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }} />

          {/* Gold top line */}
          <div className="gold-rule mb-6" />

          <p
            className="font-arabic text-center mb-3"
            style={{ color: "#1a3d2b", fontSize: "1.5rem", lineHeight: 2 }}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </p>

          <p
            className="font-body"
            style={{
              color: "#2d5a3f",
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              fontStyle: "italic",
              lineHeight: 1.9,
              marginBottom: "10px",
            }}
          >
            &ldquo;And among His signs is that He created for you mates from among yourselves,
            that you may dwell in tranquility with them; and He put love and mercy
            between your hearts.&rdquo;
          </p>
          <p
            className="font-display"
            style={{ color: "#b8963c", fontSize: "10px", letterSpacing: "0.2em" }}
          >
            Surah Ar-Rum, 30:21
          </p>

          <div className="gold-rule mt-6" />
        </div>

        {/* Invitation text */}
        <div className="text-center mb-12 reveal delay-100">
          <p
            className="font-body mx-auto"
            style={{
              color: "#2d5a3f",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.9,
              maxWidth: "520px",
            }}
          >
            With joyous hearts and seeking the blessings of Allah (SWT), we cordially invite
            you and your family to witness and celebrate the Nikah ceremony of our beloved children.
          </p>
        </div>

        <StarDivider />

        {/* Bride & Groom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

          {/* Groom */}
          <div
            className="reveal-left card-lift rounded-2xl px-8 py-10 text-center relative overflow-hidden"
            style={{
              background: "var(--ivory)",
              border: "1px solid rgba(26,61,43,0.12)",
            }}
          >
            <div className="absolute top-3 right-3 opacity-10">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" transform="rotate(60,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" transform="rotate(120,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" transform="rotate(180,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" transform="rotate(240,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#1a3d2b" transform="rotate(300,25,25)" />
              </svg>
            </div>

            <IslamicArch label="The Groom">
              <GroomIcon />
            </IslamicArch>

            <h2
              className="font-body"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 300,
                color: "#1a3d2b",
                lineHeight: 1.25,
                marginBottom: "8px",
              }}
            >
              Hafil Muhammad<br />
              <span style={{ color: "#b8963c", fontStyle: "italic" }}>Rabee&apos;</span>
            </h2>

            <div className="gold-rule my-4" />

            <p
              className="font-display"
              style={{ color: "#7a9a6a", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "6px" }}
            >
              Son of
            </p>
            <p className="font-body" style={{ color: "#2d5a3f", fontSize: "14px", lineHeight: 1.6 }}>
              Usman Musliyar &amp; Shihaanath
            </p>
            <p className="font-body" style={{ color: "#9aaa7a", fontSize: "12px", fontStyle: "italic", marginTop: "6px" }}>
              Vennakkode House, Pachiri, Vettathoor
            </p>
          </div>

          {/* Bride */}
          <div
            className="reveal-right card-lift rounded-2xl px-8 py-10 text-center relative overflow-hidden"
            style={{
              background: "var(--ivory)",
              border: "1px solid rgba(184,150,60,0.18)",
            }}
          >
            <div className="absolute top-3 left-3 opacity-10">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" transform="rotate(60,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" transform="rotate(120,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" transform="rotate(180,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" transform="rotate(240,25,25)" />
                <path d="M25 1L28 17L25 20L22 17Z" fill="#b8963c" transform="rotate(300,25,25)" />
              </svg>
            </div>

            <IslamicArch label="The Bride">
              <BrideIcon />
            </IslamicArch>

            <h2
              className="font-body"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 300,
                color: "#1a3d2b",
                lineHeight: 1.25,
                marginBottom: "8px",
              }}
            >
              Fathima<br />
              <span style={{ color: "#b8963c", fontStyle: "italic" }}>Afnan</span>
            </h2>

            <div className="gold-rule my-4" />

            <p
              className="font-display"
              style={{ color: "#7a9a6a", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "6px" }}
            >
              Daughter of
            </p>
            <p className="font-body" style={{ color: "#2d5a3f", fontSize: "14px", lineHeight: 1.6 }}>
              K. Rasheed Faisi &amp; Rahmath
            </p>
            <p className="font-body" style={{ color: "#9aaa7a", fontSize: "12px", fontStyle: "italic", marginTop: "6px" }}>
              Pallikkuunn, Mannarkkad
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;