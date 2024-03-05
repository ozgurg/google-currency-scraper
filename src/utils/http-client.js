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
