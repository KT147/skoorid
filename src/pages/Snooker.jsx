import { useState, useEffect } from "react";
import { usePlayers } from "../store/PlayerContext"
import { useNavigate } from "react-router-dom";

function Snooker() {

  const {
    gameName,
    starter,
    opponent,
    winnings,
    setGameStartTime,
    setGameEndTime,
  } = usePlayers()

  const buttons = [
    { backgroundColor: "red", color: "white", value: 1, },
    { backgroundColor: "black", color: "white", value: 7 },
    { backgroundColor: "pink", color: "black", value: 6 },
    { backgroundColor: "blue", color: "white", value: 5 },
    { backgroundColor: "#8B4513", color: "white", value: 4 },
    { backgroundColor: "green", color: "white", value: 3 },
    { backgroundColor: "yellow", color: "black", value: 2 }
  ]

  const [history, setHistory] = useState([]);

  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const [radioChoise, setRadioChoice] = useState()

  const [starterIsActive, setStarterIsActive] = useState(true)
  const [opponentIsActive, setOpponentIsActive] = useState(false)

  const [starterPoints, setStarterPoints] = useState(0)
  const [opponentPoints, setOpponentPoints] = useState(0)

  const [starterScore, setStarterScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [totalPoints, setTotalPoints] = useState()

  const [starterCurrentRun, setStarterCurrentRun] = useState([0])
  const [starterMaxRun, setStarterMaxRun] = useState([0])

  const [opponentCurrentRun, setOpponentCurrentRun] = useState([0])
  const [opponentMaxRun, setOpponentMaxRun] = useState([0]) 

  const [gameStartTime, setGameStartTimeLocal] = useState("")

  useEffect(() => {
    const startTime = new Date().toISOString()
    setGameStartTimeLocal(startTime)
    setGameStartTime(startTime)
  }, [setGameStartTime])

  useEffect(() => {
    const savedRadioChoice = localStorage.getItem("radioChoise");
    if (savedRadioChoice !== null) {
      setRadioChoice(Number(savedRadioChoice));
    }
    resetTotalPoints();
  }, [radioChoise]);

  useEffect(() => {
    localStorage.setItem("starter", starter)
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent)
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings)
  }, [winnings]);

  const saveHistory = () => {
    setHistory(prevHistory => [
        ...prevHistory,
        {
            starterPoints,
            opponentPoints,
            starterCurrentRun: [...starterCurrentRun],
            opponentCurrentRun: [...opponentCurrentRun],
            starterMaxRun,
            opponentMaxRun,
            totalPoints,
        }
    ])
}

  const changeStarterToActive = () => {
    setStarterIsActive(true)
    setOpponentIsActive(false)
    setOpponentCurrentRun([])
  }

  const changeOpponentToActive = () => {
    setStarterIsActive(false)
    setOpponentIsActive(true)
    setStarterCurrentRun([])
  }

  const raiseScore = (player, btn) => {
    saveHistory()

    if (btn.value === 1) {
        setTotalPoints(totalPoints - 8)
    }

    if (totalPoints === 27 && btn.value === 2)
      setTotalPoints(25)
    if (totalPoints === 25 && btn.value === 3)
      setTotalPoints(22)
    if (totalPoints === 22 && btn.value === 4)
      setTotalPoints(18)
    if (totalPoints === 18 && btn.value === 5)
      setTotalPoints(13)
    if (totalPoints === 13 && btn.value === 6)
      setTotalPoints(7)
    if (totalPoints === 7 && btn.value === 7)
      setTotalPoints(0)

    if (player === starter) {
        setStarterPoints(starterPoints + btn.value);
        setStarterCurrentRun(prevRun => {
            const newRun = [...prevRun, btn.value];
            const currentRunSum = newRun.reduce((acc, val) => acc + val, 0)
            setStarterMaxRun(prevMax => Math.max(prevMax, currentRunSum))
            return newRun
        })
    }

    if (player === opponent) {
        setOpponentPoints(opponentPoints + btn.value)
        setOpponentCurrentRun(prevRun => {
            const newRun = [...prevRun, btn.value]
            const currentRunSum = newRun.reduce((acc, val) => acc + val, 0)
            setOpponentMaxRun(prevMax => Math.max(prevMax, currentRunSum))
            return newRun
        })
    }
}

  const undo = () => {
    if (history.length === 0) return

    const lastState = history[history.length - 1];
    setHistory(prevHistory => prevHistory.slice(0, -1))

    setStarterPoints(lastState.starterPoints);
    setOpponentPoints(lastState.opponentPoints);
    setStarterCurrentRun(lastState.starterCurrentRun);
    setOpponentCurrentRun(lastState.opponentCurrentRun);
    setStarterMaxRun(lastState.starterMaxRun);
    setOpponentMaxRun(lastState.opponentMaxRun);
    setTotalPoints(lastState.totalPoints);
};
  

  const freeBall = () => {
    setTotalPoints(totalPoints + 8)
  }

  const resetTotalPoints = () => {
    if (radioChoise === 15) {
      setTotalPoints(147)
    } else if (radioChoise === 10) {
      setTotalPoints(107)
    } else if (radioChoise === 6) {
      setTotalPoints(75)
    }
  };

  const newFrame = () => {
    if (starterPoints > opponentPoints){
      setStarterScore(starterScore + 1)
    }
    else {
      setOpponentScore(opponentScore + 1)
    }

    if (starterIsActive === true){
      setStarterIsActive(false)
      setOpponentIsActive(true)
    } else {
      setStarterIsActive(true)
      setOpponentIsActive(false)
    }

    setStarterPoints(0)
    setStarterCurrentRun([])
    setOpponentPoints(0)
    setOpponentCurrentRun([])
    resetTotalPoints()
  }

  const checkWinner = () => {
    if (starterScore === Number(winnings)) {
        setMessage(`${starter} võitis!`)
    } else if (opponentScore === Number(winnings)) {
        setMessage(`${opponent} võitis!`)
    }
  }

  useEffect(() => {
    checkWinner()
  }, [starterScore, opponentScore, winnings])


  const navigateToScore = () => {
    navigate ("/scores")
    const endTime = new Date().toISOString()
    setGameEndTime(endTime)

    const gameData = {
      gameName,
      starter,
      opponent,
      starterScore,
      opponentScore,
      starterMaxRun,
      opponentMaxRun,
      gameStartTime,
      gameEndTime: endTime
  };

    fetch("https://skoorid-database-default-rtdb.europe-west1.firebasedatabase.app/skoorid.json", {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(gameData)
    })
    .then(res => res.json())
  }

  return (
    <div>
      <h2>{message}</h2>
      <div>Punkte laual: {totalPoints}</div>
      <div>Punktide vahe: {Math.abs(starterPoints - opponentPoints)}</div>
      <button onClick={undo} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}><img src="/back.png" style={{borderRadius: "50%", height: "15px"}} /></button>
        <div onClick={changeStarterToActive} style={{ backgroundColor: starterIsActive ? "yellowgreen" : '' }}>
        <h3>{starter}</h3>
        <h4>Skoor: {starterScore}</h4>
        {starterIsActive && 
          buttons.map((btn, index) =>
            <button 
              onClick={() => raiseScore(starter, btn)} 
              key={index} 
              style={{backgroundColor: btn.backgroundColor, color: btn.color, borderRadius: "60%",height: "45px"}}
              disabled={totalPoints === 27 && btn.value === 1 || starterScore === Number(winnings) || opponentScore === Number(winnings) || totalPoints === 0}
            >
            {btn.value}
            </button>
        )}
        {starterIsActive &&<button onClick={freeBall} style={{padding: "10px 5px"}} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Vaba pall</button>}
        <h4>Punktid: {starterPoints}</h4>
        {starterIsActive &&<div>Aktiivne punktiseeria: {starterCurrentRun.length > 0 ? starterCurrentRun.reduce((acc, val) => acc + val, 0) : 0}</div>}
        <div>Suurim punktiseeria: {starterMaxRun}</div>
        {starterIsActive === true && <div>
        </div>}
      </div>


      <div onClick={changeOpponentToActive} style={{ backgroundColor: opponentIsActive ? 'yellowgreen' : '' }}>
        <h3>{opponent}</h3>
        <h4>Skoor: {opponentScore}</h4>
        {opponentIsActive && 
          buttons.map((btn, index) =>
            <button 
              onClick={() => raiseScore(opponent, btn)} 
              key={index} 
              style={{backgroundColor: btn.backgroundColor, color: btn.color, borderRadius: "50%",height: "45px"}}
              disabled={totalPoints === 27 && btn.value === 1 || starterScore === Number(winnings) || opponentScore === Number(winnings) || totalPoints === 0}
            >
            {btn.value}
            </button>
        )}
        {opponentIsActive &&<button onClick={freeBall} style={{padding: "10px 5px"}} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Vaba pall</button>}
        {opponentIsActive && <div>Aktiivne punktiseeria: {opponentCurrentRun.length > 0 ? opponentCurrentRun.reduce((acc, val) => acc + val, 0) : 0}</div>}
        <h4>Punktid: {opponentPoints}</h4>
        <div>Suurim punktiseeria: {opponentMaxRun}</div>
      </div>

      <br />

      {totalPoints < Math.abs(starterPoints - opponentPoints) && <button onClick={newFrame}>Lõpeta freim</button> }


      <br /><br /> <br />
      <button onClick={navigateToScore}>Lõpeta mäng ja salvesta tulemused</button>
    </div>
  )
}

export default Snooker