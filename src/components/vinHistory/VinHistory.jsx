import styles from "./VinHistory.module.css";

function VinHistory({ history }) {
  const validHistory = history.filter((item) => item?.vin);

  if (!validHistory.length) return null;

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Recent Searches</h3>

      <ul className={styles.list}>
        {validHistory.map((item) => (
          <li key={item.vin} className={styles.item}>
            {item.vin}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VinHistory;
