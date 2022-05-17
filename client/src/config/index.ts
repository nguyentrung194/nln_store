const local = {
  api: "http://localhost:5000/",
  firebase: {
    apiKey: "AIzaSyCsCRZx45U9F4G80jZ2oXgzzEScBGSfoEU",
    authDomain: "fir-c08f7.firebaseapp.com",
    databaseURL:
      "https://fir-c08f7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-c08f7",
    storageBucket: "fir-c08f7.appspot.com",
    messagingSenderId: "67599571776",
    appId: "1:67599571776:web:dc8324fe935b52ba9f78a5",
  },
};

const staging = {
  api: "",
  firebase: {
    apiKey: "AIzaSyCsCRZx45U9F4G80jZ2oXgzzEScBGSfoEU",
    authDomain: "fir-c08f7.firebaseapp.com",
    databaseURL:
      "https://fir-c08f7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-c08f7",
    storageBucket: "fir-c08f7.appspot.com",
    messagingSenderId: "67599571776",
    appId: "1:67599571776:web:dc8324fe935b52ba9f78a5",
  },
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === "staging") {
  envConfig = staging;
} else {
  envConfig = local;
}

const environment = envConfig;

export default environment;
