/**
 * function to get googleUser data
 * @param {*} googleUser 
 * not yet implemented
 */

function onSignIn(googleUser) {
var profile = googleUser.getBasicProfile();
console.log("ID: " + profile.getId()); 
console.log('Full Name: ' + profile.getName());
console.log('Given Name: ' + profile.getGivenName());
console.log('Family Name: ' + profile.getFamilyName());
console.log("Image URL: " + profile.getImageUrl());
console.log("Email: " + profile.getEmail());

/**
 * id which gets passed to backend
 */
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);
}

/**
 * change active steps function
 * gets html elements through doc selectors and changes them accordingly
 */
steps = document.querySelector('.container-steps').querySelectorAll('.btn-steps');
console.log(steps);

var stepsheader = document.getElementById("stepsheader");
var stepstext = document.getElementById("stepsbodytext");
var button = document.getElementById("stepsbutton");
var transition_container = document.getElementById("transition_container");
var mycurrentstep = 1;
/**
 * 
 */
steps.forEach(element => {
  /**
   *
   */
  element.addEventListener('click', function(){
    steps.forEach(step=>step.classList.remove('active'))
    this.classList.add('active');
    if (step=>step.classList != this.classList){
      transition_container.classList.add('hide');
      setTimeout(function () {
        transition_container.classList.add('fade-in');
        transition_container.classList.remove('hide');
      }, 400);
      transition_container.classList.remove('fade-in')
    }
  })
});


/**
 * function which defines
 * specific html content changes for each step
 * 
 */
function changetexttostep1() {
  if(mycurrentstep != 1)
  {
    stepsheader.innerHTML = "Schritt 1: Registiere dich";
    mycurrentstep = 1
    stepstext.innerHTML = "Um einem Projekt beizutreten erstelle dir ein Profil.\
                           Erstelle dir deinen individuellen Benutzernamen und ein sicheres Passwort,\
                           noch ein paar Angaben zu dir und los gehts!\
                           "
    button.innerHTML = 'Registieren'
  }
}

function changetexttostep2() {
  if(mycurrentstep != 2)
  {
    mycurrentstep = 2
    stepsheader.innerHTML = "Schritt 2: Wähle deine Präferenzen";
    stepstext.innerHTML = "Wähle deine Lieblingsthemen und Interessen aus.\
                           Von Alltagsanwendungen bis hinzu \
                           futuristischen Themen wie AI oder Quantum Computing findest du hier alles."
    button.innerHTML = 'Registrieren'
  }
}

function changetexttostep3() {
  if(mycurrentstep != 3)
  {
    mycurrentstep = 3
    stepsheader.innerHTML = "Schritt 3: Trete einem Projekt bei";
    stepstext.innerHTML = "Nach dem du deine Lieblingsthemen ausgesucht hast \
        kannst du dir nun ein Projekt deiner Wahl aussuchen oder dein eigenes erstellen."
    button.innerHTML = 'Registrieren'
  }
}



/**
 * functions to change "hello world" to "Herzlich Willkommen"
 * by replacing each character with binary code
 */
var char = ['0', '1']
var list = ['print("hello world!")'];
var list2 = ['Herzlich Willkommen!']
var changenum = 0
var changenum2 = 21
createlist()


function createlist(){

  for(let i = 0; i < list[0].length; i++){
    var randomNumber = Math.round(Math.random() * (char.length-1));

    var Helloworld = list[i].replace(list[0].charAt(i), char[randomNumber])
    var Herzlichwillkommen = list2[i].replace(list2[0].charAt(i), char[randomNumber])
    list.push(Helloworld)
    list2.push(Herzlichwillkommen)
}}


setTimeout(function () {
  var t = setInterval(changecontent, 50)
}, 1000);


function changecontent(){
    $('#change-content').html(list[changenum]);
    changenum++

    if (changenum > list[0].length){
      $('#change-content').html(list2[changenum2]);
      changenum2--
    }
}
