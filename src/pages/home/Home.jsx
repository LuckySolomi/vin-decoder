import { useState } from "react";
import { useVinDecoder } from "../../hooks/useVinDecoder";
import VinForm from "../../components/vinForm/VinForm";
import VinResults from "../../components/vinResults/VinResults";
import VinHistory from "../../components/vinHistory/VinHistory";
import styles from "./Home.module.css";

function Home() {
  const { results, error, apiMessage, loading, history, handleDecode } =
    useVinDecoder();

  const [vin, setVin] = useState("");

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>VIN Decoder</h1>

      <VinForm vin={vin} setVin={setVin} onDecode={handleDecode} />

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {apiMessage && <p className={styles.info}>{apiMessage}</p>}

      <VinHistory history={history} setVin={setVin} />
      <VinResults results={results} />
    </section>
  );
}

export default Home;
