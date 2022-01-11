'user scrict'

const up = document.querySelectorAll('[id*=up]');
const down = document.querySelectorAll('[id*=down]');
const date = document.querySelectorAll('[id*=tm]');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const pause = document.getElementById('pause');

let OF = true;

let total = 0;
let id;
let upd = 0;
let uph = 0;
let upm = 0;
let ups = 0;

const formField = (digit) => `0${digit}`.slice(-2);

const count = (time) => {
    const qtSeconds = formField(time % 60);
    const qtMinutes = formField(Math.floor((time % (60 * 60)) / 60));
    const qtHours = formField(Math.floor(time % (60 * 60 * 24) / (60 * 60)));
    const qtDays = formField(Math.floor(time / (60 * 60 * 24)));
    
    const times = [
        qtDays,
        qtHours,
        qtMinutes,
        qtSeconds
    ]
    
    for (let i = 0; i < date.length; i++) {
        date[i].textContent = times[i];
    }
};

const timerCount = (time, onoff) => {    
    if (onoff) {
        id = setInterval(() => {
            if (time === 0) {
                clearInterval(id);
            }
            count(time);
            time--;
        }, 1000);
    } else{
        clearInterval(id);
        count(0);
        total = 0;
    }
};

start.onclick = function() {
    if (OF && total !== 0) {
        timerCount(total, true);
        OF = false;
    }
};

reset.onclick = function() {
    timerCount(0, false);
    OF = true;
};

