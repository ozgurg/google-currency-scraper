import { cleanDateInSearchResult } from "./date.js";
import { describe, expect, it } from "vitest";

describe("utils/date", () => {
    describe("cleanDateInSearchResult", () => {
        it("should clean date in search result", () => {
            const dateString = "Sep 01, 21:15 UTC · ";
            expect(cleanDateInSearchResult(dateString)).toBe("Sep 01, 21:15 UTC");
        });
    });
});
