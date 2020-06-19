namespace L09_Corona {

    export let crc2: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    /* screen size of the end device, so it can be changed quickly */
    export let width: number = 720;
    export let heigth: number = 360;

    let cells: Cell[] = [];
    let coronaViruses: CoronaVirus[] = [];
    let antibodies: Antibody[] = [];
    let killerCells: KillerCell[] = [];
    let particles: Particle[] = [];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        console.log("test");
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
            let position: Vector = new Vector(x, y);
            let bodycell: Cell = new Cell(position);
            bodycell.draw(position);
            cells.push(bodycell);
        }
        //Corona - Viren (mind. 5)
        for (let i: number = 0; i < 6; i++) {
            let x: number;
            let y: number;
            x = (Math.random() * (width / 2));
            y = ((heigth / 2) * Math.random());
            let position: Vector = new Vector(x, y);
            let virus: CoronaVirus = new CoronaVirus(position);
            virus.draw(position);
            coronaViruses.push(virus);
        }
        //Antibodies
        for (let i: number = 0; i < 15; i++) {
            let x: number;
            let y: number;
            x = (width / 2) + (Math.random() * (width / 2));
            y = (heigth / 2) + ((heigth / 2) * Math.random());
            let position: Vector = new Vector(x, y);
            let antibody: Antibody = new Antibody(position);
            antibody.draw(position);
            antibodies.push(antibody);
        }
        //Killer Cells
        for (let i: number = 0; i < 12; i++) {
            let x: number;
            let y: number;
            x = (width / 2) + (Math.random() * (width / 2));
            y = ((heigth / 2) * Math.random());
            let position: Vector = new Vector(x, y);
            let killerCell: KillerCell = new KillerCell(position);
            killerCell.draw(position);
            killerCells.push(killerCell);
        }
        //Particles
        for (let i: number = 0; i < 200; i++) {
            let x: number;
            let y: number;
            x = (Math.random() * width);
            y = (heigth * Math.random());
            let position: Vector = new Vector(x, y);
            let particle: Particle = new Particle(position);
            particle.draw(position);
            particles.push(particle);
        }

    }
}