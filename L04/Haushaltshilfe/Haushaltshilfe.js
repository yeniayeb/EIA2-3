"use strict";
var L04_Haushaltshilfe;
(function (L04_Haushaltshilfe) {
    /* Variablen */
    let totalCost = 0;
    let aeinkaufen = document.getElementById("A_einkaufen");
    let ahaushalt = document.getElementById("A_haushaltsarbeit");
    let abank = document.getElementById("A_bank");
    let apost = document.getElementById("A_post");
    //let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#formular1");
    let article = document.querySelector("#grocery");
    let household = document.querySelector("#household");
    let money = document.querySelector("#money");
    let postoffice = document.querySelector("#postoffice");
    //let payment: HTMLInputElement = <HTMLInputElement>document.querySelector("#Zahlen");
    let table = document.getElementById("rechnung");
    let totalPrice = document.querySelector("#betrag");
    let proof = document.querySelector("#Angaben");
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("test");
        L04_Haushaltshilfe.generateContent(L04_Haushaltshilfe.data);
        L04_Haushaltshilfe.generateExtra(L04_Haushaltshilfe.detail);
        // Event-Listeners
        let getfood = document.querySelector("#getfood");
        getfood.addEventListener("click", displayOrder);
        let gethelp = document.querySelector("#gethelp");
        gethelp.addEventListener("click", displayOrder);
        let getmoney = document.querySelector("#getmoney");
        getmoney.addEventListener("click", displayOrder);
        let getpost = document.querySelector("#getpost");
        getpost.addEventListener("click", displayOrder);
        let tip = document.querySelector("#gettip");
        tip.addEventListener("click", handleTip);
        let confirm = document.querySelector("#confirm");
        confirm.addEventListener("click", handleTask);
        let submit = document.querySelector("#end");
        submit.addEventListener("click", BestellungAufgeben);
    }
    function handleTask() {
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
            switch (entry[0]) {
                case "article":
                    let itemPrice = Number(item.getAttribute("price"));
                    let menge = Number(formData2.get("#anzahl"));
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
                    let newfield = document.createElement("div");
                    newfield.classList.add("einkaufen");
                    break;
                case "geld":
                    let money = String(item.getAttribute("value"));
                    if (money == "abheben") {
                        let summe = Number(formData2.get("#geldanzahl"));
                        tdartikel.innerHTML = "" + money;
                        tdanzahl.innerHTML = "" + summe;
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        totalCost += summe;
                        tdartikel.innerHTML = "Grundgebühr Bank";
                        tdanzahl.innerHTML = "5";
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        totalCost += 5;
                        break;
                    }
                    else if (money == "einzahlen") {
                        tdartikel.innerHTML = "" + money;
                        tdanzahl.innerHTML = "" + 5;
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        totalCost += 5;
                        break;
                    }
                    break;
                case "chores":
                    let householdCost = Number(item.getAttribute("price"));
                    let bankmenge = Number(formData2.get("#homeanzahl"));
                    householdCost = bankmenge * householdCost;
                    tdartikel.innerHTML = "" + entry[1];
                    tdanzahl.innerHTML = "" + householdCost;
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    totalCost += householdCost;
                    break;
                case "sendung":
                    let postCost = Number(item.getAttribute("price"));
                    let postmenge = Number(formData2.get("#briefanzahl"));
                    postCost = postmenge * postCost;
                    tdartikel.innerHTML = "0" + entry[1];
                    tdanzahl.innerHTML = "" + postCost;
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    totalCost += postCost;
                    break;
            }
            totalPrice.innerHTML = "";
            totalPrice.innerHTML = totalCost.toFixed(2);
        }
    }
    function handleTip() {
        let tip = document.querySelector("#tipamount");
        let amount = Number(tip.getAttribute("value"));
        let total = totalCost + amount;
        totalPrice.innerHTML = ""; //toFixed?
        totalPrice.innerHTML = total.toFixed(2);
    }
    function BestellungAufgeben(_event) {
        let date = document.querySelector("#date");
        let datum = date.value;
        if (proof.checked == true) {
            alert("Ihre Bestellung wird bearbeitet. Sie wird am " + datum + " zu Ihnen geliefert!");
        }
        else {
            proof.classList.add("mark");
        }
    }
})(L04_Haushaltshilfe || (L04_Haushaltshilfe = {}));
//# sourceMappingURL=Haushaltshilfe.js.map