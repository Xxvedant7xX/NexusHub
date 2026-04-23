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
    <section className="home-page">

      {/* ── Hero – full width, centred ── */}
      <GlassPanel className="hero-panel hero-copy">
        <span className="eyebrow">{TEAM_SUBTITLE}</span>
        <h1 className="display-title">{TEAM_NAME}</h1>
        <p>{TEAM_TAGLINE}</p>

        <div className="button-row">
          <Link className="button" to="/add-member">Add Member</Link>
          <Link className="button button--secondary" to="/view-members">View Team</Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-card__label">Total Members</span>
            <strong>{isLoading ? "…" : members.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Roles Active</span>
            <strong>{isLoading ? "…" : uniqueRoles}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-card__label">Pages</span>
            <strong>4</strong>
          </div>
        </div>
      </GlassPanel>

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
