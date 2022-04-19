/**
 * Gets query parameters from the current url as an object.
 * 
 * @returns {Object} Query parameters as an object.
 */
export const queryParams = () => {
    // Get the query string and removes the ? from the beginning.
    const queryString = window.location.search.substring(1);

    // Accumulates the key value pairs from the query string into an object.
    const queryParams = queryString.split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
    }, {}); // Initialized as an empty object.

    return queryParams;
};