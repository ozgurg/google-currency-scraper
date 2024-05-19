![Downloads](https://img.shields.io/npm/dm/google-currency-scraper)
![Version](https://img.shields.io/github/package-json/v/ozgurg/google-currency-scraper)

# google-currency-scraper

Scrape extremely up-to-date exchange rates from Google fast and for free, with only one external dependency.

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
// {
//     from: "USD",
//     to: "TRY",
//     rate: 32.2434,
//     dateUpdated: "May 19, 13:59 UTC"
// }
```

## API

### googleCurrencyScraper(params) : object

#### params

Default: <code>{}</code>\
Type: <code>object</code>\
Required: Yes

#### params.from

Type: <code>CurrencyCode | string</code>\
Required: Yes

#### params.to

Type: <code>CurrencyCode | string</code>\
Required: Yes

### CurrencyCode

It's a helper object that contains all currency codes.

## License

[![License](https://img.shields.io/github/license/ozgurg/google-currency-scraper)](https://github.com/ozgurg/google-currency-scraper/blob/main/LICENSE)
