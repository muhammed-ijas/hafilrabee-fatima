import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-scale").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
};

const StarFloat = ({ x, y, size, delay }) => (
  <svg
    className="absolute pointer-events-none"
    style={{
      left: x, top: y, width: size, height: size,
      opacity: 0.06,
      animation: `floatStar 6s ease-in-out ${delay}s infinite`,
    }}
    viewBox="0 0 24 24" fill="none"
  >
    <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8Z" fill="#a0c87a" />
  </svg>
);

const Q = "'Questrial', sans-serif";

const Blessings = () => {
  useReveal();

  const [blessings, setBlessings] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "blessings"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlessings(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      setError("Please enter both your name and a blessing message.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await addDoc(collection(db, "blessings"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
    setSending(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return timestamp.toDate().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "#0d2419" }}
    >
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <StarFloat x="5%"  y="10%" size={20} delay={0}   />
        <StarFloat x="90%" y="8%"  size={16} delay={1.5} />
        <StarFloat x="15%" y="70%" size={14} delay={3}   />
        <StarFloat x="82%" y="60%" size={22} delay={0.8} />
        <StarFloat x="50%" y="15%" size={12} delay={2.2} />
        <StarFloat x="35%" y="85%" size={18} delay={4}   />
        <StarFloat x="70%" y="80%" size={14} delay={1}   />
      </div>

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(160,200,122,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14 reveal">
          <p style={{ fontFamily: "'Amiri', serif", color: "#7dd87a", fontSize: "2.2rem", marginBottom: "12px", lineHeight: 1.5 }}>
            بارك الله لكما
          </p>
          <p style={{ fontFamily: Q, color: "#4a7a4a", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "10px" }}>
            Blessings &amp; Greetings
          </p>
          <h2 style={{ fontFamily: Q, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 400, color: "#e8f4d0", marginBottom: "8px" }}>
            Leave a Prayer or Message
          </h2>
          <p style={{ fontFamily: Q, color: "#5a8a5a", fontSize: "14px", fontStyle: "italic" }}>
            for the couple as they begin their blessed journey together
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-14 opacity-25" style={{ background: "#a0c87a" }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L9.5 5.5L15 7L9.5 8.5L8 14L6.5 8.5L1 7L6.5 5.5Z" fill="#a0c87a" opacity={0.7} />
            </svg>
            <div className="h-px w-14 opacity-25" style={{ background: "#a0c87a" }} />
          </div>
        </div>

        {/* Form */}
        <div
          className="reveal reveal-scale rounded-2xl px-7 py-9 mb-10 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(160,200,122,0.18)" }}
        >
          <svg className="absolute top-3 right-3 opacity-10" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M3 3 L3 16 M3 3 L16 3" stroke="#a0c87a" strokeWidth="1" strokeLinecap="round" />
            <circle cx="3" cy="3" r="2" fill="#a0c87a" />
          </svg>

          {/* Name */}
          <div className="mb-5">
            <label className="block mb-2" style={{ fontFamily: Q, color: "#7aaa60", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Your Name
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#a0c87a" strokeWidth="1.3" />
                  <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#a0c87a" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Your name"
                className="w-full rounded-xl pl-10 pr-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused === "name" ? "rgba(184,150,60,0.5)" : "rgba(160,200,122,0.18)"}`,
                  color: "#e8f4d0", fontFamily: Q, fontSize: "15px",
                  outline: "none", transition: "border-color 0.3s",
                }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block mb-2" style={{ fontFamily: Q, color: "#7aaa60", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              Blessing Message
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#a0c87a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Share your duas, prayers, and well wishes..."
                rows={4}
                className="w-full rounded-xl pl-10 pr-4 py-3 resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused === "message" ? "rgba(184,150,60,0.5)" : "rgba(160,200,122,0.18)"}`,
                  color: "#e8f4d0", fontFamily: Q, fontSize: "15px",
                  outline: "none", transition: "border-color 0.3s",
                }}
              />
            </div>
          </div>

          {error && (
            <p className="mb-3" style={{ fontFamily: Q, color: "#e07070", fontSize: "13px" }}>{error}</p>
          )}

          {submitted && (
            <div className="flex items-center gap-3 mb-4 px-4 py-3 rounded-xl"
              style={{ background: "rgba(160,200,122,0.08)", border: "1px solid rgba(160,200,122,0.2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#90d070" strokeWidth="1.3" />
                <path d="M8 12l3 3 5-5" stroke="#90d070" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontFamily: Q, color: "#90d070", fontSize: "14px" }}>
                Your blessing has been sent. JazakAllah Khair!
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={sending}
            className="w-full py-3.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: sending ? "rgba(42,90,58,0.5)" : "linear-gradient(135deg, #2a5a3a, #1a3d2b)",
              color: "#c8df60",
              border: "1px solid rgba(200,223,96,0.25)",
              cursor: sending ? "not-allowed" : "pointer",
              fontFamily: Q, fontSize: "11px",
              letterSpacing: "0.24em", textTransform: "uppercase",
            }}
          >
            {sending ? "Sending..." : "Send Blessing"}
          </button>
        </div>

        {/* Blessings list */}
        {loading ? (
          <div className="text-center py-10">
            <p style={{ fontFamily: Q, color: "#7aaa60", fontSize: "13px" }}>Loading blessings...</p>
          </div>
        ) : blessings.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto mb-3" width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ opacity: 0.3 }}>
              <path d="M18 33C18 33 4 24 4 13C4 8.03 8.03 4 13 4C15.83 4 18.37 5.27 20 7.36C21.63 5.27 24.17 4 27 4C31.97 4 36 8.03 36 13C36 24 22 33 18 33Z" stroke="#a0c87a" strokeWidth="1.2" />
            </svg>
            <p style={{ fontFamily: Q, color: "#5a8a5a", fontSize: "13px", fontStyle: "italic" }}>
              No greetings yet — be the first to wish them well!
            </p>
          </div>
        ) : (
          <div>
            {/* count */}
            <p className="mb-4" style={{ fontFamily: Q, color: "#7aaa60", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase" }}>
              {blessings.length} blessing{blessings.length !== 1 ? "s" : ""} received
            </p>

            {/* scrollable container — fixed height */}
            <div
              style={{
                maxHeight: "420px",
                overflowY: "auto",
                paddingRight: "6px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(160,200,122,0.25) transparent",
              }}
            >
              <div className="space-y-4">
                {blessings.map((b) => (
                  <div
                    key={b.id}
                    className="rounded-2xl px-6 py-5"
                    style={{
                      background: "rgba(160,200,122,0.07)",
                      border: "1px solid rgba(160,200,122,0.22)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* avatar */}
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(160,200,122,0.18)",
                            border: "1px solid rgba(160,200,122,0.4)",
                            color: "#c8f0a0",
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: Q,
                          }}
                        >
                          {b.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p style={{ fontFamily: Q, color: "#d0f0b0", fontSize: "15px", fontWeight: 600 }}>
                            {b.name}
                          </p>
                          <p style={{ fontFamily: Q, color: "#5a8a5a", fontSize: "10px", letterSpacing: "0.08em" }}>
                            {formatDate(b.createdAt)}
                          </p>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
                        <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 14 21 12 21Z" stroke="#a0c87a" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p style={{
                      paddingLeft: "52px",
                      fontFamily: Q,
                      color: "#a8d888",
                      fontSize: "14px",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                    }}>
                      &ldquo;{b.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* scroll hint */}
            {blessings.length > 3 && (
              <div className="text-center mt-3">
                <p style={{ fontFamily: Q, color: "#3d6a30", fontSize: "11px", fontStyle: "italic" }}>
                  scroll inside to see all {blessings.length} blessings ↑
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer dua */}
        <div className="text-center mt-20 pt-10 reveal" style={{ borderTop: "1px solid rgba(160,200,122,0.12)" }}>
          <svg className="mx-auto mb-6 opacity-20" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" />
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" transform="rotate(60,30,30)" />
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" transform="rotate(120,30,30)" />
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" transform="rotate(180,30,30)" />
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" transform="rotate(240,30,30)" />
            <polygon points="30,3 35,22 30,26 25,22" fill="#a0c87a" transform="rotate(300,30,30)" />
            <circle cx="30" cy="30" r="6" fill="none" stroke="#b8963c" strokeWidth="0.8" />
          </svg>
          <p style={{ fontFamily: "'Amiri', serif", color: "#7dd87a", fontSize: "clamp(1.1rem, 3vw, 1.6rem)", marginBottom: "12px", lineHeight: 1.7 }}>
            بارك الله لكما وبارك عليكما وجمع بينكما في خير
          </p>
          <p style={{ fontFamily: Q, color: "#5a9a5a", fontSize: "13px", fontStyle: "italic", letterSpacing: "0.05em", marginBottom: "20px" }}>
            May Allah bless you both and bring you together in goodness.
          </p>
          <div className="h-px mb-6" style={{ background: "linear-gradient(to right, transparent, rgba(184,150,60,0.2), transparent)" }} />
          <p style={{ fontFamily: Q, color: "#2a4a2a", fontSize: "9px", letterSpacing: "0.2em", marginBottom: "10px" }}>
            © 2026 Fathima Afnan &amp; Hafil Muhammad Rabee&apos;
          </p>
          <p style={{ fontFamily: Q, color: "#1e3a1e", fontSize: "9px", letterSpacing: "0.15em" }}>
            Developed by{" "}
            <span style={{ color: "#3a6a3a", letterSpacing: "0.1em" }}>qynofix.com</span>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Questrial&family=Amiri:wght@400;700&display=swap');
        @keyframes floatStar {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%  { transform: translateY(-12px) rotate(5deg); }
          66%  { transform: translateY(6px) rotate(-3deg); }
        }
        input::placeholder, textarea::placeholder { color: rgba(160,200,122,0.2); font-family: 'Questrial', sans-serif; }
      `}</style>
    </section>
  );
};

export default Blessings;