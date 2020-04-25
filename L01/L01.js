"use strict";
var Boxes;
(function (Boxes) {
    let n = 5;
    let color;
    let x = 0;
    let y = 0;
    for (let i = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50;
        x = (x + 170) % 400;
        switch (i) {
            case 0:
                color = "#ff0000"; /* rot */
                break;
            case 1:
            case 4:
                color = "#00ff00"; /* grün */
                break;
            case 3:
                continue; //springt zurück an Schleifenanfang
            default:
                color = "#0000ff"; /* blau */
        }
        for (let size of ["big", "medium", "small"]) {
            createBox(color, x, y, size);
            if (i == 4)
                break;
        }
    }
    function createBox(_color, _x, _y, _size) {
        let div = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.left = _x + "px";
        div.style.top = _y + "px";
    }
})(Boxes || (Boxes = {}));
//# sourceMappingURL=L01.js.map