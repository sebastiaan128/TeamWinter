import { useEffect, useState } from 'react';
import { Shield, Trophy, Swords, Users, ShieldCheck } from 'lucide-react';
import axios from 'axios';

function Info() {
  const [clanLevel, setClanLevel] = useState(null);
  const [warWinStreak, setWarWinStreak] = useState(null);
  const [clanName, setClanName] = useState(null);
  const [clanDescription, setClanDescription] = useState(null);
  const clanTag = '#2LU2U00QJ';

  useEffect(() => {
    const fetchClanInfo = async () => {
      try {
        const res = await axios.get(`https://teamwinter.onrender.com/api/clashofclans/claninfo?clanTag=${encodeURIComponent(clanTag)}`);
        setClanLevel(res.data.clanLevel);
        setWarWinStreak(res.data.warWinStreak);
        setClanName(res.data.name); 
        setClanDescription(res.data.description); 
      } catch (err) {
        console.error('Error fetching clan info:', err);
      }
    };

    fetchClanInfo();
  }, []);

return (
    <>
        <div className="bg-primary text-white d-flex flex-column justify-content-center align-items-center text-center px-3 py-5">
            <div className="d-flex align-items-center gap-2 mb-3">
                            <img src="src/assets/TeamWinter.png" style={{ width: '40px' }} alt="" />
                <h1 className="fw-bold m-0">{clanName || 'Team Winter'}</h1> 
            </div>
            <p className="lead mb-4 w-50">
                {clanDescription}
            </p>
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
                        <div className="mb-3 text-primary"><Swords size={28} /></div>
                        <h5 className="fw-bold">War Focused</h5>
                        <p className="mb-0">
                            Our clan participates in Clan Wars twice a week with an impressive win record. 
                            We strategize and coordinate attacks to maximize our chances of victory.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 bg-light rounded shadow-sm h-100">
                        <div className="mb-3 text-primary"><Users size={28} /></div>
                        <h5 className="fw-bold">Supportive Community</h5>
                        <p className="mb-0">
                            We're more than just a clan – we're a community of friends who help each other improve. 
                            Expect active donations, friendly challenges, and strategy discussions.
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 bg-light rounded shadow-sm h-100">
                        <div className="mb-3 text-primary"><ShieldCheck size={28} /></div>
                        <h5 className="fw-bold">Competitive Edge</h5>
                        <p className="mb-0">
                            Team Winter regularly competes in Clan War Leagues, pushing for promotion and rewards. 
                            We maintain high standards and expect active participation.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 p-4 rounded bg-light bg-opacity-50">
                <h5 className="fw-bold mb-2">Our Clan Philosophy</h5>
                <p className="mb-0">
                    At Team Winter, we believe in balancing competitive play with a friendly atmosphere. 
                    We push each other to improve while maintaining respect and camaraderie. 
                    Our name represents our cool-headed approach to strategy and our ability to weather any storm on the battlefield.
                </p>
            </div>
        </div>
    </>
);
}

export default Info;