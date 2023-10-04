import { useEffect, useState } from "react";
import { loadChats } from "../axios/axios";

export function useChats(roomId) {
  const [chatState, setChatState] = useState({
    loading: true,
    chats: [],
  });
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await loadChats(roomId);
      if (!res.errors) {
        setChatState({
          loading: false,
          chats: res.chats,
        });
      } else {
        setChatState({
          loading: false,
          chats: null,
        });
      }
    };
    fetchRoom();
  }, [roomId]);
  return { ...chatState };
}
