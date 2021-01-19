/*jslint node: true, plusplus: true */
"use strict";

var DictionarySimple = function () {
    this.dataSet = [];
};

DictionarySimple.prototype.add = function (dictionary) {
    // preprocess the texts for fast access
    var i, n = dictionary.length;
    for (i = 0; i < n; i++) {
        this.dataSet.push(dictionary[i]);
    }
};

DictionarySimple.prototype.search = function (text) {
    var partialMatch = [],
        fullMatch = null,
        size = this.dataSet.length,
        i;
    for (i = 0; i < size; i++) {
        var data = this.dataSet[i];
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

