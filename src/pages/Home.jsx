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
  const [warLog, setWarLog] = useState([]);

  const clanTag = "#2LU2U00QJ";

  useEffect(() => {
    const fetchClanInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/clashofclans/claninfo?clanTag=${encodeURIComponent(
            clanTag
          )}`
        );
        setClanLevel(res.data.clanLevel);
        setWarWinStreak(res.data.warWinStreak);
        setClanName(res.data.name);
        setClanDescription(res.data.description);
        setClanWarLeague(res.data.warLeague.name);
        setClanWarWins(res.data.warWins);
      } catch (err) {
        console.error("Error fetching clan info:", err);
      }
    };

    const fetchWarLog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/clashofclans/warlog?clanTag=${encodeURIComponent(
            clanTag
          )}`
        );
        setWarLog(res.data.items.slice(0, 3));
      } catch (err) {
        console.error("Error fetching war log:", err);
      }
    };

    fetchClanInfo();
    fetchWarLog();
  }, []);

  return (
    <>
      <div className="header header-gradient text-white d-flex flex-column justify-content-center align-items-center text-center px-3 py-5">
        <div className="d-flex align-items-center gap-2 mb-3">
          <img src={TeamWinterLogo} style={{ width: "40px" }} alt="" />
          <h1 className="fw-bold m-0">{clanName || "Team Winter"}</h1>
        </div>
        <p className="lead mb-4 w-50">{clanDescription}</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4 w-100">
          {clanLevel !== null && (
            <div className="tabs bg-secondary bg-opacity-25 text-white px-3 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2">
              <Trophy /> Level {clanLevel} Clan
            </div>
          )}
          {warWinStreak !== null && (
            <div className="tabs bg-opacity-25 bg-secondary text-white px-3 py-2 rounded-pill">
              War Win Streak: {warWinStreak}
            </div>
          )}
          <div className="tabs bg-opacity-25 bg-secondary text-white px-3 py-2 rounded-pill">
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

      <div className="info-cards py-5">
        <h2 className="text-center fw-bold mb-4">❄️ Team Winter ❄️</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <Swords size={28} />
              </div>
              <h5 className="fw-bold">War</h5>
              <p className="mb-0">
                Team Winter is strategisch, actief en toegewijd aan Clan Wars en
                CWL. Elke aanval telt. Planning, communicatie en inzet staan
                centraal. We streven samen naar 3-stars en constante groei.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <Users size={28} />
              </div>
              <h5 className="fw-bold">Community</h5>
              <p className="mb-0">
                Onze community is hecht en actief – er is altijd wel iemand
                online om te helpen. We geven tips, delen strategieën en
                ondersteunen elkaar bij aanvallen. Samen leren we, verbeteren we
                en winnen we meer. Bij Team Winter sta je er nooit alleen voor.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm h-100">
              <div className="mb-3 text-primary">
                <ShieldCheck size={28} />
              </div>
              <h5 className="fw-bold">Competitief</h5>
              <p className="mb-0">
                Team Winter streeft naar de top – we willen de beste clan van
                Nederland zijn en meten ons ook internationaal. Met elke war
                verbeteren we onze strategie en coördinatie. We nemen elke
                aanval serieus en strijden altijd voor winst, prestige en
                erkenning op hoog niveau.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 p-4 rounded bg-light bg-opacity-50 shadow-sm">
          <h5 className="fw-bold mb-2">Onze clanfilosofie</h5>
          <p className="mb-0">
            Onze filosofie draait om samenwerking, discipline en continu leren. We geloven dat succes in Clan Wars niet alleen van individuele kracht afhangt, maar van hoe goed we als team presteren. Door strategie, communicatie en gezamenlijke inzet behalen we elke overwinning samen.
          </p>
        </div>
      </div>

      <div className="bg-light pb-2 pt-5">
        <div className=" text-center">
          <h2 className="fw-bold mb-2">Clanprestaties</h2>
          <p className="text-muted mb-4">
          Onze clan heeft indrukwekkende mijlpalen bereikt door samenwerking en toewijding.
          </p>
          <div className="row g-4 achievements-card justify-content-center">
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Trophy className="text-warning mb-2" size={32} />
                <h4 className="fw-bold m-0">{clanWarWins}</h4>
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
                <h4 className="fw-bold m-0">{clanWarLeague}</h4>
                <small className="text-muted">CWL League</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <Users className="text-purple mb-2" size={32} />
                <h4 className="fw-bold m-0">100K+</h4>
                <small className="text-muted">Totale Donaties</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light pt-2 pb-5">
        <div className=" bg-primary trophy-background text-white py-5 mt-4 ">
          <div className="container text-center">
            <h3 className="fw-bold mb-4">Recent War Resultaten</h3>
            <div className="row g-4 justify-content-center">
              {warLog.map((war, index) => (
                <div key={index} className="col-md-4">
                  <div className="WarCard bg-opacity-75 p-4 rounded h-100">
                    <h6 className="mb-2">vs. {war.opponent.name}</h6>
                    <h3 className="fw-bold">
                      {war.clan.stars} - {war.opponent.stars}
                    </h3>
                    <small>{war.result}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
