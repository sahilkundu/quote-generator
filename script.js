const mainContainer = document.getElementById('main-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const tbtn = document.getElementById('btn1');
const qbtn = document.getElementById('btn2');
const loader = document.getElementById('loader');
const cbtn = document.getElementById('btn3');
function loading() {
    loader.hidden = false;
    mainContainer.hidden = true;
};
function complete() {
    if (loader.hidden === false) {
        mainContainer.hidden = false;
        loader.hidden = true;
    }
};

async function getQuote() {
    loading();
    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown'
        } else {
            quoteAuthor.innerText = data.quoteAuthor
        }
        if (data.quoteText.length > 50) {
            quoteText.classList.add('quote-length')
        }
        else {
            quoteText.classList.remove('quote-length')
        }
        quoteText.innerText = data.quoteText;
        complete();
    } catch (error) {
        loading();
        getQuote();

    }
};



function tweetQuote() {
    const tQuote = quoteText.innerText;
    const tAuthor = quoteAuthor.innerText;
    const tUrl = `https://twitter.com/intent/tweet?text=${tQuote} : ${tAuthor}`;
    window.open(tUrl, '_blank');
};

function cpy(){
    const cpyQuote = quoteText.innerText+" "+quoteAuthor.innerText;
    navigator.clipboard.writeText(cpyQuote);
    alert(`Quote Copied : ${cpyQuote}`);

};

tbtn.addEventListener('click', getQuote);
qbtn.addEventListener('click', tweetQuote);
cbtn.addEventListener('click',cpy);
getQuote();




