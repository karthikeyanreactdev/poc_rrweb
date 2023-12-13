// PlayerComponent.js
import React, { useEffect, useRef } from "react";
import { Replayer, getReplayConsolePlugin } from "rrweb";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

const PlayerComponent = ({ events }) => {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  // const replayer = useRef(null);

  useEffect(() => {
    if (events && events.length > 0) {
      console.log("cheeck----------", events);
      // Initialize rrweb-player
      new rrwebPlayer({
        // target: playerContainerRef.current,
        target: document.getElementById("rrweb-player1"),
        props: {
          events,
        },
        plugins: [
          getReplayConsolePlugin({
            level: ["info", "log", "warn", "error"],
          }),
        ],
      });
    }

    // return () => {
    //   // Clean up when component unmounts
    //   if (playerRef.current) {
    //     // playerRef?current.p();
    //   }
    // };
    if (events && events.length > 0) {
      const replayer = new Replayer(events, {
        plugins: [
          getReplayConsolePlugin({
            level: ["info", "log", "warn", "error"],
          }),
        ],
      });
      replayer.play();
      console.log("replayer", replayer);
    }
    
  }, []);

  return (
    <div>
      <h2>Playback Session</h2>
      <div ref={playerContainerRef} id="rrweb-player1"></div>
      {/* <div ref={replayer} id="rrweb-player12"></div> */}
    </div>
  );
};

export default PlayerComponent;
