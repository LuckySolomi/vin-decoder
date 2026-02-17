import { useState } from "react";
import { validateVin } from "../utils/validation";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value.toUpperCase())}
        maxLength={17}
        placeholder="Enter VIN"
      />

      <button type="submit">Decode</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default VinForm;
