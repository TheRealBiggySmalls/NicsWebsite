

function playOnOpen(){
    var audio = document.getElementById("backgroundSound");
    audio.play();
}

function unMute(){
    document.getElementById('backgroundSound').muted = false;
}

/*document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function () {
        unMute();
    }, 1000);
});*/

window.onload = function() {
    document.getElementById("backgroundSound").muted=false;
};

function playNPCNoise() {
    var soundArray = [
        "npc1.mp3",
        "npc2.mp3",
        "npc3.mp3",
        "npc4.mp3",
        "npc5.mp3",
        "npc6.mp3",
        "npc7.mp3",
        "npc8.mp3",
        "npc9.mp3",
        "npc10.mp3",
        "npc11.mp3",
        "npc12.mp3",
        "npc13.mp3",
        "npc14.mp3"        
    ];

    //get a random sound
    var randomIndex = Math.floor(Math.random() * soundArray.length);
    var randomSound = soundArray[randomIndex];

    var audio = document.getElementById("randomSound");
    audio.src = "{{ url_for('static', filename='resources') }}/" + randomSound, type="audio/mp3";
    audio.play();
}
