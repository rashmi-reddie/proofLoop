import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateExperiment from "./components/CreateExperiment";
import Dashboard from "./components/Dashboard";
import ExperimentDetails from "./components/ExperimentDetails";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateDailyLog from "./components/createDailyLog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<Home />} />
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
