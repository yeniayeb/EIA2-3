"use strict";
/*Variablen */
let v = 1;
v = v + 1;
console.log(v);
/*Datentypen */
let w = "1";
w = w + 1;
console.log(w);
let x = true;
//x = x + 1;
console.log(v);
/*Explizite Typisierung*/
let y = 1;
//y = y + "1";
console.log(v);
let a = { "wert1": true, "wert2": false };
let vector = { x: 12.4, y: -7.2, meaning: "Ortsvektor" };
/*Werte vs. Referenzen*/
let g;
let h;
g = 1;
h = 6;
console.log(g, h);
h = g;
console.log(g, h);
g = 2;
console.log(g, h);
let i = [7, 9, 3];
let k = [];
console.log(i, k);
k = i;
console.log(i, k);
i[1] = 5;
console.log(i, k);
//# sourceMappingURL=001.js.map