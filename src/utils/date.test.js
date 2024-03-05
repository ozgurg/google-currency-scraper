import {
    cleanDateInSearchResult,
    dateHelper,
    formatDate,
    getCurrentYear,
    getDate,
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

    describe("getDate", () => {
        beforeAll(() => {
            const mockDate = new Date("10 Aug 2022 UTC");
            global.Date = jest.fn().mockImplementation(() => mockDate);
        });

        it("should return current date in ISO format", () => {
            expect(getDate(new Date())).toBe("2022-08-10T00:00:00.000Z");
        });

        afterAll(() => {
            global.Date = date;
        });
    });

    describe("getCurrentYear", () => {
        beforeAll(() => {
            const mockDate = new Date("10 Aug 2022 UTC");
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
            const formattedDate = formatDate("11 Sep 2022 UTC", "D MMM YYYY");
            expect(formattedDate.toISOString()).toBe("2022-09-11T00:00:00.000Z");
        });
    });

    describe("setYear", () => {
        it("should set year", () => {
            const date = dateHelper("1 Sep 2021 UTC");
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
            expect(parseAndNormalizeDateInSearchResult(dateString)).toBe("2024-09-01T21:15:00.000Z");
        });
    });
});
