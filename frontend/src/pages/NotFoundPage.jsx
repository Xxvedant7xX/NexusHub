import { Link } from "react-router-dom";

import GlassPanel from "../components/GlassPanel.jsx";

const NotFoundPage = () => (
  <GlassPanel className="not-found-panel">
    <span className="eyebrow">404</span>
    <h1>That route does not exist.</h1>
    <p>
      The page you tried to open is outside the Birds in the TRAP dashboard. Head back to the
      homepage and continue from there.
    </p>
    <Link className="button" to="/">
      Return Home
    </Link>
  </GlassPanel>
);

export default NotFoundPage;
