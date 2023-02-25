import app from "./base";
import "firebase/database";
import firebase from "firebase/app"
import "firebase/auth";



export const handleGoogleSignUp = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await app.auth().signInWithPopup(provider);

      // Save name and lastName to Firebase database
      firebase
        .database()
        .ref("users/" + result.user.uid)
        .set({
          name: result.additionalUserInfo.profile.given_name,
          lastName: result.additionalUserInfo.profile.family_name,
          email: result.user.email,
          balance: 0,
        });

        // Redirect to root URL
        window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };