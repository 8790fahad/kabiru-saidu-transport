// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Services", "Contact"];
const PHONE_PRIMARY = "07063933908";
const PHONE_SECONDARY = "07085963535";
const EMAIL = "Kabiruabdullahisani123@gmail.com";
const WHATSAPP_NUMBER = "2347063933908";

const SERVICES = [
  { icon: "🚛", title: "Road Transportation", desc: "Nationwide road transport solutions connecting cities, towns, and markets across Nigeria with speed and reliability." },
  { icon: "🏗️", title: "Truck & Haulage", desc: "Heavy-duty haulage services for bulk goods, agricultural produce, and industrial cargo across all major routes." },
  { icon: "📦", title: "General Merchandise & Trading", desc: "End-to-end trading and merchandise logistics — from sourcing at Dawanau International Market to final delivery." },
];

const COMMODITIES = [
  { icon: "🌾", name: "Sesame Seeds", desc: "Premium grade sesame seeds sourced and transported across Nigeria and for export." },
  { icon: "🫘", name: "Soya Beans", desc: "Bulk soya bean haulage for processors, traders, and agro-exporters nationwide." },
  { icon: "🫚", name: "Ginger", desc: "Fresh and dried ginger transportation, handled with care to preserve quality." },
  { icon: "🌺", name: "Hibiscus (Zobo)", desc: "Dried hibiscus flower logistics connecting Kano markets to buyers across Nigeria." },
  { icon: "🪨", name: "Stone Flower", desc: "Specialised handling and transport of stone flower (Dagad Phool) for the spice trade." },
];

const WHY_US = [
  { icon: "✅", label: "CAC Registered", detail: "Fully registered under Nigerian law. Reg No: 3538802" },
  { icon: "🗺️", label: "Wide Coverage", detail: "We service major routes across all 36 states in Nigeria" },
  { icon: "⏱️", label: "On-Time Delivery", detail: "Punctuality is a promise, not just a policy" },
  { icon: "🔒", label: "Cargo Safety", detail: "Every shipment handled with care and full accountability" },
  { icon: "💰", label: "Affordable Rates", detail: "Competitive pricing for SMEs, traders, and corporates alike" },
  { icon: "📞", label: "24/7 Support", detail: "Always reachable — before, during, and after every trip" },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

function openWhatsApp(message) {
  const text = encodeURIComponent(message || "Hello! I'd like to enquire about your transport and logistics services.");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close menu on page change
  useEffect(() => setMenuOpen(false), [active]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled || menuOpen ? "rgba(8,30,15,0.98)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(74,182,90,0.18)" : "none",
      transition: "background 0.35s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
        {/* Logo */}
        <div onClick={() => setActive("Home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#4ab65a,#1e7a2e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 0 0 2px rgba(74,182,90,0.3)", flexShrink: 0 }}>🚛</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: isMobile ? 13 : 15, lineHeight: 1.1 }}>Kabiru Saidu</div>
            <div style={{ color: "#4ab65a", fontSize: isMobile ? 8 : 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace" }}>Transport & Logistics Services</div>
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => setActive(link)} style={{
                background: active === link ? "rgba(74,182,90,0.15)" : "transparent",
                border: active === link ? "1px solid rgba(74,182,90,0.4)" : "1px solid transparent",
                color: active === link ? "#4ab65a" : "rgba(255,255,255,0.75)",
                padding: "7px 16px", borderRadius: 6, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
              }}>{link}</button>
            ))}
            <button onClick={() => openWhatsApp()} style={{
              background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", color: "#fff",
              padding: "8px 18px", borderRadius: 6, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600,
              marginLeft: 6, boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
            }}>💬 WhatsApp</button>
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "transparent", border: "1px solid rgba(74,182,90,0.4)",
            color: "#4ab65a", width: 40, height: 40, borderRadius: 8,
            fontSize: 19, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>{menuOpen ? "✕" : "☰"}</button>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{ background: "rgba(8,30,15,0.99)", padding: "8px 5vw 24px", borderTop: "1px solid rgba(74,182,90,0.15)" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => setActive(link)} style={{
              display: "flex", alignItems: "center", width: "100%", textAlign: "left",
              background: active === link ? "rgba(74,182,90,0.08)" : "transparent",
              border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
              color: active === link ? "#4ab65a" : "rgba(255,255,255,0.82)",
              padding: "14px 4px", fontFamily: "'DM Sans',sans-serif", fontSize: 17, cursor: "pointer",
            }}>{link}</button>
          ))}
          <button onClick={() => openWhatsApp()} style={{
            marginTop: 14, width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)",
            border: "none", color: "#fff", padding: "14px", borderRadius: 10,
            fontFamily: "'DM Sans',sans-serif", fontSize: 16, fontWeight: 700, cursor: "pointer",
          }}>💬 Chat on WhatsApp</button>
          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <a href={`tel:${PHONE_PRIMARY}`} style={{ flex: 1, textAlign: "center", background: "rgba(74,182,90,0.12)", border: "1px solid rgba(74,182,90,0.2)", color: "#fff", padding: "11px", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 14, textDecoration: "none", display: "block" }}>📞 Call</a>
            <a href={`mailto:${EMAIL}`} style={{ flex: 1, textAlign: "center", background: "rgba(74,182,90,0.12)", border: "1px solid rgba(74,182,90,0.2)", color: "#fff", padding: "11px", borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 14, textDecoration: "none", display: "block" }}>✉️ Email</a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── HOME PAGE ───────────────────────────────────────────── */
function HomePage({ setActive }) {
  const isMobile = useIsMobile();
  const [heroRef, heroIn] = useInView(0.05);
  const [comRef, comIn] = useInView(0.05);
  const [svcRef, svcIn] = useInView(0.05);
  const [trustRef, trustIn] = useInView(0.05);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", background: "linear-gradient(160deg,#050f08 0%,#0a2814 55%,#071a0d 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(74,182,90,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(74,182,90,0.05) 1px,transparent 1px)", backgroundSize: "55px 55px" }} />
        <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: isMobile ? 320 : 600, height: isMobile ? 320 : 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,182,90,0.11) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "100px 6vw 70px" : "120px 5vw 80px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 60, alignItems: "center" }}>

            {/* Text col */}
            <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(36px)", transition: "all 0.8s ease" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(74,182,90,0.12)", border: "1px solid rgba(74,182,90,0.28)", borderRadius: 20, padding: "5px 13px", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ab65a", display: "block", animation: "pulse 2s infinite" }} />
                <span style={{ color: "#4ab65a", fontSize: isMobile ? 10 : 12, fontFamily: "monospace", letterSpacing: 1 }}>CAC REG. 3538802 · EST. 2021</span>
              </div>

              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(30px,8vw,44px)" : "clamp(36px,4.5vw,62px)", fontWeight: 800, color: "#fff", lineHeight: 1.18, marginBottom: 20 }}>
                Reliable Road Transport &{" "}
                <span style={{ background: "linear-gradient(90deg,#4ab65a,#7dd88a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Logistics Solutions</span>{" "}
                Across Nigeria
              </h1>

              <p style={{ color: "rgba(255,255,255,0.58)", fontSize: isMobile ? 15 : 17, lineHeight: 1.82, fontFamily: "'DM Sans',sans-serif", marginBottom: 32 }}>
                Based at Dawanau International Grains Market, Kano — specialists in sesame seeds, soya beans, ginger, hibiscus, stone flower, and all cargo safely across Nigeria.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => openWhatsApp("Hello! I'd like to get a transport quote from Kabiru Saidu Transport & Logistics Services.")} style={{
                  background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", color: "#fff",
                  padding: isMobile ? "13px 24px" : "14px 30px", borderRadius: 8,
                  fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", boxShadow: "0 7px 28px rgba(37,211,102,0.35)",
                }}>💬 WhatsApp Us</button>
                <button onClick={() => setActive("Contact")} style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.82)",
                  padding: isMobile ? "13px 24px" : "14px 28px", borderRadius: 8,
                  fontSize: isMobile ? 14 : 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                }}>Contact Us →</button>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: isMobile ? 24 : 40, marginTop: 44, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
                {[["3+","Years Operating"],["36","States Covered"],["5+","Commodities"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ color: "#4ab65a", fontSize: isMobile ? 24 : 28, fontWeight: 800, fontFamily: "'Playfair Display',serif" }}>{n}</div>
                    <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 12, fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual col – hidden on mobile */}
            {!isMobile && (
              <div style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateX(36px)", transition: "all 0.9s ease 0.2s" }}>
                <div style={{ position: "relative", borderRadius: 20, border: "1px solid rgba(74,182,90,0.2)", background: "linear-gradient(145deg,rgba(74,182,90,0.08),rgba(10,40,20,0.82))", padding: 40, textAlign: "center" }}>
                  <div style={{ fontSize: 100, marginBottom: 18, filter: "drop-shadow(0 10px 30px rgba(74,182,90,0.28))" }}>🚛</div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
                    {["🌾","🫘","🫚","🌺","🪨"].map(e => <span key={e} style={{ fontSize: 28 }}>{e}</span>)}
                  </div>
                  <div style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 17, marginBottom: 6 }}>Kabiru Saidu Transport & Logistics Services</div>
                  <div style={{ color: "rgba(255,255,255,0.38)", fontFamily: "monospace", fontSize: 11, letterSpacing: 2 }}>KANO, NIGERIA · EST. 2021</div>
                  <div onClick={() => openWhatsApp()} style={{ position: "absolute", top: 14, right: 14, background: "#25D366", borderRadius: 18, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,211,102,0.4)" }}>
                    <span style={{ fontSize: 13 }}>💬</span>
                    <span style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600 }}>WhatsApp</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMMODITIES */}
      <section ref={comRef} style={{ background: "#040d07", padding: isMobile ? "70px 5vw" : "100px 5vw", borderTop: "1px solid rgba(74,182,90,0.07)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56, opacity: comIn ? 1 : 0, transform: comIn ? "none" : "translateY(26px)", transition: "all 0.7s" }}>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Specialised Cargo</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(26px,4vw,44px)", color: "#fff", fontWeight: 700 }}>Commodities We Transport</h2>
            <p style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 14 : 15, marginTop: 10, maxWidth: 500, margin: "10px auto 0" }}>
              From Dawanau's famous grain market to buyers across Nigeria and beyond.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: isMobile ? 14 : 20 }}>
            {COMMODITIES.map((c, i) => (
              <div key={c.name} style={{
                background: "linear-gradient(145deg,rgba(74,182,90,0.09),rgba(10,40,20,0.7))",
                border: "1px solid rgba(74,182,90,0.14)", borderRadius: 14, padding: isMobile ? 18 : 26, textAlign: "center",
                opacity: comIn ? 1 : 0, transform: comIn ? "none" : "translateY(26px)",
                transition: `all 0.55s ease ${i * 0.09}s`,
              }}>
                <div style={{ fontSize: isMobile ? 36 : 48, marginBottom: 10 }}>{c.icon}</div>
                <h3 style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 13 : 16, marginBottom: 8 }}>{c.name}</h3>
                {!isMobile && <p style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={svcRef} style={{ background: "#071510", padding: isMobile ? "70px 5vw" : "100px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 56, opacity: svcIn ? 1 : 0, transform: svcIn ? "none" : "translateY(26px)", transition: "all 0.7s" }}>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>What We Do</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(24px,7vw,34px)" : "clamp(28px,4vw,46px)", color: "#fff", fontWeight: 700 }}>Our Core Services</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 16 : 22 }}>
            {SERVICES.map((s, i) => (
              <div key={s.title} style={{
                background: "linear-gradient(145deg,rgba(74,182,90,0.08),rgba(10,40,20,0.62))",
                border: "1px solid rgba(74,182,90,0.14)", borderRadius: 16, padding: isMobile ? 26 : 34,
                opacity: svcIn ? 1 : 0, transform: svcIn ? "none" : "translateY(36px)",
                transition: `all 0.65s ease ${i * 0.13}s`,
              }}>
                <div style={{ fontSize: isMobile ? 38 : 46, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 19 : 22, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.72, fontSize: isMobile ? 14 : 15 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section ref={trustRef} style={{ background: "#050f08", padding: isMobile ? "60px 5vw" : "80px 5vw", borderTop: "1px solid rgba(74,182,90,0.08)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 12 : 22 }}>
            {[
              { icon: "🏛️", label: "CAC Registered", sub: "No. 3538802" },
              { icon: "🇳🇬", label: "Nigerian Owned", sub: "Proudly Local" },
              { icon: "📍", label: "Kano Based", sub: "Dawanau Market" },
              { icon: "📅", label: "Since 2021", sub: "Established & Trusted" },
            ].map((b, i) => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "rgba(74,182,90,0.06)", border: "1px solid rgba(74,182,90,0.11)",
                borderRadius: 12, padding: isMobile ? "14px 16px" : "18px 22px",
                opacity: trustIn ? 1 : 0, transform: trustIn ? "none" : "translateY(18px)",
                transition: `all 0.55s ease ${i * 0.1}s`,
              }}>
                <span style={{ fontSize: isMobile ? 24 : 28 }}>{b.icon}</span>
                <div>
                  <div style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: isMobile ? 12 : 14 }}>{b.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.38)", fontSize: isMobile ? 10 : 12, fontFamily: "monospace" }}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: "linear-gradient(135deg,#0e2f16,#1a5c26)", padding: isMobile ? "60px 6vw" : "80px 5vw", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: isMobile ? 38 : 48, marginBottom: 14 }}>💬</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(22px,7vw,32px)" : "clamp(26px,4vw,42px)", color: "#fff", marginBottom: 14 }}>Ready to Ship Your Cargo?</h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 15 : 17, marginBottom: 32, lineHeight: 1.72 }}>
            Chat with us on WhatsApp for a fast, free quote. We respond quickly!
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => openWhatsApp("Hello! I need a transport/logistics quote.")} style={{
              background: "#25D366", border: "none", color: "#fff",
              padding: isMobile ? "13px 26px" : "15px 36px", borderRadius: 8,
              fontSize: isMobile ? 15 : 16, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              boxShadow: "0 7px 28px rgba(37,211,102,0.35)", width: isMobile ? "100%" : "auto",
            }}>💬 Chat on WhatsApp</button>
            <a href={`tel:${PHONE_PRIMARY}`} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)", color: "#fff",
              padding: isMobile ? "13px 26px" : "15px 30px", borderRadius: 8, fontSize: isMobile ? 15 : 16,
              fontFamily: "'DM Sans',sans-serif", textDecoration: "none", fontWeight: 500,
              display: "block", width: isMobile ? "100%" : "auto", textAlign: "center",
            }}>📞 Call {PHONE_PRIMARY}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT PAGE ──────────────────────────────────────────── */
function AboutPage() {
  const isMobile = useIsMobile();
  const [ref1, in1] = useInView();
  const [ref2, in2] = useInView();

  return (
    <div style={{ background: "#050f08", paddingTop: 66 }}>
      <div style={{ background: "linear-gradient(160deg,#071510,#0a2814)", padding: isMobile ? "60px 6vw" : "80px 5vw", textAlign: "center", borderBottom: "1px solid rgba(74,182,90,0.1)" }}>
        <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>ABOUT US</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(30px,5vw,54px)", color: "#fff", fontWeight: 800 }}>Our Story & Mission</h1>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "50px 6vw" : "80px 5vw" }}>
        {/* Story */}
        <div ref={ref1} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 60, alignItems: "center", marginBottom: isMobile ? 50 : 80, opacity: in1 ? 1 : 0, transform: in1 ? "none" : "translateY(36px)", transition: "all 0.8s" }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 26 : 32, color: "#fff", marginBottom: 18 }}>Built on Trust, Driven by Service</h2>
            <p style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.88, fontSize: isMobile ? 15 : 16, marginBottom: 14 }}>
              Kabiru Saidu Transport & Logistics Services was incorporated in December 2021, headquartered at the prestigious Dawanau International Grains Market in Kano — one of the largest grain markets in West Africa.
            </p>
            <p style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.88, fontSize: isMobile ? 15 : 16 }}>
              We specialise in the transport of key agricultural commodities including sesame seeds, soya beans, ginger, hibiscus (zobo), and stone flower — connecting Kano's markets to buyers nationwide.
            </p>
          </div>
          <div style={{ background: "linear-gradient(145deg,rgba(74,182,90,0.1),rgba(10,40,20,0.7))", border: "1px solid rgba(74,182,90,0.2)", borderRadius: 18, padding: isMobile ? 32 : 46, textAlign: "center" }}>
            <div style={{ fontSize: isMobile ? 54 : 68, marginBottom: 14 }}>🏢</div>
            <div style={{ color: "#4ab65a", fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 15 : 18, marginBottom: 4 }}>No. 368 Dawanau</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontFamily: "monospace", fontSize: isMobile ? 10 : 12, letterSpacing: 1 }}>INTERNATIONAL GRAINS MARKET · KANO</div>
            <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              {["🌾","🫘","🫚","🌺","🪨"].map(e => <span key={e} style={{ fontSize: 24 }}>{e}</span>)}
            </div>
          </div>
        </div>

        {/* Why us */}
        <div ref={ref2} style={{ opacity: in2 ? 1 : 0, transform: in2 ? "none" : "translateY(28px)", transition: "all 0.8s" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 48 }}>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>WHY CHOOSE US</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(22px,7vw,32px)" : "clamp(24px,4vw,38px)", color: "#fff" }}>The Kabiru Saidu Difference</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: isMobile ? 14 : 18 }}>
            {WHY_US.map((w, i) => (
              <div key={w.label} style={{ background: "rgba(74,182,90,0.06)", border: "1px solid rgba(74,182,90,0.11)", borderRadius: 14, padding: isMobile ? 22 : 26, opacity: in2 ? 1 : 0, transform: in2 ? "none" : "translateY(18px)", transition: `all 0.55s ease ${i * 0.1}s` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{w.icon}</div>
                <div style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: isMobile ? 15 : 16, marginBottom: 5 }}>{w.label}</div>
                <div style={{ color: "rgba(255,255,255,0.42)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 13 : 14, lineHeight: 1.6 }}>{w.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CAC highlight */}
        <div style={{ marginTop: isMobile ? 50 : 76, background: "linear-gradient(135deg,rgba(74,182,90,0.11),rgba(30,122,46,0.07))", border: "1px solid rgba(74,182,90,0.23)", borderRadius: 18, padding: isMobile ? "28px 24px" : "38px 46px", display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 18 : 30, flexDirection: isMobile ? "column" : "row" }}>
          <div style={{ fontSize: isMobile ? 48 : 60, flexShrink: 0 }}>📜</div>
          <div>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, marginBottom: 7 }}>CORPORATE AFFAIRS COMMISSION · NIGERIA</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 24, color: "#fff", marginBottom: 7 }}>Officially Registered Business</h3>
            <p style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 14 : 15 }}>
              Registration Number: <strong style={{ color: "#7dd88a" }}>3538802</strong> &nbsp;·&nbsp; Registered: <strong style={{ color: "#7dd88a" }}>22nd December 2021</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICES PAGE ───────────────────────────────────────── */
function ServicesPage() {
  const isMobile = useIsMobile();
  const [ref, inView] = useInView();
  const [comRef, comIn] = useInView();

  return (
    <div style={{ background: "#050f08", paddingTop: 66 }}>
      <div style={{ background: "linear-gradient(160deg,#071510,#0a2814)", padding: isMobile ? "60px 6vw" : "80px 5vw", textAlign: "center", borderBottom: "1px solid rgba(74,182,90,0.1)" }}>
        <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>WHAT WE OFFER</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(30px,5vw,54px)", color: "#fff", fontWeight: 800 }}>Our Services</h1>
      </div>

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "50px 6vw" : "80px 5vw" }}>
        {SERVICES.map((s, i) => (
          <div key={s.title} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : (i % 2 === 0 ? "auto 1fr" : "1fr auto"),
            gap: isMobile ? 20 : 44,
            alignItems: "center",
            marginBottom: isMobile ? 36 : 56,
            paddingBottom: isMobile ? 36 : 56,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : `translateX(${i % 2 === 0 ? -28 : 28}px)`,
            transition: `all 0.75s ease ${i * 0.18}s`,
          }}>
            <div style={{
              width: isMobile ? 80 : 150, height: isMobile ? 80 : 150, borderRadius: isMobile ? 16 : 20, flexShrink: 0,
              background: "linear-gradient(145deg,rgba(74,182,90,0.14),rgba(10,40,20,0.82))",
              border: "1px solid rgba(74,182,90,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? 38 : 66,
              order: isMobile ? 0 : (i % 2 === 0 ? 0 : 1),
            }}>{s.icon}</div>
            <div style={{ order: isMobile ? 1 : (i % 2 === 0 ? 1 : 0) }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 30, color: "#fff", marginBottom: 12 }}>{s.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.8, fontSize: isMobile ? 14 : 16 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Commodities grid */}
      <div ref={comRef} style={{ background: "#040d07", padding: isMobile ? "0 6vw 70px" : "0 5vw 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 46, opacity: comIn ? 1 : 0, transition: "all 0.7s" }}>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>SPECIALISED CARGO</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(22px,7vw,32px)" : "clamp(24px,3vw,38px)", color: "#fff" }}>Commodities We Handle</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: isMobile ? 12 : 16 }}>
            {COMMODITIES.map((c, i) => (
              <div key={c.name} style={{ background: "rgba(74,182,90,0.06)", border: "1px solid rgba(74,182,90,0.11)", borderRadius: 14, padding: isMobile ? 18 : 22, textAlign: "center", opacity: comIn ? 1 : 0, transform: comIn ? "none" : "translateY(18px)", transition: `all 0.55s ease ${i * 0.09}s` }}>
                <div style={{ fontSize: isMobile ? 34 : 42, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: isMobile ? 12 : 14, marginBottom: 6 }}>{c.name}</div>
                {!isMobile && <div style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, lineHeight: 1.6 }}>{c.desc}</div>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: isMobile ? 36 : 46 }}>
            <button onClick={() => openWhatsApp("Hello! I'd like to enquire about transporting my commodity.")} style={{
              background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", color: "#fff",
              padding: isMobile ? "13px 28px" : "14px 34px", borderRadius: 8,
              fontSize: isMobile ? 14 : 15, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(37,211,102,0.3)",
              width: isMobile ? "100%" : "auto",
            }}>💬 Enquire on WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ────────────────────────────────────────── */
function ContactPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [ref, inView] = useInView();

  const handleWhatsApp = () => {
    const msg = `Hello Kabiru Saidu Transport & Logistics Services! 👋\n\nName: ${form.name}\nPhone: ${form.phone}${form.email ? "\nEmail: " + form.email : ""}\nService: ${form.service || "Not specified"}\n\nMessage:\n${form.message || "I'd like to enquire about your services."}`;
    openWhatsApp(msg);
    setSent(true);
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(74,182,90,0.2)", borderRadius: 8, padding: "12px 14px", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 15, boxSizing: "border-box", outline: "none" };

  return (
    <div style={{ background: "#050f08", paddingTop: 66 }}>
      <div style={{ background: "linear-gradient(160deg,#071510,#0a2814)", padding: isMobile ? "60px 6vw" : "80px 5vw", textAlign: "center", borderBottom: "1px solid rgba(74,182,90,0.1)" }}>
        <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>GET IN TOUCH</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? "clamp(28px,8vw,42px)" : "clamp(30px,5vw,54px)", color: "#fff", fontWeight: 800 }}>Contact Us</h1>
      </div>

      {/* WhatsApp strip */}
      <div style={{ background: "#25D366", padding: isMobile ? "14px 5vw" : "17px 5vw" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap", textAlign: "center" }}>
          <span style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 13 : 15, fontWeight: 600 }}>💬 Chat on WhatsApp · {PHONE_PRIMARY}</span>
          <button onClick={() => openWhatsApp()} style={{ background: "#fff", border: "none", color: "#128C7E", padding: "7px 18px", borderRadius: 20, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer" }}>Open WhatsApp →</button>
        </div>
      </div>

      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "44px 6vw 60px" : "72px 5vw 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 56, opacity: inView ? 1 : 0, transition: "all 0.75s" }}>

          {/* Contact info */}
          <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 28, color: "#fff", marginBottom: 26 }}>Reach Out Anytime</h2>
            {[
              { icon: "📍", label: "Address", val: "No. 368 Dawanau International Grains Market, Kano, Kano State, Nigeria" },
              { icon: "📞", label: "Phone (Primary)", val: PHONE_PRIMARY, href: `tel:${PHONE_PRIMARY}` },
              { icon: "📱", label: "Phone (Secondary)", val: PHONE_SECONDARY, href: `tel:${PHONE_SECONDARY}` },
              { icon: "✉️", label: "Email", val: EMAIL, href: `mailto:${EMAIL}` },
              { icon: "⏰", label: "Business Hours", val: "Mon – Sat: 7:00 AM – 7:00 PM" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 13, padding: isMobile ? 14 : 16, background: "rgba(74,182,90,0.05)", border: "1px solid rgba(74,182,90,0.09)", borderRadius: 11 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 10, letterSpacing: 1, marginBottom: 2 }}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 13 : 14, textDecoration: "none", wordBreak: "break-all" }}>{item.val}</a>
                    : <div style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 13 : 14 }}>{item.val}</div>
                  }
                </div>
              </div>
            ))}

            <button onClick={() => openWhatsApp()} style={{
              width: "100%", background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", color: "#fff",
              padding: "14px", borderRadius: 10, fontSize: isMobile ? 15 : 16, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(37,211,102,0.28)", marginBottom: 18,
            }}>💬 Message on WhatsApp — {PHONE_PRIMARY}</button>

            {/* Quick call buttons on mobile */}
            {isMobile && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                <a href={`tel:${PHONE_PRIMARY}`} style={{ background: "rgba(74,182,90,0.1)", border: "1px solid rgba(74,182,90,0.2)", color: "#fff", padding: "12px", borderRadius: 8, textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>📞 Primary</a>
                <a href={`tel:${PHONE_SECONDARY}`} style={{ background: "rgba(74,182,90,0.1)", border: "1px solid rgba(74,182,90,0.2)", color: "#fff", padding: "12px", borderRadius: 8, textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>📱 Secondary</a>
              </div>
            )}

            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(74,182,90,0.13)" }}>
              <iframe
                title="Dawanau Market"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.2!2d8.5456!3d12.0022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8332b9b5c889%3A0x0!2sDawanau%20International%20Grain%20Market!5e0!3m2!1sen!2sng!4v1"
                width="100%" height={isMobile ? 180 : 210}
                style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(150deg)" }}
                allowFullScreen loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.28)", borderRadius: 16, padding: isMobile ? 32 : 46, textAlign: "center" }}>
                <div style={{ fontSize: 54, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 22 : 26, color: "#fff", marginBottom: 10 }}>WhatsApp Opened!</h3>
                <p style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.7, fontSize: isMobile ? 14 : 15 }}>Your message is pre-filled in WhatsApp. Just hit send and we'll respond shortly!</p>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); }} style={{ marginTop: 22, background: "linear-gradient(135deg,#25D366,#128C7E)", border: "none", color: "#fff", padding: "12px 26px", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600 }}>Send Another</button>
              </div>
            ) : (
              <div style={{ background: "linear-gradient(145deg,rgba(74,182,90,0.07),rgba(10,40,20,0.6))", border: "1px solid rgba(74,182,90,0.14)", borderRadius: 18, padding: isMobile ? 24 : 38 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <span style={{ fontSize: 24 }}>💬</span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 19 : 22, color: "#fff" }}>Send a WhatsApp Message</h3>
                </div>
                <p style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, marginBottom: 22, lineHeight: 1.6 }}>
                  Fill in your details and we'll open WhatsApp with your message pre-filled!
                </p>
                {[
                  { key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                  { key: "phone", label: "Your Phone Number *", type: "tel", placeholder: "e.g. 08012345678" },
                  { key: "email", label: "Email Address (optional)", type: "email", placeholder: "your@email.com" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}
                <div style={{ marginBottom: 15 }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, marginBottom: 6 }}>Type of Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...inputStyle, background: "rgba(20,50,25,0.92)", color: form.service ? "#fff" : "rgba(255,255,255,0.32)" }}>
                    <option value="">Select a service</option>
                    <option>Road Transportation</option>
                    <option>Truck & Haulage</option>
                    <option>General Merchandise</option>
                    <option>Sesame Seeds Transport</option>
                    <option>Soya Beans Transport</option>
                    <option>Ginger Transport</option>
                    <option>Hibiscus (Zobo) Transport</option>
                    <option>Stone Flower Transport</option>
                    <option>Other Commodity</option>
                  </select>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, marginBottom: 6 }}>Message</label>
                  <textarea placeholder="Describe your cargo, route, quantity, and any special requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={isMobile ? 3 : 4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <button onClick={handleWhatsApp} disabled={!form.name || !form.phone} style={{
                  width: "100%", background: (!form.name || !form.phone) ? "rgba(37,211,102,0.22)" : "linear-gradient(135deg,#25D366,#128C7E)",
                  border: "none", color: "#fff", padding: "14px", borderRadius: 8, fontSize: 16, fontWeight: 700,
                  cursor: (!form.name || !form.phone) ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif",
                }}>💬 Send via WhatsApp</button>
                <p style={{ textAlign: "center", color: "rgba(255,255,255,0.22)", fontSize: 11, fontFamily: "monospace", marginTop: 10 }}>
                  Opens WhatsApp · {PHONE_PRIMARY}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────── */
function Footer({ setActive }) {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "#030a05", borderTop: "1px solid rgba(74,182,90,0.09)", padding: isMobile ? "48px 6vw 28px" : "56px 5vw 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? 32 : 38, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: "linear-gradient(135deg,#4ab65a,#1e7a2e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🚛</div>
              <div>
                <div style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 14 }}>Kabiru Saidu</div>
                <div style={{ color: "#4ab65a", fontSize: 9, letterSpacing: 2, fontFamily: "monospace" }}>TRANSPORT & LOGISTICS SERVICES</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.32)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 1.8, maxWidth: 280, marginBottom: 14 }}>
              Specialists in sesame seeds, soya beans, ginger, hibiscus & stone flower transport across Nigeria since 2021.
            </p>
            <button onClick={() => openWhatsApp()} style={{ background: "#25D366", border: "none", color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>💬 WhatsApp Us</button>
          </div>

          {/* Nav */}
          <div>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, marginBottom: 14 }}>NAVIGATION</div>
            {NAV_LINKS.map(link => (
              <div key={link} style={{ marginBottom: 9 }}>
                <button onClick={() => setActive(link)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, cursor: "pointer", padding: 0 }}>{link}</button>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: "#4ab65a", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, marginBottom: 14 }}>CONTACT</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, lineHeight: 2.2 }}>
              <div style={{ color: "rgba(255,255,255,0.38)" }}>📍 No. 368 Dawanau Market, Kano</div>
              <a href={`tel:${PHONE_PRIMARY}`} style={{ display: "block", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>📞 {PHONE_PRIMARY}</a>
              <a href={`tel:${PHONE_SECONDARY}`} style={{ display: "block", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>📱 {PHONE_SECONDARY}</a>
              <a href={`mailto:${EMAIL}`} style={{ display: "block", color: "rgba(74,182,90,0.65)", textDecoration: "none", fontSize: 11, wordBreak: "break-all" }}>✉️ {EMAIL}</a>
              <div style={{ color: "#4ab65a", fontSize: 10, fontFamily: "monospace", marginTop: 4 }}>REG. NO. 3538802</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ color: "rgba(255,255,255,0.18)", fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 11 : 13 }}>© 2024 Kabiru Saidu Transport & Logistics Services. All rights reserved.</div>
          <div style={{ color: "rgba(255,255,255,0.18)", fontFamily: "monospace", fontSize: 12 }}>🇳🇬 Made in Nigeria</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("Home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { -webkit-text-size-adjust: 100%; }
        body { background: #050f08; overflow-x: hidden; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        select option { background: #0a2814; color: #fff; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, textarea:focus, select:focus { border-color: rgba(74,182,90,0.5) !important; }
        a:hover { opacity: 0.82; }
        button { -webkit-tap-highlight-color: transparent; }
        img, iframe { max-width: 100%; }
      `}</style>
      <Navbar active={active} setActive={setActive} />

      
      <main>
        {active === "Home"    && <HomePage    setActive={setActive} />}
        {active === "About"   && <AboutPage   />}
        {active === "Services"&& <ServicesPage/>}
        {active === "Contact" && <ContactPage />}
      </main>
      <Footer setActive={setActive} />
    </>
  );
}
