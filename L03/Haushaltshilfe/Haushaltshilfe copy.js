"use strict";
var Haushaltshilfe;
(function (Haushaltshilfe) {
    window.addEventListener("load", handleLoad);
    /* Variablen */
    let totalCost = 0;
    let form = document.querySelector("#form");
    let task = document.querySelector("#task");
    let article = document.querySelector("#grocery");
    let household = document.querySelector("#household");
    let money = document.querySelector("money");
    let postoffice = document.querySelector("#postoffice");
    let payment = document.querySelector("#Zahlen");
    let tip = document.querySelector("tipdiv");
    let totalPrice = document.querySelector("#betrag");
    let proof = document.querySelector("#Angaben");
    let submit = document.querySelector("#end");
    function handleLoad() {
        // Event-Listener auf alle Buttons, nachdem alles geladen wurde
        form.addEventListener("change", handleChange);
        tip.addEventListener("change", handleTip);
        submit.addEventListener("click", BestellungAufgeben);
    }
    function handleChange(_event) {
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let wahl = "[value='" + entry[1] + "']";
            let item = document.querySelector(wahl);
            let aufgaben = String(item.getAttribute("value"));
            if (aufgaben == "Einkaufen") {
                article.disabled = false;
                household.disabled = true;
                money.disabled = true;
                postoffice.disabled = true;
            }
            else if (aufgaben == "Haushaltsarbeit") {
                article.disabled = true;
                household.disabled = false;
                money.disabled = true;
                postoffice.disabled = true;
            }
            else if (aufgaben == "Bank") {
                article.disabled = true;
                household.disabled = true;
                money.disabled = false;
                postoffice.disabled = true;
            }
            else if (aufgaben == "Post") {
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
            let table = document.getElementById("rechnung");
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
                        let newfield = document.createElement("div");
                        newfield.classList.add("einkaufen");
                        break;
                    case "money":
                        let money = String(item.getAttribute("value"));
                        if (money == "abheben") {
                            let summe = Number(formData2.get("geldanzahl"));
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
                    case "household":
                        let itemCost = Number(item.getAttribute("price"));
                        tdartikel.innerHTML = "" + entry[1];
                        tdanzahl.innerHTML = "" + itemCost;
                        row.appendChild(tdartikel);
                        row.appendChild(tdanzahl);
                        row.appendChild(tdeinheit);
                        totalCost += itemCost;
                        break;
                    case "postoffice":
                        let postCost = Number(item.getAttribute("price"));
                        let postmenge = Number(formData2.get("anzahl"));
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
            total.innerHTML = totalPrice;
        }
        function BestellungAufgeben(_event) {
            let date = document.querySelector("#date");
            let datum = date.value;
            alert("Ihre Bestellung wird bearbeitet. Sie wird am " + datum + " zu Ihnen geliefert!");
        }
    }
})(Haushaltshilfe || (Haushaltshilfe = {}));
//# sourceMappingURL=Haushaltshilfe copy.js.map