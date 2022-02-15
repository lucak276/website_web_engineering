// Wenn gescrolled wird, "sticky navbar" ausführen
window.onscroll = function() {sticknavbar()};

//topnav holen
var topnav = document.getElementById("topnav");

//Offset von topnav holen
var sticky = topnav.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickynavbar() {
  if (window.pageYOffset >= sticky) {
    topnav.classList.add("sticky")
  } else {
    topnav.classList.remove("sticky");
  }
}
btn.addEventListener(
    'mouse over',
    function (hoverMe) {
      btn.style.color="";

    },
    false);
