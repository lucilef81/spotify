import PropTypes from 'prop-types';
import React, {
  createContext, useContext, useState,
} from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  // Fetch specific playlist from api based on id
  const setPlaylist = async (playlistId) => {
    const res = await fetch(
      `https://afternoon-waters-49321.herokuapp.com/v1/playlists/${playlistId}`,
    );
    const data = await res.json();

    // Store result in context's state
    setCurrentPlaylist(data);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      currentPlaylist,
      setPlaylist,
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

// Hook for easier use in components
const usePlayer = () => useContext(PlayerContext);

export default usePlayer;
