import { useCallback, useEffect, useMemo } from "react";
import WebRTCComp from "../../component/WebRTCComp";
import { io } from "socket.io-client";
import { useSocket } from "../../context/socket";
const Video = ({ user, room }) => {
  const socket = useSocket();
  // console.log(socket.id)
  const data = {
    room: room.name,
    user: user.username,
  };
  socket.emit("call-joined", data);
  const handleJoinCall = useCallback((data) => {
    const {user, room} = data;
    console.log(user, room)
  }, [])
  useEffect(() => {
    socket.on("call-joined", handleJoinCall);
    return () => {
      socket.off("call-joined", handleJoinCall)
    }
  }, [socket]);
  return (
    <div>
      <WebRTCComp />
    </div>
  );
};

export default Video;
