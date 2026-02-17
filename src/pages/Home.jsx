import { useState } from "react";
import { decodeVin } from "../services/api";
import VinForm from "../components/VinForm";
import VinResults from "../components/VinResults";
import VinHistory from "../components/VinHistory";

function Home() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("vinHistory");
    return saved ? JSON.parse(saved) : [];
  });

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
      setHistory((prev) => {
        const updated = [vin, ...prev.filter((item) => item !== vin)];
        const limited = updated.slice(0, 3);

        localStorage.setItem("vinHistory", JSON.stringify(limited));

        return limited;
      });
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

      <VinHistory history={history} onSelect={handleDecode} />
      <VinResults results={results} />
    </section>
  );
}

export default Home;
