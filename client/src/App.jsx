import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateDailyLog from "./components/CreateDailyLog";
import CreateExperiment from "./components/CreateExperiment";
import Dashboard from "./components/Dashboard";
import ExperimentDetails from "./components/ExperimentDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/experiments/new" element={<CreateExperiment />} />
        <Route
          path="/experiments/:experimentId"
          element={<ExperimentDetails />}
        />
        <Route
          path="/experiments/:experimentId/logs/new"
          element={<CreateDailyLog />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
