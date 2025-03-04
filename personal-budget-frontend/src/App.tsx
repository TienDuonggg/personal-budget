
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Envelopes from "./pages/Envelopes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/envelopes" element={<Envelopes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;