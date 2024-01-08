/**
 * Reject ajax after x seconds
 * @param {number}
 * @returns {Promise}
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * AJAX request - GET |POST
 * @param {string} url - The Recipe API.
 * @param {undefined|Object} - The recipe Object.
 * @returns {JSON|Error}
 * @async
 */
export const getAJAX = async function (url, obj = undefined) {
  try {
    const f = obj
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
      : fetch(url);
    const response = await Promise.race([f, timeout(2)]);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const datas = await response.json();
    return datas;
  } catch (error) {
    throw error;
  }
};
/**
 * AJAX request DELETE
 * @param {string} url - The Recipe API request.
 * @returns {JSON|Error}
 * @async
 */
export const deleteAJAX = async function (url) {
  try {
    const f = fetch(url, { method: "DELETE" });
    const response = await Promise.race([f, timeout(2)]);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error) {
    throw error;
  }
};
