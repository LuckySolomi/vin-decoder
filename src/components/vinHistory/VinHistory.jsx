import styles from "./VinHistory.module.css";

function VinHistory({ history }) {
  if (!history.length) return null;

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Recent Searches</h3>
      <ul className={styles.list}>
        {history.map((vin) => (
          <li key={vin} className={styles.item}>
            {vin}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VinHistory;
