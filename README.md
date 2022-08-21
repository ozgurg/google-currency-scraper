![Downloads](https://img.shields.io/npm/dm/google-currency-scraper)
![Version](https://img.shields.io/github/package-json/v/ozgurg/google-currency-scraper)

# Google Currency Scraper

`google-currency-scraper` goes Google '1 USD to TRY' (for example) search result and scrape exchange rate and last updated date for you by using [Puppeteer](https://github.com/puppeteer/puppeteer) under the hood.

## Install

```shell
npm install google-currency-scraper
```

## Usage

_First response might be slow._

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
//     rate: 17.9539,
//     dateUpdated: "2022-08-11T23:24:00.000Z"
// }
```

_This package is a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)._

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
