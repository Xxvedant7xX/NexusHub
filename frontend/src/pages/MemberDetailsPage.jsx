import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EmptyState from "../components/EmptyState.jsx";
import GlassPanel from "../components/GlassPanel.jsx";
import LoadingState from "../components/LoadingState.jsx";
import { fetchMemberById } from "../lib/api.js";

const infoRows = [
  ["Role", "role"],
  ["Email", "email"],
  ["Contact", "phone"],
  ["Roll Number", "rollNumber"],
  ["Year", "year"],
  ["Degree", "degree"],
  ["Certificate", "certificate"],
  ["Internship", "internship"],
];

const MemberDetailsPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadMember = async () => {
      try {
        const response = await fetchMemberById(id);
        setMember(response);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadMember();
  }, [id]);

  if (isLoading) {
    return <LoadingState label="Loading member details..." />;
  }

  if (errorMessage || !member) {
    return (
      <EmptyState
        title="Member not found"
        description={errorMessage || "The requested member profile could not be loaded."}
        action={
          <Link className="button button--secondary button--small" to="/view-members">
            Back to Members
          </Link>
        }
      />
    );
  }

  return (
    <section className="page-stack">
      <div className="details-layout">
        <GlassPanel className="details-hero">
          <div className="details-hero__image">
            <img src={member.imageUrl} alt={member.name} />
          </div>

          <div className="details-hero__content">
            <span className="eyebrow">Member Details</span>
            <h1>{member.name}</h1>
            <p className="details-role">{member.role}</p>

            <div className="chip-row">
              <span className="chip chip--static">{member.rollNumber}</span>
              <span className="chip chip--static">{member.year}</span>
              <span className="chip chip--static">{member.degree}</span>
            </div>

            <p className="details-summary">{member.aboutProject}</p>

            <div className="button-row">
              <Link className="button" to="/view-members">
                View All Members
              </Link>
              <Link className="button button--secondary" to="/add-member">
                Add Another Member
              </Link>
            </div>
          </div>
        </GlassPanel>

        <div className="details-grid">
          <GlassPanel className="details-card">
            <h2>Core Information</h2>
            <div className="details-list">
              {infoRows.map(([label, key]) => (
                <div key={key} className="details-list__row">
                  <span>{label}</span>
                  <strong>{member[key]}</strong>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="details-card">
            <h2>About Aim</h2>
            <p>{member.aboutAim}</p>
          </GlassPanel>

          <GlassPanel className="details-card">
            <h2>Hobbies</h2>
            <div className="chip-row">
              {member.hobbies.map((hobby) => (
                <span key={hobby} className="chip chip--static">
                  {hobby}
                </span>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="details-card">
            <h2>Profile Snapshot</h2>
            <p>
              {member.name} is a core member of NexusHub, contributing as the team&apos;s{" "}
              {member.role.toLowerCase()}. Explore the details below for a complete view of their
              skills, goals, and project contributions.
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default MemberDetailsPage;
