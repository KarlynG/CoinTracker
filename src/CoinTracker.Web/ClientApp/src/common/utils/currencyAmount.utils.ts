import { Currency } from "../enums/currency.enum";

const currencyCodes = {
  [Currency.USD]: "USD",
  [Currency.EUR]: "EUR",
  [Currency.GBP]: "GBP",
  [Currency.JPY]: "JPY",
  [Currency.CAD]: "CAD",
  [Currency.AUD]: "AUD",
  [Currency.CHF]: "CHF",
  [Currency.CNY]: "CNY",
  [Currency.INR]: "INR",
  [Currency.RUB]: "RUB",
  [Currency.BRL]: "BRL",
  [Currency.MXN]: "MXN",
  [Currency.KRW]: "KRW",
  [Currency.ZAR]: "ZAR",
  [Currency.NOK]: "NOK",
  [Currency.SEK]: "SEK",
  [Currency.DKK]: "DKK",
  [Currency.TRY]: "TRY",
  [Currency.AED]: "AED",
  [Currency.ARS]: "ARS",
  [Currency.BOB]: "BOB",
  [Currency.CLP]: "CLP",
  [Currency.COP]: "COP",
  [Currency.CRC]: "CRC",
  [Currency.CUC]: "CUC",
  [Currency.DOP]: "DOP",
  [Currency.PEN]: "PEN",
  [Currency.PYG]: "PYG",
  [Currency.UYU]: "UYU",
  [Currency.VEF]: "VEF",
};

const formatCurrency = (amount: number, currency: Currency): string => {
  const currencyCode = currencyCodes[currency];
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export { formatCurrency };
