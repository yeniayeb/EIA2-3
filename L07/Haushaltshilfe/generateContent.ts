namespace L07_Haushaltshilfe {
    export function generateContent(_data: Data): void {
        for (let category in _data) {
            let items: Produkt[] = _data[category];

            let group: HTMLElement | null = null;
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

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);

        }
    }

    export function generateExtra(_detail: Extra): void {
        for (let choice in _detail) {
            let elements: Element[] = _detail[choice];

            let group: HTMLElement | null = null;
            switch (choice) {
                case "zahlungsart":
                    group = createExtra(elements, choice);
                    break;
                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + choice);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);

        }
    }

    function createDatalist(_item: Produkt[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        let input: HTMLInputElement = document.createElement("input");
        input.setAttribute("list", _category);
        input.setAttribute("placeholder", "Choose " + _category);
        input.name = _category;
        let datalist: HTMLDataListElement = document.createElement("datalist");
        datalist.id = _category;
        for (let item of _item) {
            //einzelne Auswahlmöglichkeiten des Inputs erstellen
            let option: HTMLOptionElement = document.createElement("option");
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

    function createRadio(_items: Produkt[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            //Radio Button erstellen lassen, mit Wert, Name und ID
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;

            //zur Formatierung der Elemente
            let absatz: HTMLBRElement = document.createElement("br");

            //Button-Label ertsellen
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }

    function createMultiple(_item: Produkt[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _item) {
            //Checkbox estellen
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;

            let absatz: HTMLBRElement = document.createElement("br");

            //Label
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }

    function createExtra(_elements: Element[], _choice: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _elements) {
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.value = item.name;
            radio.name = _choice;
            radio.id = item.name;

            let absatz: HTMLBRElement = document.createElement("br");

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(absatz);
        }
        return group;
    }

}
