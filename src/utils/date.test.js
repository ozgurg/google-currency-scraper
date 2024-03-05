import { cleanDateInSearchResult, parseAndNormalizeDateInSearchResult } from "./date.js";
import { describe, expect, it } from "vitest";

describe("utils/date", () => {
    describe("cleanDateInSearchResult", () => {
        it("should clean date in search result", () => {
            const dateString = "Sep 01, 21:15 UTC · ";
            expect(cleanDateInSearchResult(dateString)).toBe("Sep 01, 21:15 UTC");
        });
    });

    describe("parseAndNormalizeDateInSearchResult", () => {
        it("should parse and normalize date in search result", () => {
            const dateString = "Sep 01, 21:15 UTC";
            expect(parseAndNormalizeDateInSearchResult(dateString)).toStrictEqual(new Date("2024-09-01T21:15:00.000Z"));
        });
    });
});
