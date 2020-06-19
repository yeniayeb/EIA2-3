"use strict";
var L09_Corona;
(function (L09_Corona) {
    class CoronaVirus {
        constructor(_position) {
            console.log("Corona constructor");
            this.position = _position;
            this.velocity = new L09_Corona.Vector(0, 0);
            //this.velocity.random(100, 200);
        }
        draw(_position) {
            L09_Corona.crc2.save();
            L09_Corona.crc2.translate(_position.x, _position.y);
            L09_Corona.crc2.beginPath();
            L09_Corona.crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            L09_Corona.crc2.fillStyle = "#020066";
            L09_Corona.crc2.fill();
            L09_Corona.crc2.closePath();
            L09_Corona.crc2.font = "30px Arial black";
            L09_Corona.crc2.strokeText("C", -12, 10);
            L09_Corona.crc2.strokeStyle = "#000000";
            L09_Corona.crc2.fillStyle = "#000000";
            for (let i = 0; i < 8; i++) {
                L09_Corona.crc2.beginPath();
                L09_Corona.crc2.rotate(0.9);
                L09_Corona.crc2.moveTo(0, 30);
                L09_Corona.crc2.lineTo(0, 40);
                L09_Corona.crc2.strokeStyle = "#000000";
                L09_Corona.crc2.lineWidth = 5;
                L09_Corona.crc2.stroke();
                L09_Corona.crc2.closePath();
                L09_Corona.crc2.beginPath();
                L09_Corona.crc2.arc(0, 46, 7, 0, 2 * Math.PI);
                L09_Corona.crc2.fillStyle = "#020066";
                L09_Corona.crc2.fill();
            }
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
    L09_Corona.CoronaVirus = CoronaVirus;
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=CoronaVirus.js.map