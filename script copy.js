const videoContainer=document.querySelector('.videoContainer');

const videoPlayer = document.querySelectorAll('.videoPlayer')
videoPlayer.forEach(videoPlayer => {
    const videoPlayer_html=`${videoPlayer.innerHTML}

`;

    videoPlayer.innerHTML=videoPlayer_html;

    
//sellect all require tags
const mainVideo=videoPlayer.querySelector('#mainVideo'),
tracks = videoPlayer.querySelectorAll("track"),
twoTimeSpeedNotif=videoPlayer.querySelector('.twoTimeSpeedNotif'),
ambientMode=videoPlayer.querySelector('#ambientMode'),
ctx=ambientMode.getContext("2d"),
mainVideoClickF=videoPlayer.querySelector('.mainVideoClickF'),
mainVideoLeftMinorSensor=videoPlayer.querySelector('.mainVideoLeftMinorSensor'),
controllersContainer=videoPlayer.querySelector('.controllersContainer'),
headerControllers=videoPlayer.querySelector('.headerControllers'),
settingMobile=videoPlayer.querySelector('#settingMobile'),
videoFullscreenTitle=videoPlayer.querySelector('.videoFullscreenTitle'),
controllersMobile=videoPlayer.querySelector('.controllersMobile'),
blockRewind=videoPlayer.querySelector('.blockRewind'),
blockCenter=videoPlayer.querySelector('.blockCenter'),
playPauseMobile=videoPlayer.querySelector('#playPauseMobile'),
playPauseMobileIcon=videoPlayer.querySelector('#playPauseMobileIcon'),
blockForward=videoPlayer.querySelector('.blockForward'),
thumbnail=videoPlayer.querySelector(".thumbnail"),
thumbnailImg=videoPlayer.querySelector(".thumbnail img"),
controllers=videoPlayer.querySelector('.controllers'),
previewArea=videoPlayer.querySelector('.previewArea'),
previewAreaImg=videoPlayer.querySelector('.previewArea img'),
previewAreaSpan = videoPlayer.querySelector('.previewArea span'),
progressBuffer=videoPlayer.querySelector('.progressBuffer'),
progressPreview=videoPlayer.querySelector('.progressPreview'),
progressShadow=videoPlayer.querySelector('.progressShadow'),
progressBar=videoPlayer.querySelector('#progressBar'),
rangeProgress=videoPlayer.querySelector('#rangeProgress'),
fastRewind=videoPlayer.querySelector('#fastRewind'),
playPause=videoPlayer.querySelector('#playPause'),
playPauseIcon=videoPlayer.querySelector('#playPauseIcon'),
fastForward=videoPlayer.querySelector('#fastForward'),
volumeBtn=videoPlayer.querySelector('#volumeBtn'),
volumeBtnIcon=videoPlayer.querySelector('#volumeBtnIcon'),
volumeRange=videoPlayer.querySelector('#volumeRange'),
current=videoPlayer.querySelector('.current'),
duration=videoPlayer.querySelector('.duration'),
autoplay=videoPlayer.querySelector('.auto-play'),
captionBtn=videoPlayer.querySelector('#captionBtn'),
captionIcon=videoPlayer.querySelector('#captionIcon'),
setting=videoPlayer.querySelector('#setting'),
pictureInPicture=videoPlayer.querySelector('#pictureInPicture'),
theaterMode=videoPlayer.querySelector('#theaterMode'),
theaterIcon=videoPlayer.querySelector('#theaterIcon'),
fullscreen=videoPlayer.querySelector('#fullscreen'),
fullscreenIcon=videoPlayer.querySelector('#fullscreenIcon'),
fullscreenMobile=videoPlayer.querySelector('#fullscreenMobile'),
fullscreenMobileIcon=videoPlayer.querySelector('#fullscreenMobileIcon'),

settingsContainer=videoPlayer.querySelector('.settingsContainer'),
settingList=videoPlayer.querySelector('.settingList'),
ambientBtn=videoPlayer.querySelector('#ambientBtn'),
slider=videoPlayer.querySelector('.slider'),
CaptionListBtn=videoPlayer.querySelector('#CaptionListBtn'),
CaptionStatus=videoPlayer.querySelector("#CaptionStatus"),
playbackSpeedBtn=videoPlayer.querySelector('#playbackSpeedBtn'),
playbackStatus=videoPlayer.querySelector('#playbackStatus'),
qualityBtn=videoPlayer.querySelector('#qualityBtn'),
qualityStatus=videoPlayer.querySelector('#qualityStatus'),
captionList=videoPlayer.querySelector('.captionList'),
captionCloseBtn=videoPlayer.querySelector('#captionCloseBtn'),
caption_labels=videoPlayer.querySelector(".captionList ul"),
playbackList=videoPlayer.querySelector('.playbackList'),
playbackCloseBtn=videoPlayer.querySelector('#playbackCloseBtn'),
playback=videoPlayer.querySelectorAll(".playbackBtnList li"),
customLinkRangePlayback=videoPlayer.querySelector('#customLinkRangePlayback'),
customRangePlayback=videoPlayer.querySelector('.customRangePlayback'),
playbackRangeCloseBtn=videoPlayer.querySelector('#playbackRangeCloseBtn'),
rangeCustomPlayback=videoPlayer.querySelector("#rangeCustomPlayback"),
PlaybackRangeValue=videoPlayer.querySelector("#PlaybackRangeValue"),
qualityList=videoPlayer.querySelector('.qualityList'),
qualityCloseBtn=videoPlayer.querySelector('#qualityCloseBtn'),
qualitys = videoPlayer.querySelectorAll("source[size]"),
quality_ul = videoPlayer.querySelector(".settingsContainer [data-label='qualityList'] ul"),
deafultQuality=videoPlayer.querySelector('#deafultQuality');

document.addEventListener('keydown',(event) => {
    const {activeElement} = document
    const hasButtonRole = activeElement?.getAttribute('role') === 'button'
    if (hasButtonRole) {
        if (['Spacebar', ' ', 'Enter'].includes(event.key)) {
            event.preventDefault()
        }
        if (event.key === 'Enter') {
            activeElement.click()
        }
    }
})
document.addEventListener('keyup',(event) => {
    const {activeElement} = document
    const hasButtonRole = activeElement?.getAttribute('role') === 'button'
    if (hasButtonRole && ['Spacebar', ' ', ].includes(event.key)) {
        event.preventDefault()
        activeElement.click()
    }
})

let mainVideoSources = mainVideo.querySelectorAll("source");
for (let i = 0; i < mainVideoSources.length; i++) {
  let videoUrl = mainVideoSources[i].src;
  blobUrl(mainVideoSources[i], videoUrl);
}
function blobUrl(video, videoUrl) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", videoUrl);
  xhr.responseType = "arraybuffer";
  xhr.onload = (e) => {
    let blob = new Blob([xhr.response]);
    let url = URL.createObjectURL(blob);
    video.src = url;
  };
  xhr.send();
}
mainVideo.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("keydown",(e) => {
    const tagName = document.activeElement.tagName.toLowerCase();

    if (tagName === "input") return

  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return
    case "k":
        togglePlay()
      break
    case "f":
        toggleFullscreen()
      break
    case "t":
        toggleTheatherMode()
      break
    case "i":
        togglepictureInPicture()
      break
    case "m":
        toggleMute()
      break
    case "arrowleft":
    case "j":
        toggleRewind()
        headerControllers.classList.add('active');
        controllers.classList.add('active');
        controllersMobile.classList.add('active');
      break
    case "arrowright":
    case "l":
        toggleForward()

      break
    case "c":
      //caption
      break
  }
})



rangeProgress.onmouseup = () => mouseUp()
rangeProgress.onmouseout = () => progressbarMouseout()
rangeProgress.onmousedown = () => updatePlayerTime()
rangeProgress.onmouseover = (e) => showPreviewProgress(e)
rangeProgress.onmousemove = (e) => showPreviewProgress(e)

rangeProgress.addEventListener("pointerdown", (e) => {
    rangeProgress.setPointerCapture(e.pointerId);
    setTimelinePosition(e);
    rangeProgress.addEventListener("pointermove", setTimelinePosition);
    rangeProgress.addEventListener("pointerup", () => {
        rangeProgress.removeEventListener("pointermove", setTimelinePosition);
    })
});

function updatePlayerTime() {
    mainVideo.currentTime = (rangeProgress.value*mainVideo.duration)/100;
    thumbnail.style.display = "block";
}

function mouseUp() {
    thumbnail.style.display = "none";
}

function setTimelinePosition(e){
    const rect = progressBar.getBoundingClientRect()
    const percent = (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width)*100;

    let sortedTime = formatDuration((percent*mainVideo.duration)/100);
    current.textContent = sortedTime;
}

function showPreviewProgress(e){
    const rect = progressBar.getBoundingClientRect()
    const percent = (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width)*100;

    progressPreview.style.width = percent + '%';
    progressPreview.classList.add('active');
    rangeProgress.classList.add("active");

    let progressWidthval = progressBar.clientWidth;
    let x = e.offsetX;
    let y = x - 100;

    if (y <= 10) {
        previewArea.style.left =`10px`
    } else if (x >= progressWidthval - 115) {
        previewArea.style.left ='';
        if (!document.fullscreenElement) {
            previewArea.style.right =`10px`
        } else {
            previewArea.style.right =`18px`
        }
    } else {
        previewArea.style.left =`${y}px`;
    }

    previewArea.style.display = 'block'

    let sortedTime = formatDuration((percent*mainVideo.duration)/100);
    previewAreaSpan.innerHTML = sortedTime;

    var previewImageNumber = (Math.floor((percent-0.01)/11.5)) +1;
    if(previewImageNumber > 0){ previewAreaImg.src = `./assets/previewImgs/preview${previewImageNumber}.jpg` }
    if(previewImageNumber > 0){ thumbnailImg.src = `./assets/previewImgs/preview${previewImageNumber}.jpg`}
}

function progressbarMouseout(){
    previewArea.style.display = 'none'
    progressPreview.classList.remove('active')
    rangeProgress.classList.remove("active");
}

mainVideo.addEventListener('timeupdate', function() {
    const proggres = (mainVideo.currentTime / mainVideo.duration)* 100;
    progressShadow.style.width = proggres+ '%';
    rangeProgress.value = proggres;
});

rangeProgress.addEventListener('input', function(){
    const time = (rangeProgress.value / 100) * mainVideo.duration;
    mainVideo.currentTime = time;
    progressShadow.style.width = rangeProgress.value + '%';
});

function drawProgress(canvas, buffered, duration) {
    let context = canvas.getContext('2d', { antialias: false });
    context.fillStyle = "#f0f0f04a";
    let height = canvas.height;
    let width = canvas.width;
    if (!height || !width) throw "Canva's width or height or not set.";
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < buffered.length; i++) {
      let leadingEdge = buffered.start(i) / duration * width;
      let trailingEdge = buffered.end(i) / duration * width;
      context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height)
    }
  }
mainVideo.addEventListener('progress', () => {
    drawProgress(progressBuffer, mainVideo.buffered, mainVideo.duration);
})

function getCurrentImage() {
  ctx.drawImage(mainVideo, 0, 0, ambientMode.width, ambientMode.height);
}
setInterval(getCurrentImage, 100);



//play pause btn function {
mainVideo.addEventListener("play",()=>{
    mainVideo.classList.add("play")
    playPauseIcon.src = "./assets/icons/Pause-icon.svg";
    playPauseMobileIcon.src = "./assets/icons/Pause-icon.svg";
    playPauseIcon.title = "Pause"
});
mainVideo.addEventListener("pause",()=>{
    mainVideo.classList.remove("play")
    playPauseIcon.src = "./assets/icons/Play-icon.svg";
    playPauseMobileIcon.src = "./assets/icons/Play-icon.svg";
    playPauseIcon.title = "Play"
});
function togglePlay(){
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
};

playPause.addEventListener('click', togglePlay);
playPauseMobile.addEventListener('click', togglePlay);
//}

//rewind forward btn function {
function toggleRewind(){
    mainVideo.currentTime -= 10;
};
function toggleForward(){
    mainVideo.currentTime += 10;
};
blockRewind.addEventListener('dblclick', toggleRewind);
blockForward.addEventListener('dblclick', toggleForward);
fastRewind.addEventListener('click', toggleRewind);
fastForward.addEventListener('click', toggleForward);
//}

//volume btn function {
const toggleMute = () => {
    mainVideo.muted = !mainVideo.muted;
    if (mainVideo.muted) {
        volumeRange.value = '0';
        volumeBtnIcon.src = "./assets/icons/Volume-off-icon.svg";
        volumeRange.style.opacity = "0";
        setTimeout(function(){
            volumeRange.style.display = "none";
        }, 200);
        volumeBtnIcon.title = "Unmute"
    } else {
        volumeRange.value = mainVideo.volume * 100;
        
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
        volumeRange.style.display = "inline-block";
        volumeBtnIcon.title = "Mute"
        setTimeout(function(){
            volumeRange.style.opacity = "1";
        }, 50);   
    }
};
volumeBtn.addEventListener('click', toggleMute);
//}

//volume slider function {
volumeRange.addEventListener('input',() => {
    mainVideo.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
        volumeBtnIcon.src = "./assets/icons/Volume-off-icon.svg";
    } else if (volumeRange.value < 40){
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
    } else {
        volumeBtnIcon.src = "./assets/icons/Volume-up-icon.svg";
    }
});
//}

//duration function {
mainVideo.addEventListener("timeupdate", (e) => {
    current.textContent = formatDuration(mainVideo.currentTime)
});
mainVideo.addEventListener('loadedmetadata',() => { 
    duration.textContent = formatDuration(mainVideo.duration);
});
 
const leadingZeroFormater = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})
function formatDuration(time){
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)%60
    const hour = Math.floor(time / 3600)
    if(hour === 0){
        return `${minutes}:${leadingZeroFormater.format(seconds)}`
    } else {
        return `${hour}:${leadingZeroFormater.format(minutes)}:${leadingZeroFormater.format(seconds)}`
    }
}
//)

//autoplay btn function {
autoplay.addEventListener("click", () => {
    autoplay.classList.toggle("active");
    if (autoplay.classList.contains("active")) {
        autoplay.title = "Autoplay is on";
    } else {
        autoplay.title = "Autoplay is off";
    }
  });
mainVideo.addEventListener("ended", () => {
    if (autoplay.classList.contains("active")) {
      mainVideo.play();
    } else {
      playPause.src = "./assets/icons/Replay-icon.svg";
      playPause.title = "Replay";
    }
});
//}



//setting btn function {
function toggleSettingCloseAll() {
    settingsContainer.classList.remove("scOpen");
    settingList.classList.remove("playListToLeft");
    qualityList.classList.remove("qualityListOpen");
    settingsContainer.classList.remove("scQualityWHa");
    settingList.classList.remove("playListToLeft");
    playbackList.classList.remove("playListOpen");
    settingsContainer.classList.remove("scPlaybackWHa");
    settingsContainer.classList.remove("scPlaybackRangeWHa");
    playbackList.classList.remove("playListToLeft");
    customRangePlayback.classList.remove("cusRangePlaybackOpen");
    captionList.classList.remove("captionListOpen");
}

setting.addEventListener('click',() => {
    if (settingsContainer.classList.contains("scOpen")) {
        toggleSettingCloseAll();
    } else {
        settingsContainer.classList.add("scOpen");
    }
})


document.addEventListener('click', function handleClickOutsideBox(event) {
    // 👇️ the element the user clicked
    if (!setting.contains(event.target) && !settingsContainer.contains(event.target)) {
        toggleSettingCloseAll();
        clearTimeout(timer);
        hideControlss();
    } 
  });

//setting list function
ambientBtn.addEventListener("click", () => {
    slider.classList.toggle("active");
    ambientMode.classList.toggle("unactive");
});

qualityBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    qualityList.classList.add("qualityListOpen");
    settingsContainer.classList.add("scQualityWHa");
});

qualityCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    qualityList.classList.remove("qualityListOpen");
    settingsContainer.classList.remove("scQualityWHa");
});


playbackSpeedBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    playbackList.classList.add("playListOpen");
    settingsContainer.classList.add("scPlaybackWHa");

});
playbackCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    playbackList.classList.remove("playListOpen");
    settingsContainer.classList.remove("scPlaybackWHa");
});

customLinkRangePlayback.addEventListener('click',() => {
    settingsContainer.classList.remove("scPlaybackWHa");
    settingsContainer.classList.add("scPlaybackRangeWHa");
    playbackList.classList.add("playListToLeft");
    customRangePlayback.classList.add("cusRangePlaybackOpen");
});

playbackRangeCloseBtn.addEventListener('click',() => {
    settingsContainer.classList.add("scPlaybackWHa");
    settingsContainer.classList.remove("scPlaybackRangeWHa");
    playbackList.classList.remove("playListToLeft");
    customRangePlayback.classList.remove("cusRangePlaybackOpen");
});
    
qualitys.forEach(event => {
    let quality_html = `<li data-quality="${event.getAttribute('size')}" tabindex="0" role="button">${event.getAttribute('size')}p</li>`;
    quality_ul.insertAdjacentHTML('afterbegin', quality_html);
});

const quality_li = videoPlayer.querySelectorAll(".settingsContainer [data-label='qualityList'] ul li");
  quality_li.forEach((event) => {
    event.addEventListener('click', (e) => {
      let quality = event.getAttribute('data-quality');
      removeActiveClasses(quality_li);
      event.classList.add('active');

      deafultQuality.addEventListener('click',() => {
        qualityStatus.textContent = `Auto 360p`;
      })

      qualitys.forEach(event => {
        if (event.getAttribute('size') == quality) {
          let video_current_duration = mainVideo.currentTime;
          let video_source = event.getAttribute('src');
          qualityStatus.textContent = `${quality}p`;
          mainVideo.src = video_source;
          mainVideo.currentTime = video_current_duration;
          if (mainVideo.classList.contains("play")) {
            mainVideo.play()
          } else {
            mainVideo.pause()
          }
        }
      })
    })
})
function removeActiveClasses(e) {
    e.forEach((event) => {
      event.classList.remove("active");
    });
}


playback.forEach(playback => {
    playback.addEventListener('click',() => {
        removePlaybackActiveClasses(playback);
        playback.classList.add("active");

        let speed = playback.getAttribute("data-speed");

        rangeCustomPlayback.value = speed * 100;

        let cusPlayback = rangeCustomPlayback.value / 100;
        mainVideo.playbackRate = cusPlayback;
        
        PlaybackRangeValue.textContent = `${cusPlayback}x`;

        playbackStatus.textContent = speed;
        if (speed == 1) {
            playbackStatus.textContent = "Normal";
        }
    })
    
    rangeCustomPlayback.addEventListener('input',() => {
        let cusPlayback = rangeCustomPlayback.value / 100;
        mainVideo.playbackRate = cusPlayback;

        let speed = playback.getAttribute("data-speed");
        PlaybackRangeValue.textContent = `${cusPlayback}x`;
        if (cusPlayback == speed) {
            removePlaybackActiveClasses(playback);
            playback.classList.add("active");
        }

        playbackStatus.textContent = cusPlayback;
        if (cusPlayback == 1) {
            playbackStatus.textContent = "Normal";
        }
    })
})

function removePlaybackActiveClasses() {
    playback.forEach(playback => {
        playback.classList.remove("active");
    })
}




CaptionListBtn.addEventListener('click',() => {
    settingList.classList.add("playListToLeft");
    captionList.classList.add("captionListOpen");
    settingsContainer.classList.add("scQualityWHa");
})

captionCloseBtn.addEventListener('click',() => {
    settingList.classList.remove("playListToLeft");
    settingsContainer.classList.remove("scQualityWHa");
    captionList.classList.remove("captionListOpen");
})


if (tracks.length != 0) {
    caption_labels.insertAdjacentHTML(
        "afterbegin",
        `<li data-track="Off" tabindex="0" role="button" class="active">Off</li>`
      );
    for (let i = 0; i < tracks.length; i++) {
      let trackLi = `<li data-track="${tracks[i].label}" tabindex="0" role="button">${tracks[i].label}</li>`;
      caption_labels.insertAdjacentHTML("beforeend", trackLi);
    }
}
const caption = captionList.querySelectorAll("ul li");

caption.forEach((event) => {
    let label = event.getAttribute('data-track');
    let Off = "Off";
    event.addEventListener("click", () => {
        removeActiveClasses(caption);
        event.classList.add("active");
        changeCaption(event);
        caption_text.innerHTML = "";
        CaptionStatus.textContent=`${label}`;
        if (label == Off) {
            captionIcon.classList.remove("active")
        } else {
            captionIcon.classList.add("active")
        }
  });
});

let track = mainVideo.textTracks;

function changeCaption(lable) {
  let trackLable = lable.getAttribute("data-track");
  for (let i = 0; i < track.length; i++) {
   track[i].mode = "disabled";
    if (track[i].label == trackLable) {
     track[i].mode = "showing";
   }
 }
}

let caption_text = videoPlayer.querySelector(".caption_text");
for (let i = 0; i < track.length; i++) {
  track[i].addEventListener("cuechange", () => {
    if (track[i].mode === "showing") {
      if (track[i].activeCues[0]) {
        let span = `<span><mark>${track[i].activeCues[0].text}</mark></span>`;
        caption_text.innerHTML = span;
      } else {
        caption_text.innerHTML = "";
      }
    }
  });
}

//caption btn function {
    captionBtn.addEventListener('click',() => {
        if (captionIcon.classList.contains("active")) {
            captionIcon.classList.remove("active")
        } else {
            captionIcon.classList.add("active")
        }
});
//}


//}

//pictureinpicture btn function {
pictureInPicture.addEventListener('click',()=>{
    togglepictureInPicture()
});

function togglepictureInPicture() {
    mainVideo.requestPictureInPicture();
}
//}


theaterMode.addEventListener('click',() => {
    toggleTheatherMode()
});

function toggleTheatherMode() {
    if (videoPlayer.classList.contains("theater")) {
        videoPlayer.classList.remove("theater");
        theaterIcon.src="./assets/icons/TheaterMode.svg";
        theaterIcon.title = "Theater Mode"
    } else {
        videoPlayer.classList.add("theater");
        theaterIcon.src="./assets/icons/TheaterModeExit.svg"
        theaterIcon.title = "Exit Theater Mode"       
    }
}

//fullscreen btn function {
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
        screen.orientation.lock("landscape-primary");

        if (mainVideo.paused) return;
        timer = setTimeout(() => {
                controllers.classList.remove('active');
                controllersMobile.classList.remove('active');
                headerControllers.classList.remove('active');
        },0)
      }else{
        document.exitFullscreen();
        screen.orientation.unlock();
        
        if (mainVideo.paused) return;
        timer = setTimeout(() => {
                controllers.classList.remove('active');
                controllersMobile.classList.remove('active');
                headerControllers.classList.remove('active');
        },0)
      }
}
fullscreen.addEventListener('click', toggleFullscreen);
fullscreenMobile.addEventListener('click', toggleFullscreen);
mainVideoClickF.addEventListener("dblclick",  toggleFullscreen);

videoPlayer.classList.contains("fulscreenCustom");
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenMobileIcon.src = "./assets/icons/Fullscreen-icon.svg"
      fullscreenIcon.title = "Enter Fullscreen"
      videoPlayer.classList.remove("fulscreenCustom");
      videoPlayer.classList.remove("fulscreenMobileCustom");
      mainVideo.classList.remove("fulscreenCustom");
      controllersContainer.classList.remove("activeFullscreen");
      headerControllers.classList.remove("activeFullscreen");
      mainVideoLeftMinorSensor.classList.remove("active");
      videoFullscreenTitle.classList.remove('active');
    } else {
      fullscreenIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenMobileIcon.src = "./assets/icons/Fullscreen-Exit-icon.svg"
      fullscreenIcon.title = "Exit Fullscreen"
      videoPlayer.classList.add("fulscreenCustom");
      videoPlayer.classList.add("fulscreenMobileCustom");
      mainVideo.classList.add("fulscreenCustom");
      controllersContainer.classList.add("activeFullscreen");
      headerControllers.classList.add("activeFullscreen");
      mainVideoLeftMinorSensor.classList.add("active");
      videoFullscreenTitle.classList.add('active');
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
      fullscreenIcon.src = "./assets/icons/Fullscreen-icon.svg"
    }
});
//}

//two time speed event
let eventTimerId;
function toggleTwoTimeSpeed() {
    eventTimerId = setTimeout(function () {
		
    twoTimeSpeedNotif.style.opacity="1";
	}, 700);
};
function toggleEndTwoTimeSpeed() {
    clearTimeout(eventTimerId);
    twoTimeSpeedNotif.style.opacity="0";

};
mainVideoClickF.addEventListener('mousedown', toggleTwoTimeSpeed);
mainVideoClickF.addEventListener('mouseup', toggleEndTwoTimeSpeed);
videoPlayer.addEventListener('mouseup', toggleEndTwoTimeSpeed);
videoContainer.addEventListener('mouseup', toggleEndTwoTimeSpeed);

blockRewind.addEventListener('touchstart', toggleTwoTimeSpeed);
blockRewind.addEventListener('touchend', toggleEndTwoTimeSpeed);
blockCenter.addEventListener('touchstart', toggleTwoTimeSpeed);
blockCenter.addEventListener('touchend', toggleEndTwoTimeSpeed);
blockForward.addEventListener('touchstart', toggleTwoTimeSpeed);
blockForward.addEventListener('touchend', toggleEndTwoTimeSpeed);

//mouse touch control show hide event function {
progressBar.onmouseover = progressBar.onmouseout = handler;
fastRewind.onmouseover = fastRewind.onmouseout = handler;
fastForward.onmouseover = fastForward.onmouseout = handler;
volumeBtn.onmouseover = volumeBtn.onmouseout = handler;
volumeRange.onmouseover = volumeRange.onmouseout = handler;
autoplay.onmouseover = autoplay.onmouseout = handler;
captionBtn.onmouseover = captionBtn.onmouseout = handler;
setting.onmouseover = setting.onmouseout = handler;
pictureInPicture.onmouseover = pictureInPicture.onmouseout = handler;
theaterMode.onmouseover = theaterMode.onmouseout = handler;
fullscreen.onmouseover = fullscreen.onmouseout = handler;

function handler(event) {
    if (event.type == 'mouseover') {
        progressBar.classList.add('active');
      }
      if (event.type == 'mouseout') {
        progressBar.classList.remove('active');
      }
}

let timer;
const hideControlss = () => {
    if (mainVideo.paused) return;
    timer = setTimeout(() => {
        if (mainVideo.paused) return;
        if (settingsContainer.classList.contains("scOpen") 
            || progressBar.classList.contains('active')) {
            headerControllers.classList.add('active');
            controllers.classList.add('active');
            controllersMobile.classList.add('active');
        } else {
            headerControllers.classList.remove('active');
            controllers.classList.remove('active');
            controllersMobile.classList.remove('active');
        }
    },3000)
};

function toggleController() {
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
    clearTimeout(timer);
    hideControlss();
}

function toggleControllerUnactive() {
    if (mainVideo.paused) return;
    if (settingsContainer.classList.contains("scOpen") 
        || fastForward.classList.contains('active')) {
        headerControllers.classList.add('active');
        controllers.classList.add('active');
        controllersMobile.classList.add('active');
    } else {
        headerControllers.classList.remove('active');
        controllers.classList.remove('active');
        controllersMobile.classList.remove('active');
    }
}

mainVideoClickF.addEventListener('mousemove',() => {
    toggleController()
});
headerControllers.addEventListener('mouseover',() => {
    toggleController()
});
controllersMobile.addEventListener('mousemove',() => {
    toggleController()
});
playPauseMobile.addEventListener('click',() => {
    toggleController()
});
controllers.addEventListener('mouseover',() => {
    toggleController()
});
rangeProgress.addEventListener('focus',() => {
    toggleController()
    rangeProgress.classList.add("active");
});
rangeProgress.addEventListener('focusout',() => {
    rangeProgress.classList.remove("active");
});
rangeProgress.addEventListener('input',() => {
    toggleController()
});
fastRewind.addEventListener('focus',() => {
    toggleController()
});
fastRewind.addEventListener('click',() => {
    toggleController()
});
playPause.addEventListener('focus',() => {
    toggleController()
});
playPause.addEventListener('click',() => {
    toggleController()
});
fastForward.addEventListener('focus',() => {
    toggleController()
});
fastForward.addEventListener('click',() => {
    toggleController()
});
volumeBtn.addEventListener('focus',() => {
    toggleController()
});
volumeBtn.addEventListener('click',() => {
    toggleController()
});
volumeRange.addEventListener('focus',() => {
    toggleController()
});
volumeRange.addEventListener('input',() => {
    toggleController()
});
autoplay.addEventListener('focus',() => {
    toggleController()
});
autoplay.addEventListener('click',() => {
    toggleController()
});
captionBtn.addEventListener('focus',() => {
    toggleController()
});
captionBtn.addEventListener('click',() => {
    toggleController()
});
setting.addEventListener('focus',() => {
    toggleController()
});
setting.addEventListener('click',() => {
    toggleController()
});
pictureInPicture.addEventListener('focus',() => {
    toggleController()
});
pictureInPicture.addEventListener('click',() => {
    toggleController()
});
theaterMode.addEventListener('focus',() => {
    toggleController()
});
theaterMode.addEventListener('click',() => {
    toggleController()
});
fullscreen.addEventListener('focus',() => {
    toggleController()
});
fullscreen.addEventListener('click',() => {
    toggleController()
});

mainVideoClickF.addEventListener('mouseout',() => {
    toggleControllerUnactive()
});
mainVideoLeftMinorSensor.addEventListener('mousemove',() => {
    toggleControllerUnactive()
});
controllers.addEventListener('mouseout',() => {
    toggleControllerUnactive()
});

mainVideo.addEventListener('ended',end);
function end(){
    headerControllers.classList.add('active');
    controllers.classList.add('active');
    controllersMobile.classList.add('active');
};
//}






});//end