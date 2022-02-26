//IMPORTANT NOTE https://developers.google.com/identity/sign-in/web

function onSignIn(googleUser) {
// Useful data for your client-side scripts:
var profile = googleUser.getBasicProfile();
console.log("ID: " + profile.getId()); // Don't send this directly to your server!
console.log('Full Name: ' + profile.getName());
console.log('Given Name: ' + profile.getGivenName());
console.log('Family Name: ' + profile.getFamilyName());
console.log("Image URL: " + profile.getImageUrl());
console.log("Email: " + profile.getEmail());

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);
}



//change active steps
steps = document.querySelector('.container-steps').querySelectorAll('.btn-steps');
console.log(steps);
var stepsheader = document.getElementById("stepsheader");
var stepstext = document.getElementById("stepsbodytext");
var button = document.getElementById("stepsbutton");
var transition_container = document.getElementById("transition_container");
var mycurrentstep = 1;

steps.forEach(element => {
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

function changetexttostep1() {
  if(mycurrentstep != 1)
  {
    stepsheader.innerHTML = "Schritt 1: Registiere dich";
    mycurrentstep = 1
    stepstext.innerHTML = "Bevor du einem Projekt beitreten kannst, solltest du dir ein Konto anlegen.\
    Es gibt verschiedene Programmiersprachen. Bevor du einem Projekt beitritts solltest\
    du dich für eine Programmiersprache interessieren oder zumindest einen"
    button.innerHTML = 'Registieren'
  }
}

function changetexttostep2() {
  if(mycurrentstep != 2)
  {
    mycurrentstep = 2
    stepsheader.innerHTML = "Schritt 2: Augen zu";
    stepstext.innerHTML = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.\
    Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultric"
    button.innerHTML = 'Mach'
  }
}

function changetexttostep3() {
  if(mycurrentstep != 3)
  {
    mycurrentstep = 3
    stepsheader.innerHTML = "Schritt 3: Spring vom Hochhaus";
    stepstext.innerHTML = "nec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\
    consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\
    In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede\
    mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi"
    button.innerHTML = 'LELELELELEL'
  }
}



//hello world change to Herzlich willkommen
var char = ['0', '1']
var list = ['print("hello world!")'];
var list2 = ['Herzlich Willkommen! ']
var changenum = 0
var changenum2 = 21
createlist()


function createlist(){

  for(let i = 0; i < list[0].length; i++){
    var randomNumber = Math.round(Math.random() * (char.length-1));

    Helloworld = list[i].replace(list[0].charAt(i), char[randomNumber])
    Herzlichwillkommen = list2[i].replace(list2[0].charAt(i), char[randomNumber])
    list.push(Helloworld)
    list2.push(Herzlichwillkommen)
}}


setTimeout(function () {
  var t = setInterval(haeee, 50)
}, 1000);


function haeee(){
    $('#change-content').html(list[changenum]);
    changenum++

    if (changenum > list[0].length){
      $('#change-content').html(list2[changenum2]);
      changenum2--
    }
}
