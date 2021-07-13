const carryBitTime = 60;
const maximumHour = 100;
const secondUnit = 1000;

let second, minute, hour;
let prevSecond, prevMinute, prevHour;
let finishUpdate = false;
let stopUpdate = false;
let isReverseCount;

const returnInitState = () => {
    setAppear('hour-box')
    setAppear('minute-box')
    setAppear('second-box')
    setAppear('countup')
    setAppear('countdown')

    setDisappear('clear')
    setDisappear('restart')
    setDisappear('hint')
    setDisappear('pause')
    setDisappear('resume')

}

const initState = () => {
    setDisappear('hour-box')
    setDisappear('minute-box')
    setDisappear('second-box')
    setDisappear('countup')
    setDisappear('countdown')
    setDisappear('resume')

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
    isReverseCount = false;
    initState()
    setZeroTime()
    createCounter()
}

const clearCountHandler = () => {
    setZeroTime()
    stopUpdate = false;
    finishUpdate = true;
    isReverseCount = false;
    returnInitState()
    displayTime()
}


const createCounter = () => {
    let timerSecond = setInterval(() => {
        if (!stopUpdate) {
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

const submitTimeHandler = () => {
    initState()
    isReverseCount = true;

    let userSecond = parseInt(document.getElementById('second').value);
    let userMinute = parseInt(document.getElementById('minute').value);
    let userHour = parseInt(document.getElementById('hour').value);

    if (userSecond > 60) {
        userMinute += Math.floor(userSecond / 60);
        userSecond = userSecond % 60;
    }
    if (userMinute > 60) {
        userHour += Math.floor(userMinute / 60);
        userMinute = userMinute % 60;
    }
    console.log(userSecond)
    console.log(userMinute)
    console.log(userHour)
    prevSecond = userSecond;
    prevMinute = userMinute;
    prevHour = userHour;
    setPrevTime()
    createReverseCounter()
}

const resetCountHandler = () => {
    if (!isReverseCount) {
        setZeroTime()
        stopUpdate = false;
        finishUpdate = true;
        createCounter()
    } else {
        setPrevTime();
        stopUpdate = false;
        finishUpdate = true;
        createReverseCounter();
    }
}

const createReverseCounter = () => {

    displayTime();
    let timerSecond = setInterval(() => {
        if (!stopUpdate) {
            second--;
            if (second === -1) {
                minute--;
                second = 59;
            }
            if (minute === -1) {
                hour--;
                minute = 59;
            }
            if (hour === -1) {
                setZeroTime()
                finishUpdate = true;
            }
        }
        displayTime();
        if (hour === maximumHour || finishUpdate ) {
            setPrevTime()
            if(!isReverseCount && !stopUpdate && finishUpdate ) setZeroTime()
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


const setPrevTime = () => {
    second = prevSecond;
    minute = prevMinute;
    hour = prevHour;
    if (!stopUpdate) {
        second--;
        if (second === -1) {
            minute--;
            second = 59;
        }
        if (minute === -1) {
            hour--;
            minute = 59;
        }
        if (hour === -1) {
            setZeroTime()
            finishUpdate = true;
        }
    }
}


