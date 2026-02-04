firebase.auth().onAuthStateChanged(user=>{

  if(!user){
    alert("Please login");
    return;
  }

  db.collection("users")
    .doc(user.uid)
    .collection("logs")
    .orderBy("time","desc")
    .onSnapshot(snapshot=>{

      const container = document.getElementById("entries");
      container.innerHTML = "";

      if(snapshot.empty){
        container.innerHTML = "<p>No records found</p>";
        return;
      }

      snapshot.forEach(doc=>{
        const d = doc.data();
        container.innerHTML += `
          <div class="list-item">
            <div>
              <b>${d.chapter}</b><br>
              ${d.subject} • ${d.minutes} min
            </div>
          </div>
        `;
      });

    });

});
