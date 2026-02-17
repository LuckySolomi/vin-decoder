function VinHistory({ history, onSelect }) {
  if (!history.length) return null;

  return (
    <section>
      <h2>Recent VINs</h2>
      <ul>
        {history.map((vin) => (
          <li key={vin}>
            <button onClick={() => onSelect(vin)}>{vin}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VinHistory;
