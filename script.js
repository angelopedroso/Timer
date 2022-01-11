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

up.forEach(add => add.addEventListener('click', (e) => {
    let num = 0;
    switch (e.target.id) {
        case 'up1':
            
            if(!(date[0].textContent >= '99')){
                num = formField(++date[0].textContent);
                date[0].textContent = num;
                upd = (date[0].textContent * 86400);
                total = upd + uph + upm + ups;
            } else{
                date[0].textContent = '00';
                upd = (date[0].textContent * 86400);
                total = upd + uph + upm + ups;
            }
        break;
    
        case 'up2':
            if(!(date[1].textContent >= '23')){
                num = formField(++date[1].textContent);
                date[1].textContent = num;
                uph = (date[1].textContent * 3600);  
                total = upd + uph + upm + ups;
            } else{
                date[1].textContent = '00';
                uph = (date[1].textContent * 3600);
                total = upd + uph + upm + ups;
            }
        break;

        case 'up3':
            if(!(date[2].textContent >= '59')){
                num = formField(++date[2].textContent);
                date[2].textContent = num;
                upm = (date[2].textContent * 60);
                total = upd + uph + upm + ups;
            } else{
                date[2].textContent = '00';
                upm = (date[2].textContent * 60);
                total = upd + uph + upm + ups;
            }
        break;

        default:
            if(!(date[3].textContent >= '59')){
                num = formField(++date[3].textContent);
                date[3].textContent = num;
                ups = parseInt(date[3].textContent);
                total = upd + uph + upm + ups;
            } else{
                date[3].textContent = '00';
                ups = 0;
                total = upd + uph + upm + ups;
            }
        break;
    }
}));


down.forEach(sub => sub.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'down1':
            if (date[0].textContent <= '00') {
                date[0].textContent = '99';
                upd = (date[0].textContent * 86400);
                total = upd + uph + upm + ups;
            } else{
                num = formField(--date[0].textContent);
                date[0].textContent = num;
                upd = (date[0].textContent * 86400);
                total = upd + uph + upm + ups;
            }
        break;
    
        case 'down2':
            if (date[1].textContent <= '00') {
                date[1].textContent = '23';
                uph = (date[1].textContent * 3600);
                total = upd + uph + upm + ups;
            } else{
                num = formField(--date[1].textContent);
                date[1].textContent = num;
                uph = (date[1].textContent * 3600);
                total = upd + uph + upm + ups;
            }
        break;

        case 'down3':
            if (date[2].textContent <= '00') {
                date[2].textContent = '59';
                upm = (date[2].textContent * 60);
                total = upd + uph + upm + ups;
            } else{
                num = formField(--date[2].textContent);
                date[2].textContent = num;
                upm = (date[2].textContent * 60);
                total = upd + uph + upm + ups;
            }
        break;

        default:
            if (date[3].textContent <= '00') {
                date[3].textContent = '59';
                ups = 0;
                total = upd + uph + upm + ups;
            } else{
                num = formField(--date[3].textContent);
                date[3].textContent = num;
                ups = parseInt(date[3].textContent);
                total = upd + uph + upm + ups;
            }
        break;
    }
}));

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

