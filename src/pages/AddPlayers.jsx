import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayers } from "../store/PlayerContext"

function AddPlayers() {

    const navigate = useNavigate()

    const nameRef = useRef()

    const { addPlayer } = usePlayers()

    const add = () => {
        const player= nameRef.current.value
        addPlayer(player)
        navigate ("/")
    }
  return (
    <div>
        <label>Mängija nimi</label> <br />
        <input ref={nameRef} type="text" /> <br />
        <button onClick={add}>Lisa</button>
    </div>
  )
}

export default AddPlayers