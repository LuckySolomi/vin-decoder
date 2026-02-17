import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVariables } from "../../services/api";
import styles from "./VariableDetails.module.css";

function VariableDetails() {
  const { id } = useParams();
  const [variable, setVariable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariable = async () => {
      try {
        const data = await getVariables();

        const found = data.find((item) => String(item.ID) === id);

        setVariable(found || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVariable();
  }, [id]);

  if (loading) return <p className={styles.info}>Loading...</p>;

  if (!variable) return <p className={styles.error}>Variable not found</p>;

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>{variable.Name}</h1>
        <div className={styles.description}>
          {variable.Description?.replace(/<[^>]+>/g, "")}
        </div>
        <NavLink to="/variables" className={styles.backLink}>
          ← Back to Variables
        </NavLink>
      </div>
    </section>
  );
}

export default VariableDetails;
