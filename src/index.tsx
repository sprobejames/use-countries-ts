import { useMemo } from 'react';
import countries, { Currency } from 'world-countries';

type Country = {
  name: string;
  alpha2: string;
  alpha3: string;
  flag: string;
  capital: string[];
  currencies: { [currencyCode: string]: Currency };
  region: string;
}

export default function useCountries() {
  const items: Country[] = useMemo(
    () =>
      countries
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map((country) => ({
          name: country.name.common,
          alpha2: country.cca2,
          alpha3: country.cca3,
          flag: country.flag,
          capital: country.capital,
          currencies: country.currencies,
          region: country.region,
        }) as Country),
    countries
  );

  const getByCode = (code: string) =>
    items.filter((country) => [country.alpha2, country.alpha3].includes(code)) as Country[];

  const getByName = (name: string) => items.filter((country) => name === country.name) as Country[];

  return { countries: items, getByCode, getByName };
}
