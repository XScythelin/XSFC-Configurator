const storagePrefix = "xsfc:";
localStorage.setItem(storagePrefix + "meteredConnection", JSON.stringify({ meteredConnection: true }));

// Apply portable defaults once, including to an existing local installation.
if (!localStorage.getItem(storagePrefix + "portableDefaultsV1")) {
    localStorage.setItem(storagePrefix + "expertMode", JSON.stringify({ expertMode: false }));
    localStorage.setItem(storagePrefix + "meteredConnection", JSON.stringify({ meteredConnection: true }));
    localStorage.setItem(storagePrefix + "analyticsOptOut", JSON.stringify({ analyticsOptOut: true }));
    localStorage.setItem(storagePrefix + "portableDefaultsV1", "true");
}

/**
 * Gets one or more items from localStorage
 * @param {string | string[]} key string or array of strings
 * @returns {object}
 */
export function get(key, defaultValue = null) {
    let result = {};
    if (Array.isArray(key)) {
        key.forEach(function (element) {
            try {
                result = { ...result, ...JSON.parse(localStorage.getItem(storagePrefix + element)) };
            } catch (e) {
                console.error(e);
            }
        });
    } else {
        const keyValue = localStorage.getItem(storagePrefix + key);
        if (keyValue) {
            try {
                result = JSON.parse(keyValue);
            } catch (e) {
                console.error(e);
            }
        }
    }

    // if default value is set and key is not found in localStorage, set default value
    if (!Object.keys(result).length && defaultValue !== null) {
        console.log("setting default value for", key, defaultValue);
        result[key] = defaultValue;
    }

    return result;
}

/**
 * Save dictionary of key/value pairs to localStorage
 * @param {object} input object which keys are strings and values are serializable objects
 */
export function set(input) {
    Object.keys(input).forEach(function (element) {
        const tmpObj = {};
        tmpObj[element] = input[element];
        try {
            localStorage.setItem(storagePrefix + element, JSON.stringify(tmpObj));
        } catch (e) {
            console.error(e);
        }
    });
}

/**
 * Remove item from localStorage
 * @param {string} item key to remove from storage
 */
export function remove(item) {
    localStorage.removeItem(storagePrefix + item);
}

/**
 * Clear localStorage
 */
export function clear() {
    Object.keys(localStorage)
        .filter((key) => key.startsWith(storagePrefix))
        .forEach((key) => localStorage.removeItem(key));
}

/**
 * @deprecated this is a temporary solution to allow the use of the ConfigStorage module in old way
 */
const ConfigStorage = {
    get,
    set,
    remove,
    clear,
};
window.ConfigStorage = ConfigStorage;
