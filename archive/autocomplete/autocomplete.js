/*jslint node: true, plusplus: true */
"use strict";

var AutoComplete = function (dictionary, oText, dictionaryModule) {
    if (!(this instanceof AutoComplete)) {
        return new AutoComplete(dictionary, oText, dictionaryModule);
    }

    var wrapperDiv = document.createElement("div"),
        timeSpentDiv = document.createElement("div"),
        oTextId;
    wrapperDiv.className = "autoCompleteWrapper";
    Utils.insertAfter(wrapperDiv, oText);
    wrapperDiv.appendChild(oText);
    oTextId = oText.getAttribute("id");
    if (oTextId) {
        wrapperDiv.setAttribute("id", oTextId);
        oText.removeAttribute("id");
    }
    this.oText = oText; // the text box
    this.oDiv = document.createElement("div"); // a hidden <div> for the popup auto-complete
    this.oDiv.className = "autoCompleteDropdown";
    Utils.insertAfter(this.oDiv, oText);

    this.db = dictionaryModule;
    this.db.add(dictionary);

    // attach handlers to the text-box
    oText.AutoComplete = this;
    oText.onkeyup = AutoComplete.prototype.onTextChange;
    oText.onblur = AutoComplete.prototype.onTextBlur;
    this.status = {
        defaultDropdownLeft: this.oDiv.offsetLeft,
        defaultDropdownTop: this.oDiv.offsetTop,
        lastKeyword: "",
        setFocusToInput: false
    };

    wrapperDiv.AutoComplete = this;
    wrapperDiv.onclick = AutoComplete.prototype.onWrapperClick;

    this.timeSpentDiv = timeSpentDiv;
    timeSpentDiv.className = "timeSpentTag";
    Utils.insertAfter(timeSpentDiv, wrapperDiv);
};

AutoComplete.prototype.onWrapperClick = function (e) {
    var t = e.target || e.srcElement;
    if (t.className === "close") {
        this.AutoComplete.removeTag(t.parentNode);
    }
    this.AutoComplete.oText.focus();
};

AutoComplete.prototype.relocateDropdown = function () {
    var dropdownStyle = this.oDiv.style,
        st = this.status,
        inputBox = this.oText;
    dropdownStyle.left = (inputBox.offsetLeft + st.defaultDropdownLeft).toString() + "px";
    dropdownStyle.top = (inputBox.offsetTop + st.defaultDropdownTop).toString() + "px";
};

AutoComplete.prototype.createTag = function (text) {
    var newTag = document.createElement("div"),
        dropdown = this.oDiv,
        inputBox = this.oText;
    newTag.className = "autoCompleteTag";
    newTag.innerHTML = '<span>' + text + '</span><i class="close"></i>';
    inputBox.parentNode.insertBefore(newTag, this.oText);
    inputBox.value = "";
    this.relocateDropdown();
};

AutoComplete.prototype.removeTag = function (tagNode) {
    tagNode.parentNode.removeChild(tagNode);
    this.relocateDropdown();
};

AutoComplete.prototype.onTextBlur = function () {
    this.AutoComplete.hideDropdown();
};

AutoComplete.prototype.hideDropdown = function () {
    this.oDiv.style.visibility = "hidden";
    if (this.status.setFocusToInput) {
        this.oText.focus();
        this.status.setFocusToInput = false;
    }
};

AutoComplete.prototype.onTextChange = function (e) {
    var ac = this.AutoComplete;
    if (e.keyCode === 27) { // Esc key
        ac.hideDropdown();
    } else if (ac.oDiv.style.visibility === "visible" && e.keyCode === 13) { // Enter key
        ac.createTag(ac.oDiv.firstChild.innerHTML);
        ac.hideDropdown();
    } else if (ac.oText.value !== ac.status.lastKeyword) {
        ac.status.lastKeyword = ac.oText.value;
        ac.onchange();
    }
};

AutoComplete.prototype.onchange = function () {
    var text = this.oText.value,
        dropdownNode = this.oDiv,
        ts1, ts2,
        searched;

    if (text && text !== "") {
        ts1 = new Date().getTime();
        searched = this.db.search(text);
        ts2 = new Date().getTime();
        this.timeSpentDiv.innerHTML = "Time spent (ms): " + (ts2 - ts1);
        if (searched.full && searched.partial.length === 1) {
            console.log("Matched: " + searched.full);
            this.createTag(searched.full);
            this.hideDropdown();
        } else if (searched.partial.length > 0) {
            // clear the popup div.
            while (dropdownNode.firstChild) {
                dropdownNode.removeChild(dropdownNode.firstChild);
            }

            // get all the matching strings from the Dictionary
            var matched = searched.partial,
                frag = document.createDocumentFragment(),
                n = matched.length,
                i;

            // add each string to the popup-div
            for (i = 0; i < n; i++) {
                var oDiv = document.createElement('div');
                frag.appendChild(oDiv);
                oDiv.innerHTML = matched[i];
                oDiv.onmousedown = AutoComplete.prototype.onDropdownBoxMouseDown;
                oDiv.onmouseover = AutoComplete.prototype.onDropdownBoxMouseOver;
                oDiv.onmouseout = AutoComplete.prototype.onDropdownBoxMouseOut;
                oDiv.AutoComplete = this;
            }
            dropdownNode.appendChild(frag);
            dropdownNode.style.visibility = "visible";
        } else {
            this.hideDropdown();
        }
    } else {
        this.hideDropdown();
    }
};

AutoComplete.prototype.onDropdownBoxMouseDown = function (e) {
    var t = e.target || e.srcElement;
    console.log(t.innerHTML);
    this.AutoComplete.createTag(t.innerHTML);
    this.AutoComplete.status.setFocusToInput = true;
};

