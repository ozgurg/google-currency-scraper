// TODO: Make *'s in JSDoc better where possible
import puppeteer from "puppeteer";

/**
 * `args` from https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/.
 *
 * @returns {Promise<*>}
 */
const launchBrowser = () => {
    const args = [
        "--autoplay-policy=user-gesture-required",
        "--disable-background-networking",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-breakpad",
        "--disable-client-side-phishing-detection",
        "--disable-component-update",
        "--disable-default-apps",
        "--disable-dev-shm-usage",
        "--disable-domain-reliability",
        "--disable-extensions",
        "--disable-features=AudioServiceOutOfProcess",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-notifications",
        "--disable-offer-store-unmasked-wallet-cards",
        "--disable-popup-blocking",
        "--disable-print-preview",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-setuid-sandbox",
        "--disable-speech-api",
        "--disable-sync",
        "--hide-scrollbars",
        "--ignore-gpu-blacklist",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-default-browser-check",
        "--no-first-run",
        "--no-pings",
        "--no-sandbox",
        "--no-zygote",
        "--password-store=basic",
        "--use-gl=swiftshader",
        "--use-mock-keychain"
    ];

    return puppeteer.launch({
        headless: true,
        args
    });
};

/**
 * @param {*} browser
 * @returns {Promise<*>}
 */
const openNewPage = browser => browser.newPage();

/**
 * @param {*} browser
 * @returns {Promise<void>}
 */
const closeBrowser = browser => browser.close();

/**
 * @param {*} page
 */
const ensurePageLoadOnlyDocument = async page => {
    await page.setRequestInterception(true);

    page.on("request", request => {
        if (request.resourceType() === "document") {
            request.continue();
        } else {
            request.abort();
        }
    });
};

export {
    launchBrowser,
    openNewPage,
    closeBrowser,
    ensurePageLoadOnlyDocument
};
