namespace L09_Corona {
    export class Cell {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            console.log("Cell constructor");
            this.position = _position;
            this.velocity = new Vector(0, 0);
            //this.velocity.random(100, 200);
        }

        draw(_position: Vector): void {
            crc2.save();
            crc2.translate(_position.x, _position.y);

            crc2.beginPath();
            crc2.rotate(Math.random());
            crc2.ellipse(0, 0, 20, 10, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#00a308";
            crc2.fill();
            crc2.closePath();
            //nucleus
            crc2.beginPath();
            crc2.arc(-5, 0, 4, 0, 2 * Math.PI);
            crc2.fillStyle = "#005204";
            crc2.fill();
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