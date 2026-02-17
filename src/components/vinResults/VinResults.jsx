import styles from "./VinResults.module.css";

function VinResults({ results }) {
  if (!results.length) return null;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{item.Variable}</td>
              <td>{item.Value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VinResults;
