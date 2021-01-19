/*jslint node: true, plusplus: true */
"use strict";

var DictionaryPrefix = function () {
    this.dataSet = {};
};

function getIndex(str) {
    return str.charAt(0).toLowerCase();
}

DictionaryPrefix.prototype.add = function (dictionary) {
    // preprocess the texts for fast access
    var i, n = dictionary.length, set = this.dataSet;
    for (i = 0; i < n; i++) {
        var prefix = getIndex(dictionary[i]);
        if (!set[prefix]) {
            set[prefix] = [];
        }
        set[prefix].push(dictionary[i]);
    }
};

DictionaryPrefix.prototype.search = function (text) {
    var partialMatch = [],
        fullMatch = null,
        set = this.dataSet[getIndex(text)],
        size = (set ? set.length : 0),
        i;
    for (i = 0; i < size; i++) {
        var data = set[i];
        if (-1 !== data.search(text)) {
            if (data === text) {
                fullMatch = data;
            }
            partialMatch.push(data);
        }
    }
    return {
        partial: partialMatch,
        full: fullMatch
    };
};

