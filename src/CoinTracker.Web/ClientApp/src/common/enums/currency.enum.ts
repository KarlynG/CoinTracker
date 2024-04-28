export enum Currency {
  USD, // United States Dollar
  EUR, // Euro
  GBP, // British Pound
  JPY, // Japanese Yen
  CAD, // Canadian Dollar
  AUD, // Australian Dollar
  CHF, // Swiss Franc
  CNY, // Chinese Yuan
  INR, // Indian Rupee
  RUB, // Russian Ruble
  BRL, // Brazilian Real
  MXN, // Mexican Peso
  KRW, // South Korean Won
  ZAR, // South African Rand
  NOK, // Norwegian Krone
  SEK, // Swedish Krona
  DKK, // Danish Krone
  TRY, // Turkish Lira
  AED, // United Arab Emirates Dirham
  ARS, // Argentine Peso
  BOB, // Boliviano (Bolivia)
  CLP, // Chilean Peso
  COP, // Colombian Peso
  CRC, // Costa Rican Colón
  CUC, // Cuban Convertible Peso
  DOP, // Dominican Peso
  PEN, // Peruvian Nuevo Sol
  PYG, // Paraguayan Guarani
  UYU, // Uruguayan Peso
  VEF, // Venezuelan Bolívar (consider volatility)
}

export const generateCurrencyOptions = (): {
  label: string;
  value: string;
}[] => {
  return Object.keys(Currency)
    .filter((key) => isNaN(Number(key))) // Filter out the numeric keys to get only the string keys
    .map((key, index) => ({
      label: key,
      value: index.toString(), // Use the index as the value if needed or you can map this differently
    }));
};
