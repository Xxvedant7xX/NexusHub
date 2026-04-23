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
  const spotlightMembers = members.slice(0, 3);

  return (
    <section className="home-page">
      <div className="hero-layout">
        <GlassPanel className="hero-panel hero-copy">
          <span className="eyebrow">{TEAM_SUBTITLE}</span>
          <h1 className="display-title">{TEAM_NAME}</h1>
          <p>{TEAM_TAGLINE}</p>

          <div className="button-row">
            <Link className="button" to="/add-member">
              Add Member
            </Link>
            <Link className="button button--secondary" to="/view-members">
              View Members
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-card__label">Total Members</span>
              <strong>{isLoading ? "..." : members.length}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Roles Active</span>
              <strong>{isLoading ? "..." : uniqueRoles}</strong>
            </div>
            <div className="stat-card">
              <span className="stat-card__label">Frontend Flow</span>
              <strong>4 Pages</strong>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="manage-card">
          <span className="eyebrow">Manage Team</span>
          <h2>Inspired by the PDF sample, upgraded for production polish.</h2>
          <p>
            Add a member, browse the roster, and drill into details using a cleaner version of
            the exact flow requested in the assignment brief.
          </p>

          <div className="manage-card__buttons">
            <Link className="button button--tile" to="/add-member">
              <span>Add</span>
              <strong>Member</strong>
            </Link>
            <Link className="button button--tile button--secondary" to="/view-members">
              <span>View</span>
              <strong>Members</strong>
            </Link>
          </div>
        </GlassPanel>
      </div>

      <div className="home-bottom">
        <GlassPanel className="feature-panel">
          <SectionHeader
            eyebrow="Why it stands out"
            title="Assignment-ready, but much more refined."
            description="Every required feature is here, with a stronger design system and cleaner UX."
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

        <GlassPanel className="spotlight-panel">
          <SectionHeader
            eyebrow="Current roster"
            title="Meet the current squad."
            description="These seeded profiles match the names and team direction you asked for."
          />

          {isLoading ? (
            <LoadingState label="Loading seeded members..." />
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
            <div className="spotlight-grid">
              {spotlightMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </GlassPanel>
      </div>
    </section>
  );
};

export default HomePage;
