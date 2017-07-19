import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDPzjs5iMrcNPs03H-ZLLwCXnznBr5Tydw",
    authDomain: "marks-phrasebook.firebaseapp.com",
    databaseURL: "https://marks-phrasebook.firebaseio.com",
    projectId: "marks-phrasebook",
    storageBucket: "",
    messagingSenderId: "992438605023"
};

firebase.initializeApp(config);

export default firebase.database();