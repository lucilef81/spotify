import PropTypes from 'prop-types';
import React, {
  createContext, useContext, useState,
} from 'react';

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  return (
    <TrackContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      currentPlaylist,
      setCurrentPlaylist,
    }}
    >
      {children}
    </TrackContext.Provider>
  );
};

TrackProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useCurrentTrack = () => useContext(TrackContext);

export default useCurrentTrack;
