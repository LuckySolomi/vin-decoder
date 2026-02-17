import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Variables from "./pages/variables/Variables";
import VariableDetails from "./pages/variableDetails/VariableDetails";
import { NavLink } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/variables"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            All Variables
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
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
