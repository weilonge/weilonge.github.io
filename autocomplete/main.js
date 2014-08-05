/*jslint node: true */
"use strict";

Utils.loadJSON('password.json',
    function (data) {
        var dataSet = data.data;

        var inputBox = document.getElementsByClassName("autocomplete")[0];
        var ac = new AutoComplete(dataSet, inputBox, new DictionarySimple());

        var myInputBox = document.getElementById("myac");
        var myac = AutoComplete(dataSet, myInputBox, new DictionaryPrefix());
    },
    function (xhr) {
        console.error(xhr);
    }
);

