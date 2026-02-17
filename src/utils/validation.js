export function validateVin(vin) {
  if (!vin) return "VIN is required";

  if (vin.length !== 17) return "VIN must be exactly 17 characters";

  const regex = /^[A-HJ-NPR-Z0-9]{17}$/;

  if (!regex.test(vin)) return "Invalid VIN format";

  return null;
}
