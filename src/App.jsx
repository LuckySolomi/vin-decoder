import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Variables from "./pages/Variables";
import VariableDetails from "./pages/VariableDetails";

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/variables">All Variables</Link>
          <Link to="/variables/:id">Variable Details</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/variables" element={<Variables />} />
          <Route path="/variables/:id" element={<VariableDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
