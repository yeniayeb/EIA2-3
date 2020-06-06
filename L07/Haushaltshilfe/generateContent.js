"use strict";
var L07_Haushaltshilfe;
(function (L07_Haushaltshilfe) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "article":
                    group = createDatalist(items, category);
                    break;
                case "househelp":
                    group = createDatalist(items, category);
                    break;
                case "bankhelp":
                    group = createRadio(items, category);
                    break;
                case "posthelp":
                    group = createMultiple(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);
        }
    }
    L07_Haushaltshilfe.generateContent = generateContent;
    function generateExtra(_detail) {
        for (let choice in _detail) {
            let elements = _detail[choice];
            let group = null;
            switch (choice) {
                case "zahlungsart":
                    group = createExtra(elements, choice);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + choice);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);
        }
    }
    L07_Haushaltshilfe.generateExtra = generateExtra;
    function createDatalist(_item, _category) {
        let group = document.createElement("div");
        let input = document.createElement("input");
        input.setAttribute("list", _category);
        input.setAttribute("placeholder", "Choose " + _category);
        input.name = _category;
        let datalist = document.createElement("datalist");
        datalist.id = _category;
        for (let item of _item) {
            //einzelne Auswahlmöglichkeiten des Inputs erstellen
            let option = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;
            option.setAttribute("unit", item.unit);
            option.setAttribute("price", item.price.toFixed(2));
            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);
        }
        return group;
    }
    function createRadio(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            //Radio Button erstellen lassen, mit Wert, Name und ID
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;
            //zur Formatierung der Elemente
            let absatz = document.createElement("br");
            //Button-Label ertsellen
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }
    function createMultiple(_item, _category) {
        let group = document.createElement("div");
        for (let item of _item) {
            //Checkbox estellen
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let absatz = document.createElement("br");
            //Label
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }
    function createExtra(_elements, _choice) {
        let group = document.createElement("div");
        for (let item of _elements) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.value = item.name;
            radio.name = _choice;
            radio.id = item.name;
            let absatz = document.createElement("br");
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }
})(L07_Haushaltshilfe || (L07_Haushaltshilfe = {}));
//# sourceMappingURL=generateContent.js.map