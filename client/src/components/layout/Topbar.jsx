import {
  Bell,
  Menu,
  ChevronDown,
  Activity,
} from "lucide-react";

function Topbar({ activePage, onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div className="breadcrumb">
          <span>Workspace</span>
          <span className="breadcrumb-separator">
            /
          </span>
          <strong>{activePage}</strong>
        </div>
      </div>

      <div className="topbar-right">
        <div className="system-status">
          <span className="status-dot" />
          <span>AI System Operational</span>
        </div>

        <button className="icon-button">
          <Bell size={19} />

          <span className="notification-badge">
            3
          </span>
        </button>

        <button className="plant-selector">
          <Activity size={17} />
          <span>Plant A</span>
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;