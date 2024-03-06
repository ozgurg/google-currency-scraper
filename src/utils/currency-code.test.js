import { CurrencyCode, isValidCurrencyCode } from "./currency-code.js";
import { describe, expect, it } from "vitest";

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

        it("should have uppercase key value pair", () => {
            for (const [key, value] of Object.entries(CurrencyCode)) {
                expect(key).toBe(key.toUpperCase());
                expect(value).toBe(value.toUpperCase());
            }
        });
    });

    describe("isValidCurrencyCode", () => {
        it("should return 'true' for valid currency code", () => {
            expect(isValidCurrencyCode("TRY")).toBe(true);
        });

        it("should return 'false' for invalid currency code", () => {
            expect(isValidCurrencyCode("not-real")).toBe(false);
        });
    });
});
