namespace L09_Corona {
    export class Antibody {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            console.log("Antibody constructor");
            this.position = _position;
            this.velocity = new Vector(0, 0);
            //this.velocity.random(100, 200);
        }

        draw(_position: Vector): void {
            crc2.save();
            crc2.translate(_position.x, _position.y);

            crc2.beginPath();
            crc2.rotate(Math.random());
            crc2.moveTo(0, 20);
            crc2.lineTo(30, 20);
            crc2.lineTo(50, 5);
            crc2.moveTo(30, 20);
            crc2.lineTo(50, 35);
            crc2.strokeStyle = "#000000";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.closePath();

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