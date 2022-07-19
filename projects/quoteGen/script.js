const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


//show loading 

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading

function complete(){
    quoteContainer.hidden = false;
    loader.hidden= true;

}

//show newuote

function newQuote(){

    loading();
     //pick a random quote from the apiQuotes array

     const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
     //console.log(quote.author);
     console.log(authorText.textContent);

     //check if author field is blank and replace it with unknown

    if(!quote.author){
        authorText.textContent ='Unknown'
    }
    else{
        authorText.textContent = quote.author;
    }
     //check the quote length to determine styling

     if(quote.text.length>50){
        quoteText.classList.add('long-quote');
     }
     else{
        quoteText.classList.remove('long-quote');
     }
     //set quote, hide loader
     quoteText.textContent = quote.text;
     complete();
}


//Get quotes from api

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);

        apiQuotes = await response.json();

        newQuote()
        
    }
    catch(error){
        
        //catch error here
    }
}


//tweet quote

function tweetQUote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners

newQuoteBtn.addEventListener('click',newQuote);

twitterBtn.addEventListener('click',tweetQUote);

getQuotes();

