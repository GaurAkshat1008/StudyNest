import { useEffect, useState } from "react";
import { findUserById } from "../axios/axios";

export function useGetUsers(room) {
  const [roomState, setRoomState] = useState({
    loading: true,
    users: [],
  });
  useEffect(() => {
    const fetchRoom = async () => {
      let users = [];
        for(const userId of room.users){
          const user = await findUserById(userId)
          if(user){
            users.push(user)
          }
        }
        setRoomState({
          loading: false,
          users: users,
        });
      }
    fetchRoom();
  }, [room.users]);
  return { ...roomState };
}
