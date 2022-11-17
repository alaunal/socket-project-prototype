import { useEffect, useRef } from "react";
import { isEmpty, filter } from "lodash";
import { useOutlet } from "react-router-dom";
import socketIOClient from "socket.io-client";

import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

// const SOCKET_SERVER_URL = "https://socket-prototype.herokuapp.com";
// const SOCKET_SERVER_URL = "http://localhost:3001";
const SOCKET_SERVER_URL = "http://rabbit-hole-integration-007.prime-studio-socket.ps-http.golabs.io";

const SocketContainer = () => {
  const outlet = useOutlet();
  const { user } = useAuth();
  const { setParticipant, setNotice, setUserActive } = useSocket();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: {
        userId: user.participant.id,
        username: user.participant.username,
        email: user.participant.email,
        projectId: user.project.id,
        projectName: user.project.name,
      },
    });

    if (!isEmpty(user)) {

      (async () => {
        await socketRef.current.on("projectUsers", ({ project, userActive, participant }) => {
          console.log("project name:", project, "Participants:", participant, "User active:", userActive);

          let isConnected = filter(participant, (obj) => parseInt(obj.userId) === parseInt(user.participant.id));

          if (!isEmpty(isConnected)) {
            setParticipant(participant);
            setUserActive(userActive);
          }
        });

        await socketRef.current.on("notice", (message) => {
          console.log("notice", message);
          setNotice(message);
          setTimeout(() => setNotice(""), 5000);
        });
      })();
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return <div>{outlet}</div>;
};

export default SocketContainer;
