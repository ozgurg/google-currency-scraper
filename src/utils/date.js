/**
 * @param {string} dateString
 * @return {string}
 */
const cleanDateInSearchResult = dateString => dateString.replace(" · ", "");

/**
 * Parse dates formatted as "MMM DD, HH:mm UTC" in search results into the Date class.
 *
 * @param {string} dateString
 * @return {Date}
 */
const parseAndNormalizeDateInSearchResult = dateString => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const parts = dateString.split(" ");

    const month = months.indexOf(parts[0]);
    const day = parseInt(parts[1]);
    const [hour, minute] = parts[2].split(":").map(part => parseInt(part));

    const date = new Date();
    date.setUTCMonth(month);
    date.setUTCDate(day);
    date.setUTCHours(hour);
    date.setUTCMinutes(minute);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    return date;
};

export {
    cleanDateInSearchResult,
    parseAndNormalizeDateInSearchResult
};
