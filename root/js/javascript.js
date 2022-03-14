/**
 * change active step on button press
 * gets html elements through doc selectors and changes them accordingly
 */
steps = document.querySelector('.container-steps').querySelectorAll('.btn-steps');
console.log(steps);

var stepsheader = document.getElementById("stepsheader");
var stepstext = document.getElementById("stepsbodytext");
var button = document.getElementById("stepsbutton");
var transition_container = document.getElementById("transition_container");
var mycurrentstep = 1;

steps.forEach(element => {
  /**
   * adds transition effects to container
   *@this {steps} gets elements by classname through query via DOM
   *@member {transition_container} gets elements with name transition_container
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
 * @member {stepsheader} accesses html content through DOM and changes it
 * @member {mycurrentstep} changes current step to step 1
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
  }
}

/**
 * @member{stepsheader} accesses html content through DOM and changes it
 * @member{mycurrentstep} changes step to 2
 */
function changetexttostep2() {
  if(mycurrentstep != 2)
  {
    mycurrentstep = 2
    stepsheader.innerHTML = "Schritt 2: Wähle deine Präferenzen";
    stepstext.innerHTML = "Wähle deine Lieblingsthemen und Interessen aus.\
                           Von Alltagsanwendungen bis hinzu \
                           futuristischen Themen wie AI oder Quantum Computing findest du hier alles."
  }
}
/**
 * @member{stepsheader} accesses html content through DOM and changes it
 * @member{mycurrentstep} changes step to 3
 */
function changetexttostep3() {
  if(mycurrentstep != 3)
  {
    mycurrentstep = 3
    stepsheader.innerHTML = "Schritt 3: Trete einem Projekt bei";
    stepstext.innerHTML = "Nach dem du deine Lieblingsthemen ausgesucht hast \
        kannst du dir nun ein Projekt deiner Wahl aussuchen oder dein eigenes erstellen."
  }
}



/**
 * functions to change "hello world" to "Herzlich Willkommen"
 * by replacing each character with random binary code
 * replayces character by character the text and pushes each updated word into 2 diffent lists
 * @member {char}
 * @member {list} text- list for the rotation from print("helloworld") to only zeros and ones.
 * @member {list2} text - list for the rotation from "Herzlich Willkommen!" to only zeros and ones.
 * @member {changenum2} holds 21 as value
 * @member {changenum} holds 0 as value
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
/**
 * sets timeout of "Herzlich Willkommen" rotation and then starts it in the interval 50
 * @type {number}
 */
setTimeout(function () {

  var t = setInterval(changecontent, 50)
}, 1000);

/**
 * change heading to zeros and ones from appended list
 *  @member {changenum}
 *  @member {changenum2}
 */
function changecontent(){
    $('#change-content').html(list[changenum]);
    changenum++

    if (changenum > list[0].length){
      $('#change-content').html(list2[changenum2]);
      changenum2--
    }
}
