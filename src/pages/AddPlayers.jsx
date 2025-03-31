import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayers } from "../store/PlayerContext"

function AddPlayers() {

    const navigate = useNavigate()

    const nameRef = useRef()

    const { addPlayer } = usePlayers()

    const add = () => {
        const player= nameRef.current.value
        if (nameRef.current.value === "") {
          alert("Tühja nimega ei saa!")
          return
        }
        addPlayer(player)
        navigate ("/")
    }

  return (
    <div>
        <h3>Mängija nimi</h3>
        <input className="player-input" ref={nameRef} type="text" /> <br /> <br />
        <button onClick={add}>Lisa</button>
    </div>
  )
}

export default AddPlayers