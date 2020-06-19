"use strict";
var L09_Corona;
(function (L09_Corona) {
    L09_Corona.canvas = document.querySelector("canvas");
    /* screen size of the end device, so it can be changed quickly */
    L09_Corona.width = 720;
    L09_Corona.heigth = 360;
    let cells = [];
    let coronaViruses = [];
    let antibodies = [];
    let killerCells = [];
    let particles = [];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        console.log("test");
        if (!L09_Corona.canvas)
            return;
        L09_Corona.crc2 = L09_Corona.canvas.getContext("2d");
        preparation();
        drawBackground(L09_Corona.canvas);
        positions();
    }
    function preparation() {
        L09_Corona.crc2.fillStyle = "hsla(358, 56%, 65%, 0.3)";
        L09_Corona.crc2.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    function drawBackground(_canvas) {
        console.log("background");
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 80;
        pattern.canvas.height = 30;
        pattern.fillStyle = "hsla(358, 56%, 65%, 0.4)";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        //lil help     x   y
        pattern.moveTo(0, 15);
        pattern.lineTo(10, 15);
        pattern.lineTo(30, 0);
        pattern.lineTo(50, 0);
        pattern.lineTo(70, 9);
        pattern.lineTo(70, 15);
        pattern.lineTo(80, 15);
        pattern.lineTo(70, 15);
        pattern.lineTo(70, 21);
        pattern.lineTo(50, 30);
        pattern.lineTo(30, 30);
        pattern.lineTo(10, 15);
        pattern.strokeStyle = "#787878";
        pattern.stroke();
        pattern.closePath();
        pattern.moveTo(30, 15);
        pattern.lineTo(50, 15);
        pattern.strokeStyle = "#787878";
        pattern.stroke();
        pattern.closePath();
        L09_Corona.crc2.fillStyle = L09_Corona.crc2.createPattern(pattern.canvas, "repeat");
        L09_Corona.crc2.fillRect(0, 0, _canvas.width, _canvas.height);
    }
    function positions() {
        //Cells
        for (let i = 0; i < 35; i++) {
            let x;
            let y;
            x = (Math.random() * (L09_Corona.width / 2));
            y = (L09_Corona.heigth / 2) + ((L09_Corona.heigth / 2) * Math.random());
            let position = new L09_Corona.Vector(x, y);
            let bodycell = new L09_Corona.Cell(position);
            bodycell.draw(position);
            cells.push(bodycell);
        }
        //Corona - Viren (mind. 5)
        for (let i = 0; i < 6; i++) {
            let x;
            let y;
            x = (Math.random() * (L09_Corona.width / 2));
            y = ((L09_Corona.heigth / 2) * Math.random());
            let position = new L09_Corona.Vector(x, y);
            let virus = new L09_Corona.CoronaVirus(position);
            virus.draw(position);
            coronaViruses.push(virus);
        }
        //Antibodies
        for (let i = 0; i < 15; i++) {
            let x;
            let y;
            x = (L09_Corona.width / 2) + (Math.random() * (L09_Corona.width / 2));
            y = (L09_Corona.heigth / 2) + ((L09_Corona.heigth / 2) * Math.random());
            let position = new L09_Corona.Vector(x, y);
            let antibody = new L09_Corona.Antibody(position);
            antibody.draw(position);
            antibodies.push(antibody);
        }
        //Killer Cells
        for (let i = 0; i < 12; i++) {
            let x;
            let y;
            x = (L09_Corona.width / 2) + (Math.random() * (L09_Corona.width / 2));
            y = ((L09_Corona.heigth / 2) * Math.random());
            let position = new L09_Corona.Vector(x, y);
            let killerCell = new L09_Corona.KillerCell(position);
            killerCell.draw(position);
            killerCells.push(killerCell);
        }
        //Particles
        for (let i = 0; i < 200; i++) {
            let x;
            let y;
            x = (Math.random() * L09_Corona.width);
            y = (L09_Corona.heigth * Math.random());
            let position = new L09_Corona.Vector(x, y);
            let particle = new L09_Corona.Particle(position);
            particle.draw(position);
            particles.push(particle);
        }
    }
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=main.js.map