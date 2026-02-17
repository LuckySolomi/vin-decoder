import { useEffect, useState } from "react";
import { getVariables } from "../../services/api";
import VariableList from "../../components/variableList/VariableList";
import styles from "./Variables.module.css";

export default function Variables() {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVariables();
      setVariables(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Vehicle Variables</h1>
      <VariableList variables={variables} />
    </div>
  );
}
