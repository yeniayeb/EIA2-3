namespace L09_Corona {
    export class CoronaVirus {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            console.log("Corona constructor");
            this.position = _position;
            this.velocity = new Vector(0, 0);
            //this.velocity.random(100, 200);
        }

        draw(_position: Vector): void {
            crc2.save();
            crc2.translate(_position.x, _position.y);

            crc2.beginPath();
            crc2.arc(0, 0, 30, 0, 2 * Math.PI);
            crc2.fillStyle = "#020066";
            crc2.fill();
            crc2.closePath();
            crc2.font = "30px Arial black";
            crc2.strokeText("C", -12, 10);
            crc2.strokeStyle = "#000000";
            crc2.fillStyle = "#000000";
            for (let i: number = 0; i < 8; i++) {
                crc2.beginPath();
                crc2.rotate(0.9);
                crc2.moveTo(0, 30);
                crc2.lineTo(0, 40);
                crc2.strokeStyle = "#000000";
                crc2.lineWidth = 5;
                crc2.stroke();
                crc2.closePath();
                crc2.beginPath();
                crc2.arc(0, 46, 7, 0, 2 * Math.PI);
                crc2.fillStyle = "#020066";
                crc2.fill();
            }
            crc2.restore();
        }

        move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
}