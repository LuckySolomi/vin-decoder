import { useQuery } from "@tanstack/react-query";
import { getVariables } from "../../services/api";
import VariableList from "../../components/variableList/VariableList";
import styles from "./Variables.module.css";

export default function Variables() {
  const {
    data: variables = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["variables"],
    queryFn: getVariables,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading variables...</p>;

  if (error) return <p>Failed to load variables</p>;

  return (
    <div>
      <h1 className={styles.title}>Vehicle Variables</h1>
      <VariableList variables={variables} />
    </div>
  );
}
