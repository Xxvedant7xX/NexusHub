import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import EmptyState from "../components/EmptyState.jsx";
import GlassPanel from "../components/GlassPanel.jsx";
import LoadingState from "../components/LoadingState.jsx";
import MemberCard from "../components/MemberCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { FEATURE_HIGHLIGHTS, TEAM_NAME, TEAM_SUBTITLE, TEAM_TAGLINE } from "../data/team.js";
import { fetchMembers } from "../lib/api.js";

const HomePage = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetchMembers();
        setMembers(response);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  const uniqueRoles = new Set(members.map((member) => member.role)).size;

  return (
    <section className="home-page" style={{ display: "block", width: "100%" }}>

      {/* ── Hero ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(212,168,83,0.15)",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "24px",
      }}>
        {/* ambient glow */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 70%)",
        }} />

        {/* block-centred content — no flex, just text-align:center */}
        <div style={{
          position: "relative", zIndex: 1,
          textAlign: "center",
          padding: "72px 48px 56px",
        }}>
          <span className="eyebrow" style={{ marginBottom: "20px", display: "inline-flex" }}>
            {TEAM_SUBTITLE}
          </span>

          <h1 style={{
            margin: "16px 0",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 8rem)",
            lineHeight: 0.92,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}>{TEAM_NAME}</h1>

          <p style={{
            margin: "0 auto 28px",
            color: "var(--text-secondary)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            maxWidth: "520px",
          }}>{TEAM_TAGLINE}</p>

          {/* buttons */}
          <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "36px" }}>
            <Link className="button" to="/add-member">Add Member</Link>
            <Link className="button button--secondary" to="/view-members">View Team</Link>
          </div>

          {/* stats */}
          <div style={{
            display: "inline-flex",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            overflow: "hidden",
          }}>
            {[
              { label: "Total Members", value: isLoading ? "…" : members.length },
              { label: "Roles Active",  value: isLoading ? "…" : uniqueRoles },
              { label: "Pages",         value: 4 },
            ].map(({ label, value }, i) => (
              <div key={label} style={{
                padding: "14px 32px",
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <span style={{
                  display: "block", fontSize: "0.6rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: "4px",
                }}>{label}</span>
                <strong style={{
                  display: "block",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.4rem",
                  color: "var(--accent-gold)",
                  lineHeight: 1,
                }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <GlassPanel className="feature-panel">
        <SectionHeader
          eyebrow="Why it stands out"
          title="Built for production, not just demos."
          description="Every required feature is polished with a stronger design system and cleaner UX."
        />
        <div className="feature-stack">
          {FEATURE_HIGHLIGHTS.map((feature) => (
            <article key={feature.title} className="feature-item">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </GlassPanel>

      {/* ── Squad spotlight – horizontal scroll row ── */}
      <GlassPanel className="spotlight-panel">
        <SectionHeader
          eyebrow="Current roster"
          title="Meet the current squad."
          description="These seeded profiles represent the core NexusHub team ready from first launch."
        />

        {isLoading ? (
          <LoadingState label="Loading members…" />
        ) : errorMessage ? (
          <EmptyState
            title="Could not load members"
            description={errorMessage}
            action={
              <Link className="button button--secondary button--small" to="/view-members">
                Open Members Page
              </Link>
            }
          />
        ) : (
          <div className="spotlight-scroll">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link className="button button--secondary button--small" to="/view-members">
            View Full Roster →
          </Link>
        </div>
      </GlassPanel>

    </section>
  );
};

export default HomePage;
