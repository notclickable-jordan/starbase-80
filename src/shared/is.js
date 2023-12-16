"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
function IsArray(data) {
    if (data === null || typeof data === "undefined") {
        return false;
    }
    return data.constructor === Array;
}
function IsNull(data) {
    return (typeof data === "undefined" ||
        data === null ||
        (typeof data === "string" && data.length === 0) ||
        (IsArray(data) && data.length === 0));
}
exports.is = {
    null: IsNull,
};
