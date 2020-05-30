"use strict";
var L06_Haushaltshilfe;
(function (L06_Haushaltshilfe) {
    window.addEventListener("load", handleLoad);
    /* Variablen */
    let url = "https://haushaltshilfeeia.herokuapp.com/";
    /**berechneter Preis */
    let totalCost = 0;
    //let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#formular1");
    let article = document.querySelector("#grocery");
    let household = document.querySelector("#household");
    let money = document.querySelector("#money");
    let postoffice = document.querySelector("#postoffice");
    //let payment: HTMLInputElement = <HTMLInputElement>document.querySelector("#Zahlen");
    let table = document.getElementById("rechnung");
    let totalPrice = document.querySelector("#betrag");
    async function handleLoad(_event) {
        let answer1 = await fetch("Data.json");
        let product = await answer1.text();
        let data = JSON.parse(product);
        let answer2 = await fetch("Detail.json");
        let extra = await answer2.text();
        let detail = JSON.parse(extra);
        console.log("test");
        L06_Haushaltshilfe.generateContent(data);
        L06_Haushaltshilfe.generateExtra(detail);
        // Event-Listeners
        let getfood = document.querySelector("#getfood");
        getfood.addEventListener("click", displayOrder);
        let gethelp = document.querySelector("#gethelp");
        gethelp.addEventListener("click", displayOrder);
        let getmoney = document.querySelector("#getmoney");
        getmoney.addEventListener("click", displayOrder);
        let getpost = document.querySelector("#getpost");
        getpost.addEventListener("click", displayOrder);
        /* let tip: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#gettip");
        tip.addEventListener("click", handleTip); */
        let confirm = document.querySelector("#confirm");
        confirm.addEventListener("click", handleTask);
        let submit = document.querySelector("#end");
        submit.addEventListener("click", sendOrder);
        let deletebtn = document.querySelector("#delete");
        deletebtn.addEventListener("click", deleteList);
    }
    function handleTask() {
        let aeinkaufen = document.getElementById("A_einkaufen");
        let ahaushalt = document.getElementById("A_haushaltsarbeit");
        let abank = document.getElementById("A_bank");
        let apost = document.getElementById("A_post");
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
        }
        else {
            article.disabled = true;
            household.disabled = true;
            money.disabled = true;
            postoffice.disabled = true;
        }
    }
    function displayOrder() {
        let formData2 = new FormData(document.forms[0]);
        for (let entry of formData2) {
            let product = "[value='" + entry[1] + "']";
            let item = document.querySelector(product);
            console.log(item);
            let row = document.createElement("tr");
            let tdartikel = document.createElement("td");
            let tdanzahl = document.createElement("td");
            let tdeinheit = document.createElement("td");
            let tdpreis = document.createElement("td");
            let tdlöschen = document.createElement("td");
            console.log(entry);
            switch (entry[0]) {
                case "article":
                    let itemPrice = Number(item.getAttribute("price"));
                    let menge = Number(formData2.get("anzahl"));
                    let einheit = String(item.getAttribute("unit"));
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
                    let money = String(item.getAttribute("value"));
                    if (money == "einzahlen") {
                        let summe = Number(formData2.get("geldanzahl"));
                        let endsumme = summe * 5;
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
                        let amount = Number(formData2.get("geldanzahl"));
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
                    let householdCost = Number(item.getAttribute("price"));
                    let housemenge = Number(formData2.get("homeanzahl"));
                    let houseeinheit = String(item.getAttribute("unit"));
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
                    let postCost = Number(item.getAttribute("price"));
                    let postmenge = Number(formData2.get("briefanzahl"));
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
    function deleteList(_event) {
        let rechnung = document.querySelectorAll("#rechnung > tr");
        let length = rechnung.length;
        while (length > 0) {
            let tableelement = document.querySelector("#rechnung > tr");
            table.removeChild(tableelement);
            length--;
        }
        totalCost = 0;
        totalPrice.innerHTML = "0,00";
    }
    async function sendOrder() {
        console.log("send order");
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        //await fetch("Haushaltshilfe.html?" + query.toString());
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        let date = document.querySelector("#date");
        let datum = date.value;
        alert("Ihre Bestellung wird bearbeitet. Sie wird am " + datum + " zu Ihnen geliefert! Sie kostet " + totalCost.toFixed(2) + " €." + responseText);
    }
})(L06_Haushaltshilfe || (L06_Haushaltshilfe = {}));
//# sourceMappingURL=Haushaltshilfe.js.map