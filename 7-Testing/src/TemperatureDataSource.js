/**
 * Returns a promise that will resolve to a Number temperature value
 * that can not be `NaN`.
 * 
 * @returns {Promise} Promise that resolves to a non-NaN number value.
 */
export default () => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(73)
        }, 6000);
    });
}