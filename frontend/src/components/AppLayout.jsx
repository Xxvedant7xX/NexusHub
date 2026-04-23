import { NavLink, Outlet } from "react-router-dom";

import { TEAM_NAME } from "../data/team.js";
import { useTheme } from "../context/ThemeContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/add-member", label: "Add Member" },
  { to: "/view-members", label: "View Members" },
];

const AppLayout = () => {
  const { theme } = useTheme();

  return (
    <div className="app-shell">
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
      <div className="ambient-orb ambient-orb--three" />

      <header className="glass-panel topbar">
        <div className="brand-block">
          <span className="brand-kicker">Team Dashboard</span>
          <div className="brand-row">
            <span className="brand-mark">B</span>
            <div>
              <h1>{TEAM_NAME}</h1>
              <p>{theme === "dark" ? "Liquid Glass Dark" : "Liquid Glass Light"}</p>
            </div>
          </div>
        </div>

        <div className="topbar-actions">
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `nav-pill${isActive ? " nav-pill--active" : ""}`
                }
                to={item.to}
                end={item.end}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main className="page-frame">
        <Outlet />
      </main>

      <footer className="footer-note">
        <p>
          Built for the FSD online assessment with React Router, Express APIs, file uploads,
          seeded demo members, and responsive premium styling.
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
