import { NavLink } from "react-router-dom";
import styles from "./VariableList.module.css";

function VariableList({ variables }) {
  return (
    <div className={styles.wrapper}>
      {variables.map((item) => (
        <div key={item.ID} className={styles.card}>
          <h3>
            <NavLink to={`/variables/${item.ID}`} className={styles.titleLink}>
              {item.Name}
            </NavLink>
          </h3>

          <p className={styles.description}>
            {item.Description?.replace(/<[^>]+>/g, "")}
          </p>
        </div>
      ))}
    </div>
  );
}

export default VariableList;
