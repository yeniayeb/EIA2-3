namespace L07_Haushaltshilfe {
    window.addEventListener("load", handleLoad);

    /* Variablen */
    let url: string = "https://haushaltshilfeeia.herokuapp.com/";
    /**berechneter Preis */
    let totalCost: number = 0;
    //let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#formular1");
    let article: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#grocery");
    let household: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#household");
    let money: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#money");
    let postoffice: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#postoffice");
    //let payment: HTMLInputElement = <HTMLInputElement>document.querySelector("#Zahlen");
    let table: HTMLDivElement = <HTMLDivElement>document.getElementById("rechnung");
    let totalPrice: HTMLElement = <HTMLElement>document.querySelector("#betrag");



    async function handleLoad(_event: Event): Promise<void> {

        let answer1: Response = await fetch("Data.json");
        let product: string = await answer1.text();
        let data: Data = JSON.parse(product);

        let answer2: Response = await fetch("Detail.json");
        let extra: string = await answer2.text();
        let detail: Extra = JSON.parse(extra);

        console.log("test");
        generateContent(data);
        generateExtra(detail);
        // Event-Listeners
        let getfood: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#getfood");
        getfood.addEventListener("click", displayOrder);
        let gethelp: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#gethelp");
        gethelp.addEventListener("click", displayOrder);
        let getmoney: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#getmoney");
        getmoney.addEventListener("click", displayOrder);
        let getpost: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#getpost");
        getpost.addEventListener("click", displayOrder);
        /* let tip: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#gettip");
        tip.addEventListener("click", handleTip); */

        let confirm: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#confirm");
        confirm.addEventListener("click", handleTask);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#end");
        submit.addEventListener("click", sendOrder);

        let deletebtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#delete");
        deletebtn.addEventListener("click", deleteList);
    }

    function handleTask(): void {
        let aeinkaufen: HTMLInputElement = <HTMLInputElement>document.getElementById("A_einkaufen");
        let ahaushalt: HTMLInputElement = <HTMLInputElement>document.getElementById("A_haushaltsarbeit");
        let abank: HTMLInputElement = <HTMLInputElement>document.getElementById("A_bank");
        let apost: HTMLInputElement = <HTMLInputElement>document.getElementById("A_post");

        if (aeinkaufen.checked == true) {
            article.disabled = false;
            household.disabled = true;
            money.disabled = true;
            postoffice.disabled = true;
        }
        else if (ahaushalt.checked == true) {
            article.disabled = true;
            household.disabled = false;
            money.disabled = true;
            postoffice.disabled = true;
        }
        else if (abank.checked == true) {
            article.disabled = true;
            household.disabled = true;
            money.disabled = false;
            postoffice.disabled = true;
        }
        else if (apost.checked == true) {
            article.disabled = true;
            household.disabled = true;
            money.disabled = true;
            postoffice.disabled = false;
        } else {
            article.disabled = true;
            household.disabled = true;
            money.disabled = true;
            postoffice.disabled = true;
        }
    }


    function displayOrder(): void {
        let formData2: FormData = new FormData(document.forms[0]);

        for (let entry of formData2) {
            let product: string = "[value='" + entry[1] + "']";
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector(product);
            console.log(item);
            let row: HTMLTableRowElement = document.createElement("tr");
            let tdartikel: HTMLTableDataCellElement = document.createElement("td");
            let tdanzahl: HTMLTableDataCellElement = document.createElement("td");
            let tdeinheit: HTMLTableDataCellElement = document.createElement("td");
            let tdpreis: HTMLTableDataCellElement = document.createElement("td");
            let tdlöschen: HTMLTableDataCellElement = document.createElement("td");


            console.log(entry);
            switch (entry[0]) {
                case "article":
                    let itemPrice: number = Number(item.getAttribute("price"));
                    let menge: number = Number(formData2.get("anzahl"));
                    let einheit: string = String(item.getAttribute("unit"));
                    itemPrice = menge * itemPrice;

                    // Werte in Tabelle Versuch
                    tdartikel.innerHTML = "" + entry[1];
                    tdanzahl.innerHTML = "" + menge;
                    tdeinheit.innerHTML = "" + einheit;
                    tdpreis.innerHTML = "" + itemPrice.toFixed(2);
                    tdlöschen.innerHTML = "";
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    row.appendChild(tdpreis);
                    row.appendChild(tdlöschen);
                    table.appendChild(row);

                    totalCost += itemPrice;
                    /* let newfield: HTMLElement = document.createElement("div");
                    newfield.classList.add("einkaufen"); */
                    break;

                case "bankhelp":
                    let money: string = String(item.getAttribute("value"));
                    if (money == "einzahlen") {
                        let summe: number = Number(formData2.get("geldanzahl"));
                        let endsumme: number = summe * 5;
                        tdartikel.innerHTML = "" + entry[1];
                        tdanzahl.innerHTML = "" + summe;
                        tdeinheit.innerHTML = "";
                        tdpreis.innerHTML = "" + endsumme;
                        tdlöschen.innerHTML = "";
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        row.appendChild(tdpreis);
                        row.appendChild(tdlöschen);
                        table.appendChild(row);

                        totalCost += endsumme;
                        break;
                    }

                    else if (money == "abheben") {
                        let amount: number = Number(formData2.get("geldanzahl"));
                        amount = amount * 5;
                        tdartikel.innerHTML = "" + entry[1];
                        tdanzahl.innerHTML = "" + amount;
                        tdeinheit.innerHTML = "";
                        tdpreis.innerHTML = "";
                        tdlöschen.innerHTML = "";
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        row.appendChild(tdpreis);
                        row.appendChild(tdlöschen);
                        table.appendChild(row);
                        break;
                    }
                    tdartikel.innerHTML = "Grundgebühr Bank";
                    tdanzahl.innerHTML = "1";
                    tdeinheit.innerHTML = "";
                    tdpreis.innerHTML = "" + 5;
                    tdlöschen.innerHTML = "";
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    row.appendChild(tdpreis);
                    row.appendChild(tdlöschen);
                    table.appendChild(row);
                    totalCost += 5;
                    break;

                case "househelp":
                    let householdCost: number = Number(item.getAttribute("price"));
                    let housemenge: number = Number(formData2.get("homeanzahl"));
                    let houseeinheit: string = String(item.getAttribute("unit"));
                    householdCost = housemenge * householdCost;
                    tdartikel.innerHTML = "" + entry[1];
                    tdanzahl.innerHTML = "" + housemenge;
                    tdeinheit.innerHTML = "" + houseeinheit;
                    tdpreis.innerHTML = "" + householdCost.toFixed(2);
                    tdlöschen.innerHTML = "";
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    row.appendChild(tdpreis);
                    row.appendChild(tdlöschen);
                    table.appendChild(row);
                    totalCost += householdCost;
                    break;

                case "posthelp":
                    let postCost: number = Number(item.getAttribute("price"));
                    let postmenge: number = Number(formData2.get("briefanzahl"));
                    postCost = postmenge * postCost;
                    tdartikel.innerHTML = "" + entry[1];
                    tdanzahl.innerHTML = "" + postmenge;
                    tdeinheit.innerHTML = "Briefe";
                    tdpreis.innerHTML = "" + postCost.toFixed(2);
                    tdlöschen.innerHTML = "";
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    row.appendChild(tdpreis);
                    row.appendChild(tdlöschen);
                    table.appendChild(row);
                    totalCost += postCost;
                    break;

            }
            totalPrice.innerHTML = "";
            totalPrice.innerHTML = totalCost.toFixed(2);

        }
    }

    /* function handleTip(): void {
        let tip: HTMLInputElement = <HTMLInputElement>document.querySelector("#tipamount");
        let amount: number = Number(tip.getAttribute("value"));
        let total: number = totalCost + amount;
        totalPrice.innerHTML = ""; //toFixed?
        totalPrice.innerHTML = total.toFixed(2);
    } */

    function deleteList(_event: Event): void {

        let rechnung: NodeList = <NodeList>document.querySelectorAll("#rechnung > tr");
        let length: number = rechnung.length;
        while (length > 0) {
            let tableelement: Node = <Node>document.querySelector("#rechnung > tr");
            table.removeChild(tableelement);
            length--;
        }
        totalCost = 0;
        totalPrice.innerHTML = "0,00";
    }

    async function sendOrder(): Promise<void> {
        console.log("send order");
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        //await fetch("Haushaltshilfe.html?" + query.toString());
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();

        let date: HTMLInputElement = <HTMLInputElement>document.querySelector("#date");
        let datum: string = date.value;
        alert("Ihre Bestellung wird bearbeitet. Sie wird am " + datum + " zu Ihnen geliefert!" +
            "\n Sie kostet " + totalCost.toFixed(2) + " €." + "\n" + responseText);
    }

}

