import { useEffect } from "react";

const Q = { fontFamily: "'Questrial', sans-serif" };

const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
};

const MosqueMinaret = () => (
  <svg viewBox="0 0 200 280" fill="none" className="w-full h-full opacity-[0.06]">
    <rect x="88" y="40" width="24" height="160" fill="#a0c87a" />
    <rect x="82" y="180" width="36" height="20" fill="#a0c87a" />
    <rect x="76" y="196" width="48" height="16" fill="#a0c87a" />
    <ellipse cx="100" cy="42" rx="18" ry="6" fill="#a0c87a" />
    <path d="M82 42 Q100 10 118 42Z" fill="#a0c87a" />
    <circle cx="100" cy="16" r="7" fill="#c8df60" />
    <circle cx="103" cy="14" r="5.5" fill="#0d2419" />
    <circle cx="114" cy="12" r="3" fill="#c8df60" />
    <rect x="78" y="120" width="44" height="6" fill="#a0c87a" />
    <rect x="74" y="122" width="52" height="4" fill="#a0c87a" />
    {[60, 80, 100, 140].map((y, i) => (
      <g key={i}><rect x="92" y={y} width="16" height="14" rx="8" fill="#0d2419" opacity={0.4} /></g>
    ))}
  </svg>
);

const EventInfo = () => {
  useReveal();

  const handleViewLocation = () => {
    window.open("https://www.google.com/maps/search/Pallikkuunn+Mannarkkad", "_blank");
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden" style={{ background: "var(--dark-bg, #0d2419)" }}>
      <div className="geo-bg-dark" />

      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none hidden md:block">
        <MosqueMinaret />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none hidden md:block" style={{ transform: "scaleX(-1)" }}>
        <MosqueMinaret />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.4), transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <p className="font-arabic" style={{ color: "#a0c87a", fontSize: "2rem", marginBottom: "8px" }}>
            تَفَضَّلُوا بِالْحُضُور
          </p>
          <p style={{ ...Q, color: "#6a9a5a", fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "10px" }}>
            You Are Cordially Invited
          </p>
          <h2 style={{ ...Q, fontSize: "clamp(1.4rem, 4vw, 2rem)", color: "#e8f4d0", letterSpacing: "0.04em" }}>
            Nikah Ceremony Details
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-14" style={{ background: "#b8963c", opacity: 0.4 }} />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 0L10.5 6.5L17 8L10.5 9.5L9 16L7.5 9.5L1 8L7.5 6.5Z" fill="#b8963c" opacity={0.7} />
            </svg>
            <div className="h-px w-14" style={{ background: "#b8963c", opacity: 0.4 }} />
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* WHEN */}
          <div
            className="reveal-left card-lift rounded-2xl px-7 py-10 text-center relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,150,60,0.25)" }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 200" fill="none">
              <polygon points="60,5 140,5 195,60 195,140 140,195 60,195 5,140 5,60" stroke="#b8963c" strokeWidth="1" fill="none" />
            </svg>

            <div className="mb-5">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="2" y="5" width="32" height="28" rx="5" stroke="#a0c87a" strokeWidth="1.2" />
                <path d="M2 13h32" stroke="#a0c87a" strokeWidth="1.2" />
                <path d="M10 2v6M26 2v6" stroke="#a0c87a" strokeWidth="1.2" strokeLinecap="round" />
                <rect x="9" y="18" width="5" height="5" rx="1" fill="#a0c87a" opacity={0.5} />
                <rect x="16" y="18" width="5" height="5" rx="1" fill="#a0c87a" opacity={0.5} />
              </svg>
            </div>

            <p style={{ ...Q, color: "#6a9a5a", fontSize: "11px", letterSpacing: "0.36em", textTransform: "uppercase", marginBottom: "16px" }}>
              When
            </p>
            <p style={{ ...Q, color: "#c8df60", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>Sunday</p>
            <p style={{ fontFamily: "'Cormorant SC', serif", color: "#ffffff", fontSize: "3.4rem", fontWeight: 300, lineHeight: 1, letterSpacing: "0.06em", margin: "6px 0" }}>
              APR 26
            </p>
            <p style={{ fontFamily: "'Cormorant SC', serif", color: "#a0c87a", fontSize: "1.3rem", fontWeight: 300, marginBottom: "20px" }}>2026</p>

            <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.08)" }} />

            <p style={{ ...Q, color: "#d0e8d0", fontSize: "12px", letterSpacing: "0.12em" }}>
              TIME: 11:00 AM
            </p>
            <p style={{ ...Q, color: "#4a7a4a", fontSize: "12px", fontStyle: "italic", marginTop: "4px" }}>
              Reception until 2:00 PM
            </p>
          </div>

          {/* WHERE */}
          <div
            className="reveal reveal-scale card-lift rounded-2xl px-6 py-7 text-center relative overflow-hidden delay-200"
            style={{ background: "var(--ivory, #fffef8)", border: "1.5px solid rgba(184,150,60,0.3)" }}
          >
            <div className="mb-3">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <path d="M18 3C12.48 3 8 7.48 8 13c0 8.25 10 20 10 20s10-11.75 10-20c0-5.52-4.48-10-10-10z" stroke="#b8963c" strokeWidth="1.2" />
                <circle cx="18" cy="13" r="4" stroke="#b8963c" strokeWidth="1.2" />
              </svg>
            </div>

            <p style={{ ...Q, color: "#b8963c", fontSize: "11px", letterSpacing: "0.36em", textTransform: "uppercase", marginBottom: "14px" }}>
              Where
            </p>
            <h3 style={{ ...Q, fontSize: "1rem", color: "#1a3d2b", marginBottom: "4px", lineHeight: 1.4 }}>
              Rasheed Faisi Residence
            </h3>
            <p style={{ ...Q, color: "#4a6a4a", fontSize: "12px", lineHeight: 1.7, marginBottom: "14px" }}>
              Pallikkuunn, Mannarkkad, Kerala
            </p>

            <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid rgba(26,61,43,0.12)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4882654934827!2d76.47797627480833!3d11.001945689160854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba87f29dd5af525%3A0x685a54d63a53e753!2sRasheed!5e0!3m2!1sen!2sin!4v1775391297821!5m2!1sen!2sin"
                width="100%" height="180"
                style={{ border: 0, display: "block" }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
              />
            </div>

            <button
              onClick={handleViewLocation}
              className="px-7 py-2.5 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{ ...Q, background: "#1a3d2b", color: "#c8df60", border: "none", cursor: "pointer", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              Open in Google Maps
            </button>
          </div>

          {/* BEST WISHES */}
          <div
            className="reveal-right card-lift rounded-2xl px-7 py-10 text-center relative overflow-hidden delay-300"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(160,200,122,0.18)" }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 200" fill="none">
              <polygon points="60,5 140,5 195,60 195,140 140,195 60,195 5,140 5,60" stroke="#a0c87a" strokeWidth="1" fill="none" />
            </svg>

            <div className="mb-5">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 32C18 32 4 23 4 13C4 8.03 8.03 4 13 4C15.83 4 18.37 5.27 20 7.36C21.63 5.27 24.17 4 27 4C31.97 4 36 8.03 36 13C36 23 22 32 18 32Z"
                  stroke="#a0c87a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <p style={{ ...Q, color: "#6a9a5a", fontSize: "11px", letterSpacing: "0.36em", textTransform: "uppercase", marginBottom: "16px" }}>
              Best Wishes
            </p>
            <p className="font-arabic" style={{ color: "#a0c87a", fontSize: "1.4rem", lineHeight: 1.8, marginBottom: "12px" }}>
              بارك الله لكما
            </p>
            <p style={{ ...Q, color: "#c0e0a0", fontSize: "14px", fontStyle: "italic", lineHeight: 1.9, marginBottom: "16px" }}>
              "With love, prayers,<br />and heartfelt duas"
            </p>
            <p style={{ ...Q, color: "#5a8a5a", fontSize: "12px", lineHeight: 1.8 }}>
              We warmly invite our beloved relatives, family, and friends to shower the couple with your blessings.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-14 reveal delay-400">
          <div className="h-px mb-8" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.25), transparent)" }} />
          <p style={{ ...Q, color: "#4a7a4a", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "8px" }}>
            Hosted By
          </p>
          <p style={{ ...Q, color: "#e8f4d0", fontSize: "1.1rem" }}>
            K. Rasheed Faisi &amp; Rahmath
          </p>
          <a
            href="tel:90000000000"
            className="inline-flex items-center gap-2 mt-3 transition-opacity hover:opacity-80"
            style={{ ...Q, color: "#b8963c", fontSize: "13px", textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.02 21 3 13.98 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.67.76 3.88a1 1 0 01-.64 1.91z"
                stroke="#b8963c" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            90000000000
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.3), transparent)" }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Questrial&family=Cormorant+SC:wght@300;400&display=swap');
      `}</style>
    </section>
  );
};

export default EventInfo;