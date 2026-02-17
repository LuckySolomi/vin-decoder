import { useState } from "react";
import { decodeVin } from "../services/api";
import VinForm from "../components/VinForm";
import VinResults from "../components/VinResults";

function Home() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDecode = async (vin) => {
    try {
      setError("");
      setLoading(true);

      const data = await decodeVin(vin);

      const excludedVariables = [
        "Error Code",
        "Error Text",
        "Suggested VIN",
        "Possible Values",
        "Additional Error Text",
      ];

      const filtered = data.Results.filter(
        (item) =>
          item.Value &&
          item.Value !== "Not Applicable" &&
          !excludedVariables.includes(item.Variable),
      );
      setResults(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>VIN Decoder</h1>

      <VinForm onDecode={handleDecode} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <VinResults results={results} />
    </section>
  );
}

export default Home;
