![Downloads](https://img.shields.io/npm/dm/google-currency-scraper)
![Version](https://img.shields.io/github/package-json/v/ozgurg/google-currency-scraper)

# Google Currency Scraper

`google-currency-scraper` uses [Puppeteer](https://github.com/puppeteer/puppeteer) under the hood. It goes
Google '1 USD to TRY' search result and returns the value of `[data-exchange-rate]` selector in its HTML.

## Install

```shell
npm install google-currency-scraper
```

## Usage

```javascript
import googleCurrencyScraper, { CurrencyCode } from "google-currency-scraper";

const currency = await googleCurrencyScraper({
    from: CurrencyCode.USD, // You can use "USD" as well
    to: CurrencyCode.TRY // You can use "TRY" as well
});
// Returns:
// {
//     from: "USD",
//     to: "TRY",
//     rate: 17.9187
// }
```

## API

### googleCurrencyScraper({ from, to })

All params are required.

| Param | Type                                    |
|-------|-----------------------------------------|
| from  | <code>CurrencyCode &#124; string</code> |
| to    | <code>CurrencyCode &#124; string</code> |

### CurrencyCode

It's a helper object that contains all currency codes.

## License

[![License](https://img.shields.io/github/license/ozgurg/google-currency-scraper)](https://github.com/ozgurg/google-currency-scraper/blob/main/LICENSE)
