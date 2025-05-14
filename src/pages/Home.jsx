import { useEffect, useState } from "react";
import { Shield, Trophy, Swords, Users, ShieldCheck, CheckCheck } from "lucide-react";
import axios from "axios";
import TeamWinterLogo from "../assets/TeamWinter.png"
import Leeuwerik from "../assets/Leeuwerik-profiel.png"
import LexengeI from "../assets/LexengeI-profiel.png"
import Rens from "../assets/Rens-profiel.png"
import Mootje from "../assets/Mootje-profiel.png"
import Winteriscoming from "../assets/Winteriscoming-profiel.png"


const initialLeaders = [
    {
        name: "Winteriscoming",
        role: "Oprichter",
        Profile: Winteriscoming,
        tag: "#2P28G809C",
        text: "Oprichter en leidster van Team Winter, en speelt een onmisbare rol in het bij elkaar houden van onze clan. Dankzij haar inzet, positieve houding en betrokkenheid zijn we een hechte community geworden die als één team blijft samenwerken.",
    },
    {
        name: "Rens",
        role: "Leider",
        Profile: Rens,
        tag: "#8YYPYQQLG",
        text: "Een expert in het organiseren en opzetten van toernooien. Hij is een sterke en stabiele speler met een positieve mindset en loyaliteit.",
    },
    {
        name: "Mootje",
        role: "Leider",
        Profile: Mootje,
        tag: "#2GGRUYV9P",
        text: "De beste recruiter, met overtuigingskracht en een doelgerichte aanpak. Hij heeft altijd het overzicht. Een loyale en stabiele speler.",
    },
    {
        name: "Leeuwerik",
        role: "Leider",
        Profile: Leeuwerik,
        tag: "#9VCU92GR2",
        text: "Discord-expert die altijd meedenkt en de voorkeur geeft aan het bedenken van verschillende opties. Een sterke, loyale en stabiele speler.",
    },
    {
        name: "LexengeI",
        role: "Leider",
        Profile: LexengeI,
        tag: "#9UY208RC",
        text: "Biedt waardevolle inzichten en bekijkt zaken vanuit een helikopterview. Zorgt voor een goede balans binnen het team. Ook een sterke, stabiele speler.",
    },
];

function Home() {
    const [clanLevel, setClanLevel] = useState(null);
    const [warWinStreak, setWarWinStreak] = useState(null);
    const [clanName, setClanName] = useState(null);
    const [clanDescription, setClanDescription] = useState(null);
    const [clanWarLeague, setClanWarLeague] = useState(null);
    const [clanWarWins, setClanWarWins] = useState(null);
    const [warLog, setWarLog] = useState([]);
    const [leaders, setLeaders] = useState(initialLeaders);

    const clanTag = "#2LU2U00QJ";

    useEffect(() => {
        const fetchClanInfo = async () => {
            try {
                const res = await axios.get(
                    `https://teamwinter.onrender.com/api/clashofclans/claninfo?clanTag=${encodeURIComponent(
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
                    `https://teamwinter.onrender.com/api/clashofclans/warlog?clanTag=${encodeURIComponent(
                        clanTag
                    )}`
                );
                setWarLog(res.data.items.slice(0, 3));
            } catch (err) {
                console.error("Error fetching war log:", err);
            }
        };

        const fetchPlayerInfo = async () => {
            try {
                const requests = leaders
                    .filter((leader) => leader.tag)
                    .map((leader) =>
                        axios.get(
                            `https://teamwinter.onrender.com/api/clashofclans/players?playertag=${encodeURIComponent(
                                leader.tag
                            )}`
                        )
                    );

                const responses = await Promise.all(requests);
                const updatedLeaders = leaders.map((leader, index) => {
                    const response = responses[index];
                    if (response && response.data) {
                        return {
                            ...leader,
                            thLevel: response.data.townHallLevel,
                            expLevel: response.data.expLevel,
                        };
                    }
                    return leader;
                });

                setLeaders(updatedLeaders);
            } catch (err) {
                console.error("Error fetching Player info:", err);
            }
        };

        fetchClanInfo();
        fetchWarLog();
        fetchPlayerInfo();
    }, []);

    return (
        <>
            <div className="header blue-gradient text-white d-flex flex-column justify-content-center align-items-center text-center px-3 py-5">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <img src={TeamWinterLogo} style={{ width: "40px" }} alt="" />
                    <h1 className="fw-bold m-0">{clanName || "Team Winter"}</h1>
                </div>
                <p className="lead mb-4 col-12 col-lg-6">{clanDescription}</p>
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
                        <div className="p-4 bg-card rounded shadow-sm h-100">
                            <div className="mb-3 text-primary icon-background">
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
                        <div className="p-4 bg-card rounded shadow-sm h-100">
                            <div className="mb-3 text-primary icon-background">
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
                        <div className="p-4 bg-card rounded shadow-sm h-100">
                            <div className="mb-3 text-primary icon-background">
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

                <div className="bg-card mt-5 p-4 rounded bg-light bg-opacity-50 shadow-sm">
                    <h5 className="fw-bold mb-2">Onze clanfilosofie</h5>
                    <p className="mb-0">
                        Onze filosofie draait om samenwerking, discipline en continu leren.
                        We geloven dat succes in Clan Wars niet alleen van individuele
                        kracht afhangt, maar van hoe goed we als team presteren. Door
                        strategie, communicatie en gezamenlijke inzet behalen we elke
                        overwinning samen.
                    </p>
                </div>
            </div>

            <div className="bg-light pb-2 pt-5">
                <div className=" text-center">
                    <h2 className="fw-bold mb-2">Clanprestaties</h2>
                    <p className="text-muted mb-4">
                        Onze clan heeft indrukwekkende mijlpalen bereikt door samenwerking
                        en toewijding.
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
            <div className="py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-2">Ons Leiderschap</h2>
                    <p className="text-muted mb-5">
                        Maak kennis met het elite team dat onze clan naar de overwinning
                        leidt.
                    </p>
                    <div className="row g-4 justify-content-center">
                        {leaders.map((leader, index) => (
                            <div key={index} className="col-sm-10 col-md-6 col-lg-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <p className="card-text small leiders-tabs text-sm py-1 px-2 rounded-pill">
                                        {leader.role}
                                    </p>
                                    <img
                                        src={leader.Profile}
                                        alt={leader.name}
                                        className="card-img-top rounded-top leiders-cards"
                                    />
                                    <div className="card-body text-center bg-light">
                                        <h5 className="card-title fw-bold mb-1">{leader.name}</h5>
                                        <p className="text-muted mb-2">
                                            TH{leader.thLevel} | Level {leader.expLevel}
                                        </p>
                                        <p className="text-muted mb-2">
                                            {leader.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="blue-gradient requirement py-5 px-3 position-relative z-n1">
                <div className="row requirement-row justify-content-center">
                    <div className="col-sm-6 requirement-card w-auto p-0 rounded-4">
                        <div className="card-rotate">
                            <div className="card-inner text-white p-4 rounded-4">
                                <h5 className="card-title mb-2">Vereisten</h5>
                                <p><CheckCheck className="checkmark" />Actief</p>
                                <p><CheckCheck className="checkmark" />Staat er goed in</p>
                                <p><CheckCheck className="checkmark" />Wilt verbeteren</p>
                                <p><CheckCheck className="checkmark" />Deelnemen aan Clan Wars en Clan War League</p>
                                <p><CheckCheck className="checkmark" />Gebruik beide aanvallen in de oorlog</p>
                                <p><CheckCheck className="checkmark" />Vriendelijke houding en teamspeler</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 requirement-card w-auto p-0 rounded-4">
                        <div className="card-rotate">
                            <div className="card-inner text-white p-4 rounded-4">
                                <h5 className="card-title mb-2">Niet geaccepteerd</h5>
                                <p><CheckCheck className="checkmark text-danger" />Ongepast taalgebruik / opmerkingen</p>
                                <p><CheckCheck className="checkmark text-danger" />Andere clans info geven over bases en</p>
                                <p><CheckCheck className="checkmark text-danger" />Gebruik van ongepaste afbeeldingen</p>
                                <p><CheckCheck className="checkmark text-danger" />Spam in de chat</p>
                                <p><CheckCheck className="checkmark text-danger" />Negatieve houding en teamspeler</p>
                                <p><CheckCheck className="checkmark text-danger" />Tijdelijk over stappen van clans voor EOS / EOD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
