import { useEffect, useState } from "react";
import { loadRoom } from "../axios/axios";

export function useRoom(roomId) {
  const [roomState, setRoomState] = useState({
    loading: true,
    room: null,
    error: null,
  });
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await loadRoom(roomId);
      if (!res.errors) {
        setRoomState({
          loading: false,
          room: res.room,
          error: null,
        });
      } else {
        setRoomState({
          loading: false,
          room: null,
          error: res.errors,
        });
      }
    };
    fetchRoom();
  }, [roomId]);
  return { ...roomState };
}
