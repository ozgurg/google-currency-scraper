import {
    cleanDateInSearchResult,
    dateHelper,
    formatDate,
    getCurrentYear,
    parseAndNormalizeDateInSearchResult,
    setYear
} from "./date.js";
import { jest } from "@jest/globals";

describe("utils/date", () => {
    const date = Date;

    describe("dateHelper", () => {
        it("should be a Day.js instance", () => {
            // TODO: Make sure it is a Day.js instance
        });
    });

    describe("getCurrentYear", () => {
        beforeAll(() => {
            const mockDate = new Date("10 Aug 2022");
            global.Date = jest.fn().mockImplementation(() => mockDate);
        });

        it("should return year from date", () => {
            expect(getCurrentYear()).toBe(2022);
        });

        afterAll(() => {
            global.Date = date;
        });
    });

    describe("formatDate", () => {
        it("should format date with known format", () => {
            const formattedDate = formatDate("11 Sep 2022", "D MMM YYYY");
            expect(formattedDate.toISOString()).toBe("2022-09-10T21:00:00.000Z");
        });
    });

    describe("setYear", () => {
        it("should set year", () => {
            const date = dateHelper("1 Sep 2021");
            expect(setYear(date, 2022).year()).toBe(2022);
        });
    });

    describe("cleanDateInSearchResult", () => {
        it("should clean date in search result", () => {
            const dateString = "Sep 01, 21:15 UTC · ";
            expect(cleanDateInSearchResult(dateString)).toBe("Sep 01, 21:15 UTC");
        });
    });

    describe("parseAndNormalizeDateInSearchResult", () => {
        it("should parse and normalize date in search result", () => {
            const dateString = "Sep 01, 21:15 UTC";
            expect(parseAndNormalizeDateInSearchResult(dateString)).toBe("2022-09-01T21:15:00.000Z");
        });
    });
});
