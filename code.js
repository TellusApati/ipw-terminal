
var turnedOn = false;
var linesAmount = 0;

const body = document.querySelector("body");
const main = document.querySelector("main");
const screenFlash = document.querySelector("#screen-flash");
const content = document.querySelector("#content");

const tvNoiseAudio = new Audio('sfx/tv-noise.flac');
tvNoiseAudio.volume = .2;
tvNoiseAudio.addEventListener('timeupdate', function(){
    var buffer = .4
    if(this.currentTime > this.duration - buffer && turnedOn){
        this.currentTime = 0
        this.play()
    }
});
const tvOnAudio = new Audio('sfx/tv-on.flac');
tvOnAudio.volume = .7;
const tvOffAudio = new Audio('sfx/tv-off.flac');
tvOffAudio.volume = .7;


body.addEventListener("click", () => {
    if (turnedOn) {
        tvOffAudio.play();
        tvNoiseAudio.pause();
        ipwIntro.pause();
        ipwIntro.currentTime = 0;
        framesLeft = 0;
        setTimeout(() => {
            main.classList.remove("on");
            main.classList.add("off");
            screenFlash.classList.remove("on");
            screenFlash.classList.add("off");
            content.classList.remove("on");
            content.classList.add("off");
        }, 350);
    } else {
        main.classList.remove("off");
        main.classList.add("on");
        screenFlash.classList.remove("off");
        screenFlash.classList.add("on");
        content.classList.remove("off");
        content.classList.add("on");
        tvOnAudio.play();
        tvNoiseAudio.play();

        setTimeout(()=>{renderAnimation(content);}, 500);
        
    }
    turnedOn = !turnedOn;
});


content.style["font-size"] = main.clientHeight * 0.75/50 + "px";

for (i = 0; i < 49; i ++) {
    content.innerHTML += "<p class='selectDisable'></p>";
}


