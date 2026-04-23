const LoadingState = ({ label = "Loading..." }) => (
  <div className="loading-state" role="status" aria-live="polite">
    <span className="loading-state__spinner" />
    <span>{label}</span>
  </div>
);

export default LoadingState;
