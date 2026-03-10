import { useState } from "react";
import { decodeVin } from "../services/api";

export function useVinDecoder() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function getInitialHistory() {
    try {
      const saved = localStorage.getItem("vinHistory");

      if (!saved) return [];

      return JSON.parse(saved);
    } catch {
      localStorage.removeItem("vinHistory");
      return [];
    }
  }
  const [history, setHistory] = useState(getInitialHistory);

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

      if (!filtered.length) {
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

  return { results, error, apiMessage, loading, history, handleDecode };
}
