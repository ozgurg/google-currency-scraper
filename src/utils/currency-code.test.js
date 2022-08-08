import { isValidCurrencyCode } from "./currency-code.js";

describe("utils/currency-code", () => {
    it("should return 'true' for valid currency code", () => {
        expect(isValidCurrencyCode("TRY")).toBe(true);
    });

    it("should return 'false' for invalid currency code", () => {
        expect(isValidCurrencyCode("ABC")).toBe(false);
    });
});
