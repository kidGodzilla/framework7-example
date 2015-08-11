// Init App
var myApp = new Framework7({
    modalTitle: 'Framework7',
    // Enable Material theme
    material: true,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

// Connect to firebase
var firebaseRef = new Firebase("https://wpages.firebaseio.com");

var authData = firebaseRef.getAuth();

if (authData) {
     console.log("Authenticated user with uid:", authData.uid);
} else {
    // if not logged in
    myApp.loginScreen()
}

// Login screen
$$('.login-screen').find('.button').on('click', function () {
    var username = $$('.login-screen').find('input[name="username"]').val();
    var password = $$('.login-screen').find('input[name="password"]').val();

    firebaseRef.authWithPassword({
        "email": username, "password": password
    }, function (error, authData) {
        if (error) {
            console.log(error);
        } else {
            var userID = authData.uid;
            console.log("Authenticated user with uid:", authData.uid);
            myApp.closeModal('.login-screen');
        }
    });


});