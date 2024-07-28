import React from "react";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

function App() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [cmdVel, setCmdVel] = useState("");
  const [x, setX] = useState("none");

  let roslibConnector;
  let topicCmdVel;

  useEffect(() => {
    roslibConnector = new ROSLIB.Ros({
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

    topicCmdVel = new ROSLIB.Topic({
      ros: roslibConnector,
      name: "/turtle1/cmd_vel",
      messageType: "geometry_msgs/msg/Twist",
    });
  }, []);

  // const topicPose = new ROSLIB.Topic({
  //   ros: roslibConnector,
  //   name: "/turtle1/pose",
  //   messageType: "turtlesim/msg/Pose",
  // });

  useEffect(() => {
    topicCmdVel.subscribe((message) => {
      console.log(message.angular);
      console.log(message.angular);
      setX(message.linear.x);
    });
  }, [topicCmdVel]);

  return (
    <>
      <p>ROS Connection Status: {connectionStatus}</p>
      <p>cmd_vel: {x}</p>
    </>
  );
}

export default App;
