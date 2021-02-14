//import firebase 
import app from 'firebase/app';
//import firebase auth for authentication
import 'firebase/auth';
import '@firebase/firestore';

//Firebase Project configuration
const config= {
    apiKey: "AIzaSyDpLnNYH0XX4fCpE_HBLYXctyQpoBpLUHk",
    authDomain: "chat-app-e3907.firebaseapp.com",
    projectId: "chat-app-e3907",
    storageBucket: "chat-app-e3907.appspot.com",
    messagingSenderId: "693640077043",
    appId: "1:693640077043:web:c986c51ffe4373b941a186",
    measurementId: "G-VYBNV1KVQB"
};

//a new Firebase class to initialize firebase with the configuration
class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore()
        this.authUser= this.auth.onAuthStateChanged
    }

      // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
  checkAuthUser= (email, password) =>
  this.auth.onAuthStateChanged(email, password);
  
}

export default Firebase;

