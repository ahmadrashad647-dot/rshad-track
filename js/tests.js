// tests.js - FIXED
document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    loadTests();
  });

  const nameInput = document.getElementById("testName");
  const scoreInput = document.getElementById("score");
  const maxInput = document.getElementById("maxMarks");
  const saveBtn = document.getElementById("saveTestBtn");
  const listDiv = document.getElementById("testList");

  function loadTests() {
    db.collection("tests")
      .where("userId", "==", auth.currentUser.uid)
      .orderBy("created", "desc")
      .get()
      .then(snapshot => {
        listDiv.innerHTML = "";
        snapshot.forEach(doc => {
          const d = doc.data();
          const percentage = ((d.score / d.max) * 100).toFixed(1);
          listDiv.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:15px;margin:10px 0;border-radius:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <b>${d.name}</b>
                <span style="color:${percentage >= 60 ? '#10b981' : '#ef4444'}">${percentage}%</span>
              </div>
              <div style="margin-top:8px;color:rgba(255,255,255,0.6);">
                Score: ${d.score}/${d.max}
              </div>
            </div>
          `;
        });
      });
  }

  saveBtn.onclick = () => {
    if (!nameInput.value || !scoreInput.value) {
      alert("Please fill required fields!");
      return;
    }
    
    db.collection("tests").add({
      name: nameInput.value,
      score: Number(scoreInput.value),
      max: Number(maxInput.value) || 720,
      userId: auth.currentUser.uid,
      created: new Date()
    }).then(() => {
      nameInput.value = "";
      scoreInput.value = "";
      maxInput.value = "";
      loadTests();
    });
  };
});
