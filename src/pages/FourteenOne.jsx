import { useState, useEffect } from "react"

function FourteenOne() {

  const [starter, setStarter] = useState(() => localStorage.getItem("starter") || "")
  const [opponent, setOpponent] = useState(() => localStorage.getItem("opponent") || "")
  const [winnings, setWinnings] = useState(() => localStorage.getItem("winnings") || "")

  useEffect(() => {
    localStorage.setItem("starter", starter)
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent)
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings)
  }, [winnings]);

  return (
    <div>
      <h3>{starter}</h3>
      <h3>{opponent}</h3>
      <div>{winnings}</div>
    </div>
  )
}

export default FourteenOne