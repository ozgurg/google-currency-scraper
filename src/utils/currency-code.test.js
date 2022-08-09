import { CurrencyCode, isValidCurrencyCode } from "./currency-code.js";

describe("utils/currency-code", () => {
    describe("CurrencyCode", () => {
        it("should be an object", () => {
            expect(typeof CurrencyCode).toBe("object");
        });

        it("should have same key value pair", () => {
            for (const [key, value] of Object.entries(CurrencyCode)) {
                expect(key).toBe(value);
            }
        });
    });

    describe("isValidCurrencyCode", () => {
        it("should return 'true' for valid currency code", () => {
            expect(isValidCurrencyCode("TRY")).toBe(true);
        });

        it("should return 'false' for invalid currency code", () => {
            expect(isValidCurrencyCode("ABC")).toBe(false);
        });
    });
});
