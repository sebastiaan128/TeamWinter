import { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { Star } from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, setDoc, doc, serverTimestamp } from "firebase/firestore";

function Home() {
  const [attacks, setAttacks] = useState([]);

  const clanTags = [
    "#2GUGPU2CG"
  ];

  const fetchAndUpdateAttacks = async () => {
    for (let tag of clanTags) {
      try {
    const res = await fetch(`https://teamwinter.onrender.com/api/clashofclans/war?clanTag=${encodeURIComponent(tag)}`, {
    method: 'GET',
  });
  
        if (res.ok) {
          const warData = await res.json();
          if (warData?.clan?.members) {
            for (let member of warData.clan.members) {
              if (member.attacks) {
                for (let attack of member.attacks) {
                  if (attack.attackerTag === member.tag) {
                    const docId = `${tag}-${attack.order}-${attack.attackerTag}`;
                    await setDoc(doc(db, "attacks", docId), {
                      id: docId,
                      player: member.name,
                      stars: attack.stars,
                      destruction: attack.destructionPercentage,
                      timestamp: serverTimestamp()
                    });
                  }
                }
              }
            }
          }
        } else {
          console.error("Error fetching war data:", res.statusText);
          const errorData = await res.json();
          console.error("Error details:", errorData);
        }
      } catch (err) {
        console.error("Error in fetching from proxy:", err);
      }
    }
  };

  useEffect(() => {
    fetchAndUpdateAttacks();

    const unsub = onSnapshot(collection(db, "attacks"), (snapshot) => {
      const now = new Date();
      const newAttacks = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(a => {
          const t = a.timestamp?.toDate?.() || new Date();
          return now - t < 30 * 60 * 1000;
        })
        .sort((a, b) => b.timestamp?.toDate?.() - a.timestamp?.toDate?.());

      setAttacks(newAttacks);
    });

    return () => unsub();
  }, []);

  const formatTimeAgo = (time) => {
    const diff = Math.floor((new Date() - time.toDate()) / 60000);
    return diff < 1 ? "just now" : `${diff} min ago`;
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white m-5">
      <h5 className="text-center text-primary fw-bold mb-4">Recent Attacks</h5>
      <Table borderless hover responsive>
        <thead>
          <tr className="text-muted small">
            <th style={{ width: "30%" }}>Player</th>
            <th style={{ width: "20%" }}>Stars</th>
            <th style={{ width: "20%" }}>Destruction</th>
            <th style={{ width: "30%" }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {attacks.map((attack) => (
            <tr key={attack.id} className="align-middle small">
              <td className="text-truncate" style={{ maxWidth: "180px" }}>{attack.player}</td>
              <td>
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < attack.stars ? (attack.destruction === 100 ? "#FFC107" : "#ADB5BD") : "none"}
                    stroke={i < attack.stars ? (attack.destruction === 100 ? "#FFC107" : "#ADB5BD") : "#CED4DA"}
                    className="me-1"
                  />
                ))}
              </td>
              <td> 
                <Badge bg="light" text="dark" className="fw-bold px-2 py-1">
                  {attack.destruction}%
                </Badge>
              </td>
              <td className="text-muted" >
                {attack.timestamp?.toDate ? formatTimeAgo(attack.timestamp) : "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;