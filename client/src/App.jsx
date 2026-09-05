import { useState } from "react";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./components/dashboard/Dashboard";
import ComingSoon from "./pages/ComingSoon";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    if (activePage === "Dashboard") {
      return <Dashboard />;
    }

    return <ComingSoon page={activePage} />;
  };

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={setActivePage}
    >
      {renderPage()}
    </AppLayout>
  );
}

export default App;