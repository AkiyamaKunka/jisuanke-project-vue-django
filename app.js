const carryBitTime = 60;
const maximumHour = 100;
const secondUnit = 1000;

let second, minute, hour;
let finishUpdate = false;
let stopUpdate = false;


const returnInitState = () => {
    setAppear('hour-box')
    setAppear('minute-box')
    setAppear('second-box')
    setAppear('countup')
    setAppear('countdown')


    setDisappear('clear')
    setDisappear('restart')
    setDisappear('hint')

}

const initState = () => {
    setDisappear('hour-box')
    setDisappear('minute-box')
    setDisappear('second-box')
    setDisappear('countup')
    setDisappear('countdown')

    setAppear('clear')
    setAppear('restart')
    setAppear('hint')
    setAppear('pause')

}

const pauseHandler = () => {
    setAppear('resume')
    setDisappear('pause')
    stopUpdate = true;
}

const resumeHandler = () => {
    setAppear('pause')
    setDisappear('resume')
    stopUpdate = false;
}

const initHandler = (event) => {
    initState()
    setZeroTime()
    createCounter()
}

const clearCountHandler = () => {
    setZeroTime()
    finishUpdate = true;
    displayTime()
    returnInitState()
}

const resetCountHandler = () => {
    setZeroTime()
    finishUpdate = true;
    createCounter()
}


const createCounter = () => {
    let timerSecond = setInterval(() => {
        if(!stopUpdate) {
            second++;
            if (second === carryBitTime) {
                minute++;
                second = 0;
            }
            if (minute === carryBitTime) {
                hour++;
                minute = 0;
            }
        }
        displayTime();
        if (hour === maximumHour || finishUpdate) {
            setZeroTime()
            displayTime()
            finishUpdate = false;
            clearInterval(timerSecond);
        }
    }, secondUnit);
}

const displayTime = () => {
    let timeElement = document.getElementById('time');
    let timeString = '';
    if (hour < 10) timeString += '0';
    timeString = timeString + hour.toString() + ':';
    if (minute < 10) timeString += '0';
    timeString = timeString + minute.toString() + ':'
    if (second < 10) timeString += '0';
    timeString += second.toString();
    timeElement.innerHTML = timeString;
}

const setDisappear = (id) => {
    let ui = document.getElementById(id);
    ui.style.display = 'none';
}

const setAppear = (id) => {
    let ui = document.getElementById(id);
    ui.style.display = 'block';
}

const setZeroTime = () => {
    second = 0;
    minute = 0;
    hour = 0;
}