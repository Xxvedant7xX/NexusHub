import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from "../components/EmptyState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import MemberCard from "../components/MemberCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { fetchMembers } from "../lib/api.js";

const ViewMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
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

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const roles = useMemo(
    () => ["All", ...new Set(members.map((member) => member.role))],
    [members],
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = deferredSearchTerm.trim().toLowerCase();

    return members.filter((member) => {
      const matchesRole = selectedRole === "All" || member.role === selectedRole;
      const searchableText = [
        member.name,
        member.role,
        member.rollNumber,
        member.degree,
        member.aboutProject,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesRole && matchesQuery;
    });
  }, [deferredSearchTerm, members, selectedRole]);

  return (
    <section className="page-stack">
      <SectionHeader
        eyebrow="View Members"
        title="Meet our amazing team."
        description="Search, filter, and browse every member on the NexusHub roster. Click any card to see the full profile."
        align="center"
      />

      <div className="toolbar">
        <label className="search-shell">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m21 21-4.35-4.35M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
          <input
            aria-label="Search members"
            onChange={(event) => {
              const nextValue = event.target.value;
              startTransition(() => {
                setSearchTerm(nextValue);
              });
            }}
            placeholder="Search by name, role, roll number, or degree"
            value={searchTerm}
          />
        </label>

        <div className="chip-row">
          {roles.map((role) => (
            <button
              key={role}
              className={`chip${selectedRole === role ? " chip--active" : ""}`}
              onClick={() => setSelectedRole(role)}
              type="button"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <LoadingState label="Loading team members..." />
      ) : errorMessage ? (
        <EmptyState
          title="Could not fetch members"
          description={errorMessage}
          action={
            <Link className="button button--secondary button--small" to="/add-member">
              Add a Member Instead
            </Link>
          }
        />
      ) : filteredMembers.length === 0 ? (
        <EmptyState
          title="No members match the current filter"
          description="Try a different search term, or add a fresh member to the roster."
          action={
            <Link className="button button--secondary button--small" to="/add-member">
              Add Member
            </Link>
          }
        />
      ) : (
        <div className="members-grid">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ViewMembersPage;
