import { Route, Routes } from "react-router-dom";
import "./index.css";
import Reports from "./pages/reports";
import Home from "./pages/home";
import Download from "./pages/download";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </div>
  );
}
