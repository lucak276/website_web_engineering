/* Login */

function login() {
    // Check user info
    let username = document.getElementById("usernameinput").value;
    let password = document.getElementById("passwordinput").value;
    let userfromlist = 'tobi'
    let passwordfromlist = 'homogeil'

    var wrong_password_text = document.getElementById("wrong-password-text");
    var wrong_user_text = document.getElementById("wrong-user-text");
    var glass_container = document.getElementById("glasscontainer-login")

    console.log(username);
    console.log(password);
    
    if (username == userfromlist && password == passwordfromlist) {
        console.log("Erfolgreich eingeloggt");
        window.location.href = window.location.href.replace("/html/loginpage.html", "/html/401_page.html");
    }

    else if (password.length <= 0 && username.length <= 0) {
        glass_container.classList.add('shake-container-red')
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }

    else if (username.length > 0 && password.lenth > 0 && password !== passwordfromlist && username !== userfromlist) {
        glass_container.classList.add('shake-container-red')
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }

    else if (username !== userfromlist) {
        console.log('Falscher Username');
        wrong_user_text.classList.remove('remove');
        glass_container.classList.add('shake-container-red');
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }

    else if (password !== passwordfromlist){
        console.log('Falsches Passwort');
        wrong_password_text.classList.remove('remove');
        glass_container.classList.add('shake-container-red');
        setTimeout(function () {
            glass_container.classList.remove('shake-container-red')
          }, 1000);
    }

    else{
        console.log('Ein Fehler ist aufgetreten')
    }

    /*
    let savedUserString = window.localStorage.getItem(`this.${username}`);
    try {
      let savedUserObject = JSON.parse(savedUserString)
  
      if (savedUserObject.password === password) {
        // Login successfull
        setError("");
        window.localStorage.setItem("auth.user", savedUserString);
        setSuccess("Sie sind erfolgreich eingeloggt und werden gleich weitergeleitet!");
        setTimeout(() => {
          window.location.href = window.location.href.replace("login", "index");
        }, 3000);
      } else {
        // Login false
        setError("Das Passwort ist nicht korrekt!")
        console.log(savedUserObject.password)
      }
    } catch (er) {
      setError("Der Benutzer konnte nicht gefunden werden.")
    }
    */
  }


function setError(errorText) {
    if (typeof errorText === "string") {
        /*
        transition_container.classList.add('fade-in');
        transition_container.classList.remove('hide');
        */
      document.getElementById("Error").innerHTML = errorText;
    } else {
      document.getElementById("Error").innerHTML = "Something is not correct!";
    }
  }
  

  /* Register */

  function setError(errorText) {
    if (typeof errorText === "string") {
      document.getElementById("Error").innerHTML = errorText;
    } else {
      document.getElementById("Error").innerHTML = "Something is not correct!";
    }
  }
  
  function setSuccess(successText) {
    if (typeof successText === "string") {
      document.getElementById("Success").innerHTML = successText;
    } else {
      document.getElementById("Success").innerHTML = "Login erfolgreich.";
    }
  }
  
  function register() {
    // Check user info
    let firstname = document.getElementById("Vorname").value;
    if (! firstname.match("^[a-zA-Z\-_]+$")) {
      setError("Der Vorname darf nur aus Groß- und Kleinbuchstaben und einem '-' oder '_' bestehen.");
      return;
    } else if (firstname.length > 20) {
      setError("Der Vorname darf maximal 20 Zeichen lang sein.");
      return;
    }
    let lastname = document.getElementById("Nachname").value;
    if (! lastname.match("^[a-zA-Z\-_]+$")) {
      setError("Der Nachname darf nur aus Groß- und Kleinbuchstaben und einem '-' oder '_' bestehen.");
      return;
    } else if (lastname.length > 20) {
      setError("Der Nachname darf maximal 20 Zeichen lang sein.");
      return;
    }
    let username = document.getElementById("Benutzername").value;
    if (! username.match("^[a-zA-Z\-_]+$")) {
      setError("Der Benutzername darf nur aus Groß- und Kleinbuchstaben und einem '-' oder '_' bestehen.");
      return;
    } else if (username.length > 20) {
      setError("Der Benutzername darf maximal 20 Zeichen lang sein.");
      return;
    }
    let password = document.getElementById("Passwort").value;
    if (! password.match("^[a-zA-Z!#,+\-_?0-9]+$") || ! password.match(".*[0-9].*") || ! password.match(".*[!#,+\-_?].*")) {
      setError("Das Passwort darf nur aus Groß- und Kleinbuchstaben, sowie mindestens einer Zahl und einem der folgenden Zeichen bestehen: '!#,+-_?'.");
      return;
    } else if (password.length < 8 || password.length > 20) {
      setError("Das Passwort muss mindestens 8 und maximal 20 Zeichen lang sein.");
      return;
    }
    // Check gender
    let gender = "";
    let isMale = document.getElementById("Maennlich").checked;
    let isFemale = document.getElementById("Weiblich").checked;
    let isDivers = document.getElementById("Divers").checked;
    if (isMale && !isFemale && !isDivers) {
      gender = "Männlich";
    } else if (!isMale && isFemale && !isDivers) {
      gender = "Weiblich";
    } else if (!isMale && !isFemale && isDivers) {
      gender = "Divers";
    } else {
      setError("Bitte wählen sie genau EIN geschlecht aus!");
      return;
    }
    // Check interests
    let interestOne = document.getElementById("Interesse1").checked;
    let interestTwo = document.getElementById("Interesse2").checked;
    let interestThree = document.getElementById("Interesse3").checked;
    // Check comment
    let comment = document.getElementById("kommentar").value;
    if (comment.length > 100) {
      setError("Es sind maximal 100 Zeichen im Kommentar erlaubt!");
      return;
    }
    // Check agreement
    let agreement = document.getElementById("nutzungsbedingung").checked;
    if (!agreement) {
      setError("Sie müssen die Nutzungsbedingungen akzeptieren!");
      return;
    }
    
    console.log("Every input is correct");
  
    // Check user already exist
    let existingUser = window.localStorage.getItem(`this.${username}`);
    if (existingUser !== null) {
      setError("Der Benutzer existiert bereits, bitte ändern Sie ihren Benutzernamen!");
      return;
    }
  
    let jsonUser = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      gender: gender,
      interestOne: interestOne,
      interestTwo: interestTwo,
      interestThree: interestThree,
      comment: comment,
    })
  
    window.localStorage.setItem(`this.${username}`, jsonUser)
    setError("");
    setSuccess("Hallo " + firstname + " " + lastname + " ,die Registrierung war erfolgreich, sie werden gleich weitergeleitet!");
    setTimeout(() => {
      window.location.href = window.location.href.replace("register", "login");
    }, 3000)
  }