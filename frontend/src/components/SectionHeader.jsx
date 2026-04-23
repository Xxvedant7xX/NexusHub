const SectionHeader = ({ eyebrow, title, description, align = "left" }) => (
  <div className={`section-header section-header--${align}`}>
    {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
    <h2>{title}</h2>
    {description ? <p>{description}</p> : null}
  </div>
);

export default SectionHeader;
