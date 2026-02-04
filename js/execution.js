document.getElementById("executionForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const user = firebase.auth().currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  const subject = document.getElementById("subject").value;
  const chapter = document.getElementById("chapter").value;
  const minutes = document.getElementById("minutes").value;

  db.collection("users")
    .doc(user.uid)
    .collection("logs")
    .add({
      subject,
      chapter,
      minutes: Number(minutes),
      time: new Date()
    })
    .then(()=>{
      alert("Saved!");
      location.reload();
    })
    .catch(err=>alert(err.message));

});
