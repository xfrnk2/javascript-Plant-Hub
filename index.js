

function playWowVoice() {
    const myAudio = new Audio();
    myAudio.src = "./assets/eddy_wally_wow_count1.mp3";
    myAudio.play();
}

function playDogSound() {
    const dogAudio = new Audio();
    dogAudio.src = "./assets/dog_sound.mp3";
    dogAudio.play();
}

function playOneCommitVoice() {
    let myAudio = new Audio();
    let playList = ["./assets/help_me_voice.mp3", "./assets/one_day_one_commit.mp3"]

    myAudio.src = "./assets/one_day_one_commit.mp3";
    myAudio.play();

    setInterval(() => {
        myAudio.src = playList[Math.round(Math.random())];
        myAudio.play();
    }, 15000);

}

function updateBlock(e, i) {

    let level = e.target.dataset.level;

    if (4 > level) {
        level++;
    }

    if (!isVerticalLineFilledMissionSuccessed) {
        if (checkIsoneVerticalLineFilled(i)) {
            ML.innerHTML = ML.innerHTML + `<li>힘세고 건강한 잔디 세로줄 채우기 (+7)</li>`;
            playWowVoice();


            isVerticalLineFilledMissionSuccessed = true;
        }
    }

    e.target.style.fill = colors[level];
    e.target.dataset.level = level;

}


function rainEvent() {
    let i = 0;


    while (i < arr.length) {
        let level = parseInt(Math.random() * 4);

        arr[i].style.fill = colors[level];
        arr[i].dataset.level = level;


        i += Math.floor(1 + Math.random() * 7);
    }
}




function startGame() {

    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", (e) => updateBlock(e, i))
    }
    centerImage.innerHTML = `<img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""><br><span style="text-align:center">　  bark when touched</span>`;

    const backgroundAudio = new Audio();
    backgroundAudio.src = "./assets/background-music.mp3";
    backgroundAudio.play();
    backgroundAudio.autoplay = true;
    backgroundAudio.loop = true;


    setTimeout(() => { playOneCommitVoice(); }, 5000);

    let i = 0;
    let timeMissionList = [22, 44, 88, 120, 300, 500]

    setInterval(() => {
        resource += 21;
        timeCount.innerHTML = `<div style="width: 220px; height: 50px; font-size: x-large">플레이 시간: ${((Date.now() - prevTime) / 1000).toFixed(1)}초 <br> <br> 유효한 자원: ${resource}원</div>`;
        let currentPlayTime = Math.round((Date.now() - prevTime) / 1000);
        if (currentPlayTime > timeMissionList[i] - 1 && i < timeMissionList.length) {
            ML.innerHTML = ML.innerHTML + `<li>총 플레이 시간 ${currentPlayTime}초 달성!</li>`;
            i++;
        }
    }, 100);

}




function checkIsoneVerticalLineFilled(i) {


    const start = parseInt(i / 7) * 7;
    let res = true;
    for (let j = start; j < start + 7; j++) {

        if (arr[j].style.fill !== "rgb(33, 110, 57)") {
            res = false;
        }
    }
    return res;
}


function useSkillrainFall() {
    if (2000 > resource) {
        return;
    }
    if (!isRainFallAlreadySucessed) {
        ML.innerHTML = ML.innerHTML + `<li>비 맞은 잔디 보유 미션 달성!</li>`;
        isRainFallAlreadySucessed = true;
    }
    resource -= 2000;
    resource.innerText = resource;
    playWowVoice();

    document.querySelector("#rain").style.visibility = 'visible';
    setTimeout(() => {
        document.querySelector("#rain").style.visibility = 'hidden';
    }, 3000);
    setTimeout(() => {
        rainEvent();
    }, 1500)


}


function setSkillMagicHand() {
    if (3200 > resource) {
        return;
    }
    resource -= 3200;
    resource.innerText = resource;
    playWowVoice();
    if (!isMagicHandAlreadySucessed) {
        ML.innerHTML = ML.innerHTML + `<li>마법의손 사용 미션 달성!</li>`;
        isMagicHandAlreadySucessed = true;
    }



    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener("mouseover", useSkillMagicHand);
    }

    setTimeout(() => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].removeEventListener("mouseover", useSkillMagicHand);
        }

    }, 5000);

}

function useSkillMagicHand(e) {
    let level = e.target.dataset.level;
    e.target.style.fill = colors[4];
    e.target.dataset.level = level;
}


const arr = document.getElementsByClassName("ContributionCalendar-day");
const skillRainFall = document.querySelector("#rainFall");
const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

const prevTime = Date.now();
const timeCount = document.querySelector("#timeCount");
const timeCountStartBtn = document.querySelector("#timeCountStartBtn");
const resourceStatus = document.querySelector("#resourceStatus");
const centerImage = document.querySelector("#centerImage");
const magicHand = document.querySelector("#magicHand");
const ML = document.querySelector("#completedMissionList");

let isVerticalLineFilledMissionSuccessed = false;
let isRainFallAlreadySucessed = false;
let isMagicHandAlreadySucessed = false;
let resource = 0;


centerImage.addEventListener("click", playDogSound);
skillRainFall.addEventListener("click", useSkillrainFall);
timeCountStartBtn.addEventListener("click", startGame)
magicHand.addEventListener("click", setSkillMagicHand);
