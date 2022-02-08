import { Navigate } from "react-router";
import { useUserContext } from '../context/auth';

const PrivateRoute = ({ children }) => {
    const { loggedIn } = useUserContext();

    return loggedIn ? children : <Navigate to='/login' replace='true' />;
}

export default PrivateRoute;