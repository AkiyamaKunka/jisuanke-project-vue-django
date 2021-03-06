/*-----------VARIABLE----------*/

const carryBitTime = 60;
const maximumHour = 100;
const secondUnit = 1000;
let second, minute, hour;
let prevSecond, prevMinute, prevHour;
let finishUpdate = false;
let stopUpdate = false;
let isReverseCount;
let inInitState = true;

/*-------KEY_EVENT_LISTENER-----*/

document.onkeydown = (event) => {
    var event = event || window.event;  // 标准化事件对象
    if (event.keyCode === 13) {
        // space
        if (inInitState)
            initHandler();
    } else if (event.keyCode === 32) {
        // enter
        if (!inInitState) {
            if (!stopUpdate)
                pauseHandler();
            else
                resumeHandler();
        }
    }
}

/*---------STATE_HANDLER---------*/


const initHandler = (event) => {
    document.getElementById('clear').innerHTML = '清空正计时';
    document.getElementById('hint').innerHTML = '正在正计时';
    isReverseCount = false;
    initState()
    setZeroTime()
    createCounter()
}

const submitTimeHandler = () => {
    document.getElementById('clear').innerHTML = '清空倒计时';
    document.getElementById('hint').innerHTML = '正在倒计时';
    initState()
    isReverseCount = true;

    // for case that the user do not input any number in <input>
    let userSecond = parseInt(document.getElementById('second').value);
    let userMinute = parseInt(document.getElementById('minute').value);
    let userHour = parseInt(document.getElementById('hour').value);
    if(document.getElementById('second').value === '')
        userSecond = +0;
    if(document.getElementById('minute').value === '')
        userMinute = +0;
    if(document.getElementById('hour').value === '')
        userHour = +0;
    // case end

    if (userSecond > 60) {
        userSecond = 60;
    }
    if (userMinute > 60) {
        userMinute = 60;
    }

    prevSecond = userSecond;
    prevMinute = userMinute;
    prevHour = userHour;
    setPrevTime()
    displayStaticHintTime()
    createReverseCounter()
}


const pauseHandler = () => {
    if (isReverseCount) {
        document.getElementById('hint').innerHTML = '暂停倒计时';
        displayStaticHintTime();
    } else document.getElementById('hint').innerHTML = '暂停正计时';
    setAppear('resume')
    setDisappear('pause')
    stopUpdate = true;
}

const resumeHandler = () => {
    if (isReverseCount) {
        document.getElementById('hint').innerHTML = '正在倒计时';
        displayStaticHintTime();
    } else document.getElementById('hint').innerHTML = '正在正计时';
    setAppear('pause')
    setDisappear('resume')
    stopUpdate = false;
}


const clearCountHandler = () => {
    setZeroTime()
    resetInput()
    stopUpdate = false;
    finishUpdate = true;
    isReverseCount = false;
    returnInitState()
    console.log("114")
    displayTime()
}

const resetInput = () => {
    document.getElementById('hour').value = ''
    document.getElementById('minute').value = ''
    document.getElementById('second').value = ''
}

const resetCountHandler = () => {
    if (!isReverseCount) {
        document.getElementById('hint').innerHTML = '正在正计时';
        setZeroTime()
        stopUpdate = false;
        finishUpdate = true;
        createCounter()
    } else {
        document.getElementById('hint').innerHTML = '正在倒计时';
        displayStaticHintTime()
        setPrevTime();
        stopUpdate = false;
        finishUpdate = true;
        createReverseCounter();
    }
}

/*--------COUNTER_FUNCTION--------*/

let timerSecond;

const createCounter = () => {
    clearInterval(timerSecond);
    timerSecond = setInterval(() => {
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
        console.log("159")
        displayTime();
        displayHintTime();
        if (hour === maximumHour || finishUpdate) {
            setZeroTime()
            console.log("163")
            displayTime();
            displayHintTime();
            finishUpdate = false;
            clearInterval(timerSecond);
        }
    }, secondUnit);
}

const createReverseCounter = () => {
    clearInterval(timerSecond);
    console.log("173")
    displayTime();
    timerSecond = setInterval(() => {
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
        console.log("190")
        displayTime();
        if (hour === maximumHour || finishUpdate) {
            setPrevTime()
            if (!isReverseCount && !stopUpdate && finishUpdate) setZeroTime()
            console.log("196")
            displayTime()
            document.getElementById('hint').innerHTML += ' 已结束';
            finishUpdate = false;
            clearInterval(timerSecond);
        }
    }, secondUnit);
}

/*--------REUSABLE_COMPONENT--------*/

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

const displayHintTime = () => {
    let hintElement = document.getElementById('hint');
    let timeString = '';
    if (hour < 10) timeString += '0';
    timeString = timeString + hour.toString() + ':';
    if (minute < 10) timeString += '0';
    timeString = timeString + minute.toString() + ':'
    if (second < 10) timeString += '0';
    timeString += second.toString();
    hintElement.innerHTML = hintElement.innerHTML.toString().trim().split(' ')[0] + ' ' + timeString;
}

const displayStaticHintTime = () => {
    let hintElement = document.getElementById('hint');
    let timeString = '';
    if (prevHour < 10) timeString += '0';
    timeString = timeString + prevHour.toString() + ':';
    if (prevMinute < 10) timeString += '0';
    timeString = timeString + prevMinute.toString() + ':'
    if (prevSecond < 10) timeString += '0';
    timeString += prevSecond.toString();
    hintElement.innerHTML = hintElement.innerHTML.toString().trim().split(' ')[0] + ' ' + timeString;
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


/*--------VISIBILITY_SET--------*/


const returnInitState = () => {
    inInitState = true;
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
    inInitState = false;
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
//
// const createSimpleTimer = () => {
//     let beginTimeInMS = Date.now();
//     console.log(beginTimeInMS)
//
// }



















