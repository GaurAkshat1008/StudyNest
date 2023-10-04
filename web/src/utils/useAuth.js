import { useEffect, useState } from "react";
import { getMe } from "../axios/axios";

export function useAuth() {
  const [authState, setAuthState] = useState({
    loading: true,
    user: null,
  });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMe();
      if (!res.errors) {
        setAuthState({
          loading: false,
          user: res.user,
        });
      } else {
        setAuthState({
          loading: false,
          user: null,
        });
      }
    };
    fetchUser();
  }, []);
  return { ...authState };
}