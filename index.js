

function playWowVoice() {
    const myAudio = new Audio();
    myAudio.src = "./assets/eddy_wally_wow_count1.mp3";
    myAudio.play();
}

function playDogSound() {
    const dogAudio = new Audio();
    dogAudio.src = "./assets/dog_sound.mp3";
    dogAudio.play();
    let innerContent = document.querySelector("#doggiExplanation");
    innerContent.style.color = "red";
    setTimeout (() => {
        innerContent.style.color = "blue";
    }, 2000)
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
	isGameStarted = true;
    for (let i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", (e) => updateBlock(e, i))
    }
    centerImage.innerHTML = `<img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""> <img src="./assets/sibainu.gif" style=""><br><span id="doggiExplanation" style="text-align:center; color:blue; font-weight:bold">　  bark when touched</span>`;
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
        timeCount.innerHTML = `<div style="width: 220px; height: 50px; font-size: x-large">플레이 시간: ${parseInt((Date.now() - prevTime) / 1000)}초 <br> <br> 유효 자원: ${resource}원</div>`;
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


function showEddyWowImage(delay) {
	eddyWowImage.style.zIndex = '1000';
	setTimeout(() => {
		eddyWowImage.style.display = 'block';
	}, delay)
	setTimeout(() => {
		eddyWowImage.style.display = 'none';
		eddyWowImage.style.zIndex = '1';
	}, delay + 3100)
}

function useSkillrainFall() {
    if (2000 > resource) {
		showNotification('비내리기 스킬에 필요한 자원이 충분하지 않습니다. 2000원이 필요해요.');
        return;
    }
    if (!isRainFallAlreadySucessed) {
        ML.innerHTML = ML.innerHTML + `<li>비 맞은 잔디 보유 미션 달성!</li>`;
        isRainFallAlreadySucessed = true;
    }
    resource -= 2000;
    resource.innerText = resource;
    playWowVoice();
	showNotification("잔디가 쑥쑥 자라나는 비 내리기 스킬을 사용하셨습니다.");

    document.querySelector("#rain").style.visibility = 'visible';
    setTimeout(() => {
        document.querySelector("#rain").style.visibility = 'hidden';
    }, 3000);
    setTimeout(() => {
        rainEvent();
    }, 1500)
	showEddyWowImage(2100);


}


function setSkillMagicHand() {
    if (3200 > resource) {
		showNotification('마법의손 스킬에 필요한 자원이 충분하지 않습니다. 3200원이 필요해요.');
        return;
    }
    resource -= 3200;
    resource.innerText = resource;
	showNotification("손이 닿기만 하면 폭풍 성장하는 마법의 손을 사용하셨습니다.(제한시간 5초)");
	
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

    }, 5300);
	setTimeout(() => {
		playWowVoice();
	}, 3000)
	showEddyWowImage(5300);

}

function useSkillMagicHand(e) {
    const maxLevel = 4;
    e.target.style.fill = colors[maxLevel];
    e.target.dataset.level = maxLevel;
}

const showNotification = (message) => {
  if (!isGameStarted) {
	  return;
  }
  notificationContainer.classList.add('show')
  notificationContainer.innerText = message;
  setTimeout(() => {
    notificationContainer.classList.remove('show')
	notificationContainer.innerText = '';
  }, 3400)
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
const eddyWowImage = document.querySelector("#eddyWowImage");
const notificationContainer = document.querySelector("#notificationContainer");

let isVerticalLineFilledMissionSuccessed = false;
let isRainFallAlreadySucessed = false;
let isMagicHandAlreadySucessed = false;
let resource = 0;
let isGameStarted = false;


centerImage.addEventListener("click", playDogSound);
skillRainFall.addEventListener("click", useSkillrainFall);
timeCountStartBtn.addEventListener("click", startGame)
magicHand.addEventListener("click", setSkillMagicHand);
