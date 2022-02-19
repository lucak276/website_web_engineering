// Wenn gescrolled wird, "sticky navbar" ausführen
window.onscroll = function() {stickynavbar()};

//topnav holen
let topnav = document.getElementById("topnav");

//Offset von topnav holen
let sticky = topnav.offsetTop;

//"sticky" wird hinzugefügt und ggf entfernt
function stickynavbar() {
  if (window.scrollY >= sticky) {
    topnav.classList.add("sticky")
  } else {
    topnav.classList.remove("sticky");
  }
}

//header active hover
let elContainer = document.getElementById("elAct")

let hdrs = elContainer.getElementsByClassName("el")

for (let i=0; i <hdrs.length; i++)
    hdrs[i].addEventListener("click",function() {

        let current = document.getElementsByClassName("active");

        if(current.length>0 ){
            current[0].className = current[0].className.replace("active", "");
        }
        this.className += "active";
    });


