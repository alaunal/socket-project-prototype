import { Navigate } from "react-router-dom";
import { isEmpty } from "lodash"; 
import { useAuth } from "../hooks/useAuth";

const PrivateContainer = ({ children }) => {
  const { user } = useAuth();

  if (isEmpty(user)) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default PrivateContainer;