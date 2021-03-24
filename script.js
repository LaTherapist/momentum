const TIME = document.querySelector('.time'),
  DATE = document.querySelector('.date'),
  FOCUS = document.querySelector('.focus'),
  NAME = document.querySelector('.name'),
  NEXT = document.querySelector('.next'),
  GREETING = document.querySelector('.greeting'),
  QUOTE = document.querySelector('.quote'),
  quoteBTN = document.querySelector('.quote__btn'),
  quoteAuthor = document.querySelector('.quote__author');
  
// Return Hours
const getHour = new Date().getHours(); 
// Add Time
const addZero = n => {
    return ( parseInt(n, 10) < 10 ? '0' : '') + n;
};
const showTime = () => {
    const today = new Date();

    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    TIME.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    setTimeout(showTime, 1000);
};
// Add Date
const showDate = () => {
    const today = new Date();
    let format = today.toLocaleDateString( 'en-GB', {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
    });
    DATE.innerHTML = `${format}`;
};
// Add Greeting
const dayTime = hour => {
    return hour < 6  ? 'night' :
           hour < 12 ? 'morning' :
           hour < 18 ? 'afternoon' : 'evening';
}
const showGreeting = () => {
    GREETING.textContent = `Good ${dayTime(getHour)}, `;
};
// Add Name
const clearField = e => {
    e.target.innerText = '';
};
const getName = () => {
    if (localStorage.getItem('name')) {  
        NAME.textContent = localStorage.getItem('name');
    } else {
        NAME.textContent = '[Enter Name]';
    }
};
const enterBlur = e => {
    if (e.code === 'Enter') {
        e.target.blur();
    }
};
const blurName = e => {
    e.target.innerText.trim() ? 
        localStorage.setItem('name', e.target.innerText) :
        getName();
};
NAME.addEventListener('click', clearField);
NAME.addEventListener('blur', blurName);
NAME.addEventListener('keydown', enterBlur);
// Add Focus
const getFocus = () => {
    if (localStorage.getItem('focus')) {  
        FOCUS.textContent = localStorage.getItem('focus');
    } else {
        FOCUS.textContent = '[Enter Focus]';
    }
};
const blurFocus = e => {
    e.target.innerText.trim() ? 
        localStorage.setItem('focus', e.target.innerText) :
        getFocus();
};
FOCUS.addEventListener('click', clearField);
FOCUS.addEventListener('blur', blurFocus);
FOCUS.addEventListener('keydown', enterBlur);
// Pick a random num
const random = (min, max) => {
    return Math.floor(min + Math.random() * (max + 1 - min));
};
// Change BG
let randomArr = Array.from({length: 24}, () => random(1, 20));

const changeBG = hour => {
    let today = new Date();

    hour = hour % 24;
    let timeOfDay = dayTime(hour);
    if (hour >= 12 && hour < 18) timeOfDay = 'day';

    let img = new Image()
        base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/',
        number = addZero(randomArr[hour]),
        source = `${base}${timeOfDay}/${number}.jpg`;
    
    img.src = source;
    img.onload = () => {
        document.body.style.background = `url(${source})`;
    };

    let min = today.getMinutes() * 60 * 1000;
    let sec = today.getSeconds() * 1000;
    setTimeout(changeBG, 60*60*1000 - min - sec);
};
// Button BG-changer 
let counter = 1;

const nextBG = () => {
    NEXT.disabled = true;
    changeBG( getHour + counter);
    counter++;
    
    setTimeout(() => NEXT.disabled = false, 1000);
}
NEXT.addEventListener('click', nextBG);
// Add Quote
const loadQuote = async () => {
    let url = 'https://type.fit/api/quotes';
    let result = await fetch(url);
    let data = await result.json();

    localStorage.setItem('quotes', JSON.stringify(data));
};
const getQuote = async () => {
    if (localStorage.getItem('quotes')) {
        let data = JSON.parse(localStorage.getItem('quotes'));
        let randomQuote = random(0, data.length - 1);
        
        QUOTE.textContent = `\"${data[randomQuote].text}\"`;
        quoteAuthor.textContent = data[randomQuote].author;
    } else {
        await loadQuote();
        getQuote();
    }
};
quoteBTN.addEventListener('click', getQuote);

document.addEventListener('DOMContentLoaded', () => {
    showTime();
    showDate();
    showGreeting();
    getName();
    getFocus();
    changeBG(getHour);
    getQuote();
});