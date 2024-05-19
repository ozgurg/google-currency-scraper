/**
 * @param {string} dateString
 * @return {string}
 */
const cleanDateInSearchResult = dateString => dateString.replace(" · ", "");

export {
    cleanDateInSearchResult
};
