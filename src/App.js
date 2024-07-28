import React from "react";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

function App() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  useEffect(() => {
    // localhostに接続
    const roslibConnector = new ROSLIB.Ros({
      url: "ws://localhost:9090",
    });

    roslibConnector.on("connection", function () {
      console.log("Connected to ROSBridge WebSocket server.");
      setConnectionStatus("Connected");
    });

    roslibConnector.on("error", function (error) {
      console.log("Error connecting to ROSBridge WebSocket server: ", error);
      setConnectionStatus("Error");
    });

    roslibConnector.on("close", function () {
      console.log("Connection to ROSBridge WebSocket server closed.");
      setConnectionStatus("Disconnected");
    });
  }, []);

  return (
    <>
      <p>ROS Connection Status: {connectionStatus}</p>
    </>
  );
}

export default App;
