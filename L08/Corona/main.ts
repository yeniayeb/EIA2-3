namespace L08_Corona {
    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let width: number = 720;
    let heigth: number = 360;

    function handleLoad(): void {
        console.log("test");
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        preparation();
        drawBackground(canvas);
        positions();
    }

    function preparation(): void {
        crc2.fillStyle = "hsla(358, 56%, 65%, 0.3)";
        crc2.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
    function drawBackground(_canvas: HTMLCanvasElement): void {
        console.log("background");
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
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

        crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, _canvas.width, _canvas.height);
    }

    function positions(): void {
        //Cells
        for (let i: number = 0; i < 35; i++) {
            let x: number;
            let y: number;
            x = (Math.random() * (width / 2));
            y = (heigth / 2) + ((heigth / 2) * Math.random());
            createCell(x, y);
        }
        //Corona - Viren (mind. 5)
        for (let i: number = 0; i < 6; i++) {
            let x: number;
            let y: number;
            x = (Math.random() * (width / 2));
            y = ((heigth / 2) * Math.random());
            createCorona(x, y);
        }
        //Antibodies
        for (let i: number = 0; i < 15; i++) {
            let x: number;
            let y: number;
            x = (width / 2) + (Math.random() * (width / 2));
            y = (heigth / 2) + ((heigth / 2) * Math.random());
            createAntibody(x, y);
        }
        //Killer Cells
        for (let i: number = 0; i < 12; i++) {
            let x: number;
            let y: number;
            x = (width / 2) + (Math.random() * (width / 2));
            y = ((heigth / 2) * Math.random());
            createKillerCell(x, y);
        }
        //Particles
        for (let i: number = 0; i < 200; i++) {
            let x: number;
            let y: number;
            x = (Math.random() * width);
            y = (heigth * Math.random());
            createParticle(x, y, i);
        }

    }

    function createCell(_x: number, _y: number): void {
        console.log("cell");
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);

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

    function createCorona(_x: number, _y: number): void {
        console.log("coroni");
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);

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

    function createAntibody(_x: number, _y: number): void {
        console.log("antibody");
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);

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

    function createKillerCell(_x: number, _y: number): void {
        console.log("killer cell");
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);

        crc2.beginPath();
        crc2.rotate(Math.random());
        crc2.ellipse(0, 0, 30, 15, 0, 0, 2 * Math.PI);
        crc2.fillStyle = "#cc0000";
        crc2.fill();
        crc2.closePath();
        crc2.font = "10px Arial black";
        crc2.strokeText("K", 15, 4);
        crc2.strokeStyle = "#000000";
        crc2.fillStyle = "#000000";
        //nucleus
        crc2.beginPath();
        crc2.arc(-5, 0, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "#000000";
        crc2.fill();
        crc2.closePath();

        crc2.restore();
    }

    function createParticle(_x: number, _y: number, _i: number): void {
        console.log("particle");
        crc2.restore();
        crc2.save();
        crc2.translate(_x, _y);

        if (_i < 100) {
            crc2.beginPath();
            crc2.rotate(Math.random());
            crc2.ellipse(0, 0, 12, 7, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "hsla(81, 100%, 58%, 0.7)";
            crc2.strokeStyle = "hsla(81, 100%, 58%, 1)";
            crc2.fill();
            crc2.closePath();
        } else if (_i > 99) {
            crc2.beginPath();
            crc2.rotate(Math.random());
            crc2.arc(0, 0, 6, 0, 2 * Math.PI);
            crc2.fillStyle = "hsla(81, 100%, 58%, 0.7)";
            crc2.strokeStyle = "hsla(81, 100%, 58%, 1)";
            crc2.fill();
            crc2.closePath();
        } else {
            console.log("mistake");
        }
        crc2.restore();
    }
}