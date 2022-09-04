// TODO: Replace "node-fetch" with "fetch" when its commonly available
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
import fetch from "node-fetch";

/**
 * @param {string} url
 * @param {object} config
 * @returns {Promise<string>}
 */
const makeGetRequest = async (url, config) => {
    const response = await fetch(url, {
        method: "GET",
        ...config
    });
    return response.text();
};

export {
    makeGetRequest
};
