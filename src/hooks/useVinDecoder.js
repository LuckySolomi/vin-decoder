import { useReducer } from "react";
import { decodeVin } from "../services/api";

function getInitialHistory() {
  try {
    const saved = localStorage.getItem("vinHistory");
    return saved ? JSON.parse(saved) : [];
  } catch {
    localStorage.removeItem("vinHistory");
    return [];
  }
}

const initialState = {
  results: [],
  error: "",
  apiMessage: "",
  loading: false,
  history: getInitialHistory(),
};

function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true, error: "", apiMessage: "" };

    case "SET_RESULTS":
      return { ...state, results: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_MESSAGE":
      return { ...state, apiMessage: action.payload };

    case "SET_HISTORY":
      return { ...state, history: action.payload };

    case "STOP_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
}

export function useVinDecoder() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDecode = async (vin) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const cached = state.history.find((item) => item.vin === vin);

    if (cached && Date.now() - cached.timestamp < ONE_DAY) {
      dispatch({ type: "SET_RESULTS", payload: cached.data });
      return;
    }

    try {
      dispatch({ type: "START_LOADING" });

      const data = await decodeVin(vin);

      if (data.Message) {
        const shortMessage = data.Message.split(". ")[0] + ".";
        dispatch({ type: "SET_MESSAGE", payload: shortMessage });
      }

      if (!data.Results) {
        dispatch({ type: "SET_ERROR", payload: "Unexpected API response" });
        return;
      }

      const filtered = data.Results.filter(
        (item) => item.Value && item.Value !== "Not Applicable",
      );

      if (!filtered.length) {
        dispatch({
          type: "SET_ERROR",
          payload: "No valid data found for this VIN",
        });
        dispatch({ type: "SET_RESULTS", payload: [] });
        return;
      }

      dispatch({ type: "SET_RESULTS", payload: filtered });

      const updatedHistory = [
        { vin, data: filtered, timestamp: Date.now() },
        ...state.history.filter((item) => item.vin !== vin),
      ].slice(0, 3);

      localStorage.setItem("vinHistory", JSON.stringify(updatedHistory));

      dispatch({
        type: "SET_HISTORY",
        payload: updatedHistory,
      });
    } catch (err) {
      console.error(err);

      dispatch({
        type: "SET_ERROR",
        payload: "Failed to fetch data. Please try again.",
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  return {
    ...state,
    handleDecode,
  };
}
