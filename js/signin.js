$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnJXqheUhTiHj3GU5q-hH8wmTeSCuuAlI",
    authDomain: "firentut11.firebaseapp.com",
    databaseURL: "https://firentut11.firebaseio.com",
    projectId: "firentut11",
    storageBucket: "firentut11.appspot.com",
    messagingSenderId: "539101858442"
  };
  firebase.initializeApp(config);

  var dbRef = firebase.database().ref().child('object');

  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $btnSubmit = $('#btnSubmit');
  const $btnChat = $('#btnChat');
  const $btnHome = $('#btnHome');
  const $signInfo = $('#sign-info');
  const $email = $('#email');
  const $password = $('#password');
  const $profileName = $('#profile-name');
  const $profileEmail = $('#profile-email');
  const $profileUsername = $('#profile-username');
  const $profileOccupation = $('#profile-occupation');
  const $profileAge = $('#profile-age');
  const $profileAbout = $('profile-about');
  const $photo = $('#photo');
  const $messageField = $('#')
  const $messagingSenderId = $('#')
//log in
  $btnSignIn.click(function(e){
    const auth = firebase.auth();
    const email = $email.val();
    const pass = $password.val();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function(e){
      window.location.href = "./chatroom.html";
    });

  });

  // new acc
  $btnSignUp.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      $signInfo.html(e.message);
    });
    //redirecting to profile settings page
    promise.then(function(e){
      window.location.href = "./user.html";
    });
  });

  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      $signInfo.html(user.email+" has signed in");
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photo);
      });
    } else {
      console.log("not logged in");
    }
  });

  // log out
  $btnSignOut.click(function(){
    firebase.auth().signOut();
    $signInfo.html('No one has signed in');
  });
  // submitting
   $btnSubmit.click(function(e){
     const user = firebase.auth().currentUser;
     const $userName = $('#userName').val();
     const $profileOccupation = $('#occupation').val();
     const $profileAge = $('#age').val();
     const $photo = $('#photo').val();
     const $profileAbout = $('#about').val();
     const promise = user.updateProfile({
       displayName: $userName,
       photo: $photo,
       occupation: $profileOccupation,
       age: $profileAge,
       about: $profileAbout
     });
     //redirecting to profile page
     promise.then(function(e) {
       console.log("Your profile has been successfully updated");
       window.location.href = "./profile.html";
     });
 });

//showing profile page
firebase.auth().onAuthStateChanged(function(user){
   if(user) {
     console.log(user);
     const loginName = user.displayName || user.email;
     $signInfo.html(loginName+" is login...");
     $btnSignIn.attr('disabled', 'disabled');
     $btnSignUp.attr('disabled', 'disabled');
     $btnSignOut.removeAttr('disabled')
     $profileName.html(user.displayName);
     $profileEmail.html(user.email);
     $profileOccupation.html(user.profileOccupation);
     $profileAge.html(user.profileAge);
     $profileAbout.html(user.profileAbout);
     $photo.attr("src",user.photo);
   } else {
     console.log("not logged in");
     $profileName.html("N/A");
     $profileEmail.html('N/A');
     $profileUsername.html('N/A');
     $profileOccupation.html('N/A');
     $profileAge.html('N/A');
     $profileAbout.html('N/A');
     $photo.attr("src","");
   }
 });

//chat
$messageField.keypress(function (e) {
   if (e.keyCode == 13) {
     var username = $nameField.val();
     var message = $messageField.val();
     console.log(username);
     console.log(message);

     dbRef.push({name:username, text:message});
     $messageField.val('');
   }
 });
});
