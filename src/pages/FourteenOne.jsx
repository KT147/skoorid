import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function FourteenOne() {

  const navigate = useNavigate()

  const [starter, setStarter] = useState(() => localStorage.getItem("starter") || "")
  const [opponent, setOpponent] = useState(() => localStorage.getItem("opponent") || "")
  const [winnings, setWinnings] = useState(() => localStorage.getItem("winnings") || "")

  const [message, setMessage] = useState("")

  const [starterIsActive, setStarterIsActive] = useState(false)
  const [opponentIsActive, setOpponentIsActive] = useState(false)

  const [startingTable, setStartingTable] = useState(15)

  const [starterScore, setStarterScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [starterCurrentRun, setStarterCurrentRun] = useState(0)
  const [starterMaxRun, setStarterMaxRun] = useState(0)

  const [opponentCurrentRun, setOpponentCurrentRun] = useState(0)
  const [opponentMaxRun, setOpponentMaxRun] = useState(0) 

  const [starterFoulCount, setStarterFoulCount] = useState(0)
  const [opponentFoulCount, setOpponentFoulCount] = useState(0)

  useEffect(() => {
    localStorage.setItem("starter", starter)
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent)
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings)
  }, [winnings]);


  const changeStarterToActive = () => {
    setStarterIsActive(true)
    setOpponentIsActive(false)
    setOpponentCurrentRun(0)
  }


  const changeOpponentToActive = () => {
    setStarterIsActive(false)
    setOpponentIsActive(true)
    setStarterCurrentRun(0)
  }


  const updateStarterScore = () => {
    const newScore = starterScore + 1
    setStarterScore(newScore)
    setStartingTable(prev => prev - 1)

    setStarterFoulCount(0)
  
    setStarterCurrentRun(prev => {
      const newRun = prev + 1
      if (newRun > opponentMaxRun) setStarterMaxRun(newRun)
      return newRun
    })
    setOpponentCurrentRun(0)
  
    if (startingTable === 2) {
      setStartingTable(15)
    }
  
    if (newScore === Number(winnings)) {
      setMessage(starter + " võitis")
    }
  }


  const updateOpponentScore = () => {
    const newScore = opponentScore + 1
    setOpponentScore(newScore)
    setStartingTable(prev => prev - 1)

    setOpponentFoulCount(0)
  
    setOpponentCurrentRun(prev => {
      const newRun = prev + 1
      if (newRun > opponentMaxRun) setOpponentMaxRun(newRun)
      return newRun
    })
    setStarterCurrentRun(0)
  
    if (startingTable === 2) {
      setStartingTable(15)
    }
  
    if (newScore === Number(winnings)) {
      setMessage(opponent + " võitis")
    }
  }  


  const starterFoul = () => {
    if (startingTable === 15 && starterScore === 0 && opponentScore === 0){
      setStarterScore(prevScore => prevScore - 2)
    } else {
      setStarterScore(prevScore => prevScore - 1)
    }

    setStarterCurrentRun(0)

    setStarterFoulCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setStarterScore(prev => prev - 15)
        return 0
      } 
      return newCount
    })
    setOpponentFoulCount(0)
  }


  const opponentFoul = () => {
    if (startingTable === 15 && starterScore === 0 && opponentScore === 0 ){
      setOpponentScore(prevScore => prevScore - 2)
    } else {
      setOpponentScore(prevScore => prevScore - 1)
    }

    setOpponentCurrentRun(0)

    setOpponentFoulCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setOpponentScore(prev => prev - 15)
        return 0 
      }
      return newCount
    })
  
    setStarterFoulCount(0)
  }


  const navigateToScore = () => {
    navigate ("/scores")
  }


  return (
    <div>

      <h2>{message}</h2>

      <h1>{startingTable}</h1>

      <div onClick={changeStarterToActive} style={{ color: starterIsActive ? 'red' : 'black' }}>
        <h3>{starter}</h3>
        <h4>Skoor: {starterScore}</h4>
        <div>Aktiivne punktiseeria: {starterCurrentRun}</div>
        <div>Suurim punktiseeria: {starterMaxRun}</div>
       {starterFoulCount === 2 && <div>Vigu järjest: {starterFoulCount}</div>}
       {starterIsActive === true && <div>
          <button onClick={updateStarterScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
          <button onClick={starterFoul} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Viga</button>
        </div>}
      </div>

      <div onClick={changeOpponentToActive} style={{ color: opponentIsActive ? 'red' : 'black' }}>
        {opponentIsActive === true && <div>
          <button onClick={updateOpponentScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
          <button onClick={opponentFoul} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Viga</button>
        </div>}
        <h3>{opponent}</h3>
        <h4>Skoor: {opponentScore}</h4>
        <div>Aktiivne punktiseeria: {opponentCurrentRun}</div>
        <div>Suurim punktiseeria: {opponentMaxRun}</div>
        {opponentFoulCount === 2 && <div>Vigu järjest: {opponentFoulCount}</div>}
      </div>

      <br /> <br />
      <div>Mäng käib {winnings} punktini</div>

      <br />
      <button onClick={navigateToScore}>Lõpeta mäng ja salvesta tulemused</button>
    </div>
  )
}

export default FourteenOne