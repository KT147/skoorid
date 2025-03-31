import { useEffect, useState } from "react"
import { usePlayers } from "../store/PlayerContext"
import { useNavigate } from "react-router-dom"

function TenBall() {

    const {
        gameName,
        starter,
        opponent,
        winnings,
        setGameStartTime,
        setGameEndTime
      } = usePlayers()

      const navigate = useNavigate()

      const [starterScore, setStarterScore] = useState(0)
      const [opponentScore, setOpponentScore] = useState(0)

      const [selectActivePlayer, setSelectActivePlayer] = useState(starter)
      const [checkboxChecked, setCheckboxChecked] = useState(false)

      const [message, setMessage] = useState("")

      const [gameStartTime, setGameStartTimeLocal] = useState("")

    useEffect(() => {
        const startTime = new Date().toISOString()
        setGameStartTimeLocal(startTime)
        setGameStartTime(startTime)
      }, [setGameStartTime])

    useEffect(() => {
        const savedCheckboxValue = localStorage.getItem("checkboxChecked")
        if (savedCheckboxValue !== null) {
            setCheckboxChecked(savedCheckboxValue === "true")
        }
    }, [])
    
      useEffect(() => {
        localStorage.setItem("starter", starter)
      }, [starter]);
    
      useEffect(() => {
        localStorage.setItem("opponent", opponent)
      }, [opponent]);
    
      useEffect(() => {
        localStorage.setItem("winnings", winnings)
      }, [winnings]);

      const increaseScore = (player) => {
        if (player === starter) {
            setStarterScore((prevScore) => prevScore + 1)
        } else {
            setOpponentScore((prevScore) => prevScore + 1)
        }

        if (checkboxChecked) {
            setSelectActivePlayer(player)
        } else {
            setSelectActivePlayer((prevPlayer) => (prevPlayer === starter ? opponent : starter))
        }
    }

    const decreaseScore = (player) => {
      if (player === starter && starterScore > 0) {
          setStarterScore((prevScore) => prevScore - 1)
      } else if (player === opponent && opponentScore > 0) {
          setOpponentScore((prevScore) => prevScore - 1)
      }

      if (checkboxChecked) {
        setSelectActivePlayer(player)
    } else {
        setSelectActivePlayer((prevPlayer) => (prevPlayer === starter ? opponent : starter))
    }
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
    }, [starterScore, opponentScore])

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
          {selectActivePlayer === starter && <img src="/arrow.png" height={"30px"} alt="arrow" />}
          <h2>{starter}</h2>
        </div>
        <h2>{starterScore}</h2>
        <button onClick={() => increaseScore(starter)} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>+</button>
        <button onClick={() => decreaseScore(starter)} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
        <br /><br /><br /><br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
          {selectActivePlayer === opponent && <img src="/arrow.png" height={"30px"} alt="arrow" />}
          <h2>{opponent}</h2>
        </div>
        <h2>{opponentScore}</h2>
        <button onClick={() => increaseScore(opponent)} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>+</button>
        <button onClick={() => decreaseScore(opponent)} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
        <br /><br /><br />

        <button onClick={navigateToScore}>Lõpeta mäng ja salvesta tulemused</button>

    </div>
  )
}

export default TenBall