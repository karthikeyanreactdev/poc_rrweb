// PlayerComponent.js
import React, { useEffect, useRef } from "react";
import { Replayer, getReplayConsolePlugin } from "rrweb";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

const PlayerComponent = ({ events, defaultLogFull }) => {
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  // const replayer = useRef(null);
  let replayer = null;

  useEffect(() => {
    if (events && events.length > 0) {
      console.log("cheeck----------", events);
      // Initialize rrweb-player
      new rrwebPlayer({
        // target: playerContainerRef.current,
        target: document.getElementById("rrweb-player1"),
        props: {
          events,
          plugins: [
            getReplayConsolePlugin({
              level: ["info", "log", "warn", "error"],
            }),
          ],
          speed: 8,
        },
        // plugins: [
        //   getReplayConsolePlugin({
        //     level: ["info", "log", "warn", "error"],
        //   }),
        // ],
      });
    }

    // return () => {
    //   // Clean up when component unmounts
    //   if (playerRef.current) {
    //     // playerRef?current.p();
    //   }
    // };
    // if (events && events.length > 0) {
    //   replayer = new Replayer(events, {
    //     plugins: [
    //       getReplayConsolePlugin({
    //         level: ["info", "log", "warn", "error"],
    //       }),
    //     ],
    //   });
    //   replayer.play(5000);
    //   console.log("replayer", replayer);
    // }
  }, []);

  console.log('defaultLogFull', defaultLogFull);
  return (
    <div>
      <h2>Playback Session</h2>
      <div ref={playerContainerRef} id="rrweb-player1"></div>
      {defaultLogFull}
      {/* <div ref={replayer} id="rrweb-player12"></div> */}
      {/* <div dangerouslySetInnerHTML={{ __html: replayer }}></div>
      {replayer} */}
    </div>
  );
};

export default PlayerComponent;
