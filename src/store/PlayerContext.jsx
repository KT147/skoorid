import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const PlayerContext = createContext();

export const usePlayers = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState(() => {
    const stored = localStorage.getItem("players");
    return stored ? JSON.parse(stored) : [];
  });

  const [starter, setStarter] = useState(() => {
    return localStorage.getItem("starter") || "";
  });

  const [opponent, setOpponent] = useState(() => {
    return localStorage.getItem("opponent") || "";
  });

  const [starterMaxRun, setStarterMaxRun] = useState(() => {
    return localStorage.getItem("starterMaxRun") || "";
  });

  const [opponentMaxRun, setOpponentMaxRun] = useState(() => {
    return localStorage.getItem("opponentMaxRun") || "";
  });

  const [winnings, setWinnings] = useState(() => {
    return localStorage.getItem("winnings") || "";
  });

  const [gameStartTime, setGameStartTime] = useState(() => {
    return localStorage.getItem("gameStartTime") || "";
  });

  const [gameEndTime, setGameEndTime] = useState(() => {
    return localStorage.getItem("gameEndTime") || "";
  });

  const [gameName, setGameName] = useState(() => {
    return localStorage.getItem("gameName") || "";
  })

  const addPlayer = (name) => {
    const updatedPlayers = [...players, name];
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("starter", starter);
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent);
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings);
  }, [winnings]);

  useEffect(() => {
    localStorage.setItem("starterMaxRun", starterMaxRun);
  }, [starterMaxRun]);

  useEffect(() => {
    localStorage.setItem("opponentMaxRun", opponentMaxRun);
  }, [opponentMaxRun]);

  useEffect(() => {
    localStorage.setItem("gameStartTime", gameStartTime);
  }, [gameStartTime]);

  useEffect(() => {
    localStorage.setItem("gameEndTime", gameEndTime);
  }, [gameEndTime]);

  useEffect(() => {
    localStorage.setItem("gameName", gameName);
  }, [gameName]);

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        gameName,
        setGameName,
        starterMaxRun,
        setStarterMaxRun,
        opponentMaxRun,
        setOpponentMaxRun,
        gameStartTime,
        setGameStartTime,
        gameEndTime,
        setGameEndTime,
        starter,
        setStarter,
        opponent,
        setOpponent,
        winnings,
        setWinnings,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
