import { Link } from "react-router-dom";

const MemberCard = ({ member }) => (
  <article className="glass-panel member-card">
    <div className="member-card__media">
      <img src={member.imageUrl} alt={member.name} />
    </div>

    <div className="member-card__body">
      <div>
        <span className="eyebrow">Birds in the TRAP</span>
        <h3>{member.name}</h3>
        <p className="member-card__role">{member.role}</p>
      </div>

      <div className="member-card__meta">
        <span className="inline-badge">{member.rollNumber}</span>
        <span className="inline-badge">{member.year}</span>
        <span className="inline-badge">{member.degree}</span>
      </div>

      <p className="member-card__summary">{member.aboutProject}</p>

      <div className="member-card__actions">
        <Link className="button button--secondary button--small" to={`/member/${member.id}`}>
          View Details
        </Link>
      </div>
    </div>
  </article>
);

export default MemberCard;
