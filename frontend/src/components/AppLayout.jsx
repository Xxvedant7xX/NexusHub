import { NavLink, Outlet } from "react-router-dom";

import { TEAM_NAME } from "../data/team.js";
import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/add-member", label: "Add Member" },
  { to: "/view-members", label: "Team" },
];

const AppLayout = () => {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-row">
            <h1>{TEAM_NAME}</h1>
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
          Built with React, Express, MongoDB &mdash; NexusHub.
        </p>
      </footer>
    </div>
  );
};

export default AppLayout;
