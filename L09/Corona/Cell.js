"use strict";
var L09_Corona;
(function (L09_Corona) {
    class Cell {
        constructor(_position) {
            console.log("Cell constructor");
            this.position = _position;
            this.velocity = new L09_Corona.Vector(0, 0);
            //this.velocity.random(100, 200);
        }
        draw(_position) {
            L09_Corona.crc2.save();
            L09_Corona.crc2.translate(_position.x, _position.y);
            L09_Corona.crc2.beginPath();
            L09_Corona.crc2.rotate(Math.random());
            L09_Corona.crc2.ellipse(0, 0, 20, 10, 0, 0, 2 * Math.PI);
            L09_Corona.crc2.fillStyle = "#00a308";
            L09_Corona.crc2.fill();
            L09_Corona.crc2.closePath();
            //nucleus
            L09_Corona.crc2.beginPath();
            L09_Corona.crc2.arc(-5, 0, 4, 0, 2 * Math.PI);
            L09_Corona.crc2.fillStyle = "#005204";
            L09_Corona.crc2.fill();
            L09_Corona.crc2.closePath();
            L09_Corona.crc2.restore();
        }
        move(_timeslice) {
            let offset = new L09_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L09_Corona.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09_Corona.crc2.canvas.height;
            if (this.position.x > L09_Corona.crc2.canvas.width)
                this.position.x -= L09_Corona.crc2.canvas.width;
            if (this.position.y > L09_Corona.crc2.canvas.height)
                this.position.y -= L09_Corona.crc2.canvas.height;
        }
    }
    L09_Corona.Cell = Cell;
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Cell.js.map