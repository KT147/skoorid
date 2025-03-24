import { useEffect, useState } from "react"
import { usePlayers } from "../store/PlayerContext"
import { useNavigate } from "react-router-dom"

function EightBall() {

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

      const [selectActivePlayer, setSelectActivePlayer] = useState(false)

      const [message, setMessage] = useState("")

      const [gameStartTime, setGameStartTimeLocal] = useState("")

    useEffect(() => {
        const startTime = new Date().toISOString()
        setGameStartTimeLocal(startTime)
        setGameStartTime(startTime)
      }, [setGameStartTime])
    
      useEffect(() => {
        localStorage.setItem("starter", starter)
      }, [starter]);
    
      useEffect(() => {
        localStorage.setItem("opponent", opponent)
      }, [opponent]);
    
      useEffect(() => {
        localStorage.setItem("winnings", winnings)
      }, [winnings]);

      const increaseStarterScore = () => {
        setStarterScore(starterScore + 1)

        if (selectActivePlayer === false) {
            setSelectActivePlayer(true)
        } else {
            setSelectActivePlayer(false)
        }
      }

      const decreaseStarterScore = () => {
        if (starterScore > 0) {
            setStarterScore(starterScore - 1)
        }

        if (selectActivePlayer === false) {
            setSelectActivePlayer(true)
        } else {
            setSelectActivePlayer(false)
        }
      }

      const increaseOpponentScore = () => {
        setOpponentScore(opponentScore + 1)

        if (selectActivePlayer === false) {
            setSelectActivePlayer(true)
        } else {
            setSelectActivePlayer(false)
        }
      }


      const decreaseOpponentScore = () => {
        if (opponentScore > 0){
        setOpponentScore(opponentScore - 1)
        }

        if (selectActivePlayer === false) {
            setSelectActivePlayer(true)
        } else {
            setSelectActivePlayer(false)
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
    
        const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
        gameHistory.push({
          gameName,
          starter,
          opponent,
          starterScore,
          opponentScore,
          gameStartTime: gameStartTime,
          gameEndTime: endTime
        })
        localStorage.setItem("gameHistory", JSON.stringify(gameHistory))
      }

  return (
    <div>

        <h2>{message}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            {selectActivePlayer === false && <img src="/arrow.png" height={"30px"} alt="" />}
            <h2>{starter}</h2>
        </div>
        <h2>{starterScore}</h2>
        <button onClick={increaseStarterScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>+</button>
        <button onClick={decreaseStarterScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
        <br /><br /><br /><br />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            {selectActivePlayer === true && <img src="/arrow.png" height={"30px"} alt="" />}
            <h2>{opponent}</h2>
        </div>
        <h2>{opponentScore}</h2>
        <button onClick={increaseOpponentScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>+</button>
        <button onClick={decreaseOpponentScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</button>
        <br /><br /><br />

        <button onClick={navigateToScore}>Lõpeta mäng ja salvesta tulemused</button>

    </div>
  )
}

export default EightBall