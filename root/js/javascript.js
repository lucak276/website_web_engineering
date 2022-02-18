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

//Replace Text function
// Array of words 
var helloworld = 'printhelloworld'
var words = ['print("hello world!")', 'cool', 'amazing', 'wtf', 'warum geht das nicht'];
var char = ['0', '1']
// Function that executes every 2000 milliseconds 
var t = setInterval(function() { 

  // Random number generator 
  var randomNumber = Math.round(Math.random() * (char.length-1)); 

  // Change the word in the span for a random one in the array of words 
  $('#change-content').html(words[randomNumber]); 
}, 2000);

//stepstextupdate
var bodytext = ['']

