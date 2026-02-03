// execution.js - FIXED
document.addEventListener('DOMContentLoaded', function() {
  // Check auth first
  auth.onAuthStateChanged((user) => {
    if (!user) {
      alert("Please login first!");
      window.location.href = "index.html";
      return;
    }
  });

  const saveBtn = document.getElementById('saveBtn');
  
  saveBtn.onclick = () => {
    const subject = document.getElementById('subject').value;
    const chapter = document.getElementById('chapter').value;
    const time = document.getElementById('time').value;
    
    if (!subject || !chapter || !time) {
      alert("Please fill all fields!");
      return;
    }
    
    db.collection("dailyEntries").add({
      subject: subject,
      chapter: chapter,
      time: Number(time),
      userId: auth.currentUser.uid,
      created: new Date()
    })
    .then(() => {
      alert("Saved successfully!");
      document.getElementById('subject').value = "";
      document.getElementById('chapter').value = "";
      document.getElementById('time').value = "";
    })
    .catch(err => alert("Error: " + err.message));
  };
});
