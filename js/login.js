
      var config = {
        apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
        authDomain: "tm-games1.firebaseapp.com",
        databaseURL: "https://tm-games1.firebaseio.com",
        projectId: "tm-games1",
        storageBucket: "tm-games1.appspot.com",
        messagingSenderId: "969120080569"
      };

      firebase.initializeApp(config);
      // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'submit',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'https://firebase.google.com/support/privacy/',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('https://firebase.google.com/support/privacy/');
        }
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
