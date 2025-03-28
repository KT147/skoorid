import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { usePlayers } from "../store/PlayerContext"


function HomePage() {

    const { setGameName, players, starter, setStarter, opponent, setOpponent, winnings, setWinnings } = usePlayers()

    const [fourteenOne, setFourteenOne] = useState(false)
    const [eightBall, setEightBall] = useState(false)
    const [nineBall, setNineBall] = useState(false)
    const [tenBall, setTenBall] = useState(false)
    const [snooker, setSnooker] = useState(false)

    const navigate = useNavigate()

    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [radioChoise, setRadioChoice] = useState(15)

    useEffect(() => {
        const savedCheckboxValue = localStorage.getItem("checkboxChecked")
        if (savedCheckboxValue !== null) {
            setCheckboxChecked(savedCheckboxValue === "true")
        } else {
            setCheckboxChecked(false)
        }
    }, [])

    useEffect(() => {
        const savedRadioChoice = localStorage.getItem("radioChoise");
        if (savedRadioChoice !== null) {
          setRadioChoice(Number(savedRadioChoice))
        }
      }, [])

    const playFourteenOne = () => {
        setGameName ("14-1")
        setFourteenOne(true)
        setEightBall(false)
        setNineBall(false)
        setTenBall(false)
        setSnooker(false)
    }

    const navigateToEight = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/eight-ball")
    }


    const playEightBall = () => {
        setGameName ("8-pall")
        setFourteenOne(false)
        setEightBall(true)
        setNineBall(false)
        setTenBall(false)
        setSnooker(false)
    }

    const navigateToNine = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/nine-ball")
    }

    const playNineBall = () => {
        setGameName ("9-pall")
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(true)
        setTenBall(false)
        setSnooker(false)
    }

    const navigateToTen = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/ten-ball")
    }

    const playTenBall = () => {
        setGameName ("10-pall")
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(false)
        setTenBall(true)
        setSnooker(false)
    }

    const navigateToSnooker = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/snooker")
    }


    const playSnooker = () => {
        setGameName ("Snuuker")
        setFourteenOne(false)
        setEightBall(false)
        setNineBall(false)
        setTenBall(false)
        setSnooker(true)
    }

    const navigateToFourteenOne = () => {
        localStorage.setItem("starter", starter)
        localStorage.setItem("opponent", opponent)
        localStorage.setItem("winnings", winnings)
        navigate ("/fourteen-one")
    }

    const navigateToAddPlayers = () => {
        navigate ("/add")
    }

    const handleCheckboxChange = (e) => {
        setCheckboxChecked(e.target.checked)
        localStorage.setItem("checkboxChecked", e.target.checked)
    }

    const handleRadioChange = (e) => {
        const value = Number(e.target.value)
        setRadioChoice(value)
        localStorage.setItem("radioChoise", value)
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
            <input className="game-input" type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>punktini</h3>
            <button onClick={navigateToFourteenOne}>Alusta</button>
        </div>
        }

        {eightBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input className="game-input" type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <button onClick={navigateToEight}>Alusta</button>
        </div>
        }

        {nineBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input className="game-input" type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <span>Võitja teeb avalöögi?</span>
            <input type="checkbox" checked={checkboxChecked} onChange={handleCheckboxChange} />
            <br />
            <button onClick={navigateToNine}>Alusta</button>
        </div>
        }

        {tenBall === true &&
        <div>
            <h3>Mäng käib</h3>
            <input className="game-input" type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <span>Võitja teeb avalöögi?</span>
            <input type="checkbox" checked={checkboxChecked} onChange={handleCheckboxChange}/>
            <br />
            <button onClick={navigateToTen}>Alusta</button>
        </div>
        }

        {snooker === true &&
        <div>
            <h3>Mäng käib</h3>
            <input className="game-input" type="number" value={winnings} onChange={(e) => setWinnings(e.target.value)}/>
            <h3>võiduni</h3>
            <input type="radio" name="choice" value="15" onChange={handleRadioChange} checked={radioChoise === 15}/>15
            <input type="radio" name="choice" value="10" onChange={handleRadioChange} checked={radioChoise === 10}/>10
            <input type="radio" name="choice" value="6" onChange={handleRadioChange} checked={radioChoise === 6}/>6
            <span>  punasega</span>
            <br />
            <button onClick={navigateToSnooker}>Alusta</button>
        </div>
        }
        <br /><br />
        <Link to="/scores">
            <button>Skoorid</button>   
        </Link>
        <br /><br /><br /><br />
        <button onClick={navigateToAddPlayers}>Lisa mängijaid juurde</button>

    </div>
  )
}

export default HomePage