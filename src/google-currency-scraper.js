import { CurrencyCode, isValidCurrencyCode } from "./utils/currency-code.js";
import { getDate, parseAndNormalizeDateInSearchResult } from "./utils/date.js";
import { makeGetRequest } from "./utils/http-client.js";
import { load } from "cheerio";

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
            dateUpdated: getDate()
        };
    }

    const url = createGoogleCurrencySearchResultUrl(from, to);
    const config = {
        headers: {
            "Accept-Language": "en-US",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
        }
    };
    const response = await makeGetRequest(url, config);
    const $ = load(response);

    const exchangeRateNode = $("[data-exchange-rate]:first-child");
    const dateUpdatedNode = exchangeRateNode.next().find("span:not([class]):first-child");

    const exchangeRate = parseFloat(exchangeRateNode.attr("data-exchange-rate"));
    const dateUpdated = dateUpdatedNode.text();

    return {
        from,
        to,
        rate: exchangeRate,
        dateUpdated: parseAndNormalizeDateInSearchResult(dateUpdated)
    };
};

/**
 * @param {CurrencyCode | string} from
 * @param {CurrencyCode | string} to
 * @returns {string}
 */
function createGoogleCurrencySearchResultUrl(from, to) {
    const q = `1+${from}+to+${to}`;
    const hl = "en"; // Make sure to use English to avoid any unexpected issues.
    return `https://www.google.com/search?q=${q}&hl=${hl}`;
}

export default googleCurrencyScraper;
