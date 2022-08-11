import dayjs from "dayjs";

/**
 * @typedef {dayjs.Dayjs} DateHelper
 */
const dateHelper = dayjs;

/**
 * @param {Date} date
 * @returns {string}
 */
const getDate = (date = new Date()) => dateHelper(date).toISOString();

/**
 * @returns {number}
 */
const getCurrentYear = () => dateHelper().year();

/**
 * @param {string} dateString
 * @param {string} format
 * @returns {DateHelper}
 */
const formatDate = (dateString, format) => dateHelper(dateString, format, true);

/**
 * @param {DateHelper} dateHelperInstance
 * @param {number} year
 * @returns {DateHelper}
 */
const setYear = (dateHelperInstance, year) => dateHelperInstance.year(year);

/**
 * @param {string} dateString
 * @returns {string}
 */
const cleanDateInSearchResult = dateString => dateString.replace(" · ", "");

/**
 * @param {string} dateString
 * @returns {string}
 */
const parseAndNormalizeDateInSearchResult = dateString => {
    const searchResultFormat = "MMM DD, HH:mm UTC";
    const cleanedDate = cleanDateInSearchResult(dateString);
    const formattedDate = formatDate(cleanedDate, searchResultFormat);
    const normalizedDate = setYear(formattedDate, getCurrentYear());
    return normalizedDate.toISOString();
};

export {
    dateHelper,
    getDate,
    getCurrentYear,
    formatDate,
    setYear,
    cleanDateInSearchResult,
    parseAndNormalizeDateInSearchResult
};
