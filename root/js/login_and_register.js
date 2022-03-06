/* Login */

function login() {
    // Check user info
    let username = document.getElementById("usernameinput").value;
    let password = document.getElementById("passwordinput").value;
    let userfromlist = 'tobi'
    let passwordfromlist = 'homogeil'

    console.log(username);
    console.log(password);
    
    if (username == userfromlist && password == passwordfromlist) {
        console.log("Erfolgreich eingeloggt");
        window.location.href = window.location.href.replace("/html/loginpage.html", "/html/401_page.html");
    }

    else if (password.length <= 0 && username.length <= 0) {
        ErrorMessage('Bitte gib deinen Nutzernamen und Passwort ein', "Login")
    }

    else if (username.length > 0 && username !== userfromlist) {
        ErrorMessage('Dieser Nutzer scheint nicht zu existieren', "Login");
    }

    else if (password.length > 0 && password !== passwordfromlist){
        ErrorMessage('Dein Passwort scheint nicht richtig zu sein', "Login")
    }

    else{
        ErrorMessage('Ein unbekannter Fehler ist aufgetreten', "Login")
    }
  }

function ErrorMessage(error, registerorloginpage) {
    if (registerorloginpage == "Login") {
        var wrong_password_text = document.getElementById("error-text");
        var glass_container = document.getElementById("glasscontainer-login")

        wrong_password_text.classList.remove("remove")
        wrong_password_text.innerHTML = error;
        glass_container.classList.add('shake-container-red');
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }
    else if (registerorloginpage == "Register") {
        var wrong_password_text = document.getElementById("error-text-register");
        var glass_container = document.getElementById("glasscontainer-register");

        wrong_password_text.classList.remove("remove")
        wrong_password_text.innerHTML = error;
        glass_container.classList.add('shake-container-red');
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }
}
  

  /* Register */
  function register() {
    // Check user info
    let reg_firstname = document.getElementById("register_firstname").value;
    let reg_secondname = document.getElementById("register_secondname").value;
    let reg_username = document.getElementById("register_username").value;
    let reg_password= document.getElementById("register_password").value;
    let reg_passwordrep = document.getElementById("register_password_repetition").value;

    let gender = "";
    let checkedman = document.getElementById("man_checkbox").checked;
    let checkedwomen = document.getElementById("women_checkbox").checked;
    let checkeddivers = document.getElementById("divers_checkbox").checked;

    let checkedterms = document.getElementById("terms_checkbox").checked;

    if (reg_firstname.length < 1 || reg_secondname < 1) {
        ErrorMessage("Sie benötigen einen Vor- und Nachnamen", "Register")
    }

    else if (reg_username.length <= 0) {
        ErrorMessage("Sie benötigen einen Nutzernamen", "Register")
    }

    else if (reg_password.length < 8) {
        ErrorMessage("Ihr Passwort benötigt eine Mindestlänge von 8 Zeichen", "Register")
    }

    else if (reg_password ==! reg_passwordrep) {
        ErrorMessage("Ihre eingegebenen Passwörter sind nicht dasselbe", "Register")
    }
    
    else if (checkedman && !checkedwomen && !checkeddivers) {
        gender = "Männlich";
    }
    else if (!checkedman && checkedwomen && !checkeddivers) {
        gender = "Weiblich";
    }
    else if (!checkedman && !checkedwomen && checkeddivers) {
        gender = "Divers";
    }
    else if (!checkedman && !checkedwomen && !checkeddivers) {
        ErrorMessage("Bitte wählen Sie ein Geschlecht aus", "Register");
    }
    else if (!checkedterms) {
        ErrorMessage("Die Nutzungsbedingungen sind ein Pflichtfeld", "Register")
    }
    else {
        ErrorMessage("Bitte geben Sie Ihre Daten ein", "Register");
    }

    let UserModel = JSON.stringify({
        firstname: reg_firstname,
        lastname: reg_secondname,
        username: reg_username,
        password: reg_password,
        gender: gender,
    })
  }