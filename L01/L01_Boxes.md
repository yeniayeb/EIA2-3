# Aufgabe
1. Erstelle eine Tracetable zu untenstehendem TypeScript-Code.
2. Stelle die zu erwartende Ausgabe grafisch auf Papier dar.
3. Bringe schließlich den Code zum Laufen und überprüfe das Ergebnis.
4. Verfolge den Verlauf im Debugger. Bestimme Abweichungen zu deiner Erwartung und erkläre diese.
5. Versuche ein Aktivitätsdiagramm für den Programmablauf zu konstruieren. Nutze dafür das [EIA2-Booklet](https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X01_Appendix/EIA2-Inverted_Booklet.pdf) sowie das Beispiel aus der ersten Aufgabe.

## TypeScript
```typescript
namespace Boxes {
    let n: number = 5;
    let color: string;
    let x: number = 0;
    let y: number = 0;

    for (let i: number = 0; i < n; i++) {
        y += (i == 2) ? 20 : 50;
        x = (x + 170) % 400;
        switch (i) {
            case 0:
                color = "#ff0000";
                break;
            case 1:
            case 4:
                color = "#00ff00";
                break;
            case 3:
                continue;
            default:
                color = "#0000ff";
        }
        
        for (let size of ["big", "medium", "small"]) {
            createBox(color, x, y, size);
            if (i == 4)
                break;
        }
    }


    function createBox(_color: string, _x: number, _y: number, _size: string): void {
        let div: HTMLDivElement = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.left = _x + "px";
        div.style.top = _y + "px";
    }
}
```

## CSS
```css
div {
    border: thick solid black;
    position: absolute;
}

.big {
    width: 50px;
    height: 50px;
}
.medium {
    width: 30px;
    height: 30px;
}
.small {
    width: 10px;
    height: 10px;
}
```