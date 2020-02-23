
let brainIterator = 0;
let braincards;

let flashIterator = 0;
let flashcards;

let pongIterator = 0;
let pongcards;

function init(){
    readTextFile('flash.txt');
    readTextFile('burningbrain.txt');
    readTextFile('pingpong.txt');
}

function goBack(){
    document.querySelector("#bigcontainer").style.zIndex = 0;
    document.querySelector("#bigcard").style.zIndex = 0;
}

function showCard(type){

    document.querySelector("#bigcontainer").style.zIndex = 3;
    document.querySelector("#bigcard").style.zIndex = 4;

    switch(type){
        case 'flash':
                document.querySelector("#cardText").innerHTML = flashcards[flashIterator++];
            break;
        case 'burningbrain':
                document.querySelector("#cardText").innerHTML = braincards[brainIterator++];
            break;
        case 'pingpong':
                document.querySelector("#cardText").innerHTML = pongcards[pongIterator++];
            break;
    }

    if(flashIterator == flashcards.length)
        shuffleCards('flash');
    

    if(flashIterator == flashcards.length)
        shuffleCards('burningbrain');
    

    if(flashIterator == flashcards.length)
        shuffleCards('pingpong');
    
}

function shuffleCards(deck){
    switch(deck){
        case 'flash':
            flashIterator = 0;
            flashcards = shuffle(flashcards);
            break;
        case 'burningbrain':
            brainIterator = 0;
            braincards = shuffle(braincards);
            break;
        case 'pingpong':
            pongIterator = 0;
            pongcards = shuffle(pongcards);
            break;
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                setCards(file, allText);
                shuffleCards(file.split('.')[0]);
            }
        }
    }
    rawFile.send(null);
}

function setCards(type, text){
    let textArray = text.split('\n');
    switch(type){
        case 'flash.txt':
            flashcards = textArray;
            break;
        case 'burningbrain.txt':
            braincards = textArray;
            break;
        case 'pingpong.txt':
            pongcards = textArray;
            break;
    }
}
