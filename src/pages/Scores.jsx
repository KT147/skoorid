import { Link } from "react-router-dom"

function Scores() {

  const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []
  

  return (
    <div>
      <Link to="/">
        <button>Tagasi avalehele</button>
      </Link>
      <br /> <br />
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
          <tr key={index}>
            <td>{game.gameName}</td>
            <td>
              {game.starter}
              <br />
              Skoor :{game.starterScore}
              <br />
              {game.gameName === "14-1" && <>
                Suurim seeria: {game.starterMaxRun}
              </>}
            </td>
            <td>
              {game.opponent}
              <br />
              Skoor :{game.opponentScore}
              <br />
              {game.gameName === "14-1" &&<>
                Suurim seeria: {game.opponentMaxRun}
              </>}
            </td>
            <td>
              {new Date (game.gameStartTime).toLocaleString()} - 
              <br />
              {new Date(game.gameEndTime).toLocaleTimeString()}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Scores