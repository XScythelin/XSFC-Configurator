import semver from "semver";
import FC from "../fc";
import { API_VERSION_1_45 } from "../data_storage";

function zeroPad(value, width) {
    let valuePadded = String(value);

    while (valuePadded.length < width) {
        valuePadded = `0${value}`;
    }

    return valuePadded;
}

export function generateFilename(prefix, suffix) {
    const date = new Date();
    const yyyymmdd = `${date.getFullYear()}${zeroPad(date.getMonth() + 1, 2)}${zeroPad(date.getDate(), 2)}`;
    const hhmmss = `${zeroPad(date.getHours(), 2)}${zeroPad(date.getMinutes(), 2)}${zeroPad(date.getSeconds(), 2)}`;
    const craftName = semver.gte(FC.CONFIG.apiVersion, API_VERSION_1_45) ? FC.CONFIG.craftName : FC.CONFIG.name;
    const identifier = FC.CONFIG.boardIdentifier === "XSFC" ? "XSFC" : FC.CONFIG.flightControllerIdentifier;
    let filename = `${identifier || "UNKNOWN"}_${prefix}`;

    if (craftName.length) {
        filename += `_${craftName.trim().replace(" ", "_").toUpperCase()}`;
    }

    filename += `_${yyyymmdd}_${hhmmss}`;

    if (FC.CONFIG.boardName) {
        filename += `_${FC.CONFIG.boardName}`;
    }

    return `${filename}.${suffix}`;
}
