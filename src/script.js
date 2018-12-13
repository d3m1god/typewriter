class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = " ";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    //type method
    type() {
        //current index
        const index = this.wordIndex % this.words.length;
        //get full text
        const fullTxt = this.words[index];
        // Check if this is deleting
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
        else {
            //Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        //insert
        this.txtElement.innerHTML = `<span class = "txt">${this.txt} </span>`;
        //typespeed
        let typespeed = 300;
        if (this.isDeleting) {
            typespeed /= 2;
        }
        // After Completion of the world
        if (!this.isDeleting && this.txt === fullTxt) {
            typespeed = this.wait;
            //pauses the type
            //switch isDesete
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            typespeed = 500;
        }
        setTimeout(() => this.type(), typespeed);
    }
}

//Init on dom load
document.addEventListener('DOMContentLoadeed',init());



function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait')
    //init
    new TypeWriter(txtElement , words , wait);

}


