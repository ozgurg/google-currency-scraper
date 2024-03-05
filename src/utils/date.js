import dayjs from "dayjs";

/**
 * @typedef {dayjs.Dayjs} DateHelper
 */
const dateHelper = dayjs;

/**
 * @param {Date} date
 * @return {string}
 */
const getDate = (date = new Date()) => dateHelper(date).toISOString();

/**
 * @return {number}
 */
const getCurrentYear = () => dateHelper().year();

/**
 * @param {string} dateString
 * @param {string} format
 * @return {DateHelper}
 */
const formatDate = (dateString, format) => dateHelper(dateString, format, true);

/**
 * @param {DateHelper} dateHelperInstance
 * @param {number} year
 * @return {DateHelper}
 */
const setYear = (dateHelperInstance, year) => dateHelperInstance.year(year);

/**
 * @param {string} dateString
 * @return {string}
 */
const cleanDateInSearchResult = dateString => dateString.replace(" · ", "");

/**
 * @param {string} dateString
 * @return {string}
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
