"use strict";
var L09_Corona;
(function (L09_Corona) {
    class Particle {
        constructor(_position) {
            console.log("Particle constructor");
            this.position = _position;
            this.velocity = new L09_Corona.Vector(0, 0);
            //this.velocity.random(100, 200);
        }
        draw(_position) {
            L09_Corona.crc2.save();
            L09_Corona.crc2.translate(_position.x, _position.y);
            let _i = 200;
            if (_i < 100) {
                L09_Corona.crc2.beginPath();
                L09_Corona.crc2.rotate(Math.random());
                L09_Corona.crc2.ellipse(0, 0, 12, 7, 0, 0, 2 * Math.PI);
                L09_Corona.crc2.fillStyle = "hsla(81, 100%, 58%, 0.7)";
                L09_Corona.crc2.strokeStyle = "hsla(81, 100%, 58%, 1)";
                L09_Corona.crc2.fill();
                L09_Corona.crc2.closePath();
            }
            else if (_i > 99) {
                L09_Corona.crc2.beginPath();
                L09_Corona.crc2.rotate(Math.random());
                L09_Corona.crc2.arc(0, 0, 6, 0, 2 * Math.PI);
                L09_Corona.crc2.fillStyle = "hsla(81, 100%, 58%, 0.7)";
                L09_Corona.crc2.strokeStyle = "hsla(81, 100%, 58%, 1)";
                L09_Corona.crc2.fill();
                L09_Corona.crc2.closePath();
            }
            else {
                console.log("mistake");
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
    L09_Corona.Particle = Particle;
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Particle.js.map