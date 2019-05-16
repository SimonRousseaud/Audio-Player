let M = {
  songs : [
    { src: "house/son1.mp3",
      title: "Perfect 10",
      artiste: "Unknown Brain",
      img: "house/son1.png",
    },
    {
      src: "house/son2.mp3",
      title: "Won't Look Back",
      artiste: "BEAUZ & Momo",
      img: "house/son2.png",
    },
    {
      src: "house/son3.mp3",
      title: "Chasing Ghosts",
      artiste: "Distrion",
      img: "house/son3.png",
    },
    {
      src: "house/son4.mp3",
      title: "Flashes",
      artiste: "NIVIRO",
      img: "house/son4.png",
    },
    {
      src: "house/son5.mp3",
      title: "New World",
      artiste: "KIRA",
      img: "house/son5.png",
    },
    {
      src: "house/son6.mp3",
      title: "Modular",
      artiste: "Rob Gasser",
      img: "house/son6.png",
    },
    {
      src: "house/son7.mp3",
      title: "Moonlight",
      artiste: "Jim Yosef",
      img: "house/son7.png",
    },
    {
      src: "house/son8.mp3",
      title: "Clear My Head",
      artiste: "Ellis",
      img: "house/son8.png",
    },
    {
      src: "house/son9.mp3",
      title: "Get My Love",
      artiste: "NIVIRO",
      img: "house/son9.png",
    }
  ],
  active: 0,
  getSongActive: function() {
    return M.songs[M.active]
  },
  getAllSongs: function() {
    return M.songs
  },

  previousSong: function() {
    M.active--
    if (M.active < 0 )
    M.active = M.songs.length-1
  },

  nextSong: function() {
    M.active++
    if(M.active >= M.songs.length)
    M.active = 0
  },

  choixSong: function() {
    window.alert("Bonjour !");
  },
  setActiveSong: function(id) {
    M.active = id
  }


}

let C= {
  init: function() {
    V.init()
    V.initMenu(M.getAllSongs())
    V.bindEvent()
    V.renderAudio(M.getSongActive())
  },

  handler__prevSong: function() {
    M.previousSong()
    V.setInfo(M.getSongActive())
    V.renderAudio(M.getSongActive())
    V.btnPlay.setAttribute("src", "icones/svg/pause.svg")
    V.myAudio.play()
  },
  handler__nextSong: function() {
    M.nextSong()
    V.setInfo(M.getSongActive())
    V.renderAudio(M.getSongActive())
    V.btnPlay.setAttribute("src", "icones/svg/pause.svg")
    V.myAudio.play()
  },
  handler__finSong: function() {
    C.handler__nextSong()
  },


  handler__menu: function(e) {
      if(e.currentTarget != e.target) M.setActiveSong(e.target.dataset.idsong);
      V.handler__underlign();
      e.target.classList.toggle("menu__song_toggle");
      V.renderAudio(M.getSongActive())
      V.setInfo(M.getSongActive())
      V.btnPlay.setAttribute("src", "icones/svg/pause.svg")
      V.myAudio.play()
  }
}

let V= {
  myAudio: undefined,
  btnPlay: undefined,
  btnStop: undefined,
  btnMute: undefined,
  btnVol: undefined,

  init: function() {

    V.divInfo = document.querySelector(".info")
    V.btnMute = document.querySelector(".player__sound__button__img")
    V.choixChanson = document.querySelectorAll(".chanson")
    V.btnStop = document.querySelectorAll(".player__btn__img")[0]
    V.previous = document.querySelectorAll(".player__btn__img")[1]
    V.btnPlay = document.querySelectorAll(".player__btn__img")[2]
    V.next = document.querySelectorAll(".player__btn__img")[3]
    V.repeat = document.querySelectorAll(".player__btn__img")[4]
    V.btnVol = document.querySelector(".player__vol")
    V.bar = document.querySelector(".player__bar")
    V.progress = document.querySelector(".player__progress")
    V.temps = document.querySelector(".player__temps")
    V.myAudio = document.querySelector(".player__audio")
    V.playerTitle = document.querySelector(".playerTitle")
    V.playerImg = document.querySelector(".player__img")
    V.menuList = document.querySelector(".menu__list")
  },

  bindEvent: function() {
    V.previous.addEventListener("click", C.handler__prevSong)
    V.next.addEventListener("click", C.handler__nextSong)
    V.btnPlay.addEventListener("click", V.handler__PP)
    V.btnStop.addEventListener("click", V.handler__stop)
    V.btnVol.addEventListener("input", V.handler__vol)
    V.progress.addEventListener("click", V.handler__clickProgress)
    V.myAudio.addEventListener("timeupdate", V.handler__update)
    V.myAudio.addEventListener("ended", C.handler__finSong)
    V.btnMute.addEventListener("click", V.handler__mute)
    V.menuList.addEventListener("click", C.handler__menu)
    V.repeat.addEventListener("click",V.handler__repeat)
  },
  initMenu: function(data) {
    for (let i = 0; i<data.length; i++) {
      let tmpLiItem = document. createElement("li")
      if (i==0)
        tmpLiItem.classList.add("menu__song_toggle")
      tmpLiItem.classList.add("menu__song")
      tmpLiItem.textContent = data[i].title
      tmpLiItem.dataset.idsong = i
      V.menuList.appendChild(tmpLiItem)
    }
  },
  renderAudio : function(data) {
    V.temps.textContent="00:00 / 00:00"
    V.myAudio.src = data.src
    V.playerTitle = data.title
    V.playerImg.src = data.img
    V.bar.style.width = 0
  },

  handler__PP: function() {
    if (V.myAudio.paused) {
      V.myAudio.play()
      V.btnPlay.setAttribute("src", "icones/svg/pause.svg")
    }
    else {
      V.myAudio.pause()
      V.btnPlay.setAttribute("src", "icones/svg/play.svg")
    }
  },
  handler__stop: function() {
      V.myAudio.pause()
      V.myAudio.currentTime = 0
      V.btnPlay.setAttribute("src", "icones/svg/play.svg")
      V.btnStop.disabled = true
  },
  handler__mute: function() {
    if (V.myAudio.muted) {
      V.myAudio.muted= false
      V.btnMute.setAttribute("src", "icones/svg/volume.svg")
      V.btnVol.value = V.myAudio.volume
    }
    else {
      V.myAudio.muted = true
      V.btnMute.setAttribute("src", "icones/svg/mute.svg")
      V.btnVol.value = 0
    }
  },
  handler__vol: function() {
    V.myAudio.volume = V.btnVol.value
  },

  handler__update: function() {

    let t = V.myAudio.currentTime
    let tmin = Math.floor(t/60)
    let tsec = Math.floor(t%60)

    let tt = V.myAudio.duration
    let ttmin = Math.floor(tt/60)
    let ttsec = Math.floor(tt%60)
    let percent = t/tt*100

    if (tmin <10) {
      tmin = "0" + tmin
    }
    if (tsec < 10) {
      tsec = "0" + tsec
    }
    if (ttmin < 10) {
      ttmin = "0" + ttmin
    }
    if (ttsec < 10) {
      ttsec = "0" + ttsec
    }

    V.bar.style.width = percent+"%"
    V.temps.textContent = tmin + ":" + tsec + " / " + ttmin + ":" + ttsec
  },

  handler__clickProgress: function(ev) {

    let posX = ev.pageX - ev.target.offsetLeft
    let t = V.progress.offsetWidth
    let pos = posX / t * V.myAudio.duration
    V.myAudio.currentTime = pos

    console.log(V.progress.style.width)
  },

  setInfo: function(data) {
    V.photo_chanson = document.querySelector(".player__photo")
    V.photo_chanson.src = data.img
    V.nom_chanson = document.querySelector(".player__nom_chanson")
    V.nom_chanson.innerHTML = data.title
    V.nom_artiste = document.querySelector(".player__nom_artiste")
    V.nom_artiste.innerHTML = data.artiste
  },
  handler__underlign: function() {
    V.exActif = document.querySelector('.menu__song_toggle')
    V.exActif.classList.remove("menu__song_toggle");
  }
}

let App = {
  model: M,
  controler: C,
  view: V,
}

App.controler.init()
