export default googleCurrencyScraper;
/**
 * @param {object} params
 * @param {CurrencyCode | string} params.from
 * @param {CurrencyCode | string} params.to
 * @returns {Promise<{from: CurrencyCode | string, to: CurrencyCode | string, rate: number, dateUpdated: string}>}
 */
declare function googleCurrencyScraper({ from, to }: {
    from: CurrencyCode | string;
    to: CurrencyCode | string;
}): Promise<{
    from: CurrencyCode | string;
    to: CurrencyCode | string;
    rate: number;
    dateUpdated: string;
}>;
import { CurrencyCode } from "./utils/currency-code.js";
