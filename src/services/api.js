const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles";

export async function decodeVin(vin) {
  const response = await fetch(`${BASE_URL}/decodevin/${vin}?format=json`);

  if (!response.ok) {
    throw new Error("Failed to decode VIN");
  }

  return response.json();
}

export async function getAllVariables() {
  const response = await fetch(
    `${BASE_URL}/getvehiclevariablelist?format=json`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch variables");
  }

  return response.json();
}

export const getVariables = async () => {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json",
  );
  const data = await response.json();
  return data.Results;
};
