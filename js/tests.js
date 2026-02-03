const firebaseConfig = {
  apiKey: "PASTE_KEY",
  authDomain: "PASTE_DOMAIN",
  projectId: "PASTE_ID",
  storageBucket: "PASTE_BUCKET",
  messagingSenderId: "PASTE_SENDER",
  appId: "PASTE_APPID"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const nameInput = document.getElementById("testName");
const scoreInput = document.getElementById("score");
const maxInput = document.getElementById("maxMarks");
const saveBtn = document.getElementById("saveTestBtn");
const listDiv = document.getElementById("testList");

saveBtn.onclick = ()=>{
  db.collection("tests").add({
    name:nameInput.value,
    score:scoreInput.value,
    max:maxInput.value,
    created:new Date()
  }).then(()=>location.reload());
};

db.collection("tests").get().then(snapshot=>{
  snapshot.forEach(doc=>{
    const d = doc.data();

    listDiv.innerHTML+=`
      <p>
        <b>${d.name}</b> : ${d.score}/${d.max}
      </p>
    `;
  });
});
