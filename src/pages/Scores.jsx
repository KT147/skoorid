import { useState } from "react"
import { Link } from "react-router-dom"

function Scores() {

  const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []

  const [selectedPlayers, setSelectedPlayers] = useState(null)

  const filterGamesByPlayers = (player1, player2) => {
    return gameHistory.filter(game => 
      (game.starter === player1 && game.opponent === player2) ||
      (game.starter === player2 && game.opponent === player1)
    )
  }

  const handleRowClick = (player1, player2) => {
    setSelectedPlayers({ player1, player2 })
  }

  const handleBackClick = () => {
    setSelectedPlayers(null)
  }

  const gamesToDisplay = selectedPlayers
  ? filterGamesByPlayers(selectedPlayers.player1, selectedPlayers.player2)
  : gameHistory
  

  return (
    <div>
      <Link to="/">
        <button>Tagasi avalehele</button>
      </Link>
      <br />
      {selectedPlayers && (
        <button onClick={handleBackClick}>Algseisu tagasi</button>
      )}
      <br /> <br />
      {!selectedPlayers && (
      <table>
        <thead>
          <tr>
            <th>Mäng</th>
            <th>Mängija 1</th>
            <th>Mängija 2</th>
            <th>Mängu kestus</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((game,index) => (
          <tr key={index} onClick={() => handleRowClick(game.starter, game.opponent)}>
            <td>{game.gameName}</td>
            <td>
              {game.starter}
              <br />
              Skoor :{game.starterScore}
              <br />
              {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                <>
                  Suurim seeria: {game.starterMaxRun}
                </>
              )}
            </td>
            <td>
              {game.opponent}
              <br />
              Skoor :{game.opponentScore}
              <br />
              {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                <>
                  Suurim seeria: {game.opponentMaxRun}
                </>
              )}
            </td>
            <td>
              {new Date (game.gameStartTime).toLocaleString()} - 
              <br />
              {new Date(game.gameEndTime).toLocaleTimeString()}</td>
          </tr>
          ))}
        </tbody>
      </table>
      )}
      
        {selectedPlayers && (
        <div>
          <h3>{selectedPlayers.player1} vs {selectedPlayers.player2} mängud</h3>
          <table>
            <thead>
              <tr>
                <th>Mäng</th>
                <th>Mängija 1</th>
                <th>Mängija 2</th>
                <th>Mängu kestus</th>
              </tr>
            </thead>
            <tbody>
              {gamesToDisplay.map((game, index) => (
                <tr key={index}>
                  <td>{game.gameName}</td>
                  <td>
                    {game.starter}
                    <br />
                    Skoor : {game.starterScore}
                    <br />
                    {(game.gameName === "14-1" || game.gameName === "Snuuker") && <>
                      Suurim seeria: {game.starterMaxRun}
                    </>}
                  </td>
                  <td>
                    {game.opponent}
                    <br />
                    Skoor : {game.opponentScore}
                    <br />
                    {(game.gameName === "14-1" || game.gameName === "Snuuker") && <>
                      Suurim seeria: {game.opponentMaxRun}
                    </>}
                  </td>
                  <td>
                    {new Date(game.gameStartTime).toLocaleString()} - 
                    <br />
                    {new Date(game.gameEndTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Scores