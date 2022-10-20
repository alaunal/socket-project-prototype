import { createContext, useContext, useMemo, useState } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [participant, setParticipant] = useState([]);
  const [userActive, setUserActive] = useState({});
  const [notice, setNotice] = useState("");

  const setSocketReset = () => {
    setParticipant([]);
    setUserActive({});
  };

  const value = useMemo(
    () => ({
      participant,
      setParticipant,
      userActive,
      setUserActive,
      notice,
      setNotice,
      setSocketReset
    }),
    [participant, notice, userActive],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};
