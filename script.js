const TIME = document.querySelector('.time'),
  DATE = document.querySelector('.date'),
  FOCUS = document.querySelector('.focus'),
  NAME = document.querySelector('.name'),
  greeting = document.querySelector('.greeting');

// Add Time
const addZero = n => {
    return ( parseInt(n, 10) < 10 ? '0' : '') + n;
}
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
}

document.addEventListener('DOMContentLoaded', () => {
    showTime();
    showDate();
    getName();
});