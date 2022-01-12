'use scrict'

const up = document.querySelectorAll('[id*=up]');
const down = document.querySelectorAll('[id*=down]');
const date = document.querySelectorAll('[id*=tm]');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const pause = document.getElementById('pause');

let OF = true;

let total = 0;
let id;

const UD = [
    upd = 0,
    uph = 0,
    upm = 0,
    ups = 0
]


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
        for (const i in UD) {
            UD[i] = 0;
        }
    }
};

const upbtn = (dateid, item, x, y) => {
    let num = formField(Number(date[dateid].textContent)+y);
    date[dateid].textContent = num;
    UD[item] = parseInt((date[dateid].textContent * x));
    total = (UD[0] + UD[1] + UD[2] + UD[3]);
};

const upbtn2 = (dateid, item, x, value) => {
    date[dateid].textContent = value;
    UD[item] = (date[dateid].textContent * x);
    total = (UD[0] + UD[1] + UD[2] + UD[3]);
};



up.forEach(add => add.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'up1':
            !(date[0].textContent >= '99') ? upbtn(0, 0, 86400, 1) : upbtn2(0, 0, 86400, '00');
        break;
    
        case 'up2':
            !(date[1].textContent >= '23') ? upbtn(1, 1, 3600, 1) : upbtn2(1, 1, 3600, '00');
        break;

        case 'up3':
            !(date[2].textContent >= '59') ? upbtn(2, 2, 60, 1) : upbtn2(2, 2, 60, '00');
        break;

        default:
            !(date[3].textContent >= '59') ? upbtn(3, 3, 1, 1) : upbtn2(3, 3, 1, '00');
        break;
    } 
}));


down.forEach(sub => sub.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'down1':
            !(date[0].textContent <= '00') ? upbtn(0, 0, 86400, -1) : upbtn2(0, 0, 86400, '99');
        break;
    
        case 'down2':
            !(date[1].textContent <= '00') ? upbtn(1, 1, 3600, -1) : upbtn2(1, 1, 3600, '23');
        break;

        case 'down3':
            !(date[2].textContent <= '00') ? upbtn(2, 2, 60, -1) : upbtn2(2, 2, 60, '59');
        break;

        default:
            !(date[3].textContent <= '00') ? upbtn(3, 3, 1, -1) : upbtn2(3, 3, 1, '59');
        break;
    }
}));

start.addEventListener('click', () => {
    if (OF && total !== 0) {
        timerCount(total, true);
        OF = false;
        console.log(total);
    }
});

reset.addEventListener('click', () => {
    timerCount(0, false);
    OF = true;
});


