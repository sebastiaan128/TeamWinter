const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

const clanTags = ["#2GUGPU2CG"];

exports.scheduledWarUpdate = functions.pubsub.schedule("every 5 minutes").onRun(async () => {
  for (let tag of clanTags) {
    try {
      const res = await fetch(`http://localhost:3001/api/clashofclans/war?clanTag=${encodeURIComponent(tag)}`);
      if (res.ok) {
        const warData = await res.json();

        if (warData?.clan?.members) {
          for (let member of warData.clan.members) {
            if (member.attacks) {
              for (let attack of member.attacks) {
                if (attack.attackerTag === member.tag) {
                  const docId = `${tag}-${attack.order}-${attack.attackerTag}`;
                  await db.collection("attacks").doc(docId).set({
                    id: docId,
                    player: member.name,
                    stars: attack.stars,
                    destruction: attack.destructionPercentage,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                  });
                }
              }
            }
          }
        }
      } else {
        console.error("Response error:", await res.text());
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }
});