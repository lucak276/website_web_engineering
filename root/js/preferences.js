//if scrolled execute sticky_navbar function
window.onscroll = function() {sticky_navbar()};

// get top_nav
let top_nav = document.getElementById("top_nav");

//get offset by top_nav
let sticky = top_nav.offsetTop;

//sticky will be added or removed
function sticky_navbar() {
  if (window.scrollY >= sticky) {
    top_nav.classList.add("sticky")
  } else {
    top_nav.classList.remove("sticky");
  }
}

//header active hover
let el_container = document.getElementById("el-act")

let headers = el_container.getElementsByClassName(".el")

for (let i=0; i <headers.length; i++)
    headers[i].addEventListener("click",function() {

        let current = document.getElementsByClassName("active");

        if(current.length>0 ){
            current[0].className = current[0].className.replace("active", "");
        }
        this.className += "active";
    });

// preference buttons on click event to mark them as checked
let list = document.getElementById("discover_list")
let buttons = list.getElementsByClassName("prefBtn")
console.log(buttons)
for (let i=0; i <buttons.length; i++)
    buttons[i].addEventListener("click",function() {

        let current = document.getElementsByClassName("chosen");

        if(current.length>0 ){
            current[0].className = current[0].className.replace("chosen", "");
        }
        this.className += "chosen";
    });

