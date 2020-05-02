"use strict";
window.addEventListener("load", function () {
    function mixLetters(_letter) {
        let letters = _letter.split("");
        let control = letters.length;
        while (control > 0) {
            let i = Math.floor(Math.random() * control);
            control--;
            let temp = letters[control];
            letters[control] = letters[i];
            letters[i] = temp;
        }
        let length = letters.length;
        createCards(length, letters);
    }
    function createCards(_length, mixedLetters) {
        for (let help = 0; help < _length; help++) {
            let Card = document.createElement("span");
            Card.className = "card";
            Card.innerHTML = "" + mixedLetters[help];
            playground.appendChild(Card);
            Card.addEventListener("click", function () {
                checkCard(mixedLetters[], event);
            });
            Card.innerHTML = "";
        }
        function checkCard(_phrase, _event) {
            let letter = _event.target.innerHTML;
            let end = _phrase.length;
            let index = 1;
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
    _mixedLetters[index];
    string[];
});
void {
    _card, : .innerHTML = "" + _mixedLetters[index]
};
;
//# sourceMappingURL=Sequenzmemory.js.map