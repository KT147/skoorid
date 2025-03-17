import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext();

import PropTypes from "prop-types";

export const usePlayers = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState(() => {
    const stored = localStorage.getItem("players");
    return stored ? JSON.parse(stored) : [];
  });

  const addPlayer = (name) => {
    const updatedPlayers = [...players, name];
    setPlayers(updatedPlayers);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <PlayerContext.Provider value={{ players, addPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }
