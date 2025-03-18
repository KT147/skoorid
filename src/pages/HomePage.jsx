import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


function HomePage() {

    const [fourteenOne, setFourteenOne] = useState(false)
    const [eightBall, setEightBall] = useState(false)
    const [nineBall, setNineBall] = useState(false)
    const [tenBall, setTenBall] = useState(false)
    const [snooker, setSnooker] = useState(false)

    const navigate = useNavigate()

    const [players, setPlayers] = useState([])
    const [starter, setStarter] = useState("")
    const [opponent, setOpponent] = useState("")

    const [winnings, setWinnings] = useState("")

   

    useEffect(() => {
        const stored = localStorage.getItem("players")
        if (stored) {
          setPlayers(JSON.parse(stored))
        }
      }, [])

    const playFourteenOne = () => {
        setFourteenOne(true)
        setEightBall(false)
        setNineBall(false)
        setTenBall(false)
        setSnooker(false)
    }

    const navigateToFourteenOne = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/fourteen-one")
    }


    const playEightBall = () => {
        setFourteenOne(false)
        setEightBall(true)
        setNineBall(false)
        setTenBall(false)
        setSnooker(false)
    }

    const playNineBall = () => {
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(true)
        setTenBall(false)
        setSnooker(false)
    }

    const playTenBall = () => {
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(false)
        setTenBall(true)
        setSnooker(false)
    }


    const playSnooker = () => {
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(false)
        setTenBall(false)
        setSnooker(true)
    }

    const navigateToAddPlayers = () => {
        navigate ("/add")
    }


  return (
    <div>
        <h3>Vali alustav mängija</h3>
        <select value={starter} onChange={(e) => setStarter(e.target.value)}>
        <option value="" disabled>-- Vali mängija --</option>
            {players.map((player, i) => (
                <option key={i} value={player}>{player}</option>
            ))}
        </select>

        <h3>Vali vastane</h3>
        <select value={opponent} onChange={(e) => setOpponent(e.target.value)}>
        <option value="" disabled>-- Vali mängija --</option>
            {players.map((player, i)=> (
                <option key={i} value={player}>{player}</option>
            ))}
        </select> 

        <br /> <br />
        <h3>Vali mäng</h3>
        <button onClick={playFourteenOne}>14.1</button> 
        <button onClick={playEightBall}>8-pall</button>
        <button onClick={playNineBall}>9-pall</button>
        <button onClick={playTenBall}>10-pall</button>
        <button onClick={playSnooker}>Snuuker</button>

        {fourteenOne === true &&
        <div>
            <h3>Mäng käib</h3>
            <input type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>punktini</h3>
            <button onClick={navigateToFourteenOne}>Alusta</button>
        </div>
        }

        {eightBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <button>Alusta</button>
        </div>
        }

        {nineBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <button>Alusta</button>
        </div>
        }

        {tenBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <button>Alusta</button>
        </div>
        }

        {snooker === true &&
        <div>
            <h3>Mäng käib</h3>
            <input type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <button>Alusta</button>
        </div>
        }

        <br /><br /><br /><br />
        <button onClick={navigateToAddPlayers}>Lisa mängijaid juurde</button>

    </div>
  )
}

export default HomePage