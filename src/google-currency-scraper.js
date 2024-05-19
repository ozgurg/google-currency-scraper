// eslint-disable-next-line no-unused-vars
import { CurrencyCode, isValidCurrencyCode } from "./utils/currency-code.js";
import { cleanDateInSearchResult } from "./utils/date.js";
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
            dateUpdated: new Date().toISOString()
        };
    }

    const url = createGoogleCurrencySearchResultUrl(from, to);
    const responseText = await makeRequest(url);

    const {
        exchangeRate,
        dateUpdated
    } = parseExchangeRateFromResponseText(responseText);

    return {
        from,
        to,
        rate: exchangeRate,
        dateUpdated
    };
};

/**
 * @param {string} responseText
 * @return {Promise<{exchangeRate: number, dateUpdated: string}>}
 */
const parseExchangeRateFromResponseText = responseText => {
    // I replaced Cheerio with regular expression, but Google uses a different date format depending on the requester's language, region, and similar factors.
    // I cannot find a pattern to match every date format that Google uses to parse.
    // So I reverted to Cheerio.

    const $ = load(responseText);

    const exchangeRateNode = $("[data-exchange-rate]:first-child");
    const dateUpdatedNode = exchangeRateNode.next().find("span:not([class]):first-child");

    const exchangeRate = parseFloat(exchangeRateNode.attr("data-exchange-rate"));
    const dateUpdated = cleanDateInSearchResult(dateUpdatedNode.text());

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
