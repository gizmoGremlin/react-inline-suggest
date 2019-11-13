"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterSuggestions(value, suggestions, ignoreCase, getSuggestionValue) {
    if (!value) {
        return [];
    }
    var rx = RegExp("^" + value, ignoreCase ? 'i' : undefined);
    return suggestions.filter(function (suggestion) {
        return getSuggestionValue
            ? rx.test(getSuggestionValue(suggestion))
            : rx.test(String(suggestion));
    });
}
exports.filterSuggestions = filterSuggestions;
function getNeedleFromString(text, current) {
    return text.replace(text.substr(0, current.length), '');
}
exports.getNeedleFromString = getNeedleFromString;
function getNextSafeIndexFromArray(array, current) {
    return current + 1 > array.length - 1 ? 0 : current + 1;
}
exports.getNextSafeIndexFromArray = getNextSafeIndexFromArray;
function getPreviousSafeIndexFromArray(array, current) {
    return current - 1 < 0 ? array.length - 1 : current - 1;
}
exports.getPreviousSafeIndexFromArray = getPreviousSafeIndexFromArray;
