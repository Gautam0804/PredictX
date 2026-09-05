import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ activePage, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">
        <Topbar
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {children}
      </main>
    </div>
  );
}

export default AppLayout;