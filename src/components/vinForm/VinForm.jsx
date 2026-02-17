import { useState } from "react";
import { validateVin } from "../../utils/validation";
import styles from "./VinForm.module.css";

function VinForm({ onDecode }) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateVin(vin);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onDecode(vin);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        maxLength={17}
        placeholder="Enter VIN"
        className={styles.input}
      />

      <button type="submit" className={styles.button}>
        Decode
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default VinForm;
