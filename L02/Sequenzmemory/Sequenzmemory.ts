/* namespace L02_Memory {

    window.addEventListener("load", mixLetters);

    function mixLetters(_letter: string): void {
        let letters: string[] = _letter.split("");
        let control: number = letters.length;

        while (control > 0) {
            let i: number = Math.floor(Math.random() * control);
            control--;
            let temp: string = letters[control];
            letters[control] = letters[i];
            letters[i] = temp;
        }

        let length: number = letters.length;
        createCards(length, letters);
    }


    function createCards(_length: number, mixedLetters: string[]): void {

        for (let help: number = 0; help < _length; help++) {

            let Card: HTMLSpanElement = document.createElement("span");

            Card.className = "card";
            Card.innerHTML = "" + mixedLetters[help];
            playground.appendChild(Card);

            Card.addEventListener("click", function (): void {
                checkCard(mixedLetters[], event);
            });
            Card.innerHTML = "";

        }


        function checkCard(_phrase: string, _event: MouseEvent): void {

            let letter = _event.target.innerHTML;
            let end: number = _phrase.length;
            let index: number = 1;

            if (index == end) {
                //.innerHTML = "YOU WIN!"
            }

            if (letter == _phrase[index]) {
                _event.target.innerHTML = "" + _phrase[index];
                index++;
            }
            else {
                //.innerHTML = "Game Over!"
            }
        }
    }

    function Hint(_card: HTMLSpanElement; _mixedLetters[index]: string[]): void {
        _card.innerHTML = "" + _mixedLetters[index];
    }
} */