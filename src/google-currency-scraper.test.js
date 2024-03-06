import googleCurrencyScraper from "./google-currency-scraper.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("google-currency-scraper", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    it("should throw an error if 'from' is invalid", async () => {
        await expect(async () => {
            await googleCurrencyScraper({
                from: "A"
            });
        }).rejects.toThrow("Invalid 'from' currency code: A");
    });

    it("should throw an error if 'from' is invalid", async () => {
        await expect(async () => {
            await googleCurrencyScraper({
                from: "TRY",
                to: "A"
            });
        }).rejects.toThrow("Invalid 'to' currency code: A");
    });

    it("should return '1' rate without scraping Google if 'from' and 'to' are the same", async () => {
        const mockDate = new Date("10 Aug 2022 UTC");
        vi.setSystemTime(mockDate);

        const scraper = await googleCurrencyScraper({
            from: "USD",
            to: "USD"
        });
        expect(scraper).toStrictEqual({
            from: "USD",
            to: "USD",
            rate: 1,
            dateUpdated: mockDate.toISOString()
        });

        // TODO: Make sure the browser is not launched
    });

    it("should scrape Google and return valid result", async () => {
        // I'm not sure about making a real scraping,
        // but I think it will help me with the changes
        // Google can make to its HTML structure in the future
        const currency = await googleCurrencyScraper({
            from: "TRY",
            to: "USD"
        });
        expect(currency.from).toBe("TRY");
        expect(currency.to).toBe("USD");
        expect(typeof currency.rate).toBe("number");
        expect(typeof currency.dateUpdated).toBe("string");
    });

    afterEach(() => {
        vi.useRealTimers();
    });
});
