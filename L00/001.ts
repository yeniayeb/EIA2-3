/*Variablen */
let v: number = 1;
v = v + 1;
console.log(v);

/*Datentypen */
let w: string = "1";
w = w + 1;
console.log(w);

let x: boolean = true;
//x = x + 1;
console.log(v);

/*Explizite Typisierung*/
let y: number = 1;
//y = y + "1";
console.log(v);

/*Assoziatives Array */
interface MapStringToBoolean {
    [key: string]: boolean;
}
let a: MapStringToBoolean = { "wert1": true, "wert2": false };

interface VectorWithMeaning {
    x: number;
    y: number;
    meaning: string;
}
let vector: VectorWithMeaning = { x: 12.4, y: -7.2, meaning: "Ortsvektor" };

/*Werte vs. Referenzen*/
let g: number;
let h: number;
g = 1;
h = 6;
console.log(g, h);
h = g;
console.log(g, h);
g = 2;
console.log(g, h);

let i: number[] = [7, 9, 3];
let k: number[] = [];
console.log(i, k);
k = i;
console.log(i, k);
i[1] = 5;
console.log(i, k);
