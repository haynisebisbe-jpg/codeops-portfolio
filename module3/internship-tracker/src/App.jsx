import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ApplicationDetails from "./pages/ApplicationDetails";
import AddApplication from "./pages/AddApplication";
import Profile from "./pages/Profile";
import applicationsData from "./data/applications";

function App() {
  const [applications, setApplications] = useState(applicationsData);

  function addApplication(newApplication) {
    setApplications((currentApplications) => [
      ...currentApplications,
      {
        ...newApplication,
        id: Date.now(),
      },
    ]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Dashboard applications={applications} />}
          />

          <Route
            path="/applications"
            element={<Applications applications={applications} />}
          />

          <Route
            path="/applications/:id"
            element={<ApplicationDetails applications={applications} />}
          />

          <Route
            path="/applications/new"
            element={<AddApplication onAdd={addApplication} />}
          />

          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;