function updateStreak() {

  const user = firebase.auth().currentUser;
  if (!user) return;

  const ref = db.collection("streaks").doc(user.uid);

  const today = new Date().toDateString();

  ref.get().then(doc => {

    if (!doc.exists) {
      ref.set({
        lastDate: today,
        streak: 1
      });
      return;
    }

    const data = doc.data();
    const lastDate = new Date(data.lastDate);
    const diff = (new Date(today) - lastDate) / (1000*60*60*24);

    if (diff === 1) {
      ref.update({
        lastDate: today,
        streak: data.streak + 1
      });
    }
    else if (diff > 1) {
      ref.update({
        lastDate: today,
        streak: 1
      });
    }

  });
}
