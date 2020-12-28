var navButton = document.querySelector('.sideBar-button');
var navMenu = document.querySelector('.sideBar-menu');
var win = window;

function openMenu(event) {
  
  navButton.classList.toggle('active');
  navMenu.classList.toggle('active');

  event.preventDefault();
  event.stopImmediatePropagation();
}
  
function closeMenu(event) {
  if (navButton.classList.contains('active')) {
    navButton.classList.remove('active');
    navMenu.classList.remove('active');
  }
}
  navButton.addEventListener('click', openMenu, false);

win.addEventListener('click',closeMenu, false);


//music player part


let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let sideTitle = document.querySelector('#sideShow-title')
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');
let sideArtist = document.querySelector('#sideShow-artist')



let timer;
let autoplay = 1;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "Bekhand",
     path: "music/Bekhand.mp3",
     img: "img/Kabood.jpg",
     singer: "Ashvan"
   },
   {
     name: "Daram Ashegh Misham",
     path: "music/Daram Ashegh Misham.mp3",
     img: "img/Daram Ashegh Misham.jpg",
     singer: "Ashvan"
   },
   {
     name: "Ghalbam joonam",
     path: "music/Ghalbam Joonam.mp3",
     img: "img/Ghalbam joonam.jpg",
     singer: "Ashvan"
   },
   {
     name: "Gharghe Gerye",
     path: "music/Gharghe_Gerye.mp3",
     img: "img/Gharghe_Gerye.jpg",
     singer: "Ashvan"
   },
   {
    name: "Sheyda",
    path: "music/Sheyda.mp3",
    img: "img/Sheyda.jpg",
    singer: "Ashvan"
  },
   {
     name: "Moghaser",
     path: "music/Moghaser.mp3",
     img: "img/Moghaser.jpg",
     singer: "Ashvan"
   }
];


// All functions
// $(".album-poster").on('click' , function (e) {
//     var dataSwitchId = $(this).attr('data-switch');

//     ap.list.switch(dataSwitchId); 
//     ap.play();
//     $("#aplayer").addClass('showPlayer');
// });

// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();
  
	track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  sideTitle.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    sideArtist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<img src="./img/pause.png">';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<img src="./img/playyy.png">';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==0){
       autoplay = 1;
       auto_play.style.background = "rgba(83, 83, 83, 0.158)" ;
	}else{
       autoplay = 0;
       auto_play.style.background ="transparent" ;
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<img src="./img/playyy.png">';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }