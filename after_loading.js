let playMusic = new Audio("https://the-green-one-game.s3.us-west-004.backblazeb2.com/music.mp3");
window.onload = function () {
    playMusic.play();
    playMusic.loop = true;
    var intro = document.getElementById('intro');
    setTimeout(function () {
        intro.style.display = "none";
    }, 2000);
};
function turnMusic() {
    playMusic.pause();
}
$(document).ready(function () {
    getDeviceWidth();
    getVersion();
    $(".frame").hover(function () {
        $("#DownloadNote").slideDown(1300);
    }, function () {
        $("#DownloadNote").slideUp(1300);
    });
});
function getVersion() {
    const url = "https://MohabJoumaa.github.io";
    var versionReq = new XMLHttpRequest();
    versionReq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var version = this.responseText;
            $("#version").html(" " + version);
        }
    };
    versionReq.open("GET", url, true);
    versionReq.send();
}
function paint() {
    var i;
    const canvas = document.getElementById("graphics");
    const graphics = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var screenWidth = canvas.width;
    var screenHeight = canvas.height;
    const Tgos = new Image();
    Tgos.src = "https://the-green-one-game.s3.us-west-004.backblazeb2.com/tgo.png";
    for (i = 0; i <= 30; i++) {
        var tgoX = Math.floor(Math.random() * screenWidth);
        var tgoY = Math.floor(Math.random() * screenHeight);
        graphics.drawImage(Tgos, tgoX, tgoY);
    }
    tgoY -= 4;
}
window.setInterval(paint, 100);