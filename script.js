const TIME = document.querySelector('.time'),
  DATE = document.querySelector('.date'),
  FOCUS = document.querySelector('.focus'),
  NAME = document.querySelector('.name'),
  greeting = document.querySelector('.greeting');

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
}
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
const showGreeting = () => {
    let today = new Date();
    let hour = today.getHours();
  
    if (hour < 6) {
        greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18){
        greeting.textContent = 'Good Afternoon, ';
    } else {
        greeting.textContent = 'Good Evening, ';
    }
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
const blurField = e => {
    e.target.innerText ? 
        localStorage.setItem('name', e.target.innerText) :
        getName();
};
NAME.addEventListener('click', clearField);
NAME.addEventListener('blur', blurField);
NAME.addEventListener('keydown', enterBlur);


document.addEventListener('DOMContentLoaded', () => {
    showTime();
    showDate();
    showGreeting();
    getName();
});