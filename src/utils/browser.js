// This file should not be used and will be removed in the next major release
import puppeteer from "puppeteer";

/**
 * `args` from https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/.
 *
 * @returns {Promise<*>}
 * @deprecated
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
 * @deprecated
 */
const openNewPage = browser => browser.newPage();

/**
 * @param {*} browser
 * @returns {Promise<void>}
 * @deprecated
 */
const closeBrowser = browser => browser.close();

/**
 * @param {*} page
 * @param {string} device
 * @returns {Promise<void>}
 * @deprecated
 */
const emulateDevice = (page, device) => page.emulate(puppeteer.devices[device]);

/**
 * @param {*} page
 * @deprecated
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
    emulateDevice,
    ensurePageLoadOnlyDocument
};
