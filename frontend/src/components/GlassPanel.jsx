const GlassPanel = ({ as: Component = "section", className = "", children }) => (
  <Component className={`glass-panel ${className}`.trim()}>{children}</Component>
);

export default GlassPanel;
