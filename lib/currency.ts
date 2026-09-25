export type CurrencyCode = 'USD' | 'EUR' | 'AED';

const rates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  AED: 3.67
};

export function convertFromUsd(amountUsd: number, currency: CurrencyCode): number {
  return amountUsd * rates[currency];
}

export function formatAllCurrencies(amountUsd: number) {
  return {
    USD: `$${amountUsd.toFixed(2)}`,
    EUR: `€${convertFromUsd(amountUsd, 'EUR').toFixed(2)}`,
    AED: `AED ${convertFromUsd(amountUsd, 'AED').toFixed(2)}`
  };
}

