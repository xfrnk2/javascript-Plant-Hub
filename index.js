const arr = document.getElementsByClassName("ContributionCalendar-day");
const skillRainFall = document.querySelector("#rainFall");
const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
let isVerticalLineFilledMissionSuccessed = false;
skillRainFall.addEventListener("click", useSkillrainFall);

function playWowVoice () {
    const myAudio = new Audio(); // Aduio 객체 생성
    myAudio.src = "./assets/eddy_wally_wow_count1.mp3"; // 음원 파일 설정
    myAudio.play();
}

function playOneCommitVoice () {
    let myAudio = new Audio(); // Aduio 객체 생성
    let playList = ["help_me_voice.mp3", "./assets/one_day_one_commit.mp3"]
    
    myAudio.src = "./assets/one_day_one_commit.mp3";
    myAudio.play();

    setInterval(() => {
        myAudio.src = playList[Math.round(Math.random())]; // 음원 파일 설정
        myAudio.play();
    }, 25000);
    
}

function updateBlock (e, i) {
    //e.target.dataset.level
    let level = e.target.dataset.level;
   
    if (4 > level) {
        level ++;
    }
    
    if (!isVerticalLineFilledMissionSuccessed) {
    if (checkIsoneVerticalLineFilled(i)){
        const ML = document.querySelector("#completedMissionList");
        ML.innerHTML = ML.innerHTML + `<li>힘세고 건강한 잔디 세로줄 채우기 (+7)</li>`;
        playWowVoice();


        isVerticalLineFilledMissionSuccessed = true;
    }
}

    e.target.style.fill = colors[level];
    e.target.dataset.level = level;
    // console.log(e.target.dataset.level)
}


function rainEvent () {
	let i = 0;

	while (i < arr.length) {
    level = arr[i].dataset.level + 1
	if (4 > level) {
        level ++;
    }

    arr[i].style.fill = colors[parseInt(Math.random() * 4)];
    arr[i].dataset.level = level;    

    
	i += Math.floor(1 + Math.random() * 7);
}
}



for (let i = 0; i < arr.length; i ++) {
    arr[i].addEventListener("click", (e) => updateBlock(e, i))
}


const timeCount = document.querySelector("#timeCount");
const timeCountStartBtn = document.querySelector("#timeCountStartBtn");
const resourceStatus = document.querySelector("#resourceStatus");

const prevTime = Date.now();
let resource = 0;
function startGame () {
    const ML = document.querySelector("#completedMissionList");
    
    setTimeout(() => {playOneCommitVoice();}, 5000);
    
    let i = 0;
    let timeMissionList = [22, 44, 88, 120, 300, 500]

    setInterval(() => {
        resource += 8;
        timeCount.innerText = `${((Date.now() - prevTime) / 1000).toFixed(1)} Sec\n ${resource}원`;
        let currentPlayTime = Math.round((Date.now() - prevTime) / 1000);
        if (currentPlayTime > timeMissionList[i] - 1 && i < timeMissionList.length) {
            ML.innerHTML = ML.innerHTML + `<li>총 플레이 시간 ${currentPlayTime}초 달성!</li>`;
            i ++;
        }
    }, 100);
    
}



timeCountStartBtn.addEventListener("click", startGame)


function checkIsoneVerticalLineFilled (i) {

 
    const start = parseInt(i/7)*7;
    let res = true;
    for (let j = start; j < start + 7; j ++){

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
    resource -= 2000;
    playWowVoice();
    resource.innerText = resource;
    const rainningTime = Date.now();
    
    document.querySelector("#rain").style.visibility='visible';
    setTimeout(() => {
        document.querySelector("#rain").style.visibility='hidden';
    }, 3000);
    setTimeout(() => {
        rainEvent();
    }, 1500)
    

}
function setSkillMagicHand() {
    if (4000 > resource) {
        return;
    }
    resource -= 4000;
    playWowVoice();
    
    for (let i = 0; i < arr.length; i ++) {
        arr[i].addEventListener("mouseover", useSkillMagicHand);
    }
 
    setTimeout(() => {
        for (let i = 0; i < arr.length; i ++) {
            arr[i].removeEventListener("mouseover", useSkillMagicHand);
        }
  
    }, 5000);

}

function useSkillMagicHand(e) {
    let level = e.target.dataset.level;
    e.target.style.fill = colors[parseInt(2+ Math.random() * 2)];
    e.target.dataset.level = level;
}

const magicHand = document.querySelector("#magicHand");
magicHand.addEventListener("click", setSkillMagicHand);
