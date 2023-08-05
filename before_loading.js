let getPositionXOfIntro = null;
function DisplayOff() {
    getPositionXOfIntro = document.getElementById("intro");
    toTurn();
}
function toTurn() {
    let displayOFF = false;
    if ($('#intro').css('left') === '500px') {
        displayOFF = true;
    }
    if (displayOFF === true) {
        getPositionXOfIntro.style.display = 'none';
    }
}
let getID = document.getElementById("visitButton");
if (getID !== null)
    getID.addEventListener("click", FacebookVisitPage());
function FacebookVisitPage() {
    window.open("https://www.facebook.com/mohab.jmah");
}
function getDeviceWidth() {
    let isMobile = false;
    if ($('#check').css('display') === 'none') {
        isMobile = true;
    }
    if (isMobile === true) {
        $.get('mobile_version.html', function (htmlCode) {
            document.write(htmlCode);
        });
    }
}