// eslint-disable-next-line no-unused-vars
import { CurrencyCode, isValidCurrencyCode } from "./utils/currency-code.js";
import { parseAndNormalizeDateInSearchResult } from "./utils/date.js";

/**
 * @param {object} params
 * @param {CurrencyCode | string} params.from
 * @param {CurrencyCode | string} params.to
 * @returns {Promise<{from: CurrencyCode | string, to: CurrencyCode | string, rate: number, dateUpdated: string}>}
 */
const googleCurrencyScraper = async ({ from, to }) => {
    if (!isValidCurrencyCode(from)) {
        throw new Error(`Invalid 'from' currency code: ${from}`);
    }

    if (!isValidCurrencyCode(to)) {
        throw new Error(`Invalid 'to' currency code: ${to}`);
    }

    if (from === to) {
        return {
            from,
            to,
            rate: 1,
            dateUpdated: new Date().toISOString()
        };
    }

    const url = createGoogleCurrencySearchResultUrl(from, to);
    const responseText = await makeRequest(url);

    const {
        exchangeRate,
        dateUpdated
    } = await parseExchangeRateFromResponseText(responseText);

    return {
        from,
        to,
        rate: exchangeRate,
        dateUpdated: parseAndNormalizeDateInSearchResult(dateUpdated).toISOString()
    };
};

/**
 * @param {string} responseText
 * @return {Promise<{exchangeRate: number, dateUpdated: string}>}
 */
const parseExchangeRateFromResponseText = async responseText => {
    const exchangeRatePattern = /data-exchange-rate="([\d.]+)"/;
    const exchangeRateMatch = responseText.match(exchangeRatePattern);
    const exchangeRateNode = exchangeRateMatch ? exchangeRateMatch[1] : null;

    const dateUpdatedPattern = /<span>(\w{3} \d{1,2}, \d{2}:\d{2} UTC) · <\/span>/;
    const dateUpdatedMatch = responseText.match(dateUpdatedPattern);
    const dateUpdatedNode = dateUpdatedMatch ? dateUpdatedMatch[1] : null;

    const exchangeRate = parseFloat(exchangeRateNode);
    const dateUpdated = dateUpdatedNode;

    return {
        exchangeRate,
        dateUpdated
    };
};

/**
 * @param {string} url
 * @return {Promise<string>}
 */
const makeRequest = async url => {
    const config = {
        method: "GET",
        headers: {
            "Accept-Language": "en-US",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
        }
    };
    const response = await fetch(url, config);
    return response.text();
};

/**
 * @param {CurrencyCode | string} from
 * @param {CurrencyCode | string} to
 * @return {string}
 */
function createGoogleCurrencySearchResultUrl(from, to) {
    const q = `1+${from}+to+${to}`;
    const hl = "en"; // Make sure to use English to avoid any unexpected issues.
    return `https://www.google.com/search?q=${q}&hl=${hl}`;
}

export default googleCurrencyScraper;
