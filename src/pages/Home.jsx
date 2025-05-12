import { useEffect, useState } from "react";
import { Shield, Trophy, Swords, Users, ShieldCheck } from "lucide-react";
import axios from "axios";
import TeamWinterLogo from "../assets/TeamWinter.png";

function Home() {
    
  const [clanLevel, setClanLevel] = useState(null);
  const [warWinStreak, setWarWinStreak] = useState(null);
  const [clanName, setClanName] = useState(null);
    const [clanDescription, setClanDescription] = useState(null);
    const [clanWarLeague, setClanWarLeague] = useState(null);
    const [clanWarWins, setClanWarWins] = useState(null);
    


  const clanTag = "#2LU2U00QJ";

  useEffect(() => {
  const fetchClanInfo = async () => {
    try {
      const res = await axios.get(
        `https://teamwinter.onrender.com/api/clashofclans/claninfo?clanTag=${encodeURIComponent(clanTag)}`
      );
      console.log(res.data); // voeg dit toe
      setClanLevel(res.data.clanLevel);
      setWarWinStreak(res.data.warWinStreak);
      setClanName(res.data.name);
      setClanDescription(res.data.description);
      setClanWarLeague(res.data.warLeague);
      setClanWarWins(res.data.warWins);
    } catch (err) {
      console.error("Error fetching clan info:", err);
    }
  };

  fetchClanInfo();
}, []);

  return (
      <>
      <div className="bg-primary text-white d-flex flex-column justify-content-center align-items-center text-center px-3 py-5">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img src={TeamWinterLogo} style={{ width: "40px" }} alt="" />
          <h1 className="fw-bold m-0">{clanName || "Team Winter"}</h1>
        </div>
        <p className="lead mb-4 w-50">{clanDescription}</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4 w-100">
          {clanLevel !== null && (
            <div className="tabs bg-opacity-25 bg-light text-white px-3 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2">
              <Trophy /> Level {clanLevel} Clan
            </div>
          )}
          {warWinStreak !== null && (
            <div className="tabs bg-opacity-25 bg-light text-white px-3 py-2 rounded-pill">
              War Win Streak: {warWinStreak}
            </div>
          )}
          <div className="tabs bg-opacity-25 bg-light text-white px-3 py-2 rounded-pill">
            {clanTag}
          </div>
        </div>
        <a
          href="https://link.clashofclans.com/en?action=OpenClanProfile&tag=%232LU2U00QJ"
          className="btn btn-light fw-semibold px-4 py-2 rounded-pill"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Our Clan
        </a>
      </div>

      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">About Team Winter</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <Swords size={28} />
              </div>
              <h5 className="fw-bold">War Focused</h5>
              <p className="mb-0">
                Our clan participates in Clan Wars twice a week with an
                impressive win record. We strategize and coordinate attacks to
                maximize our chances of victory.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <Users size={28} />
              </div>
              <h5 className="fw-bold">Supportive Community</h5>
              <p className="mb-0">
                We're more than just a clan – we're a community of friends who
                help each other improve. Expect active donations, friendly
                challenges, and strategy discussions.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <ShieldCheck size={28} />
              </div>
              <h5 className="fw-bold">Competitive Edge</h5>
              <p className="mb-0">
                Team Winter regularly competes in Clan War Leagues, pushing for
                promotion and rewards. We maintain high standards and expect
                active participation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 p-4 rounded bg-light bg-opacity-50">
          <h5 className="fw-bold mb-2">Our Clan Philosophy</h5>
          <p className="mb-0">
            At Team Winter, we believe in balancing competitive play with a
            friendly atmosphere. We push each other to improve while maintaining
            respect and camaraderie. Our name represents our cool-headed
            approach to strategy and our ability to weather any storm on the
            battlefield.
          </p>
        </div>
      </div>
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-2">Clan Achievements</h2>
          <p className="text-muted mb-4">
            Our clan has reached impressive milestones through teamwork and
            dedication
          </p>
          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Trophy className="text-warning mb-2" size={32} />
<h4 className="fw-bold m-0">{clanWarWins ?? "..."}</h4>
<small className="text-muted">War Wins</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Swords className="text-primary mb-2" size={32} />
                <h4 className="fw-bold m-0">Level {clanLevel}</h4>
                <small className="text-muted">Clan Level</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Shield className="text-danger mb-2" size={32} />
<h4 className="fw-bold m-0">{clanWarLeague ?? "..."}</h4>
<small className="text-muted">CWL League</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Users className="text-purple mb-2" size={32} />
                <h4 className="fw-bold m-0">50K+</h4>
                <small className="text-muted">Total Donations</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white py-5 mt-4">
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Recent War Results</h3>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="WarCard bg-opacity-75 p-4 rounded">
                <h6 className="mb-2">vs. Dragon Slayers</h6>
                <h3 className="fw-bold">45 - 38</h3>
                <small>Victory</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="WarCard bg-opacity-75 p-4 rounded">
                <h6 className="mb-2">vs. Dark Knights</h6>
                <h3 className="fw-bold">43 - 41</h3>
                <small>Victory</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="WarCard bg-opacity-75 p-4 rounded">
                <h6 className="mb-2">vs. Fire Legion</h6>
                <h3 className="fw-bold">40 - 39</h3>
                <small>Victory</small>
              </div>
            </div>
          </div>
        </div>
          </div>
    </>
  );
}

export default Home;
