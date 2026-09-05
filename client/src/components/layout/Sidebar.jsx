import {
  LayoutDashboard,
  Cpu,
  BrainCircuit,
  BarChart3,
  Wrench,
  Bell,
  Settings,
  User,
  X,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Machines",
    icon: Cpu,
  },
  {
    label: "Predictions",
    icon: BrainCircuit,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
  {
    label: "Maintenance",
    icon: Wrench,
  },
  {
    label: "Alerts",
    icon: Bell,
  },
];

function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
}) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <BrainCircuit size={22} />
          </div>

          <div>
            <h2>PredictX</h2>
            <span>AI Maintenance</span>
          </div>
        </div>

        <button
          className="mobile-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="workspace">
        <span className="workspace-label">
          WORKSPACE
        </span>

        <button className="workspace-selector">
          <div className="workspace-dot" />

          <div className="workspace-info">
            <strong>Manufacturing Plant</strong>
            <span>Plant A • Production</span>
          </div>
        </button>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-label">
          MAIN MENU
        </span>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;

          return (
            <button
              key={item.label}
              className={`nav-item ${
                isActive ? "active" : ""
              }`}
              onClick={() => onNavigate(item.label)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item">
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <button className="nav-item">
          <User size={18} />
          <span>Profile</span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            GY
          </div>

          <div className="user-info">
            <strong>Plant Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;