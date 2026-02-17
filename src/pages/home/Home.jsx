import { useState } from "react";
import { decodeVin } from "../../services/api";
import VinForm from "../../components/vinForm/VinForm";
import VinResults from "../../components/vinResults/VinResults";
import VinHistory from "../../components/vinHistory/VinHistory";
import styles from "./Home.module.css";

function Home() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("vinHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleDecode = async (vin) => {
    try {
      setError("");
      setApiMessage("");
      setLoading(true);

      const data = await decodeVin(vin);

      if (data.Message) {
        const shortMessage = data.Message.split(". ")[0] + ".";
        setApiMessage(shortMessage);
      }

      if (!data.Results) {
        setError("Unexpected API response");
        return;
      }

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

      if (filtered.length === 0) {
        setError("No valid data found for this VIN");
        setResults([]);
        return;
      }

      setResults(filtered);

      setHistory((prev) => {
        const updated = [vin, ...prev.filter((item) => item !== vin)];
        const limited = updated.slice(0, 3);
        localStorage.setItem("vinHistory", JSON.stringify(limited));
        return limited;
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>VIN Decoder</h1>

      <VinForm onDecode={handleDecode} />

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {apiMessage && <p className={styles.info}>{apiMessage}</p>}

      <VinHistory history={history} />
      <VinResults results={results} />
    </section>
  );
}

export default Home;
