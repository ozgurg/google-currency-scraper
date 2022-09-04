// This file should not be used and will be removed in the next major release
import {
    closeBrowser,
    emulateDevice,
    ensurePageLoadOnlyDocument,
    launchBrowser,
    openNewPage
} from "./utils/browser.js";
import { CurrencyCode, isValidCurrencyCode } from "./utils/currency-code.js";
import { objectToQueryString } from "./utils/object-to-query-string.js";
import { getDate, parseAndNormalizeDateInSearchResult } from "./utils/date.js";

/**
 * @param {object} params
 * @param {CurrencyCode | string} params.from
 * @param {CurrencyCode | string} params.to
 * @returns {Promise<{from: CurrencyCode | string, to: CurrencyCode | string, rate: number, dateUpdated: string}>}
 * @deprecated
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

    const browser = await launchBrowser();

    const page = await openNewPage(browser);

    // To lighter page and faster load times, I emulate a mobile device.
    // So why iPhone 7?
    // It doesn't matter which one as long as it's a mobile device.
    // That's why I chose iPhone 7 as I use it in real life :)
    await emulateDevice(page, "iPhone 7");

    // To lighter page and faster load times, make sure load only document.
    await ensurePageLoadOnlyDocument(page);

    await goToGoogleCurrencySearchResult(page, { from, to });

    const result = await parseResult(page);

    await closeBrowser(browser);

    return {
        from,
        to,
        rate: result.rate,
        dateUpdated: parseAndNormalizeDateInSearchResult(result.dateUpdated)
    };
};

/**
 * @param {*} page
 * @param {object} params
 * @param {CurrencyCode | string} params.from
 * @param {CurrencyCode | string} params.to
 * @returns {Promise<* | null>}
 * @deprecated
 */
async function goToGoogleCurrencySearchResult(page, { from, to }) {
    const qs = objectToQueryString({
        q: `1+${from}+to+${to}`,
        hl: "en" // Make sure to use the English language to avoid any weirdness
    });
    return await page.goto(`https://www.google.com/search?${qs}`, {
        waitUntil: "networkidle2"
    });
}

/**
 * @param {*} page
 * @returns {Promise<{rate: number, dateUpdated: string}>}
 * @deprecated
 */
async function parseResult(page) {
    return page.$eval(
        "[data-exchange-rate]",
        element => ({
            rate: parseFloat(element.getAttribute("data-exchange-rate")),
            dateUpdated: element.nextSibling.querySelector("span").textContent
        })
    );
}

export default googleCurrencyScraper;