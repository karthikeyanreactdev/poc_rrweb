// PlayerComponent.js
import React, { useEffect, useRef } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

const PlayerComponent = ({ events }) => {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (events && events.length > 0) {
      // Initialize rrweb-player
      playerRef.current = new rrwebPlayer({
        target: playerContainerRef.current,
        data: {
          events,
        },
      });
    }

    return () => {
      // Clean up when component unmounts
      if (playerRef.current) {
        // playerRef?current.p();
      }
    };
  }, [events]);

  return (
    <div>
      <h2>Playback Session</h2>
      <div ref={playerContainerRef} id="rrweb-player"></div>
    </div>
  );
};

export default PlayerComponent;
