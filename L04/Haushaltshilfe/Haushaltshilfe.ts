namespace L04_Haushaltshilfe {
    /* Variablen */
    let totalCost: number = 0;
    let aeinkaufen: HTMLInputElement = <HTMLInputElement>document.getElementById("A_einkaufen");
    let ahaushalt: HTMLInputElement = <HTMLInputElement>document.getElementById("A_haushaltsarbeit");
    let abank: HTMLInputElement = <HTMLInputElement>document.getElementById("A_bank");
    let apost: HTMLInputElement = <HTMLInputElement>document.getElementById("A_post");
    //let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#formular1");
    let article: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#grocery");
    let household: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#household");
    let money: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#money");
    let postoffice: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#postoffice");
    //let payment: HTMLInputElement = <HTMLInputElement>document.querySelector("#Zahlen");
    let table: HTMLDivElement = <HTMLDivElement>document.getElementById("rechnung");
    let totalPrice: HTMLElement = <HTMLElement>document.querySelector("#betrag");
    let proof: HTMLInputElement = <HTMLInputElement>document.querySelector("#Angaben");

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

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
        let tip: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#gettip");
        tip.addEventListener("click", handleTip);

        let confirm: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#confirm");
        confirm.addEventListener("click", handleTask);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#end");
        submit.addEventListener("click", BestellungAufgeben);

    }

    function handleTask(): void {
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


            switch (entry[0]) {
                case "article":
                    let itemPrice: number = Number(item.getAttribute("price"));
                    let menge: number = Number(formData2.get("#anzahl"));
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
                    let newfield: HTMLElement = document.createElement("div");
                    newfield.classList.add("einkaufen");
                    break;

                case "geld":
                    let money: string = String(item.getAttribute("value"));
                    if (money == "abheben") {
                        let summe: number = Number(formData2.get("#geldanzahl"));
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
                    let householdCost: number = Number(item.getAttribute("price"));
                    let bankmenge: number = Number(formData2.get("#homeanzahl"));
                    householdCost = bankmenge * householdCost;
                    tdartikel.innerHTML = "" + entry[1];
                    tdanzahl.innerHTML = "" + householdCost;
                    row.appendChild(tdartikel);
                    row.appendChild(tdanzahl);
                    row.appendChild(tdeinheit);
                    totalCost += householdCost;
                    break;

                case "sendung":
                    let postCost: number = Number(item.getAttribute("price"));
                    let postmenge: number = Number(formData2.get("#briefanzahl"));
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

    function handleTip(): void {
        let tip: HTMLInputElement = <HTMLInputElement>document.querySelector("#tipamount");
        let amount: number = Number(tip.getAttribute("value"));
        let total: number = totalCost + amount;
        totalPrice.innerHTML = ""; //toFixed?
        totalPrice.innerHTML = total.toFixed(2);
    }

    function BestellungAufgeben(_event: Event): void {
        let date: HTMLInputElement = <HTMLInputElement>document.querySelector("#date");
        let datum: string = date.value;
        if (proof.checked == true) {
            alert("Ihre Bestellung wird bearbeitet. Sie wird am " + datum + " zu Ihnen geliefert!");
        }
        else {
            proof.classList.add("mark");
        }
    }

}

