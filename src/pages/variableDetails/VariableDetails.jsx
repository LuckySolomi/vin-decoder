import { useParams, NavLink } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVariables } from "../../services/api";
import styles from "./VariableDetails.module.css";

function VariableDetails() {
  const { id } = useParams();

  const {
    data: variables = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["variables"],
    queryFn: getVariables,
    staleTime: 1000 * 60 * 5,
  });

  const variable = useMemo(
    () => variables.find((item) => String(item.ID) === id),
    [variables, id],
  );

  if (isLoading) return <p className={styles.info}>Loading...</p>;

  if (error) return <p className={styles.error}>Failed to load variable</p>;

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
